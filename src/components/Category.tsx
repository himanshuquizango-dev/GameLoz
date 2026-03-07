import React from "react";

export default function Category() {
  const actionGames = [
    { title: "Among Us", rating: "3.9", imgColor: "bg-red-500", icon: "🚀" },
    { title: "Snake.io - Fun...", rating: "4.3", imgColor: "bg-yellow-400", icon: "🐍" },
    { title: "Sniper 3D: Gun...", rating: "4.6", imgColor: "bg-gray-400", icon: "🎯" },
    { title: "Free Fire", rating: "4.2", imgColor: "bg-blue-600", icon: "🔥" },
    { title: "Clash of Slimes:...", rating: "4.4", imgColor: "bg-blue-300", icon: "💧" },
    { title: "Blood Strike - F...", rating: "4.3", imgColor: "bg-red-800", icon: "🩸" },
    { title: "Bloody Bastards", rating: "4.6", imgColor: "bg-orange-800", icon: "⚔️" },
    { title: "Food Run - Cro...", rating: "4.6", imgColor: "bg-orange-400", icon: "🍔" },
    { title: "Free Fire MAX", rating: "4.4", imgColor: "bg-indigo-600", icon: "💥" },
    { title: "Frontline Heroes...", rating: "4.4", imgColor: "bg-green-600", icon: "🪖" },
    { title: "GTA: San Andre...", rating: "3.7", imgColor: "bg-gray-800", icon: "🚗" },
    { title: "Helix Jump", rating: "3.9", imgColor: "bg-teal-400", icon: "🌀" },
  ];

  const hotGames = [
    { title: "Clash Royale", category: "Puzzle", rating: "4.3", icon: "👑", color: "bg-blue-500" },
    { title: "Dice Dreams™️", category: "Casual", rating: "4.7", icon: "🎲", color: "bg-yellow-500" },
    { title: "Fluff Crusade", category: "Casual", rating: "4.5", icon: "⚔️", color: "bg-gray-500" },
    { title: "Rise of Kingdoms: Lost Crusade", category: "Strategy", rating: "4.5", icon: "🏛️", color: "bg-yellow-700" },
    { title: "Hollywood Story: Fashion Star", category: "Simulation", rating: "4.6", icon: "👗", color: "bg-pink-400" },
    { title: "Suika Game", category: "Casual", rating: "4.5", icon: "🍉", color: "bg-green-500" },
  ];

  return (
    <div className="flex-grow bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Ad Placeholder */}
          <div className="border border-gray-200 rounded p-6 mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">
            <span className="absolute top-2 right-2 text-xs text-blue-400">ⓘ</span>
            <p className="text-gray-500 text-sm mb-3">Government of India</p>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight text-gray-800">
              <span className="bg-blue-100/50 px-2 rounded">PMJAY Scheme</span> <span className="text-gray-500 font-normal">NHA Is Leading the<br/>Implementation for Ayushman Bharat<br/>Digital Mission</span>
            </h2>
            <button className="bg-black text-white px-8 py-3 rounded-full mt-2 flex items-center gap-2 hover:bg-gray-800 transition">
              Open <span className="text-xl">→</span>
            </button>
          </div>
          <p className="text-[#a3a3a3] text-xs mb-8">Advertisement</p>

          {/* Category Title */}
          <h1 className="text-[22px] font-bold mb-6 text-black">Action Games</h1>

          {/* Games Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 mb-12">
            {actionGames.map((game, idx) => (
              <div key={idx} className="flex flex-col cursor-pointer group">
                <div className={`aspect-square rounded-2xl ${game.imgColor} flex items-center justify-center text-5xl mb-3 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                  {game.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{game.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="text-yellow-400 mr-1">⭐</span> {game.rating}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-4">
            <button className="bg-[#f27435] hover:bg-[#e66324] text-white px-24 py-3 rounded-full font-medium transition-colors shadow-sm text-lg">
              Load More
            </button>
          </div>
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
              <div key={idx} className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-[70px] h-[70px] rounded-[18px] ${game.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                  {game.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{game.title}</h3>
                  <p className="text-[13px] text-gray-400 mt-0.5">{game.category}</p>
                  <div className="flex items-center text-[13px] text-gray-400 mt-0.5">
                    <span className="text-yellow-400 mr-1 text-[10px]">⭐</span> {game.rating}
                  </div>
                </div>
              </div>
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
