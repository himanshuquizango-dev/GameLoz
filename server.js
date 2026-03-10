import express from "express";
import cors from "cors";
import { db } from "./src/lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

const TRENDING_ORDER = `
  CASE WHEN installs LIKE '%B+' THEN 10 WHEN installs LIKE '%M+' THEN 9 WHEN installs LIKE '%K+' THEN 8 ELSE 0 END DESC,
  CAST(REGEXP_REPLACE(installs, '[^0-9]', '', 'g') AS BIGINT) DESC NULLS LAST,
  rating DESC NULLS LAST`;

// Get all games (general)
app.get("/api/games", async (req, res) => {
  try {
    const query = `
      SELECT 
        a.*, 
        (
          SELECT COALESCE(json_agg(s.file_name), '[]')
          FROM screenshots s
          WHERE s.app_id = a.app_id
        ) as screenshots
      FROM apps a
      ORDER BY a.installs DESC
      LIMIT 50
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Trending Games
app.get("/api/games/trending", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM apps WHERE app_type = 'game' ORDER BY ${TRENDING_ORDER} LIMIT 16`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Trending Apps
app.get("/api/apps/trending", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM apps WHERE app_type = 'app' ORDER BY ${TRENDING_ORDER} LIMIT 16`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Editor's Choice Games (high-rated)
app.get("/api/games/editors-choice", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM apps WHERE app_type = 'game' AND rating >= 4.0 ORDER BY rating DESC NULLS LAST LIMIT 16`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Editor's Choice Apps (high-rated)
app.get("/api/apps/editors-choice", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM apps WHERE app_type = 'app' AND rating >= 4.0 ORDER BY rating DESC NULLS LAST LIMIT 16`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Games by specific category
app.get("/api/games/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    
    // In PostgreSQL, LIMIT/OFFSET should be appended properly, but since TRENDING_ORDER 
    // is injected inline, we must be careful.
    const result = await db.query(
      `SELECT * FROM apps WHERE app_type = 'game' AND category = $1 ORDER BY ${TRENDING_ORDER} LIMIT $2 OFFSET $3`,
      [category, limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Homepage data (all sections in one call)
app.get("/api/homepage", async (req, res) => {
  try {
    const [trendingGames, trendingApps, ecGames, ecApps] = await Promise.all([
      db.query(`SELECT * FROM apps WHERE app_type = 'game' ORDER BY ${TRENDING_ORDER} LIMIT 16`),
      db.query(`SELECT * FROM apps WHERE app_type = 'app' ORDER BY ${TRENDING_ORDER} LIMIT 16`),
      db.query(`SELECT * FROM apps WHERE app_type = 'game' AND rating >= 4.0 ORDER BY rating DESC NULLS LAST LIMIT 16`),
      db.query(`SELECT * FROM apps WHERE app_type = 'app' AND rating >= 4.0 ORDER BY rating DESC NULLS LAST LIMIT 16`),
    ]);

    res.json({
      trendingGames: trendingGames.rows,
      trendingApps: trendingApps.rows,
      editorsChoiceGames: ecGames.rows,
      editorsChoiceApps: ecApps.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Single game detail
app.get("/api/game/:appId", async (req, res) => {
  try {
    const appId = req.params.appId;

    // Get the game details
    const gameResult = await db.query(`SELECT * FROM apps WHERE app_id = $1`, [appId]);
    if (gameResult.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    const game = gameResult.rows[0];

    // Get screenshots
    const screenshotResult = await db.query(
      `SELECT file_name FROM screenshots WHERE app_id = $1 ORDER BY file_name`,
      [appId]
    );
    game.screenshots = screenshotResult.rows.map(r => r.file_name);

    // Get related games (same category, excluding current)
    const relatedResult = await db.query(
      `SELECT * FROM apps WHERE category = $1 AND app_id != $2 ORDER BY ${TRENDING_ORDER} LIMIT 12`,
      [game.category, appId]
    );

    res.json({ game, relatedGames: relatedResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search games
app.get("/api/games/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query) {
      return res.json([]);
    }

    const result = await db.query(
      `SELECT * FROM apps 
       WHERE app_type = 'game' 
       AND (name ILIKE $1 OR description ILIKE $1) 
       ORDER BY ${TRENDING_ORDER} 
       LIMIT 50`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// App Store search proxy
app.get("/api/appstore-search", async (req, res) => {
  try {
    const term = req.query.term || "";
    const dev = req.query.dev || "";
    if (!term) return res.json({ url: "https://www.apple.com/app-store/" });
    
    // Use native fetch to hit iTunes API (fetch more to find correct match)
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=software&limit=20`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Clean term for comparison
      const cleanTarget = term.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanDev = dev.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      let bestScore = -1;
      let bestMatch = data.results[0]; // fallback to first
      
      for (const result of data.results) {
        let score = 0;
        const cleanTrackName = result.trackName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanDevName = (result.artistName || "").toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Exact name match gives highest score
        if (cleanTrackName === cleanTarget) score += 100;
        else if (cleanTrackName.startsWith(cleanTarget)) score += 50;
        else if (cleanTarget.startsWith(cleanTrackName)) score += 40;
        else if (cleanTrackName.includes(cleanTarget)) score += 20;
        else if (cleanTarget.includes(cleanTrackName)) score += 10;
        
        // Developer matching boosts score significantly
        if (cleanDev && cleanDevName) {
           if (cleanDev === cleanDevName) score += 50;
           else if (cleanDevName.includes(cleanDev) || cleanDev.includes(cleanDevName)) score += 20;
        }
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = result;
        }
      }
      
      return res.json({ url: bestMatch.trackViewUrl });
    }
    return res.json({ url: `https://www.apple.com/app-store/` });
  } catch (err) {
    console.error("App Store Search Error:", err);
    res.json({ url: `https://www.apple.com/app-store/` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
