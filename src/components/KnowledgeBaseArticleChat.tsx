import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Clock, CheckCircle, Edit3, User, Bot } from 'lucide-react';

// Define a type for all stages of the flow
type FlowStage = 
  | 'initial'
  | 'ticket-shared'
  | 'kb-selection'
  | 'ticket-details'
  | 'draft-review'
  | 'edit-feedback'
  | 'final-confirmation'
  | 'complete';

// Define a type for our message objects
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  timestamp: Date;
}

// Define the KB articles that will be shown as options
interface KBArticle {
  id: string;
  title: string;
  lastUpdated: string;
}

// Sample KB articles
const kbArticles: KBArticle[] = [
  { 
    id: 'kb001', 
    title: 'Resolving Camera Issues in Microsoft Teams (2023)', 
    lastUpdated: 'Dec 15, 2023' 
  },
  { 
    id: 'kb002', 
    title: 'Teams Hardware Compatibility Issues with New Devices', 
    lastUpdated: 'Mar 5, 2024' 
  },
  { 
    id: 'kb003', 
    title: 'Common Teams App Troubleshooting on Windows', 
    lastUpdated: 'Jun 22, 2024' 
  }
];

// Initial prompt that is automatically injected
const initialPrompt = "Help me update or create a KB article based on the new issue and resolution identified in a specific IT ticket.";

