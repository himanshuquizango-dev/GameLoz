import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Game {
  app_id: string;
  name: string;
  rating: number;
  category: string;
  icon_file: string;
  icon_url: string;
  app_type: string;
}

interface HomepageData {
  trendingGames: Game[];
  trendingApps: Game[];
  editorsChoiceGames: Game[];
  editorsChoiceApps: Game[];
}

export default function Featured() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomepage() {
      try {
        const response = await fetch("/api/homepage");
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomepage();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12 flex justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-white py-12 text-center text-gray-500">
        <p>Failed to load games. Please try again.</p>
      </section>
    );
  }

  const renderGameCard = (game: Game, idx: number) => (
    <Link to={`/app/${game.app_id}`} key={`${game.app_id}-${idx}`} className="flex flex-col cursor-pointer group">
      <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center mb-2 shadow hover:shadow-md group-hover:scale-105 transition-all duration-200 overflow-hidden">
        <img
          src={game.icon_url || `/apps/${game.app_id}/${game.icon_file}`}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-4xl">🎮</div>`;
          }}
        />
      </div>
      <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{game.name}</h3>
      <div className="flex items-center text-[11px] text-gray-500 mt-0.5">
        <span className="text-yellow-400 mr-1 text-[10px]">⭐</span> {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
      </div>
    </Link>
  );

  const renderSection = (title: string, games: Game[]) => {
    if (!games || games.length === 0) return null;
    return (
      <div className="mb-10">
        <p className="text-[#a3a3a3] text-[11px] mb-2 uppercase tracking-wide">Advertisement</p>
        <div className="border-b-[2px] border-black pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-8">
          {games.map(renderGameCard)}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white py-12">

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full flex-grow">
        <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[350px]">

        </div>
        {renderSection("Featued Games", data.trendingGames)}
        {renderSection("Latest Games", data.trendingApps)}
        <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[350px]">

        </div>
        {renderSection("Latest Games", data.editorsChoiceGames)}
        {renderSection("Hot Games", data.editorsChoiceApps)}
      </div>
    </section>
  );
}