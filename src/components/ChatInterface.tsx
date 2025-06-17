import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Share2, MessageCircle, User, Bot } from 'lucide-react';

interface ChatInterfaceProps {
  selectedStarter: string;
  onScreenShare: () => void;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'action';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedStarter, onScreenShare, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation based on selected starter
    if (selectedStarter === 'camera-issue') {
      const initialMessages: Message[] = [
        {
          id: '1',
          text: "Hello! I'm your IT Help Desk agent. I see you're having camera issues. I'm here to help you resolve this quickly.",
          sender: 'agent',
          timestamp: new Date()
        },
        {
          id: '2',
          text: "To better assist you, could you please describe the specific issue you're experiencing with your camera?",
          sender: 'agent',
          timestamp: new Date()
        }
      ];
      setMessages(initialMessages);
    }
  }, [selectedStarter]);

  const addMessage = (text: string, sender: 'user' | 'agent', type: 'text' | 'action' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAgentResponse = (userMessage: string, step: number) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (step === 0) {
        addMessage("I understand you're having camera issues in Teams. This is a common problem that we can resolve together.", 'agent');
        setTimeout(() => {
          addMessage("To provide you with the most accurate assistance, I'd like to see exactly what you're experiencing. Would you be able to share your screen with me?", 'agent');
          setTimeout(() => {
            addMessage("I'll guide you through the troubleshooting process step by step once we start screen sharing.", 'agent', 'action');
          }, 1000);
        }, 1500);
      } else if (step === 1) {
        addMessage("Perfect! I can see your screen now. Let me guide you through resolving this camera issue.", 'agent');
        setTimeout(() => {
          onScreenShare();
        }, 1500);
      }
      
      setCurrentStep(step + 1);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, 'user');
      const userMessage = inputValue;
      setInputValue('');
      simulateAgentResponse(userMessage, currentStep);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleScreenShareClick = () => {
    addMessage("I'm ready to share my screen for troubleshooting.", 'user');
    simulateAgentResponse("screen share", 1);
  };

  return (
    <div className="h-screen flex flex-col bg-white pt-10 pb-6">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">IT Help Desk</h1>
                <p className="text-sm text-green-600">Online • Ready to help</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleScreenShareClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Screen</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-2xl">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;