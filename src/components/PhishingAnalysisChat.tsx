import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Bot,
  Clock,
  Download,
  FileType,
  BarChart4,
  Share2,
  CheckCircle,
  Copy
} from "lucide-react";

// Define message type
type Message = {
  type: 'user' | 'bot' | 'analyst';
  content: string | React.ReactNode;
  timestamp: Date;
  persona?: string;
}

// Charts Components
const TimelineChart = () => (
  <div className="mt-2 mb-4 w-full bg-white p-3 rounded-md border border-gray-200">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Phishing Incidents by Date (June 1-15, 2025)</h4>
    <div className="h-48 w-full relative">
      {/* SVG line chart */}
      <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
        <g transform="translate(40, 10)">
          {/* Y-axis */}
          <line x1="0" y1="0" x2="0" y2="120" stroke="#e5e7eb" strokeWidth="1" />
          {/* Y-axis labels */}
          <text x="-5" y="120" textAnchor="end" fontSize="10" fill="#6b7280">0</text>
          <text x="-5" y="90" textAnchor="end" fontSize="10" fill="#6b7280">2</text>
          <text x="-5" y="60" textAnchor="end" fontSize="10" fill="#6b7280">4</text>
          <text x="-5" y="30" textAnchor="end" fontSize="10" fill="#6b7280">6</text>
          <text x="-5" y="0" textAnchor="end" fontSize="10" fill="#6b7280">8</text>
          
          {/* X-axis */}
          <line x1="0" y1="120" x2="340" y2="120" stroke="#e5e7eb" strokeWidth="1" />
          
          {/* X-axis labels (dates) */}
          <text x="0" y="135" textAnchor="middle" fontSize="9" fill="#6b7280">Jun 1</text>
          <text x="113" y="135" textAnchor="middle" fontSize="9" fill="#6b7280">Jun 5</text>
          <text x="226" y="135" textAnchor="middle" fontSize="9" fill="#6b7280">Jun 10</text>
          <text x="340" y="135" textAnchor="middle" fontSize="9" fill="#6b7280">Jun 15</text>
          
          {/* Horizontal grid lines */}
          <line x1="0" y1="90" x2="340" y2="90" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="60" x2="340" y2="60" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="30" x2="340" y2="30" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="0" x2="340" y2="0" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          
          {/* Vertical grid lines */}
          <line x1="113" y1="0" x2="113" y2="120" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="226" y1="0" x2="226" y2="120" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          
          {/* Line chart data - phishing incidents over time */}
          <path 
            d="M0,110 L22,105 L45,110 L67,108 L90,100 L113,105 L136,100 L158,95 L181,90 L204,80 L226,30 L249,20 L271,50 L294,80 L317,90 L340,95" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2"
          />
          
          {/* Area under the curve */}
          <path 
            d="M0,110 L22,105 L45,110 L67,108 L90,100 L113,105 L136,100 L158,95 L181,90 L204,80 L226,30 L249,20 L271,50 L294,80 L317,90 L340,95 L340,120 L0,120 Z" 
            fill="rgba(59, 130, 246, 0.1)" 
          />
          
          {/* Highlight the spike period */}
          <rect x="226" y="0" width="45" height="120" fill="rgba(220, 38, 38, 0.1)" />
          <text x="248" y="12" textAnchor="middle" fontSize="8" fill="#dc2626">Spike</text>
          
          {/* Data points */}
          <circle cx="0" cy="110" r="3" fill="#3b82f6" />
          <circle cx="22" cy="105" r="3" fill="#3b82f6" />
          <circle cx="45" cy="110" r="3" fill="#3b82f6" />
          <circle cx="67" cy="108" r="3" fill="#3b82f6" />
          <circle cx="90" cy="100" r="3" fill="#3b82f6" />
          <circle cx="113" cy="105" r="3" fill="#3b82f6" />
          <circle cx="136" cy="100" r="3" fill="#3b82f6" />
          <circle cx="158" cy="95" r="3" fill="#3b82f6" />
          <circle cx="181" cy="90" r="3" fill="#3b82f6" />
          <circle cx="204" cy="80" r="3" fill="#3b82f6" />
          <circle cx="226" cy="30" r="4" fill="#dc2626" />
          <circle cx="249" cy="20" r="4" fill="#dc2626" />
          <circle cx="271" cy="50" r="4" fill="#dc2626" />
          <circle cx="294" cy="80" r="3" fill="#3b82f6" />
          <circle cx="317" cy="90" r="3" fill="#3b82f6" />
          <circle cx="340" cy="95" r="3" fill="#3b82f6" />
        </g>
      </svg>
    </div>
  </div>
);

