# GameLoz - Gaming Platform Clone

A modern, responsive gaming platform built with React and Tailwind CSS. This is a beautiful clone of a gaming community website featuring game discovery, leaderboards, tournaments, and community features.

## Features

- **Responsive Design**: Mobile-first approach with full responsive support
- **Modern UI**: Built with Tailwind CSS with smooth animations and transitions
- **Game Discovery**: Featured games and top games leaderboards
- **Community Features**: Clans, tournaments, and leaderboards
- **Newsletter Signup**: Email subscription form
- **Navigation**: Sticky navbar with mobile menu support

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd GameLoz
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Featured.jsx
│   ├── TopGames.jsx
│   ├── Community.jsx
│   ├── Newsletter.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
{
  primary: "#1a1a2e",
  secondary: "#16213e",
  accent: "#0f3460",
  gold: "#e94560",
}
```

### Content

Edit individual components in `src/components/` to customize:

- Game lists
- Community features
- Navbar links
- Footer information

## Deployment

To build for production:

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready to deploy to any static hosting service.

## License

This project is open source and available for personal and commercial use.



***********************************************************************************************************************

-- Run this in PostgreSQL to set up the database
-- CREATE DATABASE pocketapk;
-- \c pocketapk

CREATE TABLE IF NOT EXISTS apps (
  id SERIAL PRIMARY KEY,
  app_id TEXT UNIQUE NOT NULL,
  name TEXT,
  developer TEXT,
  category TEXT,
  platforms TEXT[],
  price TEXT,
  rating NUMERIC,
  installs TEXT,
  size TEXT,
  updated DATE,
  description TEXT,
  icon_file TEXT,
  slug TEXT UNIQUE,
  content_rating TEXT,
  developer_email TEXT,
  privacy_policy TEXT,
  app_type TEXT DEFAULT 'app',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS screenshots (
  id SERIAL PRIMARY KEY,
  app_id TEXT REFERENCES apps(app_id) ON DELETE CASCADE,
  file_name TEXT,
  UNIQUE (app_id, file_name)
);

