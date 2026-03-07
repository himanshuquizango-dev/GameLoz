import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full text-gray-400 font-sans mt-auto">
      <div className="bg-black py-12 px-6 lg:px-24">
        <div className="mx-auto" style={{ maxWidth: '1400px' }}>
          <h2 className="text-white text-xl md:text-2xl font-bold mb-4">About Us</h2>
          <p className="text-sm md:text-base leading-relaxed text-[#a3a3a3]">
            Explore Endless Fun at Gameloz.com! Whether you love action-packed shooters, immersive RPGs, or casual puzzle games, we've got something for every gamer. Enjoy stunning HD graphics and seamless gameplay, all sourced from trusted platforms like Google Play. Connect with players worldwide, share strategies, and embark on unforgettable gaming journeys. Start playing today—your perfect game is waiting!
          </p>
        </div>
      </div>
      
      <div className="bg-[#222222] py-6 px-6 lg:px-24">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm" style={{ maxWidth: '1400px' }}>
          <div className="flex space-x-6 mb-4 md:mb-0 text-[#cccccc]">
            <Link to="/company" className="hover:text-white transition-colors">Company</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms Of Use</Link>
            <Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
          <div className="text-[#999999]">
            Copyright © 2025 Game.Gameloz.Com All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
