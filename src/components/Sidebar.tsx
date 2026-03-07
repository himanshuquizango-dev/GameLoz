import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const categories = [
    { name: "Action", route: "/gameCategory/1071" },
    { name: "Racing", route: "/gameCategory/1072" },
    { name: "Adventure", route: "/gameCategory/1073" },
    { name: "Strategy", route: "/gameCategory/1074" },
    { name: "Puzzle", route: "/gameCategory/1075" },
    { name: "Casual", route: "/gameCategory/1076" },
    { name: "Rpg", route: "/gameCategory/1077" },
    { name: "Simulation", route: "/gameCategory/1078" },
    { name: "Role Playing", route: "/gameCategory/1079" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-[#1b1b1b] text-white z-40
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Games</h2>

          <button onClick={toggleSidebar}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to={category.route}
              onClick={toggleSidebar}
              className="block px-3 py-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Button */}
        <div className="p-4 border-t border-gray-700">
          <Link 
            to="/h5online"
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-3 rounded-full hover:bg-yellow-500 transition"
          >
            🎮 Online Games
          </Link>
        </div>
      </aside>
    </>
  );
}