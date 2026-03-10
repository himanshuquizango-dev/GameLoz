import gplay from "google-play-scraper";
import slugify from "slugify";
import { db } from "../lib/db.js";

const GAME_CATEGORIES = [
  "GAME",
  "GAME_ACTION",
  "GAME_ADVENTURE",
  "GAME_ARCADE",
  "GAME_BOARD",
  "GAME_CARD",
  "GAME_CASINO",
  "GAME_CASUAL",
  "GAME_EDUCATIONAL",
  "GAME_MUSIC",
  "GAME_PUZZLE",
  "GAME_RACING",
  "GAME_ROLE_PLAYING",
  "GAME_SIMULATION",
  "GAME_SPORTS",
  "GAME_STRATEGY",
  "GAME_TRIVIA",
  "GAME_WORD",
];

export async function ingestApp(appId: string) {
  // 1. Check if already exists
  const exists = await db.query("SELECT 1 FROM apps WHERE app_id = $1", [
    appId,
  ]);
  if (exists.rowCount && exists.rowCount > 0) {
    console.log("Skipping (already exists):", appId);
    return;
  }

  // 2. Fetch Google Play data
  const app = await gplay.app({ appId });

  const slug = slugify(app.title, { lower: true, strict: true });

  // 3. Determine app type
  const appType = GAME_CATEGORIES.includes(app.genreId) ? "game" : "app";

  // 4. Insert app with URLs stored directly in DB (no file downloads needed)
  await db.query(
    `INSERT INTO apps (
      app_id, name, developer, category,
      platforms, price, rating, installs,
      size, updated, description, icon_file, slug,
      content_rating, developer_email, privacy_policy, app_type,
      icon_url, screenshot_urls
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
    [
      appId,
      app.title,
      app.developer,
      app.genre,
      ["Android"],
      app.free ? "Free" : app.priceText,
      app.score,
      app.installs,
      app.size,
      app.updated ? new Date(app.updated) : null,
      app.description,
      "icon.png",
      slug,
      app.contentRating,
      app.developerEmail,
      (app as any).privacyPolicy || null,
      appType,
      app.icon,                          // Store icon URL from Google Play CDN
      JSON.stringify(app.screenshots),   // Store screenshot URLs as JSON array
    ]
  );

  console.log(`Inserted [${appType}]: ${app.title}`);
}
