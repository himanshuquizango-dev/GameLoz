import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faCalendar,
  faLayerGroup,
  faMobile,
  faStar,
  faFloppyDisk
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
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
  icon_url: string;
  content_rating: string;
  developer_email: string;
  privacy_policy: string;
  howtoplay?: string;
  screenshots: string[];
  screenshot_urls: string[];
}

interface RelatedGame {
  app_id: string;
  name: string;
  rating: string;
  icon_file: string;
  icon_url: string;
  category: string;
}

export default function GameDetail() {
  const { appId } = useParams<{ appId: string }>();
  const [game, setGame] = useState<GameData | null>(null);
  const [relatedGames, setRelatedGames] = useState<RelatedGame[]>([]);
  const [appStoreLink, setAppStoreLink] = useState<string>("https://www.apple.com/app-store/");
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showFullHowTo, setShowFullHowTo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      setShowFullDesc(false);
      setShowFullHowTo(false);
      setCurrentSlide(0);
      try {
        const res = await fetch(`/api/game/${appId}`);
        if (res.ok) {
          const data = await res.json();
          setGame(data.game);
          setRelatedGames(data.relatedGames || []);

          // Fetch App Store link
          try {
            const asRes = await fetch(`/api/appstore-search?term=${encodeURIComponent(data.game.name)}&dev=${encodeURIComponent(data.game.developer || "")}`);
            if (asRes.ok) {
              const asData = await asRes.json();
              if (asData.url) setAppStoreLink(asData.url);
            }
          } catch (e) {
            console.error("Failed to fetch app store link", e);
          }
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

  // Truncate how to play
  const howToLines = game.howtoplay || "";
  const shortHowTo = howToLines.length > 600 ? howToLines.slice(0, 600) + "..." : howToLines;

  return (
    <div className="flex-grow bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Game Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-[120px] h-[120px] rounded-3xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src={game.icon_url || `/apps/${game.app_id}/${game.icon_file}`}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
              <div className="flex flex-col items-center">
                <span className="flex items-center  text-gray-900">
                  <span className="text-[#fe9459] mr-1">
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  {game.rating ? parseFloat(String(game.rating)).toFixed(1) : "N/A"}
                </span>
                <span className="text-xs text-gray-400">Ratings</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className=" text-gray-900">{game.size || "--"}</span>
                <span className="text-xs text-gray-400">Size</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className=" text-gray-900">{game.content_rating || "E"}</span>
                <span className="text-xs text-gray-400">Age</span>
              </div>
            </div>
          </div>
        </div>
        {/* Advertisement Placeholder */}
        <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
          <div className="text-[#333] text-[18px] leading-[1.65] space-y-4 lg:pr-4">
            {(showFullDesc ? descLines : shortDesc).split('\n').filter(p => p.trim() !== '').map((para, idx) => (
              <p key={idx}>{para.trim()}</p>
            ))}
          </div>
          {descLines.length > 600 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-[#f27435] font-semibold text-sm mt-5 hover:underline"
            >
              {showFullDesc ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">

        </div>
        {/* Platform Badge */}
        <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 border border-gray-400 text-[#f27435] px-4 py-1.5 rounded-md text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 42 48" id="android">
              <path fill="#f27435" fillRule="evenodd" d="M26.727 9.6c-.792 0-1.432-.623-1.432-1.393s.64-1.392 1.432-1.392c.792 0 1.432.621 1.432 1.392 0 .77-.64 1.394-1.432 1.394zm-11.454 0c-.792 0-1.432-.623-1.432-1.393s.64-1.392 1.432-1.392c.792 0 1.432.621 1.432 1.392 0 .77-.64 1.394-1.432 1.394zm12.3-5.581.534-.785.534-.773L29.83.722a.454.454 0 0 0-.134-.643.478.478 0 0 0-.658.13l-1.815 2.644-.545.796A16.069 16.069 0 0 0 21 2.633a16.08 16.08 0 0 0-5.678 1.016l-.542-.796-.536-.782L12.968.209a.489.489 0 0 0-.664-.13.459.459 0 0 0-.134.643l1.19 1.739.533.773.536.785c-4.05 1.837-6.791 5.317-6.791 9.299h26.724c0-3.982-2.74-7.462-6.788-9.3zM7.843 15.175h-.205v20.438c0 1.623 1.354 2.944 3.024 2.944h2.181a2.616 2.616 0 0 0-.116.773v5.884c0 1.539 1.285 2.786 2.865 2.786 1.58 0 2.865-1.247 2.865-2.786V39.33c0-.27-.044-.528-.116-.773h5.318a2.713 2.713 0 0 0-.113.773v5.884c0 1.539 1.282 2.786 2.862 2.786 1.583 0 2.868-1.247 2.868-2.786V39.33c0-.27-.044-.528-.119-.773h2.184c1.67 0 3.021-1.32 3.021-2.944V15.175H7.844zm-4.978 0C1.282 15.175 0 16.422 0 17.96v11.924c0 1.538 1.282 2.786 2.865 2.786 1.58 0 2.862-1.248 2.862-2.786V17.96c0-1.538-1.282-2.785-2.862-2.785zm36.273 0c-1.583 0-2.865 1.247-2.865 2.785v11.924c0 1.538 1.282 2.786 2.865 2.786 1.58 0 2.862-1.248 2.862-2.786V17.96c0-1.538-1.282-2.785-2.862-2.785z"></path>
            </svg> Android
          </span>
        </div>

        {/* Info Table */}
        <div className="bg-[#f5f5f5] rounded-lg p-5 mb-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#f27435] text-[20px]"><FontAwesomeIcon icon={faMobile} /></span>
            <div><p className="font-semibold text-gray-900">OS:</p><p className="text-gray-400 text-[13px]">Android</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f27435] text-[20px]"><FontAwesomeIcon icon={faLayerGroup} /></span>
            <div><p className="font-semibold text-gray-900">Version:</p><p className="text-gray-500">{game.size || "Varies"}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f27435] text-[20px]"><FontAwesomeIcon icon={faCalendar} /> </span>
            <div><p className="font-semibold text-gray-900">Updated:</p><p className="text-gray-500">{formatDate(game.updated)}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f27435] text-[20px]"><FontAwesomeIcon icon={faFloppyDisk} /></span>
            <div><p className="font-semibold text-gray-900">File Size:</p><p className="text-gray-500">{game.size || "Varies"}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f27435] text-[20px]"><FontAwesomeIcon icon={faUserGear} /></span>
            <div><p className="font-semibold text-gray-900">Developer:</p><p className="text-gray-500">{game.developer}</p></div>
          </div>
        </div>

        {/* Get The Games */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Get The Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1d1d1f] text-white py-3.5 rounded-lg font-medium hover:bg-black transition text-md"
            >
              <FontAwesomeIcon icon={faApple} /> Get it from App Store
            </a>
            {(() => {
              const regionalAppIdMap: Record<string, string> = {
                "com.tencent.ig": "com.pubg.imobile", // PUBG -> BGMI
              };
              const playStoreId = regionalAppIdMap[game.app_id] || game.app_id;

              return (
                <a
                  href={`https://play.google.com/store/apps/details?id=${playStoreId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#00875f] text-white py-3.5 rounded-lg font-medium hover:bg-[#00a171] transition text-md"
                >
                  <FontAwesomeIcon icon={faGooglePlay} />
                  Get it from Google Play
                </a>
              );
            })()}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span className="text-green-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22C16.59 21.05 20 16.19 20 11V5L12 2Z" fill="#4DB6AC" />
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg></span>
            <span><b>Verified antivirus</b></span>
          </div>
          <p className="text-[12px] text-gray-400 mt-1">All link sources on this site are jumped to App Store, Google Play and other official platforms. No virus, no malware.</p>
        </div>
        <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">

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
                    className="flex-shrink-0 h-[240px] sm:h-[320px] rounded-xl overflow-hidden snap-start shadow-md bg-gray-100"
                  >
                    <img
                      src={ss.startsWith('http') ? ss : `/apps/${game.app_id}/${ss}`}
                      alt={`${game.name} screenshot ${idx + 1}`}
                      className="h-full w-auto object-cover block"
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Arrows */}
              {game.screenshots.length > 3 && (
                <>
                  <button
                    onClick={() => scrollCarousel(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => scrollCarousel(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* How to Play */}
        {game.howtoplay && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to play</h2>
            <div className="text-[#333] text-[18px] leading-[1.65] space-y-4 lg:pr-4">
              {(showFullHowTo ? howToLines : shortHowTo).split('\n').filter(p => p.trim() !== '').map((para, idx) => (
                <p key={idx}>{para.trim()}</p>
              ))}
            </div>
            {howToLines.length > 600 && (
              <button
                onClick={() => setShowFullHowTo(!showFullHowTo)}
                className="text-[#f27435] font-semibold text-sm mt-5 hover:underline"
              >
                {showFullHowTo ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        )}
        <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">

        </div>
        {/* You May Also Like */}
        {relatedGames.length > 0 && (
          <div className="mb-8">
            <p className="text-[#a3a3a3] text-xs mb-2">Advertisement</p>
            <div className="border-b-[2px] border-black pb-2 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">You may also like</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {relatedGames.map((rg, idx) => (
                <Link to={`/app/${rg.app_id}`} key={idx} className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 mb-2">
                    <img
                      src={rg.icon_url || `/apps/${rg.app_id}/${rg.icon_file}`}
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
