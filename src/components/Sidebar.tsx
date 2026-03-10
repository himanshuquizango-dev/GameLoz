import React, { useState } from "react";
import { Link } from "react-router-dom";
import games from "../../assets/games.png";


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isGamesOpen, setIsGamesOpen] = useState(true);

  const categories = [
    { name: "Action", route: "/gameCategory/Action" },
    { name: "Adventure", route: "/gameCategory/Adventure" },
    { name: "Arcade", route: "/gameCategory/Arcade" },
    { name: "Board", route: "/gameCategory/Board" },
    { name: "Card", route: "/gameCategory/Card" },
    { name: "Casino", route: "/gameCategory/Casino" },
    { name: "Casual", route: "/gameCategory/Casual" },
    { name: "Educational", route: "/gameCategory/Educational" },
    { name: "Music", route: "/gameCategory/Music" },
    { name: "Puzzle", route: "/gameCategory/Puzzle" },
    { name: "Racing", route: "/gameCategory/Racing" },
    { name: "Role Playing", route: "/gameCategory/Role Playing" },
    { name: "Simulation", route: "/gameCategory/Simulation" },
    { name: "Sports", route: "/gameCategory/Sports" },
    { name: "Strategy", route: "/gameCategory/Strategy" },
    { name: "Trivia", route: "/gameCategory/Trivia" },
    { name: "Word", route: "/gameCategory/Word" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-96 bg-[#1b1b1b] text-white z-40
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="text-end p-4">
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
        
        {/* Games Accordion Group */}
        <div className="border-b border-gray-700 flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pt-0 p-4">
            <h2 className="text-lg font-bold">Games</h2>
            <button
              onClick={() => setIsGamesOpen(!isGamesOpen)}
              className="text-xl font-medium w-6 h-6 flex items-center justify-center -mr-1"
            >
              {isGamesOpen ? "−" : "+"}
            </button>
          </div>

          {/* Categories */}
          <nav
            className={`overflow-y-auto px-4 pb-4 space-y-2 flex-1 transition-all duration-300 ${isGamesOpen ? 'block' : 'hidden'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, idx) => (
              <Link
                key={idx}
                to={category.route}
                onClick={toggleSidebar}
                className="block px-3 py-2 rounded text-[#9ca3af] hover:bg-gray-700 hover:text-white transition"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Button */}
        {/* <div className="p-4 border-t border-gray-700">
          <Link
            to="/h5online"
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-3 rounded-full hover:bg-yellow-500 transition"
          >
                        <img
              src={games}
              alt="Online Games"
              className="h-5"
            />
             Online Games
          </Link>
        </div> */}
      </aside>
    </>
  );
}