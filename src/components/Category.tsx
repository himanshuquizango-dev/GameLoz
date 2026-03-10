import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Game {
  app_id: string;
  name: string;
  rating: string;
  category: string;
  icon_file: string;
}

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const categoryName = id || "";

  const [games, setGames] = useState<Game[]>([]);
  const [hotGames, setHotGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 12;

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      setOffset(0);
      setHasMore(true);
      try {
        const res = await fetch(`/api/games/category/${encodeURIComponent(categoryName)}?limit=${limit}&offset=0`);
        if (res.ok) {
          const data = await res.json();
          setGames(data);
          if (data.length < limit) setHasMore(false);
        }

        // Fetch hot games (top-rated from any category) for the sidebar
        const hotRes = await fetch(`/api/games/editors-choice`);
        if (hotRes.ok) {
          const hotData = await hotRes.json();
          setHotGames(hotData.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch initial category games:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [categoryName]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const newOffset = offset + limit;
    try {
      const res = await fetch(`/api/games/category/${encodeURIComponent(categoryName)}?limit=${limit}&offset=${newOffset}`);
      if (res.ok) {
        const data = await res.json();
        setGames((prev) => [...prev, ...data]);
        setOffset(newOffset);
        if (data.length < limit) setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more games:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow bg-white w-full flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Ad Placeholder */}
          <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">

          </div>
          <p className="text-[#a3a3a3] text-xs mb-8">Advertisement</p>

          {/* Category Title */}
          <h1 className="text-[22px] font-bold mb-6 text-black">{categoryName} Games</h1>

          {/* Games Grid */}
          {games.length > 0 ? (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 mb-8">
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
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{game.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="text-yellow-400 mr-1">⭐</span> {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mb-12">
                  <button 
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="bg-[#f27435] text-white px-12 py-3 rounded-full font-bold shadow-md hover:bg-[#d9662e] transition disabled:opacity-50 min-w-[200px]"
                  >
                    {loadingMore ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </div>
                    ) : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-12">No games found in this category.</p>
          )}
        </div>

        {/* Right Sidebar - Hot Games */}
        <div className="w-full lg:w-72 flex-shrink-0 mt-10 lg:mt-0">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-lg font-bold text-black">Hot</h2>
            <span className="text-blue-600 text-lg">◎</span> 
            <h2 className="text-lg font-bold text-blue-600">Games</h2>
          </div>

          <div className="space-y-5">
            {hotGames.map((game, idx) => (
              <Link to={`/app/${game.app_id}`} key={idx} className="flex items-center gap-4 cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-[18px] bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                  <img 
                    src={`/apps/${game.app_id}/${game.icon_file}`} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-3xl">🎮</div>`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{game.name}</h3>
                  <p className="text-[13px] text-gray-400 mt-0.5">{game.category}</p>
                  <div className="flex items-center text-[13px] text-gray-400 mt-0.5">
                    <span className="text-yellow-400 mr-1 text-[10px]">⭐</span> {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="flex items-center justify-center gap-2 border border-gray-200 text-blue-500 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition w-full">
              <span className="text-xl">+</span> Games
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
