import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-accent to-primary py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-10 w-72 h-72 bg-gold opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Level Up Your Gaming
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the latest games, connect with millions of players
              worldwide, and join the ultimate gaming community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gold text-primary font-bold rounded-lg hover:bg-red-500 transition transform hover:scale-105">
                Explore Games
              </button>
              <button className="px-8 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-primary transition">
                Watch Trailer
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-gold via-red-500 to-accent rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-6xl">🎮</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-700">
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">10M+</div>
            <p className="text-gray-400">Active Players</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">500+</div>
            <p className="text-gray-400">Games</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">24/7</div>
            <p className="text-gray-400">Support</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">100+</div>
            <p className="text-gray-400">Tournaments</p>
          </div>
        </div>
      </div>
    </section>
  );
}
