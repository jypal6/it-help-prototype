import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  timestamp: Date;
}

const TicketStatusChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    
    const initialUserMessage = "Can you tell me the latest on the ticket raised a few days back?";
    
    // Add user message
    setMessages([
      {
        id: '1',
        type: 'user',
        content: initialUserMessage,
        timestamp: new Date()
      }
    ]);
    
    // Simulate bot thinking and responding (only one response after a delay)
    setTimeout(() => {
      addBotMessage(
        <>
          <p>Sure. Here's the latest on your ticket:</p>
          
          <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
            <p className="mb-1"><strong> Ticket ID:</strong> 10482</p>
            <p className="mb-1"><strong> Issue:</strong> Outlook calendar events not syncing across Windows desktop app</p>
            <p className="mb-1"><strong> Created On:</strong> July 2, 2025</p>
            <p className="mb-1"><strong> Current Status:</strong> <span className="text-amber-600 font-medium">Under active investigation</span></p>
            <p className="mb-2"><strong> Last Updated:</strong> July 4, 9:45 AM</p>
            
            <div className="text-xs space-y-1 border-t border-blue-200 pt-2 mt-2">
              <p className="font-medium mb-1">Progress Summary:</p>
              <p><strong>Jul 2, 10:15 AM</strong> – Initial ticket created with Outlook calendar sync issue report</p>
              <p><strong>Jul 2, 11:30 AM</strong> – Assigned to Calendar Sync specialist team</p>
              <p><strong>Jul 3, 9:20 AM</strong> – Initial diagnostic logs review completed</p>
              <p><strong>Jul 3, 3:45 PM</strong> – Backend sync logs requested from Exchange team</p>
              <p><strong>Jul 4, 9:45 AM</strong> – Sync queue analysis in progress</p>
            </div>
            
            <div className="mt-3 pt-2 border-t border-blue-200 flex items-center">
              <Clock className="text-amber-600 mr-1" size={14} />
              <span className="text-xs text-amber-800">Estimated resolution: <strong>1-2 business days</strong></span>
            </div>
          </div>
          <p className="mt-2 text-sm">We'll notify you as soon as there's an update or resolution. The team is prioritizing this issue and investigating potential issues with backend sync processes.</p>
        </>
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

  const handleWhyTakingLong = () => {
    addUserMessage("Why is this taking so long?");
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      addBotMessage(
        <>
          <p>Thanks for checking in. Here's what's happening with ticket <span className="font-mono bg-gray-100 px-1 rounded">10482</span>:</p>
          
          <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
            <p className="mb-2"><strong> Investigation Status:</strong> This issue is tied to backend sync processes and requires examining diagnostic logs.</p>
            
            <div className="space-y-1 text-xs">
              <p className="flex items-start">
                <span className="font-medium w-20 flex-shrink-0">Jul 2, 10:15</span>
                <span>� Initial ticket created</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium w-20 flex-shrink-0">Jul 3, 9:20</span>
                <span>� Initial diagnostic logs review</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium w-20 flex-shrink-0">Jul 4, 9:45</span>
                <span>� Sync queue analysis in progress</span>
              </p>
            </div>
            
            <div className="mt-2 pt-2 border-t border-blue-200 flex items-center">
              <Clock className="text-amber-600 mr-1" size={14} />
              <span className="text-xs text-amber-800">Estimated resolution: <strong>1-2 business days</strong></span>
            </div>
          </div>
          
          <p className="mt-2 text-sm">Our team is working on it and will provide an update as soon as possible.</p>
        </>
      );
    }, 800);
  };

  const handleTicketUpdates = () => {
    addUserMessage("Can I make updates to the ticket?");
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      addBotMessage(
        <>
          <p>Yes, you can make updates to your ticket. This helps our support team better understand your issue.</p>
          
          <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
            <p className="font-medium text-blue-800 mb-2"> Update Ticket #10482</p>
            
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Additional information:</label>
              <textarea 
                placeholder="Describe any new observations or details..."
                className="w-full p-2 border border-gray-300 rounded text-xs h-16"
              />
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs"
                onClick={() => {
                  setTimeout(() => {
                    addBotMessage(
                      <>
                        <div className="bg-green-50 p-2 rounded border border-green-200 flex items-center text-sm">
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-green-800">Ticket #10482 has been updated successfully</span>
                        </div>
                        <p className="mt-2 text-sm">The support team has been notified of your update.</p>
                      </>
                    );
                  }, 500);
                }}
              >
                Submit Update
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-xs">
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    }, 800);
  };

  const handleAddDetails = () => {
    addUserMessage("Can I add more details to my ticket?");
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      addBotMessage(
        <>
          <p>Yes, you can add more details to your ticket. This helps our support team better understand your issue.</p>
          
          <div className="mt-2 bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-sm">
            <p className="font-medium text-blue-800 mb-2"> Add Details to Ticket #10482</p>
            
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Additional information:</label>
              <textarea 
                placeholder="Describe any new observations or details..."
                className="w-full p-2 border border-gray-300 rounded text-xs h-16"
              />
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs"
                onClick={() => {
                  setTimeout(() => {
                    addBotMessage(
                      <>
                        <div className="bg-green-50 p-2 rounded border border-green-200 flex items-center text-sm">
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-green-800">Additional information added to ticket #10482</span>
                        </div>
                        <p className="mt-2 text-sm">The support team has been notified of your update.</p>
                      </>
                    );
                  }, 500);
                }}
              >
                Submit Information
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-xs">
                Cancel
              </button>
            </div>
          </div>
          
          <p className="mt-2 text-xs">You can also reply directly to the email notification you received to add more information.</p>
        </>
      );
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addUserMessage(input);

    setTimeout(() => {
      const lower = input.toLowerCase();
      if (lower.includes("why") && lower.includes("long")) {
        // Only trigger the 'why is this taking so long' flow
        handleWhyTakingLong();
      } else if (lower.includes("notif") || lower.includes("update")) {
        // Use the ticket updates flow
        handleTicketUpdates();
      } else if (lower.includes("add") && (lower.includes("detail") || lower.includes("info"))) {
        // Only trigger the add details flow
        handleAddDetails();
      }
    }, 500);
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
              <button onClick={() => setInput("What's the status of my ticket?")} 
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                What's the status of my ticket?
              </button>
              <button onClick={() => setInput("Why is this taking so long?")}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                Why is this taking so long?
              </button>
              <button onClick={() => setInput("Can I make updates to the ticket?")}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                Can I make updates to the ticket?
              </button>
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

export default TicketStatusChat;
