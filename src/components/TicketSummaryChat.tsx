import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Bot,
  Clock,
  FolderOpen,
  Calendar,
  Copy,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Define message type
type Message = {
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  timestamp: Date;
}

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
      {copied ? "Copied to clipboard" : "Copy to Ticket"}
    </button>
  );
};

// Collapsible section component
const CollapsibleSection = ({ 
  title, 
  icon, 
  children, 
  defaultExpanded = false 
}: { 
  title: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden mb-3">
      <button 
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {expanded && (
        <div className="p-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Pre-defined prompts and responses based on the design spec
const RESPONSES = {
  "summarize": (
    <div className="space-y-3">
      <div className="mb-4">
        <p className="font-medium text-xl text-gray-800 mb-2">Ticket #93821</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">Microsoft Teams</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">Camera Issue</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">Tier 3</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><strong>Title:</strong> User's Microsoft Teams camera not working</div>
          <div><strong>Reported by:</strong> Alex R.</div>
          <div><strong>Created on:</strong> June 14, 2025</div>
          <div><strong>Escalated to Tier 3:</strong> June 16, 2025</div>
        </div>
      </div>      <CollapsibleSection 
        title="🟠 Problem Details" 
      >
        <div className="space-y-2">
          <p>The user reports that the built-in laptop camera does not work in Microsoft Teams. The screen appears black during video calls, or sometimes shows a "No camera found" error. The issue persists across multiple Teams sessions and restarts.</p>
          <p>Camera works in other apps (e.g., Zoom, Windows Camera), but consistently fails within Teams — indicating a Teams-specific or Teams-access-layer issue.</p>
        </div>
      </CollapsibleSection>      <CollapsibleSection 
        title="📆 Timeline of Events" 
      >
        <div className="relative border-l-2 border-gray-200 ml-2 pl-5 pb-1 space-y-4">
          {/* Timeline items */}
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 14, 9:10 AM</span>
              <span>Ticket created by user via self-service portal</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 14, 10:20 AM</span>
              <span>Tier 1 cleared Teams cache and restarted Teams</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 14, 11:30 AM</span>
              <span>Tier 1 uninstalled and reinstalled Microsoft Teams</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 15, 3:45 PM</span>
              <span>Tier 2 verified camera permissions in Windows Privacy Settings</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 15, 4:30 PM</span>
              <span>Tier 2 tested Teams web version (same issue)</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 15, 5:15 PM</span>
              <span>Tier 2 confirmed other apps can access camera successfully</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-green-500"></div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">June 16, 10:00 AM</span>
              <span>Escalated to Tier 3</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>      <CollapsibleSection 
        title="✅ Actions Already Taken" 
      >
        <ul className="space-y-1">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Teams desktop app cache cleared: <span className="font-mono bg-gray-100 px-1 rounded text-sm">%appdata%\Microsoft\Teams</span></span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Teams fully uninstalled and reinstalled (latest version confirmed)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Windows camera privacy settings checked — Teams has access</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Verified camera is enabled and functional in Device Manager</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Web version of Teams tested — same issue</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Other applications (Zoom, Camera app) successfully using the webcam</span>
          </li>
        </ul>
      </CollapsibleSection>      <CollapsibleSection 
        title="❗ Pending Issues (To Be Investigated by Tier 3)" 
      >
        <div className="space-y-3">
          <div>
            <p className="font-medium">1. Teams log analysis:</p>
            <ul className="ml-5 space-y-1">
              <li>• Logs not yet collected (<span className="font-mono">%appdata%\Microsoft\Teams\logs.txt</span>)</li>
              <li>• Need to scan for device enumeration errors or permission denial</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">2. Event Viewer system checks:</p>
            <ul className="ml-5 space-y-1">
              <li>• Application/System logs have not been reviewed for hardware or Teams-specific errors</li>
              <li>• Look for camera access or driver-level issues</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">3. Driver-level inspection:</p>
            <ul className="ml-5 space-y-1">
              <li>• No rollback/update attempted yet</li>
              <li>• Camera appears in Device Manager, but compatibility/version not verified against Teams</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">4. Alternate account isolation:</p>
            <ul className="ml-5 space-y-1">
              <li>• Teams not tested with a different user profile to check for profile corruption or Teams-specific config issues</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">5. Registry and configuration check:</p>
            <ul className="ml-5 space-y-1">
              <li>• Teams registry entries under <span className="font-mono">HKEY_CURRENT_USER\Software\Microsoft\Office\Teams\Devices</span> not yet validated</li>
              <li>• Potential corruption or missing device mapping</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">6. External hardware isolation:</p>
            <ul className="ml-5 space-y-1">
              <li>• No test run with an external USB webcam to isolate hardware abstraction issues</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
      
      <div>
        <p className="mt-2 italic text-gray-600">This issue appears to be Teams-specific, likely at the device-to-app integration layer. Logs and environmental inspection are critical next steps.</p>
      </div>

      <div className="pt-2 flex justify-end">
        <CopyButton text="Ticket #93821 - User's Microsoft Teams camera not working - Camera works in other apps but fails in Teams. Timeline: Created Jun 14, Tier 1/2 cleared cache, reinstalled, checked permissions. Pending: logs analysis, event viewer checks, driver inspection, alternate account test, registry validation, external webcam test." />
      </div>
    </div>
  ),  "next": (
    <div className="space-y-3">
      <div className="mb-3">
        <p className="font-medium text-xl text-gray-800 mb-2">Ticket #93821 - Advanced Troubleshooting</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">Microsoft Teams</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">Camera Issue</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm">In Progress</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <p>Based on the analysis of this ticket, here are the recommended next steps:</p>
        
        <div className="space-y-2">
          <p><strong>1. Teams Logs Analysis</strong></p>
          <ul className="ml-5 space-y-1">
            <li>• Check camera initialization errors in the logs at <span className="font-mono text-sm">%appdata%\Microsoft\Teams\logs.txt</span></li>
            <li>• Look for entries with "camera initialization failed", "device enumeration error", "media permission denied", or "CameraController"/"VideoCapturer" errors</li>
            <li>• <span className="text-blue-600 cursor-pointer hover:underline">Open Logs Folder</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><strong>2. Event Viewer Analysis</strong></p>
          <ul className="ml-5 space-y-1">
            <li>• Filter System and Application logs for "camera", "webcam", or "video device" entries</li>
            <li>• Look for warnings or errors that occur when Teams is launched</li>
            <li>• Note any error codes related to camera hardware or drivers</li>
            <li>• Check for USB controller or interface errors</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><strong>3. Driver Investigation</strong></p>
          <ul className="ml-5 space-y-1">
            <li>• Open Device Manager (devmgmt.msc) and check Cameras/Imaging devices for warnings</li>
            <li>• Note current driver version and date</li>
            <li>• Try driver rollback if recently updated</li>
            <li>• Check manufacturer's website for latest drivers</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><strong>4. Profile Isolation Tests</strong></p>
          <ul className="ml-5 space-y-1">
            <li>• Create a test account if needed</li>
            <li>• Sign into Teams with different credentials</li>
            <li>• Check if camera works with a different profile</li>
            <li>• If successful, this would indicate a user-specific configuration issue</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><strong>5. Hardware Isolation</strong></p>
          <ul className="ml-5 space-y-1">
            <li>• Connect an external USB webcam if available</li>
            <li>• Test on a different computer with the same user account</li>
            <li>• Check for Teams-specific hardware blocks in security software</li>
            <li>• Try disabling other camera software temporarily</li>
          </ul>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <CopyButton text="Next troubleshooting steps for Ticket #93821: 1) Collect Teams logs from %appdata%\\Microsoft\\Teams\\logs.txt 2) Check Event Viewer for camera warnings 3) Verify/update camera driver in Device Manager 4) Test with alternate Teams account 5) Try external webcam to isolate hardware issues" />
      </div>
    </div>
  ),
  "schedule": (
    <div className="space-y-3">
      <div className="mb-3">
        <p className="font-medium text-xl text-gray-800 mb-2">Ticket #93821 - Microsoft Teams Camera Issue</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">Microsoft Teams</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm">Camera Issue</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm">Meeting Scheduled</span>
        </div>
      </div>      <CollapsibleSection 
        title="✅ Meeting Scheduled"
      >
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-medium w-28">📅 Date:</span>
            <span>June 17, 2025</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium w-28">🕒 Time:</span>
            <span>10:30 AM – 10:45 AM</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium w-28">📍 Location:</span>
            <span>Microsoft Teams</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium w-28">🧑‍💻 Participants:</span>
            <span>You (Tier 3 agent), Alex R. (end user)</span>
          </div>
        </div>
      </CollapsibleSection>
        <CollapsibleSection 
        title="📋 Meeting Agenda"
      >
        <ul className="ml-5 space-y-1">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Remote inspection of device settings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Driver update assistance</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Live testing of alternate solutions</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
            <span>Review log analysis findings</span>
          </li>
        </ul>
      </CollapsibleSection>
        <CollapsibleSection 
        title="📬 Notifications"
      >
        <div className="space-y-2">
          <p>The following notifications have been sent:</p>
          <ul className="ml-5 space-y-1">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
              <span>Calendar invite sent to Alex R.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
              <span>Meeting added to your calendar</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
              <span>Ticket updated with meeting details</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
              <span>15-minute reminder set</span>
            </li>
          </ul>
        </div>
      </CollapsibleSection>

      <div className="pt-2 flex justify-end">
        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm flex items-center gap-1 hover:bg-blue-100">
          <Calendar size={16} /> View in Calendar
        </button>
      </div>
    </div>
  )
};

const TicketSummaryChat: React.FC = () => {  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: (
        <div>
          <p>Please paste the link to the ticket or enter the ticket ID to proceed:</p>
        </div>
      ),
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [messages]);
  
  // Handle sending a message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    handlePromptClick(input);
  };
    // Handle predefined prompt button clicks
  const handlePromptClick = (promptText: string) => {
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
      
      // For the initial prompt, always show the ticket summary
      if (messages.length <= 1) {
        responseContent = RESPONSES.summarize;
      } else if (promptText.toLowerCase().includes("check next") || promptText.toLowerCase().includes("what should i")) {
        responseContent = RESPONSES.next;
      } else if (promptText.toLowerCase().includes("schedule") || promptText.toLowerCase().includes("call") || promptText.toLowerCase().includes("meeting")) {
        responseContent = RESPONSES.schedule;
      } else if (promptText.toLowerCase().includes("summarize")) {
        responseContent = RESPONSES.summarize;
      } else {
        // Default response for unrecognized prompts
        responseContent = (
          <div>
            <p>I can help with ticket #93821 - Microsoft Teams camera issue. Try one of these options:</p>
            <div className="mt-3 space-y-2">
              <button 
                onClick={() => handlePromptClick("Summarize the issue so far")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                Summarize the issue so far
              </button>
              <button 
                onClick={() => handlePromptClick("What should I check next?")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                What should I check next?
              </button>
              <button 
                onClick={() => handlePromptClick("Schedule a 15-min call with the user")}
                className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md"
              >
                Schedule a 15-min call with the user
              </button>
            </div>
          </div>
        );
      }
      
      const botResponse: Message = {
        type: "bot",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 800);
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
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.type === "user" ? (
                    <User size={16} className="text-blue-200" />
                  ) : (
                    <Bot size={16} className="text-blue-500" />
                  )}                  <span className="text-xs font-semibold">
                    {msg.type === "user" ? "You" : "Copilot"}
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
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-2">          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={messages.length <= 1 ? "Paste ticket link or enter ticket ID..." : "Type your question about the ticket..."}
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
          {/* Prompt suggestions */}
        {messages.length > 2 && messages[messages.length - 1].type === "bot" && messages.length <= 3 && (
          <div className="max-w-3xl mx-auto mt-3">
            <div className="text-xs text-gray-500 mb-2">Suggested:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePromptClick("What should I check next?")}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                What should be my next steps?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSummaryChat;
