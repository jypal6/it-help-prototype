import React from 'react';
import { X } from 'lucide-react';

interface HelpPageProps {
  onClose: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onClose }) => {
  // Prevent clicking the background from closing the help page
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Prevent propagation to stop the click from reaching the background
      e.stopPropagation();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Help</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close help"
            >
              <X size={24} />
            </button>
          </div>          
          <div className="prose max-w-none">
            <h1 className="text-xl font-bold text-blue-700 mb-2">� IT Help Desk Copilot – Prototype Overview</h1>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">🎯 Purpose of the Prototype</h2>
            <p className="mb-4">
              This prototype demonstrates how a conversational AI Copilot can assist both employees and IT agents in resolving IT-related issues more efficiently, using natural language interactions and smart automation. It showcases a multi-modal assistant interface that is context-aware, task-focused, and embedded within a scalable help desk workflow.
            </p>
            <p className="mb-4 text-sm italic bg-gray-100 p-3 rounded-md">
              Note: This is an indicative design created for internal demonstration purposes. It does not conform to the official Microsoft Copilot design system or UX guidelines and should not be used as a reference for production implementations.
            </p>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">👥 Who It's For</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Employees seeking help with common IT tasks like troubleshooting, raising requests, or checking ticket status.</li>
              <li>IT Agents (Tier 1 & Tier 3) looking to reduce manual effort in resolving tickets, drafting responses, updating documentation, and analyzing trends.</li>
            </ul>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">� Business Value</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Benefit Area</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">✅ Reduced Ticket Volume</td>
                    <td className="border border-gray-300 px-4 py-2">Enables self-service and contextual troubleshooting to deflect common issues.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">⚡ Faster Resolution Time</td>
                    <td className="border border-gray-300 px-4 py-2">Agents get instant access to relevant KBs, past cases, and communications.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">📈 Improved Documentation</td>
                    <td className="border border-gray-300 px-4 py-2">Tier 3 agents can easily turn ticket insights into KB updates.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">📊 Smarter Operations</td>
                    <td className="border border-gray-300 px-4 py-2">Built-in reporting surfaces issue trends and patterns to inform IT strategy.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">� How to Use This Prototype</h2>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li>Select a tile that represents your goal (e.g., troubleshoot, create a ticket, check status).</li>
              <li>The Copilot will guide you through a chat-based interaction tailored to your context.</li>
              <li>Suggestion prompts, summaries, and smart inputs help reduce effort and speed up action.</li>
            </ol>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">🧾 Share feedback with</h2>
            <p className="mb-4">
              Jyoti Pal, Anandhi Hariharan
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
