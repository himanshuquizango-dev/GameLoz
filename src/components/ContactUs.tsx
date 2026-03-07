import React from "react";

export default function ContactUs() {
  return (
    <div className="flex-grow py-12 px-6 lg:px-24 w-full">
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">Contact Us</h1>
        
        <form className="max-w-2xl space-y-6">
          <div>
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-4 py-3 border border-gray-200 rounded text-gray-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-4 py-3 border border-gray-200 rounded text-gray-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Why are you contact us?" 
              className="w-full px-4 py-3 border border-gray-200 rounded text-gray-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <textarea 
              placeholder="Message" 
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded text-gray-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-y"
            ></textarea>
          </div>
          
          <div>
            <button 
              type="button" 
              className="bg-[#f27435] hover:bg-[#e66324] text-white px-8 py-2.5 rounded transition-colors font-medium shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
