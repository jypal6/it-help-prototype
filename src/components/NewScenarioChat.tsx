import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, CheckCircle, User, Bot } from 'lucide-react';

// Define a type for all stages of the flow
type FlowStage = 
  | 'initial'
  | 'data-collection'
  | 'analysis'
  | 'recommendations'
  | 'complete';

// Define a type for our message objects
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  timestamp: Date;
}

// Initial prompt that is automatically injected
const initialPrompt = "I need help with the new scenario.";

// Component for the New Scenario Chat
const NewScenarioChat: React.FC = () => {
  // State for the user's input
  const [input, setInput] = useState('');
  
  // State for tracking the current stage of our flow
  const [currentStage, setCurrentStage] = useState<FlowStage>('initial');
  
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
        <p>I'd be happy to help with the new scenario. Could you please provide more details about what you're looking for?</p>
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
        return "I need help with [specific scenario details].";
      case 'data-collection':
        return "Here's the additional information you requested.";
      case 'analysis':
        return "That analysis looks correct.";
      case 'recommendations':
        return "I'd like to implement the first recommendation.";
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
  
  // Handle messages based on the current stage
  const handleMessageByStage = (text: string) => {
    // Skip empty messages
    if (!text.trim()) return;
    
    // Process based on current stage
    switch (currentStage) {
      case 'initial':
        // Example response for initial stage
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Thank you for providing those details. To better assist you, I'll need some additional information:</p>
              
              <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                <p className="font-medium text-blue-800 mb-2">Additional Information Needed</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>When did you first notice this issue?</li>
                  <li>What systems or services are affected?</li>
                  <li>Have you tried any solutions already?</li>
                </ul>
              </div>
            </>
          );
          setCurrentStage('data-collection');
          setShowSuggestion(true);
        }, 1000);
        break;
        
      case 'data-collection':
        // Move to analysis stage after collecting data
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Based on the information you've provided, I've analyzed the situation:</p>
              
              <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                <p className="font-medium text-blue-800 mb-2">Analysis</p>
                <p className="mb-2">The issue appears to be related to [analysis details].</p>
                <p>The root cause is likely [root cause details].</p>
              </div>
              
              <p className="mt-2">Does this analysis align with your understanding of the situation?</p>
            </>
          );
          setCurrentStage('analysis');
          setShowSuggestion(true);
        }, 1200);
        break;
        
      case 'analysis':
        // Provide recommendations based on analysis
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Based on our analysis, here are my recommendations:</p>
              
              <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
                <p className="font-medium text-blue-800 mb-2">Recommendations</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <p className="font-medium">Short-term solution:</p>
                    <p className="text-sm">Implement [short-term solution details].</p>
                  </li>
                  <li>
                    <p className="font-medium">Mid-term improvement:</p>
                    <p className="text-sm">Consider [mid-term solution details].</p>
                  </li>
                  <li>
                    <p className="font-medium">Long-term strategy:</p>
                    <p className="text-sm">Develop [long-term strategy details].</p>
                  </li>
                </ol>
              </div>
              
              <p className="mt-2">Which of these recommendations would you like to explore further?</p>
            </>
          );
          setCurrentStage('recommendations');
          setShowSuggestion(true);
        }, 1000);
        break;
        
      case 'recommendations':
        // Complete the scenario
        setTimeout(() => {
          addBotMessage(
            <>
              <div className="bg-green-50 p-3 rounded border border-green-200 flex items-center mb-3">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-green-800 font-medium">Plan created successfully!</span>
              </div>
              
              <p>I've created a detailed implementation plan for the recommendation you selected. You can find it in your notification center.</p>
              
              <p className="mt-2">Is there anything else you'd like help with today?</p>
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
            <p>Is there another scenario you'd like help with today?</p>
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
                  <button onClick={() => setInput("I have another scenario to discuss")} 
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                    I have another scenario to discuss
                  </button>
                  <button onClick={() => setInput("No thanks, that's all for now")}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                    No thanks, that's all for now
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

export default NewScenarioChat;
