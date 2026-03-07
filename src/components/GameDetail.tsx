import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

interface GameData {
  app_id: string;
  name: string;
  developer: string;
  category: string;
  rating: string;
  installs: string;
  size: string;
  updated: string;
  description: string;
  icon_file: string;
  content_rating: string;
  developer_email: string;
  privacy_policy: string;
  screenshots: string[];
}

interface RelatedGame {
  app_id: string;
  name: string;
  rating: string;
  icon_file: string;
  category: string;
}

export default function GameDetail() {
  const { appId } = useParams<{ appId: string }>();
  const [game, setGame] = useState<GameData | null>(null);
  const [relatedGames, setRelatedGames] = useState<RelatedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      setShowFullDesc(false);
      setCurrentSlide(0);
      try {
        const res = await fetch(`/api/game/${appId}`);
        if (res.ok) {
          const data = await res.json();
          setGame(data.game);
          setRelatedGames(data.relatedGames || []);
        }
      } catch (err) {
        console.error("Failed to fetch game:", err);
      } finally {
        setLoading(false);
      }
    }

    if (appId) fetchGame();
    window.scrollTo(0, 0);
  }, [appId]);

  if (loading) {
    return (
      <div className="flex-grow bg-white flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex-grow bg-white flex justify-center items-center min-h-[500px]">
        <p className="text-gray-500 text-lg">Game not found.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch { return "N/A"; }
  };

  const scrollCarousel = (dir: number) => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    setCurrentSlide(prev => Math.max(0, prev + dir));
  };

  // Truncate description
  const descLines = game.description || "";
  const shortDesc = descLines.length > 600 ? descLines.slice(0, 600) + "..." : descLines;

  return (
    <div className="flex-grow bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Game Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-[120px] h-[120px] rounded-3xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src={`/apps/${game.app_id}/${game.icon_file}`}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
              <div className="flex flex-col items-center">
                <span className="flex items-center font-bold text-gray-900">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
                </span>
                <span className="text-xs text-gray-400">Ratings</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900">{game.size || "--"}</span>
                <span className="text-xs text-gray-400">Size</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900">{game.content_rating || "E"}</span>
                <span className="text-xs text-gray-400">Age</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advertisement Placeholder */}
        <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {showFullDesc ? descLines : shortDesc}
          </div>
          {descLines.length > 600 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-[#f27435] font-medium text-sm mt-2 hover:underline"
            >
              {showFullDesc ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Platform Badge */}
        <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 border border-[#f27435] text-[#f27435] px-4 py-1.5 rounded-full text-sm font-medium">
            🤖 Android
          </span>
        </div>

        {/* Info Table */}
        <div className="border border-gray-200 rounded-lg p-5 mb-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-gray-400">📱</span>
            <div><p className="font-semibold text-gray-900">OS:</p><p className="text-gray-500">Android</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">📦</span>
            <div><p className="font-semibold text-gray-900">Version:</p><p className="text-gray-500">{game.size || "Varies"}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">📅</span>
            <div><p className="font-semibold text-gray-900">Updated:</p><p className="text-gray-500">{formatDate(game.updated)}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">📁</span>
            <div><p className="font-semibold text-gray-900">File Size:</p><p className="text-gray-500">{game.size || "Varies"}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">👤</span>
            <div><p className="font-semibold text-gray-900">Developer:</p><p className="text-gray-500">{game.developer}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">📊</span>
            <div><p className="font-semibold text-gray-900">Installs:</p><p className="text-gray-500">{game.installs || "N/A"}</p></div>
          </div>
        </div>

        {/* Get The Games */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Get The Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3.5 rounded-lg font-medium hover:bg-gray-900 transition text-sm">
              🍎 Get it from App Store
            </a>
            <a
              href={`https://play.google.com/store/apps/details?id=${game.app_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#f27435] text-white py-3.5 rounded-lg font-medium hover:bg-[#e06025] transition text-sm"
            >
              ▶ Get it from Google Play
            </a>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span className="text-green-500">✅</span>
            <span><b>Verified antivirus</b></span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">All the sources on this site are jumped to App Store, Google Play and other official platforms. No virus, no malware.</p>
        </div>

        {/* Screenshots Carousel */}
        {game.screenshots && game.screenshots.length > 0 && (
          <div className="mb-8">
            <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {game.screenshots.map((ss, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[300px] h-[180px] rounded-xl overflow-hidden snap-start shadow-md"
                  >
                    <img
                      src={`/apps/${game.app_id}/${ss}`}
                      alt={`${game.name} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Arrows */}
              {game.screenshots.length > 3 && (
                <>
                  <button
                    onClick={() => scrollCarousel(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => scrollCarousel(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* Grid toggle icons */}
            <div className="flex items-center justify-center gap-4 mt-4 text-gray-400">
              <button className="text-lg hover:text-gray-700">☰</button>
              <button className="text-lg hover:text-gray-700">⊞</button>
              <button className="text-lg hover:text-gray-700">⊡</button>
            </div>
          </div>
        )}

        {/* How to Play */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to play</h2>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {game.description?.slice(0, 400) || "Enjoy this exciting game on your Android device!"}
          </div>
        </div>

        {/* You May Also Like */}
        {relatedGames.length > 0 && (
          <div className="mb-8">
            <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>
            <h2 className="text-lg font-bold text-gray-900 mb-4">You May Also Like</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {relatedGames.map((rg, idx) => (
                <Link to={`/app/${rg.app_id}`} key={idx} className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 mb-2">
                    <img
                      src={`/apps/${rg.app_id}/${rg.icon_file}`}
                      alt={rg.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-3xl flex items-center justify-center h-full">🎮</div>`;
                      }}
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{rg.name}</h3>
                  <div className="flex items-center text-[11px] text-gray-400 mt-0.5">
                    <span className="text-yellow-400 mr-1">⭐</span> {rg.rating ? parseFloat(String(rg.rating)).toFixed(1) : "N/A"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
