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
            <h1 className="text-xl font-bold text-blue-700 mb-2">🧪 Agent Prototype – Internal Preview</h1>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">🎯 Purpose</h2>
            <p className="mb-4">
              This prototype demonstrates how an AI-powered assistant can enhance IT support by addressing two core needs:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Enabling employees to self-resolve common issues quickly</li>
              <li>Supporting Tier 1 IT agents with intelligent, context-aware guidance to resolve tickets efficiently</li>
            </ul>
            <p>
              It integrates signals from past tickets, knowledge base articles, and Microsoft 365 tools (like Outlook and Teams) to drive smarter, faster support.
            </p>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">👤 Key Personas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Persona</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Role in the Workflow</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">End User (Employee)</td>
                    <td className="border border-gray-300 px-4 py-2">Needs quick, guided help for issues like VPN setup, access requests, and troubleshooting.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Tier 1 IT Agent</td>
                    <td className="border border-gray-300 px-4 py-2">Handles high ticket volumes; benefits from faster triage, resolution suggestions, and fewer escalations.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">💡 Business Value</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><span className="font-medium">Faster Resolution:</span> Reduces time spent on repetitive tickets by both users and agents</li>
              <li><span className="font-medium">Smarter Triage:</span> Surfaces relevant prior case data and M365-based peer input to guide agent response</li>
              <li><span className="font-medium">Reduced Load:</span> Shifts routine issues to self-service, freeing IT teams for higher-value tasks</li>
              <li><span className="font-medium">Better Experience:</span> Offers a human-like, step-by-step guidance model that feels like working with a colleague</li>
            </ul>
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
