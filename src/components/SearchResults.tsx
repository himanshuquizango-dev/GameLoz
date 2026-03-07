import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

interface Game {
  app_id: string;
  name: string;
  rating: string;
  category: string;
  icon_file: string;
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setGames([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        }
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex-grow bg-white w-full flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-black">
          {query ? `Search results for "${query}"` : "Search Results"}
        </h1>

        {games.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 mb-12">
            {games.map((game, idx) => (
              <Link to={`/app/${game.app_id}`} key={idx} className="flex flex-col cursor-pointer group">
                <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                  <img 
                    src={`/apps/${game.app_id}/${game.icon_file}`} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-5xl">🎮</div>`;
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase">{game.name.substring(0, 15)}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="text-yellow-400 mr-1">⭐</span> {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
                  <span className="mx-1">•</span> {game.category}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No games found for "{query}".</p>
            <p className="text-gray-400 text-sm mt-2">Try searching for something else, like "Action" or "Puzzle".</p>
          </div>
        )}
      </div>
    </div>
  );
}
