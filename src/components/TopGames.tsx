import React from "react";

export default function TopGames() {
  const games = [
    {
      rank: 1,
      name: "Legends of War",
      genre: "MOBA",
      players: "5.2M",
      trend: "↑",
    },
    {
      rank: 2,
      name: "Battle Royale Elite",
      genre: "Shooter",
      players: "4.8M",
      trend: "↑",
    },
    {
      rank: 3,
      name: "Quest Online",
      genre: "MMO RPG",
      players: "4.1M",
      trend: "↓",
    },
    {
      rank: 4,
      name: "Racing Thunder",
      genre: "Racing",
      players: "3.9M",
      trend: "↑",
    },
    {
      rank: 5,
      name: "Pixel Adventure",
      genre: "Platformer",
      players: "3.5M",
      trend: "↑",
    },
    {
      rank: 6,
      name: "Card Masters",
      genre: "Card Game",
      players: "3.2M",
      trend: "→",
    },
  ];

  return (
    <section id="top-games" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top Games This Week
          </h2>
          <p className="text-xl text-gray-400">
            Most played games across the platform
          </p>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <div
              key={game.rank}
              className="flex items-center justify-between p-6 bg-primary rounded-lg hover:bg-accent transition group cursor-pointer border border-gray-800 hover:border-gold"
            >
              <div className="flex items-center space-x-6 flex-1">
                <div className="text-4xl font-bold text-gold w-12 text-center">
                  {game.rank}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-gold transition">
                    {game.name}
                  </h3>
                  <p className="text-gray-400">{game.genre}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-lg font-semibold text-gold">
                    {game.players}
                  </p>
                  <p className="text-sm text-gray-400">Playing Now</p>
                </div>
                <div
                  className={`text-2xl font-bold ${game.trend === "↑" ? "text-green-500" : game.trend === "↓" ? "text-red-500" : "text-gray-400"}`}
                >
                  {game.trend}
                </div>
              </div>

              <button className="ml-4 px-6 py-2 bg-gold text-primary font-bold rounded hover:bg-red-500 transition">
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
