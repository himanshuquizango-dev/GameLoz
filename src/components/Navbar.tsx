import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import branch from "../../assets/branch.png";
import games from "../../assets/games.png";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-header w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 gap-3">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            className="text-white p-2"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/">
            <img
              src={branch}
              alt="GameLoz Logo"
              className="h-7 sm:h-8"
            />
          </Link>
        </div>

        {/* Center Section */}
        <div className="flex items-center flex-1 max-w-xl">

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm sm:text-base rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                🔍
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex ">
          <Link to="/h5online" className="flex items-center gap-2 px-5 py-2 bg-accent text-black font-bold rounded-full hover:bg-yellow-500 transition">
            <img
              src={games}
              alt="Online Games"
              className="h-5"
            />
            <span>Online Games</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}