const DepartmentChart = () => (
  <div className="mt-2 mb-4 w-full bg-white p-3 rounded-md border border-gray-200">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Phishing Incidents by Department</h4>
    <div className="h-36 w-full relative">
      {/* SVG horizontal bar chart */}
      <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
        <g transform="translate(100, 10)">
          {/* Y-axis */}
          <line x1="0" y1="0" x2="0" y2="90" stroke="#e5e7eb" strokeWidth="1" />
          
          {/* Y-axis labels (departments) */}
          <text x="-5" y="15" textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#6b7280">Support</text>
          <text x="-5" y="45" textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#6b7280">Finance</text>
          <text x="-5" y="75" textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#6b7280">Sales</text>
          
          {/* X-axis */}
          <line x1="0" y1="90" x2="280" y2="90" stroke="#e5e7eb" strokeWidth="1" />
          
          {/* X-axis labels (count) */}
          <text x="0" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">0</text>
          <text x="70" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">5</text>
          <text x="140" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">10</text>
          <text x="210" y="105" textAnchor="middle" fontSize="10" fill="#6b7280">15</text>
          
          {/* Horizontal grid lines */}
          <line x1="0" y1="30" x2="280" y2="30" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="60" x2="280" y2="60" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          
          {/* Vertical grid lines */}
          <line x1="70" y1="0" x2="70" y2="90" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="140" y1="0" x2="140" y2="90" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="210" y1="0" x2="210" y2="90" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4" />
          
          {/* Bars */}
          <rect x="0" y="5" width="98" height="20" fill="#3b82f6" rx="2" />
          <rect x="0" y="35" width="126" height="20" fill="#3b82f6" rx="2" />
          <rect x="0" y="65" width="210" height="20" fill="#3b82f6" rx="2" />
          
          {/* Bar labels */}
          <text x="105" y="15" dominantBaseline="middle" fontSize="11" fill="#1f2937">7</text>
          <text x="133" y="45" dominantBaseline="middle" fontSize="11" fill="#1f2937">9</text>
          <text x="217" y="75" dominantBaseline="middle" fontSize="11" fill="#1f2937">15</text>
        </g>
      </svg>
    </div>
  </div>
);

