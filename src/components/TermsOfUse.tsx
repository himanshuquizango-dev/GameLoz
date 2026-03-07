import React from "react";

export default function TermsOfUse() {
  return (
    <div className="flex-grow py-12 px-6 lg:px-24 w-full">
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Terms Of Use</h1>
        
        <div className="text-base text-gray-600 font-sans leading-relaxed">
          <p className="mb-6">Terms of Use</p>
          <p className="mb-6">By accessing this website, you agree to abide by the following terms:</p>
          
          <div className="space-y-6">
            <p>
              <strong className="font-semibold text-gray-800">License to use:</strong> You are granted a limited license to access and utilize the content provided on the website for lawful purposes. However, reproduction, distribution, or resale of the content is strictly prohibited.
            </p>
            
            <p>
              <strong className="font-semibold text-gray-800">Ownership of Content:</strong> All information on this website, including topics such as health, finance, outdoor activities, and food, is the intellectual property of the site or its licensors and is protected by copyright laws.
            </p>
            
            <p>
              <strong className="font-semibold text-gray-800">Prohibited Actions:</strong> Users are forbidden from engaging in any illegal activities on the site, including but not limited to spreading false information, violating copyrights, or distributing malicious software.
            </p>
            
            <p>
              <strong className="font-semibold text-gray-800">Disclaimer:</strong> The content provided on the site is for informational purposes only. We do not assume any liability for decisions made based on the information presented, especially in the realms of health, finance, outdoor activities, and food. Users are encouraged to exercise their own judgment.
            </p>
            
            <p>
              <strong className="font-semibold text-gray-800">Modification of Terms:</strong> We reserve the right to modify these Terms of Use at any time. Users are encouraged to review the Terms periodically, and continued use of the site constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
