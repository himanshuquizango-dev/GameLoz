import express from "express";
import cors from "cors";
import { db } from "./src/lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all games
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
