import React, { useState } from "react";

export default function OnlineGames() {
  const filters = [
    "All", "Kids", "Girl", "Puzzle", "Casual", "Arcade", "Hot", "Premium", "Action", "Adventure", "Featured", "Sports", "Racing"
  ];
  const [activeFilter, setActiveFilter] = useState("All");

  const games = [
    { title: "Kitty Jewel Quest", rating: "4.2", large: true, icon: "🐱", color: "bg-teal-600" },
    { title: "Dog Bee", icon: "🐶", color: "bg-blue-400" },
    { title: "Candy Land", icon: "🍬", color: "bg-yellow-600" },
    { title: "Jelly Pop", icon: "🟢", color: "bg-green-400" },
    { title: "Bubble Gum", icon: "🔮", color: "bg-pink-300" },
    { title: "Space Shooter", icon: "🚀", color: "bg-blue-800" },
    { title: "Car Eats Car 2", icon: "🚙", color: "bg-green-800" },
    { title: "Car Out", icon: "🚗", color: "bg-gray-400" },
    { title: "2048 Cards", icon: "🃏", color: "bg-blue-900" },
    { title: "Christmas Sweeper", rating: "4.1", large: true, icon: "🎅", color: "bg-blue-700" },
    { title: "Chroma Challenge", icon: "🎨", color: "bg-gray-800" },
    { title: "King Clash", icon: "👑", color: "bg-blue-500" },
    { title: "Fit Cats", icon: "🐈", color: "bg-pink-400" },
    { title: "Block Puzzle", icon: "🧩", color: "bg-purple-600" },
    { title: "Flames Fortune", icon: "🔥", color: "bg-orange-800" },
    { title: "Zombie Flight", icon: "🧟", color: "bg-green-700" },
    { title: "Football Kickoff", icon: "🏈", color: "bg-blue-400" },
    { title: "Frog Jump", icon: "🐸", color: "bg-green-400" },
    { title: "Lipstick Maker", icon: "💄", color: "bg-pink-500" },
    { title: "Pipe Connect", icon: "🔧", color: "bg-blue-800" },
    { title: "Monkey Quest", icon: "🐒", color: "bg-yellow-700" },
    { title: "Sushi Roll", icon: "🍣", color: "bg-red-200" },
    { title: "Mini Golf", icon: "⛳", color: "bg-green-600" },
    { title: "Happy Dog", icon: "🐕", color: "bg-yellow-300" },
    { title: "Snake", icon: "🐍", color: "bg-yellow-800" },
  ];

  return (
    <div className="flex-grow bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Ad Placeholder */}
        <div className="bg-[#f5ecdd] border border-gray-100 rounded mb-2 flex flex-col items-center justify-center text-center relative h-[250px]">
        </div>
        <p className="text-[#a3a3a3] text-xs mb-8">Advertisement</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? "bg-[#f27435] text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {games.map((game, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                game.large ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <div className={`${game.color} w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <span className={`${game.large ? 'text-7xl' : 'text-5xl'} pb-4`}>{game.icon}</span>
              </div>
              
              {/* Optional overlay for small cards on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                 {!game.large && <h3 className="text-white text-xs sm:text-sm font-semibold truncate">{game.title}</h3>}
              </div>

              {/* Always show title for large cards as per screenshot */}
              {game.large && (
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                  <h3 className="text-white text-sm sm:text-base font-semibold truncate">{game.title}</h3>
                  <div className="flex items-center text-xs text-yellow-500 mt-1">
                    <span className="mr-1">⭐</span> {game.rating}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