// PowerPoint Slides Preview
const PowerPointPreview = () => (
  <div className="w-full my-4 flex flex-col gap-4">
    <h4 className="text-sm font-medium text-gray-700">PowerPoint Preview:</h4>
    <div className="flex overflow-x-auto pb-3 gap-3 w-full">
      {/* Slide 1 */}
      <div className="bg-white border border-gray-200 rounded-md min-w-[250px] w-[250px] h-[180px] shadow-sm flex flex-col items-center justify-center p-4">
        <div className="text-xl font-bold text-center text-blue-700">Phishing Trend Analysis</div>
        <div className="text-lg text-center text-blue-600">June 2025</div>
        <div className="mt-4 text-sm text-center text-gray-500">IT Security Team</div>
        <div className="mt-1 text-sm text-center text-gray-500">June 16, 2025</div>
      </div>
      
      {/* Slide 2 */}
      <div className="bg-white border border-gray-200 rounded-md min-w-[250px] w-[250px] h-[180px] shadow-sm p-4">
        <div className="text-md font-bold mb-2 text-blue-700">Summary of Findings</div>
        <div className="text-xs space-y-1">
          <div>• 37 phishing incidents in past 2 weeks</div>
          <div>• 84% used "Account Verification Required" subject</div>
          <div>• Spike occurred June 11-13 (19 incidents)</div>
          <div>• Sales department most affected (15 cases)</div>
          <div>• 20% credential exposure rate</div>
        </div>
      </div>
      
      {/* Slide 3 */}
      <div className="bg-white border border-gray-200 rounded-md min-w-[250px] w-[250px] h-[180px] shadow-sm p-4">
        <div className="text-md font-bold mb-1 text-blue-700">Incident Timeline</div>
        <div className="bg-gray-100 h-[120px] rounded-md flex items-center justify-center">
          <BarChart4 className="w-12 h-12 text-blue-400 opacity-60" />
        </div>
      </div>
      
      {/* Slide 4 */}
      <div className="bg-white border border-gray-200 rounded-md min-w-[250px] w-[250px] h-[180px] shadow-sm p-4">
        <div className="text-md font-bold mb-1 text-blue-700">Department Impact</div>
        <div className="bg-gray-100 h-[120px] rounded-md flex items-center justify-center">
          <BarChart4 className="w-12 h-12 text-blue-400 opacity-60" />
        </div>
      </div>
      
      {/* Slide 5 */}
      <div className="bg-white border border-gray-200 rounded-md min-w-[250px] w-[250px] h-[180px] shadow-sm p-4">
        <div className="text-md font-bold mb-2 text-blue-700">Recommended Actions</div>
        <div className="text-xs space-y-1">
          <div>1. Send awareness email to all employees</div>
          <div>2. Conduct phishing simulation test</div>
          <div>3. Update email security policies</div>
          <div>4. Review compromised accounts for IOCs</div>
          <div>5. Schedule security training sessions</div>
        </div>
      </div>
    </div>
    <div className="flex justify-center">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        <Download size={16} />
        Download PowerPoint
      </button>
    </div>
  </div>
);

// Copy button component
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm flex items-center gap-1 hover:bg-blue-100"
    >
      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
      {copied ? "Copied to clipboard" : "Copy Summary"}
    </button>
  );
};

// HoverCard component for Copilot and Analyst responses
const HoverCard = ({ persona }: { persona: string }) => (
  <div
    className={`absolute left-0 -top-8 z-10 px-3 py-2 rounded-md shadow-lg text-xs font-medium whitespace-nowrap
      ${persona === "Analyst Agent"
        ? "bg-orange-100 text-orange-800 border border-orange-300"
        : "bg-blue-100 text-blue-800 border border-blue-300"}
      opacity-90 pointer-events-none`}
    style={{ minWidth: 120 }}
  >
    {persona === "Analyst Agent" ? "Analyst Agent" : "Copilot"}
  </div>
);

