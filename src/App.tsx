import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Company from "./components/Company";
import Privacy from "./components/Privacy";
import TermsOfUse from "./components/TermsOfUse";
import ContactUs from "./components/ContactUs";
import Category from "./components/Category";
import OnlineGames from "./components/OnlineGames";
import GameDetail from "./components/GameDetail";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Featured />} />
          <Route path="/company" element={<Company />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/gameCategory/:id" element={<Category />} />
          <Route path="/h5online" element={<OnlineGames />} />
          <Route path="/app/:appId" element={<GameDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
