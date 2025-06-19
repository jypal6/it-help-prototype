import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import TicketSupportChat from './components/TicketSupportChat';
import TicketSummaryChat from './components/TicketSummaryChat';
import PhishingAnalysisChat from './components/PhishingAnalysisChat';
import ScreenShareSimulation from './components/ScreenShareSimulation';
import HelpPage from './components/HelpPage';
import { HelpCircle } from 'lucide-react';
import CalendarSyncChat from './components/CalendarSyncChat';
import TicketStatusChat from './components/TicketStatusChat';
import KnowledgeBaseArticleChat from './components/KnowledgeBaseArticleChat';
import NewScenarioChat from './components/NewScenarioChat';
import VPNConnectionChat from './components/VPNConnectionChat';

export type AppState =
  | 'landing'
  | 'chat'
  | 'ticket-support-chat'
  | 'ticket-summary-chat'
  | 'screen-share'  | 'phishing-analysis'
  | 'calendar-sync-chat'
  | 'ticket-status-chat'
  | 'kb-article-chat'
  | 'new-scenario-chat'
  | 'vpn-connection-chat';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [ticketPrompt, setTicketPrompt] = useState<string>('');
  const [showHelp, setShowHelp] = useState<boolean>(true); // Show help on first load
  const [selectedStarter, setSelectedStarter] = useState<string>('');

  // Check if it's the first visit - using sessionStorage instead of localStorage
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
      setShowHelp(true);
    }
  }, []);

  const handleStarterSelect = (starter: string) => {
    setSelectedStarter(starter);
    
    if (starter === 'camera-issue') {
      // Redirect to Figma prototype for Teams camera issue
      window.open('https://aka.ms/Vision_IThelp', '_blank');
      return;
    }
    
    if (starter === 'incident-management') {
      setTicketPrompt('Please paste the ticket link or describe the issue to troubleshoot:');
      setAppState('ticket-support-chat');
    } else if (starter === 'summarize-ticket') {
      setAppState('ticket-summary-chat');    } else if (starter === 'screen-share') {
      setAppState('screen-share');
    } else if (starter === 'phishing-analysis') {
      setAppState('phishing-analysis');
    } else if (starter === 'calendar-sync') {
      setAppState('calendar-sync-chat');
      return;
    } else if (starter === 'ticket-status') {
      setAppState('ticket-status-chat');
      return;
    } else if (starter === 'kb-article') {
      setAppState('kb-article-chat');
      return;    } else if (starter === 'new-scenario') {
      setAppState('new-scenario-chat');
      return;
    } else if (starter === 'vpn-connect') {
      setAppState('vpn-connection-chat');
      return;
    } else {
      setAppState('chat');
    }
  };

  let centerContent = null;
  if (appState === 'chat') {
    centerContent = <ChatInterface 
      selectedStarter={selectedStarter} 
      onScreenShare={() => setAppState('screen-share')}
      onBack={() => setAppState('landing')}
    />;
  } else if (appState === 'ticket-support-chat') {
    centerContent = <TicketSupportChat initialPrompt={ticketPrompt} />;
  } else if (appState === 'ticket-summary-chat') {
    centerContent = <TicketSummaryChat />;
  } else if (appState === 'screen-share') {
    centerContent = <ScreenShareSimulation onBack={() => setAppState('landing')} />;
  } else if (appState === 'phishing-analysis') {
    centerContent = <PhishingAnalysisChat initialPrompt={
      'Generate a report on the recent phising attacks that happened in the past 2 weeks. Call out the key insights.'
    } />;  } else if (appState === 'calendar-sync-chat') {
    centerContent = <CalendarSyncChat />;
  } else if (appState === 'ticket-status-chat') {
    centerContent = <TicketStatusChat />;  } else if (appState === 'kb-article-chat') {
    centerContent = <KnowledgeBaseArticleChat />;
  } else if (appState === 'new-scenario-chat') {
    centerContent = <NewScenarioChat />;
  } else if (appState === 'vpn-connection-chat') {
    centerContent = <VPNConnectionChat />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-2 flex items-center justify-between z-20 fixed top-0 w-full">
        <span className="text-lg font-bold text-blue-700">M365 Copilot</span>
        <button 
          onClick={() => setShowHelp(true)}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Help"
        >
          <HelpCircle className="text-blue-600 w-5 h-5" />
        </button>
      </header>
      <div className="flex-1 flex flex-col pt-10">
        <LandingPage
          onStarterSelect={handleStarterSelect}
          centerContent={centerContent}
          onNavLanding={() => setAppState('landing')}
        />
      </div>
      <footer className="bg-gray-100 text-center py-1.5 text-xs text-gray-500 fixed bottom-0 w-full z-20">
        &copy; 2025 M365 Copilot Prototype
      </footer>
      
      {showHelp && <HelpPage onClose={() => setShowHelp(false)} />}
    </div>
  );
}

export default App;