const PhishingAnalysisChat: React.FC<{ initialPrompt?: string }> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showAnalystPrompt, setShowAnalystPrompt] = useState(false);
  const [showPptPrompt, setShowPptPrompt] = useState(false);
  const [hoveredMsgIdx, setHoveredMsgIdx] = useState<number | null>(null);
  const [handoffStage, setHandoffStage] = useState<string | null>(null);
  // On mount, if initialPrompt is provided, auto-trigger the flow
  useEffect(() => {
    let botResponseTimer: ReturnType<typeof setTimeout>;
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;
    let timer4: ReturnType<typeof setTimeout>;
    
    // Set initial messages
    if (initialPrompt) {
      // Add the user message
      const userMsg = {
        type: "user" as const,
        content: initialPrompt,
        timestamp: new Date()
      };
      setMessages([userMsg]);
      
      // Add the bot response after a delay
      botResponseTimer = setTimeout(() => {
        const botMsg = {
          type: "bot" as const,
          content: (
            <div>
              <p>Sure, I will generate a report and hand off to the Analyst Agent for deeper analysis.</p>
            </div>
          ),
          timestamp: new Date(),
          persona: "Copilot"
        };
        
        setMessages(prev => [...prev, botMsg]);
        setHandoffStage("handing-off");
        
        // Stage 1: Analyzing
        timer1 = setTimeout(() => {
          setHandoffStage("analyzing");
        }, 1000);
        
        // Stage 2: Gathering information
        timer2 = setTimeout(() => {
          setHandoffStage("gathering");
        }, 2000);
        
        // Stage 3: Generating report
        timer3 = setTimeout(() => {
          setHandoffStage("generating");
        }, 3000);
        
        // Stage 4: Show analyst report
        timer4 = setTimeout(() => {
          setHandoffStage(null);
            const analystMsg = {
            type: "analyst" as const,
            content: (
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-md border border-orange-200 text-orange-800 mb-4">
                  <div className="font-medium mb-1">Analyst Agent Report</div>
                  <div className="text-sm">Analysis of recent phishing campaign targeting organization.</div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Phishing Campaign Analysis: June 1-15, 2025</h3>

                  {/* Summary Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">Total Tickets</div>
                      <div className="text-2xl font-bold text-gray-800">37</div>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">Spike Period</div>
                      <div className="text-lg font-medium text-gray-800">June 11–13</div>
                      <div className="text-sm text-orange-600">(19 incidents logged)</div>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">Credential Exposure</div>
                      <div className="text-2xl font-bold text-orange-600">20%</div>
                      <div className="text-sm text-gray-600">Click-through: 85%</div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <TimelineChart />
                    <DepartmentChart />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-orange-700">Executive Summary</h4>
                      <p className="mt-1">A sophisticated phishing campaign has been detected targeting the organization over the past two weeks, with a significant spike in activity between June 11-13. The campaign primarily targets Sales and Finance departments using Microsoft-themed login pages.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-700">Common Patterns</h4>
                      <ul className="mt-1 ml-5 space-y-1">
                        <li>• 84% used subject line: "Account Verification Required"</li>
                        <li>• Phishing page mimics Microsoft login screen</li>
                        <li>• Click-through rate: 85%; credential exposure rate: 20%</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-orange-700">Response Actions Taken</h4>
                      <ul className="mt-1 ml-5 space-y-1">
                        <li>• 24 phishing emails quarantined by Defender</li>
                        <li>• 8 user accounts reset due to compromise</li>
                        <li>• Exchange Transport Rule applied on June 13</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-orange-700">Pending Risks</h4>
                      <ul className="mt-1 ml-5 space-y-1 text-orange-700">
                        <li>• No user awareness email has been sent</li>
                        <li>• Simulation testing not initiated</li>
                        <li>• Ongoing variants not yet analyzed</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-700">Technical Details</h4>
                      <div className="mt-1 space-y-2">
                        <p><strong>Attack Vector:</strong> Email with "Account Verification Required" subject line</p>
                        <p><strong>Phishing Infrastructure:</strong> Domains registered within last 30 days, using Let's Encrypt certificates</p>
                        <p><strong>Landing Pages:</strong> Highly convincing Microsoft login portal clones with organization's branding</p>
                        <p><strong>Post-Compromise Activity:</strong> Mailbox rules creation, OAuth token theft, SharePoint data access</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-700">Forensic Findings</h4>
                      <ul className="mt-1 ml-5 space-y-1">
                        <li>• Credential harvesting targeted SSO-enabled accounts</li>
                        <li>• Attacker IP geolocations: Eastern Europe (62%), Asia (28%), North America (10%)</li>
                        <li>• Average time from compromise to unauthorized access: 47 minutes</li>
                        <li>• Lateral movement attempted in 3 of 8 compromised accounts</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-700">Recommendations</h4>
                      <ol className="mt-1 ml-5 space-y-1 list-decimal">
                        <li><strong>Immediate:</strong> Send organization-wide awareness communication</li>
                        <li><strong>Short-term:</strong> Conduct targeted phishing simulation tests</li>
                        <li><strong>Technical:</strong> Implement additional email filtering rules</li>
                        <li><strong>Procedural:</strong> Update incident response playbook for credential theft</li>
                        <li><strong>Training:</strong> Schedule department-specific training sessions, prioritizing Sales and Finance</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-orange-700">Timeline of Investigation</h4>
                      <div className="mt-2 relative border-l-2 border-orange-200 ml-2 pl-5 pb-1 space-y-3">
                        <div className="relative">
                          <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">June 14, 08:30 AM</span>
                            <span>Security team identified pattern of suspicious logins</span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">June 14, 10:15 AM</span>
                            <span>Email analysis revealed common phishing characteristics</span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">June 15, 09:00 AM</span>
                            <span>Compromise indicators identified across 8 accounts</span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">June 15, 14:30 PM</span>
                            <span>Phishing infrastructure analyzed and blocked</span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-green-500"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">June 16, 08:00 AM</span>
                            <span>Analysis completed and report prepared</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <CopyButton text="Phishing Campaign Analysis (June 1-15, 2025): Total of 37 incidents with spike June 11-13 (19 incidents). 84% used 'Account Verification Required' subject line with 85% click-through rate and 20% credential exposure. Most affected departments: Sales (15), Finance (9), Support (7). Response: 24 emails quarantined, 8 accounts reset, Exchange Transport Rule implemented. Pending risks: no awareness emails sent, no simulation testing, ongoing variants not analyzed. Recommendations: organization-wide awareness communication, targeted simulations, enhanced filtering." />
                </div>
              </div>
            ),
            timestamp: new Date(),
            persona: "Analyst Agent"
          };
          
          setMessages(prev => [...prev, analystMsg]);
          setShowPptPrompt(true);
        }, 4000);
      }, 800);
      
    } else {
      // Default welcome message if no initialPrompt
      setMessages([
        {
          type: "bot",
          content: (
            <div>
              <p>Welcome to the IT Security Analysis Assistant. How can I help you analyze security incidents today?</p>
            </div>
          ),
          timestamp: new Date(),
          persona: "Copilot"
        }
      ]);
    }
    
    // Clean up all timers if component unmounts
    return () => {
      clearTimeout(botResponseTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [initialPrompt]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [messages, handoffStage]);
  
  // Handle sending a message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    handleUserMessage(input);
  };

  // Handle user message
  const handleUserMessage = (promptText: string) => {
    const userMessage: Message = {
      type: "user",
      content: promptText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Add slight delay to simulate processing
    setTimeout(() => {
      let responseContent: React.ReactNode;
      let messageType: 'bot' | 'analyst' = 'bot';
      let persona: string | undefined = undefined;
      
      if (promptText.toLowerCase().includes("phishing") || promptText.toLowerCase().includes("recent") || promptText.toLowerCase().includes("summarize")) {
        responseContent = (
          <div className="space-y-3">
            <p>Here's a summary of phishing-related incidents from June 1–15, 2025:</p>

            <div className="mb-2 space-y-1">
              <p className="flex items-center"><strong className="text-lg mr-2 text-blue-700">📊</strong> <strong>Total Tickets</strong>: <span className="font-medium">37</span></p>
              <p className="flex items-center"><strong className="text-lg mr-2 text-red-600">📈</strong> <strong>Spike Period</strong>: June 11–13 (<span className="font-medium">19</span> incidents logged)</p>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-1">🧠 Common Patterns:</p>
              <ul className="ml-5 space-y-1">
                <li>• 84% used subject line: "Account Verification Required"</li>
                <li>• Phishing page mimics Microsoft login screen</li>
                <li>• Click-through rate: 85%; credential exposure rate: 20%</li>
              </ul>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-1">🏢 Impacted Departments:</p>
              <ul className="ml-5 space-y-1">
                <li>• Sales: 15 cases</li>
                <li>• Finance: 9</li>
                <li>• Support: 7</li>
              </ul>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-1">🛡️ Response Actions Taken:</p>
              <ul className="ml-5 space-y-1">
                <li>• 24 phishing emails quarantined by Defender</li>
                <li>• 8 user accounts reset due to compromise</li>
                <li>• Exchange Transport Rule applied on June 13</li>
              </ul>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-1">❗ Pending Risks:</p>
              <ul className="ml-5 space-y-1">
                <li>• No user awareness email has been sent</li>
                <li>• Simulation testing not initiated</li>
                <li>• Ongoing variants not yet analyzed</li>
              </ul>
            </div>

            <TimelineChart />
            <DepartmentChart />

            <div className="flex justify-end space-x-2">
              <CopyButton text="Phishing Incident Summary (June 1-15): 37 total tickets with spike June 11-13 (19 incidents). 84% used 'Account Verification Required' subject. Most affected: Sales (15), Finance (9), Support (7). Actions: 24 emails quarantined, 8 accounts reset. Pending: awareness campaign, simulation testing." />
              <button 
                onClick={() => {
                  handleAnalystHandoff();
                }}
                className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-md text-sm flex items-center gap-1 hover:bg-orange-100"
              >
                <Share2 size={16} />
                Hand Off to Analyst Agent
              </button>
            </div>
          </div>
        );
        setShowAnalystPrompt(true);
      } else if (promptText.toLowerCase().includes("analyst")) {
        messageType = 'analyst';
        persona = 'Analyst Agent';
        setShowPptPrompt(true);
        responseContent = (
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-md border border-orange-200 text-orange-800 mb-4">
              <div className="font-medium mb-1">Analyst Agent Report</div>
              <div className="text-sm">Analysis of recent phishing campaign targeting organization.</div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Phishing Campaign Analysis: June 1-15, 2025</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-orange-700">Executive Summary</h4>
                  <p className="mt-1">A sophisticated phishing campaign has been detected targeting the organization over the past two weeks, with a significant spike in activity between June 11-13. The campaign primarily targets Sales and Finance departments using Microsoft-themed login pages.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Technical Details</h4>
                  <div className="mt-1 space-y-2">
                    <p><strong>Attack Vector:</strong> Email with "Account Verification Required" subject line</p>
                    <p><strong>Phishing Infrastructure:</strong> Domains registered within last 30 days, using Let's Encrypt certificates</p>
                    <p><strong>Landing Pages:</strong> Highly convincing Microsoft login portal clones with organization's branding</p>
                    <p><strong>Post-Compromise Activity:</strong> Mailbox rules creation, OAuth token theft, SharePoint data access</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Forensic Findings</h4>
                  <ul className="mt-1 ml-5 space-y-1">
                    <li>• Credential harvesting targeted SSO-enabled accounts</li>
                    <li>• Attacker IP geolocations: Eastern Europe (62%), Asia (28%), North America (10%)</li>
                    <li>• Average time from compromise to unauthorized access: 47 minutes</li>
                    <li>• Lateral movement attempted in 3 of 8 compromised accounts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Recommendations</h4>
                  <ol className="mt-1 ml-5 space-y-1 list-decimal">
                    <li><strong>Immediate:</strong> Send organization-wide awareness communication</li>
                    <li><strong>Short-term:</strong> Conduct targeted phishing simulation tests</li>
                    <li><strong>Technical:</strong> Implement additional email filtering rules</li>
                    <li><strong>Procedural:</strong> Update incident response playbook for credential theft</li>
                    <li><strong>Training:</strong> Schedule department-specific training sessions, prioritizing Sales and Finance</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium text-orange-700">Timeline of Investigation</h4>
                  <div className="mt-2 relative border-l-2 border-orange-200 ml-2 pl-5 pb-1 space-y-3">
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 14, 08:30 AM</span>
                        <span>Security team identified pattern of suspicious logins</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 14, 10:15 AM</span>
                        <span>Email analysis revealed common phishing characteristics</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 15, 09:00 AM</span>
                        <span>Compromise indicators identified across 8 accounts</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 15, 14:30 PM</span>
                        <span>Phishing infrastructure analyzed and blocked</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-green-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 16, 08:00 AM</span>
                        <span>Analysis completed and report prepared</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <CopyButton text="Phishing Campaign Analysis (June 1-15, 2025): Sophisticated campaign targeting Sales & Finance using Microsoft-themed login pages. 37 incidents with spike June 11-13. Attacker infrastructure uses recently registered domains with convincing Microsoft login clones. 8 account compromises led to mailbox rules creation and data access attempts. Recommendations: organization-wide awareness communication, targeted simulations, enhanced email filtering." />
            </div>
          </div>
        );
      } else if (promptText.toLowerCase().includes("powerpoint") || promptText.toLowerCase().includes("generate") || promptText.toLowerCase().includes("slides")) {
        responseContent = (
          <div className="space-y-3">
            <p>I've generated a PowerPoint presentation based on the phishing trend analysis. The presentation includes:</p>
            
            <ul className="ml-5 space-y-1">
              <li>• Title slide: "Phishing Trend Analysis – June 2025"</li>
              <li>• Summary of incidents (37 total, 19 during spike period)</li>
              <li>• Timeline chart showing the June 11-13 spike</li>
              <li>• Department impact breakdown</li>
              <li>• Recommended actions for leadership</li>
            </ul>
            
            <PowerPointPreview />
          </div>
        );
      } else {
        responseContent = (
          <div>
            <p>I can help analyze security incidents and generate reports. Try one of these queries:</p>
            <div className="mt-3 space-y-2">
              <button 
                onClick={() => handleUserMessage("Summarize recent phishing-related incidents from the last 2 weeks")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                Summarize recent phishing-related incidents from the last 2 weeks
              </button>
              <button 
                onClick={() => handleUserMessage("Hand off to Analyst Agent to generate a formal report")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                Hand off to Analyst Agent to generate a formal report
              </button>
              <button 
                onClick={() => handleUserMessage("Generate PowerPoint from the report")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                Generate PowerPoint from the report
              </button>
            </div>
          </div>
        );
      }
      
      const botResponse: Message = {
        type: messageType,
        content: responseContent,
        timestamp: new Date(),
        persona: persona
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  // Handle analyst handoff
  const handleAnalystHandoff = () => {
    // Simulate handoff to analyst agent
    setTimeout(() => {
      const handoffMessage: Message = {
        type: "analyst",
        content: (
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-md border border-orange-200 text-orange-800 mb-4">
              <div className="font-medium mb-1">Analyst Agent Report</div>
              <div className="text-sm">Analysis of recent phishing campaign targeting organization.</div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Phishing Campaign Analysis: June 1-15, 2025</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-orange-700">Executive Summary</h4>
                  <p className="mt-1">A sophisticated phishing campaign has been detected targeting the organization over the past two weeks, with a significant spike in activity between June 11-13. The campaign primarily targets Sales and Finance departments using Microsoft-themed login pages.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Technical Details</h4>
                  <div className="mt-1 space-y-2">
                    <p><strong>Attack Vector:</strong> Email with "Account Verification Required" subject line</p>
                    <p><strong>Phishing Infrastructure:</strong> Domains registered within last 30 days, using Let's Encrypt certificates</p>
                    <p><strong>Landing Pages:</strong> Highly convincing Microsoft login portal clones with organization's branding</p>
                    <p><strong>Post-Compromise Activity:</strong> Mailbox rules creation, OAuth token theft, SharePoint data access</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Forensic Findings</h4>
                  <ul className="mt-1 ml-5 space-y-1">
                    <li>• Credential harvesting targeted SSO-enabled accounts</li>
                    <li>• Attacker IP geolocations: Eastern Europe (62%), Asia (28%), North America (10%)</li>
                    <li>• Average time from compromise to unauthorized access: 47 minutes</li>
                    <li>• Lateral movement attempted in 3 of 8 compromised accounts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700">Recommendations</h4>
                  <ol className="mt-1 ml-5 space-y-1 list-decimal">
                    <li><strong>Immediate:</strong> Send organization-wide awareness communication</li>
                    <li><strong>Short-term:</strong> Conduct targeted phishing simulation tests</li>
                    <li><strong>Technical:</strong> Implement additional email filtering rules</li>
                    <li><strong>Procedural:</strong> Update incident response playbook for credential theft</li>
                    <li><strong>Training:</strong> Schedule department-specific training sessions, prioritizing Sales and Finance</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium text-orange-700">Timeline of Investigation</h4>
                  <div className="mt-2 relative border-l-2 border-orange-200 ml-2 pl-5 pb-1 space-y-3">
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 14, 08:30 AM</span>
                        <span>Security team identified pattern of suspicious logins</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 14, 10:15 AM</span>
                        <span>Email analysis revealed common phishing characteristics</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 15, 09:00 AM</span>
                        <span>Compromise indicators identified across 8 accounts</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-orange-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 15, 14:30 PM</span>
                        <span>Phishing infrastructure analyzed and blocked</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-green-500"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">June 16, 08:00 AM</span>
                        <span>Analysis completed and report prepared</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <CopyButton text="Phishing Campaign Analysis (June 1-15, 2025): Sophisticated campaign targeting Sales & Finance using Microsoft-themed login pages. 37 incidents with spike June 11-13. Attacker infrastructure uses recently registered domains with convincing Microsoft login clones. 8 account compromises led to mailbox rules creation and data access attempts. Recommendations: organization-wide awareness communication, targeted simulations, enhanced email filtering." />
            </div>
          </div>
        ),
        timestamp: new Date(),
        persona: "Analyst Agent"
      };
      
      setMessages(prev => [...prev, handoffMessage]);
      setShowPptPrompt(true);
    }, 800);
  };
  
  // Render the handoff stage indicator
  const renderHandoffStage = () => {
    if (!handoffStage) return null;
    
    let message = "";
    switch (handoffStage) {
      case "handing-off":
        message = "Handing off to Analyst Agent...";
        break;
      case "analyzing":
        message = "Analyzing incidents...";
        break;
      case "gathering":
        message = "Gathering information...";
        break;
      case "generating":
        message = "Generating report...";
        break;
      default:
        return null;
    }
    
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-md flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-orange-700 border-t-transparent rounded-full"></div>
          {message}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 pt-10 pb-6">
      {/* Messages area */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6" 
        ref={messagesContainerRef}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} relative`}
              onMouseEnter={() => setHoveredMsgIdx(i)}
              onMouseLeave={() => setHoveredMsgIdx(null)}
            >
              {/* Hover card for Copilot and Analyst responses */}
              {(msg.type === "bot" || msg.type === "analyst") && hoveredMsgIdx === i && (
                <HoverCard persona={msg.type === "analyst" ? "Analyst Agent" : "Copilot"} />
              )}
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : msg.type === "analyst"
                    ? "bg-orange-50 text-gray-800 border border-orange-200"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.type === "user" ? (
                    <User size={16} className="text-blue-200" />
                  ) : msg.type === "analyst" ? (
                    <FileType size={16} className="text-orange-500" />
                  ) : (
                    <Bot size={16} className="text-blue-500" />
                  )}
                  <span className="text-xs font-semibold">
                    {msg.type === "user" ? "You" : msg.persona || "Copilot"}
                  </span>
                  <span className="text-xs opacity-70 ml-auto flex items-center">
                    <Clock size={12} className="mr-1" />
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}
          
          {/* Show handoff stage indicator if applicable */}
          {renderHandoffStage()}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        {/* Prompt suggestions */}
        {showAnalystPrompt && (
          <div className="max-w-3xl mx-auto mb-3">
            <div className="text-xs text-gray-500 mb-2">Suggested:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleUserMessage("Hand off to Analyst Agent to generate a formal report")}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                Hand off to Analyst Agent to generate a formal report
              </button>
            </div>
          </div>
        )}
        
        {showPptPrompt && (
          <div className="max-w-3xl mx-auto mb-3">
            <div className="text-xs text-gray-500 mb-2">Suggested:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleUserMessage("Generate PowerPoint from report")}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                Generate PowerPoint from report
              </button>
            </div>
          </div>
        )}
      
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your security analysis question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhishingAnalysisChat;
