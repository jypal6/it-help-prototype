import React, { useState } from 'react';

// Define a type for all stages of the flow
type FlowStage = 
  | 'initial'
  | 'ticket-shared'
  | 'kb-selection'
  | 'draft-review'
  | 'edit-feedback'
  | 'final-confirmation'
  | 'complete';

// Define a type for our message objects
interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  markdown?: boolean;
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

// Helper function to convert markdown to HTML with improved formatting
function convertMarkdownToHTML(markdown: string): string {
  // Handle lists properly
  let html = markdown;
  
  // Convert markdown lists to HTML lists
  let bulletListItems = html.match(/^- (.+)$/gm);
  if (bulletListItems) {
    bulletListItems.forEach(item => {
      html = html.replace(item, "<li>" + item.substring(2) + "</li>");
    });
    html = html.replace(/<li>.*?<\/li>/gs, "<ul>$&</ul>");
  }
  
  // Convert numbered lists to HTML
  let numberedListItems = html.match(/^\d+\. (.+)$/gm);
  if (numberedListItems) {
    numberedListItems.forEach(item => {
      const content = item.replace(/^\d+\. /, "");
      html = html.replace(item, "<li>" + content + "</li>");
    });
    html = html.replace(/<li>.*?<\/li>/gs, "<ol>$&</ol>");
  }
  
  // Convert paragraphs
  html = html.split("\n\n").map(para => {
    if (!para.startsWith("<ul>") && !para.startsWith("<ol>") && para.trim()) {
      // Handle headings with emoji
      if (/^[#🆕✅🛑📝📘]/.test(para)) {
        return "<div class=\"font-semibold my-2\">" + para + "</div>";
      }
      return "<p>" + para + "</p>";
    }
    return para;
  }).join("");
  
  // Convert **bold** text
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
  // Convert *italic* text  
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
  return html;
}

// Component for the KB Article Chat
const KnowledgeBaseArticleChat: React.FC = () => {
  // State for the user's input
  const [input, setInput] = useState('');
  
  // State for tracking the current stage of our flow
  const [currentStage, setCurrentStage] = useState<FlowStage>('initial');
  
  // State for selected KB article
  const [selectedKBArticle, setSelectedKBArticle] = useState<string | null>(null);
  
  // State for chat history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'user',
      text: initialPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      role: 'ai',
      text: 'Sure. Please share the link to the IT ticket you\'d like me to review.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Function to get the current prompt suggestion based on the flow stage
  const getCurrentPromptSuggestion = () => {
    switch (currentStage) {
      case 'initial':
        return "Here's the ticket: https://support.corp.com/ticket/TSK-24581";
      case 'kb-selection':
        return "Let's go with the second one.";
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
  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;

    // Create a new message from the user
    const userMessage: ChatMessage = {
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add the user message to the chat
    setMessages(prev => [...prev, userMessage]);
    
    // Clear the input
    setInput('');
    
    // Process the message based on current stage
    handleMessageByStage(text);
  };

  // Function to handle AI response based on the current stage
  const handleMessageByStage = (text: string) => {
    // A helper to add an AI message with a delay to simulate "typing"
    const addAIResponse = (responseText: string, markdown: boolean = false, callback?: () => void) => {
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          role: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          markdown
        };
        setMessages(prev => [...prev, aiMessage]);
        if (callback) callback();
      }, 1000); // 1 second delay for a more natural conversation feel
    };

    // Handle the flow based on current stage
    switch(currentStage) {
      case 'initial':
        // If the user shared a ticket link
        if (text.includes('https://support.corp.com/ticket/')) {
          addAIResponse("Thanks! Reviewing ticket TSK-24581...\n\nBased on the issue and resolution details, I found three potentially related KB articles:\n\n1. Resolving Camera Issues in Microsoft Teams (2023)\n2. Teams Hardware Compatibility Issues with New Devices\n3. Common Teams App Troubleshooting on Windows\n\nPlease select the one you'd like to update.");
          setCurrentStage('kb-selection');
        } else {
          addAIResponse("I'm looking for a ticket link like https://support.corp.com/ticket/TSK-##### to review the issue details.");
        }
        break;
      
      case 'kb-selection':
        // Handle all article selections
        const handleArticleSelection = (articleId: string, title: string) => {
          setSelectedKBArticle(articleId);
          addAIResponse("Got it. Let me extract the new issue and resolution details from the ticket.\n\n🛑 **New Issue Identified:**\n\n- Teams camera not working on new Dell Latitude 7455 devices\n- Occurs only when new webcam firmware version 3.2.7 is active\n\n✅ **Confirmed Resolution:**\n\n- Manually disable UVC enhanced power management via registry\n- Update Teams to latest internal build 1.6.00.27919", true, 
            // Callback to send the next message after a delay
            () => {
              setTimeout(() => {
                addAIResponse("Now that I've gathered that, I'll prepare a draft update and identify where this new content should be inserted.\n\n📝 **Draft Update for KB Article – " + title + ":**\n\n🆕 **New Known Issue (Added July 2025)**\n- **Device Model:** Dell Latitude 7455\n- **Symptom:** Camera not detected in Teams (while functional in other apps)\n- **Cause:** Webcam firmware v3.2.7 introduces UVC signaling issues\n\n**Resolution:**\n\n1. Launch regedit\n2. Navigate to HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{6BDD1FC6-810F-11D0-BEC7-08002BE2092F}\n3. Set EnableUVCManagement = 0\n4. Reboot device and update Teams to build 1.6.00.27919\n\nDoes this look accurate so far?", true);
                setCurrentStage('draft-review');
              }, 2000);
            }
          );
        };
        
        // Route based on selected article
        if (text.toLowerCase().includes('second') || text.includes('2')) {
          handleArticleSelection('kb002', 'Teams Hardware Compatibility Issues with New Devices');
        } else if (text.toLowerCase().includes('first') || text.includes('1')) {
          handleArticleSelection('kb001', 'Resolving Camera Issues in Microsoft Teams (2023)');
        } else if (text.toLowerCase().includes('third') || text.includes('3')) {
          handleArticleSelection('kb003', 'Common Teams App Troubleshooting on Windows');
        } else {
          addAIResponse("I'm not sure which article you want to update. Please select one of the articles listed above.");
        }
        break;
        
      case 'draft-review':
        // If the user confirmed the draft
        if (text.toLowerCase().includes('correct') || text.toLowerCase().includes('good') || text.toLowerCase().includes('yes')) {
          addAIResponse("I'll now integrate this content into the selected KB article and highlight the changes.\n\n📘 **Updated KB Preview:**\n\n- Inserted \"🆕 New Known Issue\" section below June 2024 entries\n- Updated metadata tags to include firmware, Dell 7455, Teams-camera\n\nDo you want to review the full draft?", true);
          setCurrentStage('edit-feedback');
        } else {
          addAIResponse("Got it. Let me know what corrections are needed for the draft.");
        }
        break;
        
      case 'edit-feedback':
        // If the user wants to improve the issue description
        if (text.toLowerCase().includes('improve') || text.toLowerCase().includes('description')) {
          addAIResponse("Sure. Updated section:\n\n**Symptom:** In Teams, camera is listed as \"Not found\" in device settings. Device Manager shows webcam present. Works in Zoom or Camera app.\n\nHere is the revised KB draft. Please confirm.", true);
          setCurrentStage('final-confirmation');
        } else {
          addAIResponse("I'll make those revisions. Would you like to see the updated draft?");
        }
        break;
        
      case 'final-confirmation':
        // If the user confirms the final version
        if (text.toLowerCase().includes('perfect') || text.toLowerCase().includes('save') || text.toLowerCase().includes('go ahead')) {
          addAIResponse("Done. I've saved and submitted the KB article update for publishing. It's now queued for review and linked to ticket TSK-24581 for traceability.");
          setCurrentStage('complete');
        } else {
          addAIResponse("I'll make those additional changes. Let me know when it looks good to finalize.");
        }
        break;
        
      default:
        addAIResponse("I'm not sure what to do next. Could you please clarify?");
    }
  };

  // Handle KB article selection
  const handleKBArticleSelection = (articleIndex: number) => {
    switch(articleIndex) {
      case 0:
        sendMessage("Let's go with the first one.");
        break;
      case 1:
        sendMessage("Let's go with the second one.");
        break;
      case 2:
        sendMessage("Let's go with the third one.");
        break;
      default:
        sendMessage("Let's go with this one.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Message header with avatar and timestamp */}
              <div className="flex items-center space-x-2 mb-2">
                {message.role === 'ai' ? (
                  <>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100">
                      <span className="text-blue-600 text-xs">AI</span>
                    </div>
                    <span className="text-xs text-gray-500">Copilot</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-600">
                      <span className="text-white text-xs">You</span>
                    </div>
                    <span className="text-xs text-gray-500">You</span>
                  </>
                )}
                <span className="text-xs text-gray-400">{message.timestamp}</span>
              </div>
              
              {/* Message content with improved styling for lists and paragraphs */}
              {message.markdown ? (
                <div className="prose prose-sm max-w-none prose-ul:mt-2 prose-ul:mb-2 prose-ol:mt-2 prose-ol:mb-2 prose-li:my-0.5 prose-p:my-1" 
                     dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(message.text) }} />
              ) : (
                <div className="prose prose-sm max-w-none whitespace-pre-line">
                  {message.text}
                </div>
              )}
              
              {/* KB Selection UI */}
              {currentStage === 'kb-selection' && message.role === 'ai' && message === messages[messages.length - 1] && (
                <div className="mt-4 border-t border-gray-200 pt-3 space-y-2">
                  {kbArticles.map((article, idx) => (
                    <div key={article.id} 
                         onClick={() => handleKBArticleSelection(idx)}
                         className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${
                           selectedKBArticle === article.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                         }`}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-full border ${
                          selectedKBArticle === article.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}>
                          {selectedKBArticle === article.id && (
                            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{idx + 1}. {article.title}</div>
                          <div className="text-xs text-gray-500">Last updated: {article.lastUpdated}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 bg-white p-4">
        {/* Prompt suggestion directly above the input */}
        {getCurrentPromptSuggestion() && currentStage !== 'kb-selection' && (
          <div className="mb-2">
            <button
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => {
                const suggestion = getCurrentPromptSuggestion();
                if (suggestion) {
                  sendMessage(suggestion);
                }
              }}
            >
              {getCurrentPromptSuggestion()}
            </button>
          </div>
        )}
        
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 resize-none"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => sendMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseArticleChat;
