import React from 'react';
import {
  Smartphone,
  Shield,
  Monitor,
  Wifi,
  UserCheck,
  Key,
  AlertCircle,
  Search,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Settings,
  MoreHorizontal,
  Plus,
  Mic,
  ClipboardList
} from 'lucide-react';

interface LandingPageProps {
  onStarterSelect: (starter: string) => void;
  centerContent?: React.ReactNode;
  onNavLanding: () => void; // <-- add this prop
}

interface ConversationStarter {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  highlight?: boolean;
}

const conversationStarters: ConversationStarter[] = [
  {
    id: 'camera-issue',
    title: 'I am having trouble with Teams camera',
    description: 'Troubleshoot and fix camera issues in Microsoft Teams.',
    icon: Smartphone,
    color: 'bg-blue-100 text-blue-600',
    highlight: true
  },
  {
    id: 'calendar-sync',
    title: "My Calendar Isn't Syncing",
    description: 'Troubleshoot Outlook calendar sync problems across devices.',
    icon: Smartphone,
    color: 'bg-blue-100 text-blue-600',
    highlight: true
  },
  {
    id: 'ticket-status',
    title: 'Check Ticket Status',
    description: 'Check the current status, progress, and next steps for your submitted IT support tickets.',
    icon: ClipboardList,
    color: 'bg-blue-100 text-blue-600',
    highlight: true  },
  {
    id: 'kb-article',
    title: 'Create or Update a KB Article',
    description: 'Use a resolved ticket to create or improve documentation',
    icon: ClipboardList,
    color: 'bg-indigo-100 text-indigo-600',
    highlight: true
  },
  {
    id: 'new-scenario',
    title: 'New Scenario Flow',
    description: 'Explore our new IT support scenario with a step-by-step guided flow',
    icon: Settings,
    color: 'bg-yellow-100 text-yellow-600',
    highlight: true
  },
  {
    id: 'incident-management',
    title: 'Troubleshoot an IT issue',
    description: 'Share a ticket link or description for quick resolution assistance.',
    icon: AlertCircle,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'summarize-ticket',
    title: 'Summarize a ticket',
    description: 'AI-assisted ticket analysis and summary for Tier 3 support agents.',
    icon: ClipboardList,
    color: 'bg-purple-100 text-purple-600',
    highlight: true
  },
  {
    id: 'phishing-analysis',
    title: 'Phishing Trend Analysis',
    description: 'Generate reports on recent phishing-related incidents and trends.',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    highlight: true
  }
];

const hoverCardContent: Record<string, string> = {
  'calendar-sync': "Ticket Creation Scenario: When self-serve isn't enough, employees can seamlessly raise an IT ticket — with Copilot automatically capturing all relevant context and details to help support agents diagnose and resolve the issue faster.",
  'ticket-status': "Ticket Follow-Up Scenario: After raising a ticket, employees can easily track its status and request updates or changes — all through a natural conversation with the agent, without needing to navigate portals or send emails.",
  'camera-issue': 'Self-Serve Scenario: Empower employees to troubleshoot IT issues quickly and intuitively using multi-modal input — reducing the need to type, minimizing frustration, and improving time-to-resolution.',
  'incident-management': "Ticket Resolution Support for IT Agents: Tier 1 agents can rely on Copilot to surface relevant knowledge articles, similar past tickets, and contextual insights from Teams or Outlook — enabling faster, more informed resolutions. The agent also assists in drafting customer updates and keeping the ticket status current.",  'summarize-ticket': "Escalation Handling for Tier 3 Agents: When a ticket is escalated, Tier 3 agents can use Copilot to quickly catch up on the full ticket history, understand what's been tried, and determine next steps. The agent also supports coordinating directly with the end user — including scheduling follow-up meetings when needed.",
  'phishing-analysis': "Reporting for Tier 3 Agents: Copilot helps Tier 3 agents identify patterns across escalated issues by generating ad hoc reports and summaries. Using a multi-agent framework, it can delegate tasks — such as trend analysis or report generation — to specialized agents, accelerating root cause discovery and improving team awareness.",
  'kb-article': "Knowledge Base Management for Tier 3 Agents: This tool helps experienced support agents turn resolved tickets into lasting documentation. Using a conversational approach, it extracts issue details, identifies relevant KB articles to update, and drafts structured content — improving future issue resolution times.",
  'new-scenario': "New Scenario Flow: This interactive workflow demonstrates our latest approach to IT support, guiding users through a structured conversation that collects information, analyzes the issue, and provides actionable recommendations. The step-by-step process showcases how complex IT scenarios can be handled with clarity and efficiency."
};