// Component for the KB Article Chat
const KnowledgeBaseArticleChat: React.FC = () => {
  // State for the user's input
  const [input, setInput] = useState('');
  
  // State for tracking the current stage of our flow
  const [currentStage, setCurrentStage] = useState<FlowStage>('initial');
    // State for selected KB article ID (for backend purposes)
  const [_, setSelectedKBArticle] = useState<string | null>(null);
  
  // State for selected KB article title
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  
  // State for showing suggestion chips
  const [showSuggestion, setShowSuggestion] = useState(false);
  
  // State for chat history
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Create a ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Reference to track if we've initialized
  const initializedRef = useRef(false);
  
  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Auto-inject the initial user message
  useEffect(() => {
    // Only run once
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    // Add user message
    setMessages([
      {
        id: '1',
        type: 'user',
        content: initialPrompt,
        timestamp: new Date()
      }
    ]);
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      addBotMessage(
        <p>Sure. Please share the link to the IT ticket you'd like me to review.</p>
      );
      
      // Show suggestions after a delay
      setTimeout(() => {
        setShowSuggestion(true);
        scrollToBottom();
      }, 1000);
    }, 800);
  }, []);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Function to add a user message
  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setShowSuggestion(false);
    scrollToBottom();
  };

  // Function to add a bot message with React nodes for rich formatting
  const addBotMessage = (content: React.ReactNode) => {
    const newMessage: Message = {
      id: `bot-${Date.now()}`,
      type: 'bot',
      content: content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();
  };

  // Function to get the current prompt suggestion based on the flow stage
  const getCurrentPromptSuggestion = () => {
    switch (currentStage) {
      case 'initial':
        return "Here's the ticket: https://support.corp.com/ticket/TSK-24581";
      case 'kb-selection':
        return "Let's go with the second one.";
      case 'ticket-details':
        return "Yes, the ticket information is correct.";
      case 'draft-review':
        return "Yes, this is correct. Keep going.";
      case 'edit-feedback':
        return "Looks good overall. Can you improve the issue description to make it easier to detect the symptom?";
      case 'final-confirmation':
        return "Perfect. Please go ahead and save this.";
      default:
        return null;
    }
  };

  // Function to handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addUserMessage(input);
    
    // Process the message based on current stage
    handleMessageByStage(input);
  };
  
  // Handle article selection functionality
  const handleArticleSelection = (articleId: string, title: string) => {
    setSelectedKBArticle(articleId);
    setSelectedTitle(title);
    
    // Add the selection as a user message
    const userSelectionMessage = `I'd like to update the article: "${title}"`;
    addUserMessage(userSelectionMessage);
    
    // First response - show ticket details and ask for confirmation
    setTimeout(() => {
      addBotMessage(
        <>
          <p>Got it. Let me extract the new issue and resolution details from the ticket.</p>
          
          <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
            <p className="font-medium text-blue-800 mb-2">Ticket Details: TSK-24581</p>
            <p className="mb-2"><strong>Title:</strong> Teams camera not working on new Dell laptops</p>
            <p className="mb-2"><strong>Reported by:</strong> Sarah Johnson, IT Support Lead</p>
            <p className="mb-2"><strong>Date opened:</strong> June 14, 2025</p>
            <p className="mb-2"><strong>Priority:</strong> Medium</p>
            <p className="mb-2"><strong>Status:</strong> Resolved</p>
            
            <p className="font-medium text-blue-800 mt-3 mb-2">New Issue Identified</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Teams camera not working on new Dell Latitude 7455 devices</li>
              <li>Occurs only when new webcam firmware version 3.2.7 is active</li>
            </ul>
            
            <p className="font-medium text-blue-800 mt-3 mb-1">Confirmed Resolution</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Manually disable UVC enhanced power management via registry</li>
              <li>Update Teams to latest internal build 1.6.00.27919</li>
            </ul>
          </div>
          
          <p className="mt-2">Does this information from the ticket look correct to you?</p>
        </>
      );
      
      // Set the stage to ticket-details so suggestions are appropriate
      setCurrentStage('ticket-details');
      
      // Show suggestions after ticket details
      setTimeout(() => {
        setShowSuggestion(true);
        scrollToBottom();
      }, 500);
    }, 1000);
  };

  // Handle messages based on the current stage
  const handleMessageByStage = (text: string) => {
    // Skip empty messages
    if (!text.trim()) return;
    
    // Process based on current stage
    switch (currentStage) {
      case 'initial':
        // If they share a ticket link, move to KB selection
        if (text.includes('https://support.corp.com/ticket/')) {
          setTimeout(() => {
            addBotMessage(
              <>
                <p>I've found these KB articles that are relevant to the issue from ticket TSK-24581:</p>
                
                <div className="mt-2 space-y-2 text-sm">
                  {kbArticles.map(article => (
                    <div 
                      key={article.id}
                      className="p-3 border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 cursor-pointer flex items-start transition-colors"
                      onClick={() => handleArticleSelection(article.id, article.title)}
                    >
                      <FileText className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                      <div>
                        <p className="font-medium">{article.title}</p>
                        <p className="text-gray-500 text-xs mt-1 flex items-center">
                          <Clock size={12} className="mr-1" />
                          Last updated: {article.lastUpdated}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="mt-2">Please select which KB article you'd like to update with the new information.</p>
              </>
            );
            setCurrentStage('kb-selection');
          }, 1000);
        } else {
          // Generic response for anything else
          setTimeout(() => {
            addBotMessage(
              <p>To help you update a KB article, I'll need the link to a specific IT ticket. Could you please share that with me?</p>
            );
          }, 800);
        }
        break;
        
      case 'ticket-details':
        // Check if they confirm the ticket details
        if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('correct')) {
          setTimeout(() => {
            addBotMessage(
              <>
                <p>Now that I've gathered that, I'll prepare a draft update and identify where this new content should be inserted.</p>
                
                <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                  <p className="font-medium text-blue-800 mb-2">Draft Update for KB Article – {selectedTitle}</p>
                  
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-2">
                    <p className="font-medium text-yellow-800 text-xs">New Known Issue (Added July 2025)</p>
                  </div>
                  
                  <p className="mb-1"><strong>Device Model:</strong> Dell Latitude 7455</p>
                  <p className="mb-1"><strong>Symptom:</strong> Camera not detected in Teams (while functional in other apps)</p>
                  <p className="mb-1"><strong>Cause:</strong> Webcam firmware v3.2.7 introduces UVC signaling issues</p>
                  
                  <p className="font-medium text-blue-800 mt-3 mb-1">Resolution</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>Launch regedit</li>
                    <li>Navigate to HKLM\SYSTEM\CurrentControlSet\Control\Class\{'{'}6BDD1FC6-810F-11D0-BEC7-08002BE2092F{'}'}</li>
                    <li>Set EnableUVCManagement = 0</li>
                    <li>Reboot device and update Teams to build 1.6.00.27919</li>
                  </ol>
                </div>
                
                <p className="mt-2">Does this look accurate so far?</p>
              </>
            );
            setCurrentStage('draft-review');
            setShowSuggestion(true);
          }, 1500);
        } else {
          // They have issues with the ticket information
          setTimeout(() => {
            addBotMessage(
              <>
                <p>I understand there may be some discrepancies in the ticket information. Could you please clarify what needs to be corrected?</p>
              </>
            );
          }, 800);
        }
        break;
          case 'draft-review':
        // Check if they confirm
        if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('correct') || text.toLowerCase().includes('good')) {
          setTimeout(() => {
            addBotMessage(
              <>
                <p>Great! Now I'll complete the draft with some additional context and formatting improvements. Here's the current KB article with our proposed additions:</p>
                  <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-blue-800">Original KB Article: Teams Hardware Compatibility Issues with New Devices</p>
                    <span className="text-xs text-gray-500">Last Updated: Mar 5, 2024</span>
                  </div>
                  
                  {/* Original Article Content */}
                  <div className="border rounded bg-white p-3 mb-4">
                    <h3 className="font-semibold mb-2 text-gray-800">Introduction</h3>
                    <p className="text-xs mb-2">This article documents known compatibility issues between Microsoft Teams and various hardware configurations, including webcams, microphones, and other peripherals.</p>
                    
                    <h3 className="font-semibold mb-2 mt-3 text-gray-800">Known Issues and Resolutions</h3>
                    
                    <p className="font-medium mb-1 text-gray-700">Surface Pro 10 Camera Issues (Feb 2024)</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs mb-3">
                      <li><strong>Symptom:</strong> Camera starts but freezes after 2-3 minutes during Teams meetings</li>
                      <li><strong>Cause:</strong> Power management settings</li>
                      <li><strong>Resolution:</strong> Update Surface firmware to v3.0.562 or newer</li>
                    </ul>
                    
                    <p className="font-medium mb-1 text-gray-700">HP EliteBook 860 Camera Color Distortion (Mar 2024)</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li><strong>Symptom:</strong> Camera image appears with blue/green tint only in Teams</li>
                      <li><strong>Resolution:</strong> Rollback camera driver to version 10.0.19041.3570</li>
                    </ul>
                    
                    {/* Visual indicator of where new content will be inserted */}
                    <div className="border-2 border-dashed border-green-300 rounded-md p-2 mt-4 bg-green-50/30 flex items-center justify-center">
                      <Edit3 className="text-green-600 mr-2" size={16} />
                      <span className="text-green-700 text-xs font-medium">New content will be inserted here</span>
                    </div>
                  </div>
                  
                  {/* Proposed Changes Section */}
                  <div className="bg-green-50 border-2 border-green-200 p-3 rounded-md mb-3">
                    <div className="flex items-center mb-2">
                      <Edit3 className="text-green-600 mr-2" size={16} />
                      <p className="text-green-800 font-semibold">Proposed Addition</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                      <p className="font-medium text-yellow-800 text-xs">New Known Issue (Added July 2025)</p>
                    </div>
                    
                    <div className="space-y-2 bg-white p-2 rounded">
                      <p className="mb-1"><strong>Device Model:</strong> Dell Latitude 7455</p>
                      <p className="mb-1"><strong>Symptom:</strong> Camera not detected in Teams (while functional in other apps)</p>
                      <p className="mb-1"><strong>Cause:</strong> Webcam firmware v3.2.7 introduces UVC signaling issues</p>
                      <p className="mb-1"><strong>Frequency:</strong> Affects all 7455 devices with firmware v3.2.7+</p>
                      <p className="mb-1"><strong>Impact:</strong> Unable to use camera during Teams meetings</p>
                    
                      <p className="font-medium text-blue-800 mt-3 mb-1">Resolution Steps</p>
                      <ol className="list-decimal pl-5 space-y-1 text-xs">
                        <li>Open Registry Editor (regedit) as Administrator</li>
                        <li>Navigate to HKLM\SYSTEM\CurrentControlSet\Control\Class\{'{'}6BDD1FC6-810F-11D0-BEC7-08002BE2092F{'}'}</li>
                        <li>Create a new DWORD value named "EnableUVCManagement" (if it doesn't exist)</li>
                        <li>Set the value to 0</li>
                        <li>Reboot the device</li>
                        <li>Update Teams to build 1.6.00.27919 or newer</li>
                      </ol>
                    
                      <div className="bg-gray-100 p-2 rounded mt-3 text-xs">
                        <p className="font-medium mb-1">Note for Support Teams:</p>
                        <p>This issue has been escalated to the Dell driver team for a permanent fix in a future firmware update (expected Aug 2025).</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview of how the full article will look */}
                  <div className="flex items-center mt-3 mb-2">
                    <CheckCircle className="text-blue-600 mr-2" size={16} />
                    <p className="text-blue-800 text-xs font-medium">After update, the article will have 3 known issues and resolutions</p>
                  </div>
                </div>
                
                <p className="mt-2">I've created a visual preview showing exactly how your KB article will look after this update. The green section shows the new content that will be added. Does this look accurate and ready for review?</p>
              </>
            );
            setCurrentStage('edit-feedback');
            setShowSuggestion(true);
          }, 1000);
        } else {
          // They want changes
          setTimeout(() => {
            addBotMessage(
              <p>I understand there are some adjustments needed. Please let me know what specific changes you'd like to make to the draft.</p>
            );
          }, 800);
        }
        break;
        
      case 'edit-feedback':
        // Check if they want changes
        if (text.toLowerCase().includes('improve') || text.toLowerCase().includes('change') || text.toLowerCase().includes('edit')) {
          setTimeout(() => {
            addBotMessage(
              <>                <p>I've enhanced the symptom description to make it more specific and easier to identify:</p>
                
                <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                  <div className="flex items-center mb-2">
                    <Edit3 className="text-blue-600 mr-2" size={16} />
                    <p className="font-medium text-blue-800">Updated Symptom Description</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                    <p className="font-medium text-yellow-800 text-xs">Changed Field</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 border rounded p-2 bg-gray-50">
                      <p className="text-xs text-gray-500 mb-1">Original:</p>
                      <p className="mb-1"><strong>Symptom:</strong> Camera not detected in Teams (while functional in other apps)</p>
                    </div>
                    
                    <div className="flex-1 border rounded p-2 bg-green-50">
                      <p className="text-xs text-green-600 mb-1">Updated:</p>
                      <p className="mb-1"><strong>Symptom:</strong> Camera appears disabled/grayed out specifically in Teams meetings despite working correctly in Camera app, Edge browser, and other video applications. Device Manager shows the camera as functioning properly.</p>
                    </div>
                  </div>
                </div>
                
                <p className="mt-2">I've made the symptom description more specific to help IT staff quickly confirm this exact issue. Does this look ready to publish?</p>
              </>
            );
            setCurrentStage('final-confirmation');
            setShowSuggestion(true);
          }, 1200);
        } else {
          // They approve as-is
          setTimeout(() => {
            addBotMessage(
              <p>Great! I'll prepare this for publishing. Would you like to save this update to the KB article now?</p>
            );
            setCurrentStage('final-confirmation');
            setShowSuggestion(true);
          }, 800);
        }
        break;
        
      case 'final-confirmation':
        // They confirm final version
        setTimeout(() => {
          addBotMessage(
            <>
              <div className="bg-green-50 p-3 rounded border border-green-200 flex items-center mb-3">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-green-800 font-medium">KB article successfully updated!</span>
              </div>
              
              <p>The Teams Camera Compatibility KB article has been updated with the new Dell Latitude 7455 information. Support teams will now be able to reference this solution.</p>
              
              <p className="mt-2">Is there anything else you'd like me to help you with today?</p>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 1500);
        break;
        
      default:
        // Generic response for anything after completion
        setTimeout(() => {
          addBotMessage(
            <p>Is there another KB article you'd like to update or something else I can help you with?</p>
          );
        }, 800);
    }
  };

  return (
    <div className="w-full flex flex-col h-full min-h-screen">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`${msg.type === 'user' ? 'justify-end' : 'justify-start'} flex`}>
            <div className={`max-w-[80%] ${
              msg.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
            } rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.type === 'user' ? (
                  <User size={16} className="text-blue-200" />
                ) : (
                  <Bot size={16} className="text-blue-500" />
                )}
                <span className="text-xs font-semibold">
                  {msg.type === 'user' ? 'You' : 'Copilot'}
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
      
      <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
        {showSuggestion && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-2">Suggested:</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setInput(getCurrentPromptSuggestion() || "")} 
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                {getCurrentPromptSuggestion()}
              </button>
              {currentStage === 'complete' && (
                <>
                  <button onClick={() => setInput("I have another KB article to update")} 
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                    I have another KB article to update
                  </button>
                  <button onClick={() => setInput("Show me all recent KB article updates")}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                    Show me all recent KB article updates
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-2 mb-3">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center transition"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </button>
        </form>
        
        <div className="py-3 border-t border-gray-200 text-center text-xs text-gray-500">
          © 2025 M365 Copilot Prototype
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseArticleChat;
