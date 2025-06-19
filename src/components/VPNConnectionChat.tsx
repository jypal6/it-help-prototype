import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, User, Bot, Laptop, Smartphone, Lock, ExternalLink } from 'lucide-react';

// Define a type for all stages of the flow
type FlowStage = 
  | 'initial'
  | 'device-selection'
  | 'instructions'
  | 'follow-up'
  | 'complete';

// Define a type for our message objects
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  timestamp: Date;
}

// Define device types
type DeviceType = 'windows' | 'macos' | 'mobile';

// Initial prompt that is automatically injected
const initialPrompt = "How do I connect to VPN from home?";

// Component for the VPN Connection Chat
const VPNConnectionChat: React.FC = () => {
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
        <>
          <p>Sure, I can help with that. First, let's make sure I guide you based on your device. Are you using:</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <button 
              onClick={() => handleDeviceSelection('windows')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              <Laptop size={16} />
              <span>Windows</span>
            </button>
            
            <button 
              onClick={() => handleDeviceSelection('macos')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              <Laptop size={16} />
              <span>macOS</span>
            </button>
            
            <button 
              onClick={() => handleDeviceSelection('mobile')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              <Smartphone size={16} />
              <span>Mobile device (iOS or Android)</span>
            </button>
          </div>
          
          <p className="mt-3">Please select one.</p>
        </>
      );
      
      setCurrentStage('device-selection');
      
      // Show suggestions after a delay
      setTimeout(() => {
        setShowSuggestion(true);
        scrollToBottom();
      }, 500);
    }, 800);
  }, []);
    // Scroll to bottom whenever messages change
  useEffect(() => {
    console.log("Messages updated:", messages);
    scrollToBottom();
  }, [messages]);  // Function to handle device selection
  const handleDeviceSelection = (device: DeviceType) => {
    console.log("Device selected:", device);
    
    // Add user selection as a message
    const deviceText = device === 'windows' ? "Windows" : device === 'macos' ? "macOS" : "Mobile device";
    addUserMessage(deviceText);
    
    // Use a more direct approach instead of calling handleMessageByStage
    setTimeout(() => {
      if (device === 'windows') {
        addWindowsInstructions();
      } else if (device === 'macos') {
        addMacOSInstructions();
      } else if (device === 'mobile') {
        addMobileInstructions();
      }
    }, 1000);
  };
  
  // Separated functions for each device type to ensure cleaner code
  const addWindowsInstructions = () => {
    console.log("Adding Windows instructions");
    addBotMessage(
      <>
        <p>Great! Here's how you can connect to the VPN from a Windows device:</p>
        
        <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="font-medium text-blue-800 flex items-center mb-3">
            <Lock className="mr-2" size={18} />
            Step-by-step VPN Setup for Windows:
          </p>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Open <strong>Settings</strong> → <strong>Network & Internet</strong> → <strong>VPN</strong></span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Click <strong>Add a VPN connection</strong></span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Use the following:</span>
            </li>
          </ol>
          
          <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
            <li>• VPN provider: <strong>Windows (built-in)</strong></li>
            <li>• Connection name: <strong>CorpVPN</strong></li>
            <li>• Server name/address: <strong>vpn.companydomain.com</strong></li>
            <li>• VPN type: <strong>L2TP/IPsec with pre-shared key</strong></li>
            <li>• Pre-shared key: <strong>[hidden]</strong></li>
          </ul>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={4}>
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Enter your corporate credentials (username/password)</span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
              <span>Click <strong>Save</strong> and return to the VPN menu</span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
              <span>Select <strong>CorpVPN</strong> and click <strong>Connect</strong></span>
            </li>
          </ol>
        </div>
        
        <p className="mt-3">Need help finding your VPN credentials or facing an error?</p>
      </>
    );
    setCurrentStage('instructions');
    setShowSuggestion(true);
  };
  
  const addMacOSInstructions = () => {
    console.log("Adding macOS instructions");
    addBotMessage(
      <>
        <p>Great! Here's how you can connect to the VPN from a macOS device:</p>
        
        <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="font-medium text-blue-800 flex items-center mb-3">
            <Lock className="mr-2" size={18} />
            Step-by-step VPN Setup for macOS:
          </p>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Open <strong>System Preferences</strong> → <strong>Network</strong></span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Click the <strong>+</strong> button to add a new service</span>
            </li>
            
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>From the dropdown menus, select:</span>
            </li>
          </ol>
          
          <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
            <li>• Interface: <strong>VPN</strong></li>
            <li>• VPN Type: <strong>L2TP over IPSec</strong></li>
            <li>• Service Name: <strong>CorpVPN</strong></li>
          </ul>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={4}>
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Click <strong>Create</strong> and then configure:</span>
            </li>
          </ol>
          
          <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
            <li>• Server Address: <strong>vpn.companydomain.com</strong></li>
            <li>• Account Name: <strong>Your corporate username</strong></li>
          </ul>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={5}>
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
              <span>Click <strong>Authentication Settings</strong> and enter:</span>
            </li>
          </ol>
          
          <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
            <li>• Password: <strong>Your corporate password</strong></li>
            <li>• Shared Secret: <strong>[hidden]</strong></li>
          </ul>
          
          <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={6}>
            <li className="flex items-start">
              <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
              <span>Click <strong>OK</strong>, then <strong>Apply</strong>, then <strong>Connect</strong></span>
            </li>
          </ol>
        </div>
        
        <p className="mt-3">Need help finding your VPN credentials or facing an error?</p>
      </>
    );
    setCurrentStage('instructions');
    setShowSuggestion(true);
  };
  
  const addMobileInstructions = () => {
    console.log("Adding mobile instructions");
    addBotMessage(
      <>
        <p>Great! Here's how you can connect to the VPN from a mobile device:</p>
        
        <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="font-medium text-blue-800 flex items-center mb-3">
            <Lock className="mr-2" size={18} />
            Step-by-step VPN Setup for Mobile:
          </p>
          
          <div className="mb-4">
            <p className="font-medium text-blue-700 mb-2">For iOS:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>Download our secure VPN app from the App Store: <strong>CompanyVPN</strong></span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>Open the app and sign in with your corporate credentials</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Tap <strong>Connect</strong> and accept any security prompts</span>
              </li>
            </ol>
          </div>
          
          <div>
            <p className="font-medium text-blue-700 mb-2">For Android:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>Download our secure VPN app from Google Play: <strong>CompanyVPN</strong></span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>Open the app and sign in with your corporate credentials</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Tap <strong>Connect</strong> and grant any requested permissions</span>
              </li>
            </ol>
          </div>
        </div>
        
        <p className="mt-3">Need help finding your VPN credentials or facing an error with the mobile app?</p>
      </>
    );
    setCurrentStage('instructions');
    setShowSuggestion(true);
  };
  
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
    console.log("Adding bot message");
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
      case 'device-selection':
        return "Windows";
      case 'instructions':
        return "I don't know the pre-shared key.";
      case 'follow-up':
        return "How do I update my VPN client?";
      case 'complete':
        return "I'm getting a connection error.";
      default:
        return null;
    }
  };

  // Function to get additional suggestions based on the current stage
  const getAdditionalSuggestions = () => {
    switch (currentStage) {
      case 'instructions':
        return [
          "I'm getting an error during connection.",
          "Where do I find my corporate credentials?"
        ];
      case 'follow-up':
        return [
          "How do I disconnect from VPN?",
          "Is there a mobile VPN app available?"
        ];
      case 'complete':
        return [
          "How secure is the VPN connection?",
          "Can I use VPN on public Wi-Fi?"
        ];
      default:
        return [];
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
    
    console.log("Processing message:", text, "Current stage:", currentStage);
    
    // Process based on current stage and device type
    if (currentStage === 'device-selection') {
      // Force exact matching for device types
      const deviceType = text.toLowerCase();
      if (deviceType === 'windows') {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Great! Here's how you can connect to the VPN from a Windows device:</p>
              
              <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-medium text-blue-800 flex items-center mb-3">
                  <Lock className="mr-2" size={18} />
                  Step-by-step VPN Setup for Windows:
                </p>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Open <strong>Settings</strong> → <strong>Network & Internet</strong> → <strong>VPN</strong></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Click <strong>Add a VPN connection</strong></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Use the following:</span>
                  </li>
                </ol>
                
                <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
                  <li>• VPN provider: <strong>Windows (built-in)</strong></li>
                  <li>• Connection name: <strong>CorpVPN</strong></li>
                  <li>• Server name/address: <strong>vpn.companydomain.com</strong></li>
                  <li>• VPN type: <strong>L2TP/IPsec with pre-shared key</strong></li>
                  <li>• Pre-shared key: <strong>[hidden]</strong></li>
                </ul>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={4}>
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>Enter your corporate credentials (username/password)</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                    <span>Click <strong>Save</strong> and return to the VPN menu</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                    <span>Select <strong>CorpVPN</strong> and click <strong>Connect</strong></span>
                  </li>
                </ol>
              </div>
              
              <p className="mt-3">Need help finding your VPN credentials or facing an error?</p>
            </>
          );          setCurrentStage('instructions');
          setShowSuggestion(true);
        }, 1000);
      } else if (deviceType === 'macos') {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Great! Here's how you can connect to the VPN from a macOS device:</p>
              
              <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-medium text-blue-800 flex items-center mb-3">
                  <Lock className="mr-2" size={18} />
                  Step-by-step VPN Setup for macOS:
                </p>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Open <strong>System Preferences</strong> → <strong>Network</strong></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Click the <strong>+</strong> button to add a new service</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>From the dropdown menus, select:</span>
                  </li>
                </ol>
                
                <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
                  <li>• Interface: <strong>VPN</strong></li>
                  <li>• VPN Type: <strong>L2TP over IPSec</strong></li>
                  <li>• Service Name: <strong>CorpVPN</strong></li>
                </ul>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={4}>
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>Click <strong>Create</strong> and then configure:</span>
                  </li>
                </ol>
                
                <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
                  <li>• Server Address: <strong>vpn.companydomain.com</strong></li>
                  <li>• Account Name: <strong>Your corporate username</strong></li>
                </ul>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={5}>
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                    <span>Click <strong>Authentication Settings</strong> and enter:</span>
                  </li>
                </ol>
                
                <ul className="pl-14 mt-2 mb-3 space-y-2 text-gray-700">
                  <li>• Password: <strong>Your corporate password</strong></li>
                  <li>• Shared Secret: <strong>[hidden]</strong></li>
                </ul>
                
                <ol className="list-decimal pl-6 space-y-3 text-gray-700" start={6}>
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                    <span>Click <strong>OK</strong>, then <strong>Apply</strong>, then <strong>Connect</strong></span>
                  </li>
                </ol>
              </div>
              
              <p className="mt-3">Need help finding your VPN credentials or facing an error?</p>
            </>
          );          setCurrentStage('instructions');
          setShowSuggestion(true);
        }, 1000);
      } else if (deviceType === 'mobile') {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Great! Here's how you can connect to the VPN from a mobile device:</p>
              
              <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-medium text-blue-800 flex items-center mb-3">
                  <Lock className="mr-2" size={18} />
                  Step-by-step VPN Setup for Mobile:
                </p>
                
                <div className="mb-4">
                  <p className="font-medium text-blue-700 mb-2">For iOS:</p>
                  <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Download our secure VPN app from the App Store: <strong>CompanyVPN</strong></span>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Open the app and sign in with your corporate credentials</span>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Tap <strong>Connect</strong> and accept any security prompts</span>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <p className="font-medium text-blue-700 mb-2">For Android:</p>
                  <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Download our secure VPN app from Google Play: <strong>CompanyVPN</strong></span>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Open the app and sign in with your corporate credentials</span>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Tap <strong>Connect</strong> and grant any requested permissions</span>
                    </li>
                  </ol>
                </div>
              </div>
              
              <p className="mt-3">Need help finding your VPN credentials or facing an error with the mobile app?</p>
            </>
          );
          setCurrentStage('instructions');
          setShowSuggestion(true);
        }, 1000);
      }
    } else if (currentStage === 'instructions') {
      if (text.toLowerCase().includes("don't know") || text.toLowerCase().includes("pre-shared key") || text.toLowerCase().includes("shared secret")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>No problem — you can retrieve it from the internal secure portal:</p>
              
              <div className="mt-2 mb-2 flex items-center">
                <a 
                  href="https://secure.companydomain.com/keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <ExternalLink size={16} className="mr-2" />
                  secure.companydomain.com/keys
                </a>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">(You'll need to be on the intranet or use MFA.)</p>
              
              <p>Anything else you'd like help with?</p>
            </>
          );
          setCurrentStage('follow-up');
          setShowSuggestion(true);
        }, 800);
      } else if (text.toLowerCase().includes("error") || text.toLowerCase().includes("issue") || text.toLowerCase().includes("problem")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>I understand you're having trouble connecting. Let's troubleshoot the most common VPN connection issues:</p>
              
              <div className="mt-3 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 mb-3">Common VPN Issues and Solutions:</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">1. Incorrect credentials</p>
                    <p className="text-sm">Double-check your username and password. Remember that your VPN credentials might be different from your regular login.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">2. Wrong pre-shared key/shared secret</p>
                    <p className="text-sm">Verify the pre-shared key from our secure portal: <a href="https://secure.companydomain.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">secure.companydomain.com/keys</a></p>
                  </div>
                  
                  <div>
                    <p className="font-medium">3. Network restrictions</p>
                    <p className="text-sm">Some public networks block VPN connections. Try using a different network or mobile hotspot.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">4. Outdated VPN client</p>
                    <p className="text-sm">Ensure you're using the latest version of the VPN client or have the latest OS updates.</p>
                  </div>
                </div>
                
                <p className="mt-3 text-sm">If you're still experiencing issues, please contact the IT Help Desk at 1-800-555-1234 or <a href="mailto:helpdesk@companydomain.com" className="text-blue-600 hover:underline">helpdesk@companydomain.com</a></p>
              </div>
              
              <p className="mt-3">Is there a specific error message you're seeing?</p>
            </>
          );
          setCurrentStage('follow-up');
          setShowSuggestion(true);
        }, 800);
      } else if (text.toLowerCase().includes("credential") || text.toLowerCase().includes("username") || text.toLowerCase().includes("password")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>To find your VPN credentials:</p>
              
              <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Go to the <a href="https://id.companydomain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">corporate identity portal</a></span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Sign in with your regular company account</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Select "VPN Access" from the left menu</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span>Your VPN username will be displayed (usually the same as your email prefix)</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="mr-2 bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                    <span>If you need to reset your VPN password, click the "Reset VPN Password" button</span>
                  </li>
                </ol>
              </div>
              
              <p className="mt-3">Is there anything else you need help with?</p>
            </>
          );
          setCurrentStage('follow-up');
          setShowSuggestion(true);
        }, 800);
      } else {
        // Generic response for other queries during the instructions stage
        setTimeout(() => {
          addBotMessage(
            <p>I understand. Is there something specific about the VPN setup process you'd like me to clarify?</p>
          );
          setShowSuggestion(true);
        }, 800);
      }
    } else if (currentStage === 'follow-up' || currentStage === 'complete') {
      if (text.toLowerCase().includes("update") || text.toLowerCase().includes("latest version")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Here's how to update your VPN client:</p>
              
              <div className="mt-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-medium text-green-800 mb-3">Updating Your VPN Client:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-green-700">For Windows Built-in VPN:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Windows VPN is part of the operating system</li>
                      <li>Make sure Windows is up to date by going to Settings → Update & Security → Check for Updates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-700">For macOS Built-in VPN:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>macOS VPN is part of the operating system</li>
                      <li>Update macOS by going to System Preferences → Software Update</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-green-700">For Mobile VPN App:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>iOS: Update via App Store</li>
                      <li>Android: Update via Google Play Store</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="mt-3">Is there anything else you'd like to know about VPN updates or maintenance?</p>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 800);
      } else if (text.toLowerCase().includes("disconnect")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Here's how to disconnect from the VPN:</p>
              
              <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-medium text-blue-800 mb-3">Disconnecting from VPN:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-blue-700">Windows:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>Click on the network icon in the system tray (bottom right)</li>
                      <li>Click on the VPN connection (CorpVPN)</li>
                      <li>Click "Disconnect"</li>
                    </ol>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-700">macOS:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>Click on the VPN icon in the menu bar (top right)</li>
                      <li>Select "Disconnect CorpVPN"</li>
                    </ol>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-700">Mobile:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>Open the CompanyVPN app</li>
                      <li>Tap the "Disconnect" button</li>
                      <li>Or, you can also go to device settings and turn off VPN</li>
                    </ol>
                  </div>
                </div>
                
                <p className="mt-2 text-sm text-gray-600">Note: For security reasons, your VPN connection will automatically disconnect after 12 hours of inactivity.</p>
              </div>
              
              <p className="mt-3">Is there anything else you'd like to know about using the VPN?</p>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 800);
      } else if (text.toLowerCase().includes("secure") || text.toLowerCase().includes("security") || text.toLowerCase().includes("safe")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Great question about VPN security. Our corporate VPN provides enterprise-grade security with the following features:</p>
              
              <div className="mt-3 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-medium text-purple-800 mb-3">VPN Security Features:</p>
                
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Encryption:</strong> All traffic is encrypted using AES-256, a military-grade encryption standard
                  </li>
                  <li>
                    <strong>Secure Tunneling:</strong> L2TP/IPsec protocol creates a secure tunnel for your data
                  </li>
                  <li>
                    <strong>Authentication:</strong> Multi-factor authentication prevents unauthorized access
                  </li>
                  <li>
                    <strong>No Split Tunneling:</strong> All traffic routes through our secure corporate network
                  </li>
                  <li>
                    <strong>Automatic Wi-Fi Protection:</strong> Automatically connects when on untrusted networks
                  </li>
                  <li>
                    <strong>Monitoring:</strong> 24/7 security monitoring for suspicious activities
                  </li>
                </ul>
                
                <p className="mt-3 text-sm">Our VPN complies with ISO 27001 and NIST cybersecurity frameworks.</p>
              </div>
              
              <p className="mt-3">Would you like to know more about any specific security aspect of our VPN?</p>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 800);
      } else if (text.toLowerCase().includes("public") || text.toLowerCase().includes("wifi") || text.toLowerCase().includes("hotspot")) {
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Yes, you can and should use our VPN on public Wi-Fi networks. In fact, it's especially important in these scenarios:</p>
              
              <div className="mt-3 bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <p className="font-medium text-red-800 mb-3">VPN on Public Wi-Fi:</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-red-700">Why it's critical:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Public Wi-Fi networks are often unsecured and vulnerable to eavesdropping</li>
                      <li>Attackers can intercept unencrypted data on public networks</li>
                      <li>VPN creates an encrypted tunnel that protects your data from these threats</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-700">Best practices:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Connect to VPN immediately after joining a public network</li>
                      <li>Enable "Connect automatically" option for untrusted networks</li>
                      <li>Verify the VPN connection is active before accessing company resources</li>
                      <li>If VPN disconnects, pause work until reconnected</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-3 text-sm bg-yellow-100 p-2 rounded">
                  <strong>Security tip:</strong> Our corporate policy requires VPN usage on all public Wi-Fi networks when accessing company resources.
                </p>
              </div>
              
              <p className="mt-3">Do you have any other questions about using VPN safely?</p>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 800);
      } else {
        // Generic response for other queries
        setTimeout(() => {
          addBotMessage(
            <>
              <p>Thank you for your question. Is there anything specific about VPN connections you'd like to know more about?</p>
              
              <div className="mt-3 bg-gray-50 p-3 rounded border border-gray-200">
                <p className="font-medium text-gray-700 mb-2">Popular VPN topics:</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => {
                      setInput("How secure is the VPN connection?");
                      handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    How secure is the VPN connection?
                  </button>
                  <button 
                    onClick={() => {
                      setInput("How to update my VPN client?");
                      handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    How to update my VPN client?
                  </button>
                  <button 
                    onClick={() => {
                      setInput("Can I use VPN on public Wi-Fi?");
                      handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    Can I use VPN on public Wi-Fi?
                  </button>
                </div>
              </div>
            </>
          );
          setCurrentStage('complete');
          setShowSuggestion(true);
        }, 800);
      }
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
              <button onClick={() => {
                setInput(getCurrentPromptSuggestion() || "");
                if (getCurrentPromptSuggestion()) {
                  // We need to manually submit if they click a suggestion
                  setTimeout(() => {
                    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                  }, 100);
                }
              }} 
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                {getCurrentPromptSuggestion()}
              </button>
              {getAdditionalSuggestions().map((suggestion, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(() => {
                      handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                    }, 100);
                  }}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
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

export default VPNConnectionChat;
