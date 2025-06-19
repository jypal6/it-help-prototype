import React, { useState } from 'react';

// A simpler version of the KB Article Chat
const SimpleKnowledgeBaseArticleChat: React.FC = () => {
  // State for the user's input
  const [input, setInput] = useState('');
  
  // State for chat history
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'I can help you create or update a KB article. What would you like to do?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Function to handle sending a message
  const sendMessage = () => {
    if (!input.trim()) return;

    // Create a new message from the user
    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add the user message to the chat
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'ai',
        text: `I'll help you with that request about: "${input}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    // Clear the input
    setInput('');
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
              
              {/* Message content */}
              <div className="prose prose-sm max-w-none whitespace-pre-line">
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 bg-white p-4">
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
            onClick={sendMessage}
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

export default SimpleKnowledgeBaseArticleChat;