const LandingPage: React.FC<LandingPageProps> = ({ onStarterSelect, centerContent, onNavLanding }) => {
  const [hoveredStarter, setHoveredStarter] = React.useState<string | null>(null);
  return (
    <div className="h-screen flex bg-gray-50 pt-10 pb-6">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Section */}
        <div className="px-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Search</h3>
          </div>
          
          <div
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') console.log('Search clicked');
            }}
            onClick={() => console.log('Search clicked')}
          >
            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-800">Search</span>
          </div>
        </div>

        {/* Chat Section */}
        <div className="px-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Chat</h3>
          </div>
          
          {/* Agents Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Agents</span>
              </div>
            </div>
            
            <div className="ml-6 space-y-1">
              {/* IT Help Desk agent row - make this clickable */}
              <div
                className="flex items-center space-x-3 p-2 rounded-md bg-blue-50 border-l-2 border-blue-500 cursor-pointer"
                onClick={onNavLanding}
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') onNavLanding();
                }}
              >
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700">IT Help Desk</span>
                <div className="ml-auto flex space-x-1">
                  <button className="p-1 hover:bg-blue-100 rounded">
                    <Settings className="w-3 h-3 text-blue-600" />
                  </button>
                  <button className="p-1 hover:bg-blue-100 rounded">
                    <MoreHorizontal className="w-3 h-3 text-blue-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-white">A</span>
                </div>
                <span className="text-sm text-gray-700">Analyst</span>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-white">I</span>
                </div>
                <span className="text-sm text-gray-700">Idea Coach</span>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-white">P</span>
                </div>
                <span className="text-sm text-gray-700">Planner</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">All agents</div>
          <div className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">Create agent</div>

          {/* Conversations Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Conversations</span>
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Pages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t border-gray-200 p-3 space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
            <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-white">N</span>
            </div>
            <span className="text-sm text-gray-700">Notebooks</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
            <Plus className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">Create</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
            <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-white">A</span>
            </div>
            <span className="text-sm text-gray-700">Apps</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">E</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Erika Fuller</div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">IT Help Desk</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Interface or Landing Tiles */}
        <div className="flex-1 flex flex-col">
          {centerContent ? (
            <div className="flex-1 p-6">{centerContent}</div>
          ) : (
            // Default landing page tiles and input
            <div className="flex-1 p-6">
              {/* Conversation Starters */}
              <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                  {conversationStarters.map((starter) => {
                    const IconComponent = starter.icon;
                    return (
                      <div key={starter.id} className="relative">
                        <button
                          onClick={() => onStarterSelect(starter.id)}
                          className={`group p-4 bg-white border ${starter.highlight ? 'border-blue-300 shadow-md' : 'border-gray-200'} rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left w-full`}
                          onMouseEnter={() => setHoveredStarter(starter.id)}
                          onMouseLeave={() => setHoveredStarter(null)}
                          onFocus={() => setHoveredStarter(starter.id)}
                          onBlur={() => setHoveredStarter(null)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${starter.color} group-hover:scale-110 transition-transform duration-200`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm font-semibold ${starter.highlight ? 'text-blue-700' : 'text-blue-600'} mb-1 group-hover:text-blue-700 transition-colors`}>
                                {starter.title}
                              </h3>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {starter.description}
                              </p>
                            </div>
                          </div>
                        </button>
                        {/* Hover Card for Conversation Starter */}
                        {hoveredStarter === starter.id && (
                          <div className="absolute z-30 left-1/2 -translate-x-1/2 -top-2 translate-y-[-100%] w-80 bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-300 shadow-2xl rounded-xl p-5 text-sm text-white animate-fade-in pointer-events-none backdrop-blur-sm" style={{opacity: 0.95}}>
                            <div className="leading-relaxed">{hoverCardContent[starter.id]}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 text-center">
                  <button className="text-sm text-blue-600 hover:underline">See more</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;