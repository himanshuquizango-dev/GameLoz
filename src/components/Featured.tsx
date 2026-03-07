import React from "react";

export default function Featured() {
  const latestGames = [
    { title: "Minecraft", rating: "4.5", icon: "🟩", color: "bg-green-400" },
    { title: "Roblox", rating: "4.5", icon: "🟥", color: "bg-blue-600" },
    { title: "Clash Royale", rating: "4.3", icon: "👑", color: "bg-blue-400" },
    { title: "Last War:Survival...", rating: "4.6", icon: "⚔️", color: "bg-blue-200" },
    { title: "Among Us", rating: "3.9", icon: "🚀", color: "bg-red-500" },
    { title: "Poppy Playtime...", rating: "4.5", icon: "👹", color: "bg-blue-600" },
    { title: "Geometry Dash", rating: "4.5", icon: "🔺", color: "bg-yellow-400" },
    { title: "Bloons TD 6", rating: "4.5", icon: "🎈", color: "bg-green-500" },
    { title: "Bloons TD 6...", rating: "4.7", icon: "🐒", color: "bg-green-600" },
    { title: "Coin Master", rating: "4.7", icon: "🐷", color: "bg-yellow-300" },
    { title: "Township", rating: "4.8", icon: "🚜", color: "bg-green-400" },
    { title: "Block Blast!", rating: "4.9", icon: "🧱", color: "bg-blue-500" },
    { title: "Whiteout Survival", rating: "4.4", icon: "❄️", color: "bg-blue-900" },
    { title: "Pokémon GO", rating: "3.9", icon: "🔴", color: "bg-red-500" },
    { title: "Snake.io - Fun...", rating: "4.3", icon: "🐍", color: "bg-orange-400" },
    { title: "Grand Theft Aut...", rating: "4.5", icon: "🚗", color: "bg-purple-800" },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full flex-grow">
        
        {/* Latest Games Section */}
        <div className="mb-10">
          <p className="text-[#a3a3a3] text-[11px] mb-2 uppercase tracking-wide">Advertisement</p>
          <div className="border-b-[2px] border-black pb-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Games</h2>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-8">
            {latestGames.map((game, idx) => (
              <div key={idx} className="flex flex-col cursor-pointer group">
                <div className={`aspect-square rounded-2xl ${game.color} flex items-center justify-center text-4xl mb-2 shadow hover:shadow-md group-hover:scale-105 transition-all duration-200`}>
                  {game.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{game.title}</h3>
                <div className="flex items-center text-[11px] text-gray-500 mt-0.5">
                  <span className="text-yellow-400 mr-1 text-[10px]">⭐</span> {game.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Games Section */}
        <div>
          <p className="text-[#a3a3a3] text-[11px] mb-2 uppercase tracking-wide">Advertisement</p>
          <div className="border-b-[2px] border-black pb-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hot Games</h2>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-8">
            {latestGames.map((game, idx) => (
              <div key={idx} className="flex flex-col cursor-pointer group">
                <div className={`aspect-square rounded-2xl ${game.color} flex items-center justify-center text-4xl mb-2 shadow hover:shadow-md group-hover:scale-105 transition-all duration-200`}>
                  {game.icon}
                </div>
                <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{game.title}</h3>
                <div className="flex items-center text-[11px] text-gray-500 mt-0.5">
                  <span className="text-yellow-400 mr-1 text-[10px]">⭐</span> {game.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}