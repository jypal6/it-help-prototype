import React, { useState, useEffect } from 'react';
import { Paperclip, Send, Smartphone, Monitor, ExternalLink, HelpCircle, Info, FileText, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: React.ReactNode;
  timestamp: Date;
}

const CalendarSyncChat: React.FC = () => {  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState(0);
  const [platformSelected, setPlatformSelected] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    outlookVersion: '',
    windowsVersion: '',
    issueStartDate: '',
    recentChanges: ''  });
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [showNextStepSuggestion, setShowNextStepSuggestion] = useState(false);
  const [showOutlookVersionHelp, setShowOutlookVersionHelp] = useState(false);
  const [showWindowsVersionHelp, setShowWindowsVersionHelp] = useState(false);
  
  const outlookVersionOptions = [
    'Microsoft 365 - Version 2405 (Build 16731.20000)',
    'Microsoft 365 - Version 2404 (Build 16626.20132)',
    'Outlook 2021 - Version 2212 (Build 15928.20196)',
    'Outlook 2019 - Version 1808 (Build 10388.20027)',
    'Other (please specify)'
  ];

  const windowsVersionOptions = [
    'Windows 11 23H2 (Build 22631.3155)',
    'Windows 11 22H2 (Build 22621.2861)',
    'Windows 10 22H2 (Build 19045.3803)',
    'Windows 10 21H2 (Build 19044.3803)',
    'Other (please specify)'
  ];  // Auto-inject the initial user message
  useEffect(() => {
    const initialUserMessage = "My Outlook calendar isn't syncing across devices. Can you help me fix this?";
    if (messages.length === 0) {
      // Set both messages with a flag to show the copilot message after a delay
      const initialMessages: Message[] = [
        {
          id: '1',
          sender: 'user',
          text: initialUserMessage,
          timestamp: new Date()
        }
      ];
      
      setMessages(initialMessages);
      
      // Add a delay before the Copilot response to simulate thinking time
      setTimeout(() => {
        const copilotResponse: Message = {
          id: '2',
          sender: 'copilot',
          text: (
            <>
              <div className="flex items-start mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p>Got it. Let's get this resolved. First, I need to check your environment.</p>
                  <p className="mt-2">🖥️ Detecting platform…✔ Outlook Copilot is running on Windows Desktop</p>
                  <p className="mt-3">Can you tell me where you're noticing the problem?</p>
                  <div className="mt-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => handlePlatformSelect('desktop')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-left flex items-center"
                    >
                      <Monitor size={18} className="mr-2" /> 🖥️ Outlook Desktop App
                    </button>
                    <button 
                      onClick={() => handlePlatformSelect('web')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-left flex items-center"
                    >
                      <Globe size={18} className="mr-2" /> 🌐 Outlook Web (OWA)
                    </button>
                    <button 
                      onClick={() => handlePlatformSelect('mobile')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-left flex items-center"
                    >
                      <Smartphone size={18} className="mr-2" /> 📱 Outlook Mobile
                    </button>
                  </div>
                </div>
              </div>
            </>
          ),
          timestamp: new Date()
        };
        
        // This ensures we only have one user message and one copilot response
        setMessages([initialMessages[0], copilotResponse]);
        setStage(1);
      }, 500); // 0.5 second delay for the initial response
    }
  }, [messages.length]);

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const addCopilotMessage = (content: React.ReactNode) => {
    const newMessage: Message = {
      id: `copilot-${Date.now()}`,
      sender: 'copilot',
      text: content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };
  const handlePlatformSelect = (platform: string) => {
    setPlatformSelected(platform);
    
    // Add user's selection as a message
    const platformText = 
      platform === 'desktop' ? "It's happening on the desktop app." :
      platform === 'web' ? "It's happening on the web version (OWA)." :
      "It's happening on the mobile app.";
    
    addUserMessage(platformText);
      // Simulate Copilot thinking and responding with platform-specific steps
    setTimeout(() => {
      if (platform === 'desktop') {
        addCopilotMessage(
          <>
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p>Thanks. I'll guide you through resolving the calendar sync issue with your Outlook desktop app. Here are detailed steps to try:</p>
                
                <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-semibold text-blue-800 mb-2">Comprehensive Troubleshooting Steps:</h3>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 1: Repair your Outlook account</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open Outlook and click on <strong>File</strong> in the top-left corner</li>
                    <li>Select <strong>Account Settings</strong> &gt; <strong>Account Settings</strong></li>
                    <li>In the Email tab, select your account and click <strong>Repair</strong></li>
                    <li>Follow the wizard prompts to complete the repair process</li>
                    <li>Restart Outlook and check if calendar events are syncing properly</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Support KB-5002819: Repairing account settings in Outlook</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 2: Launch Outlook in Safe Mode to identify add-in conflicts</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Close Outlook completely</li>
                    <li>Press and hold the <strong>Ctrl</strong> key on your keyboard</li>
                    <li>While holding Ctrl, click on the Outlook icon to launch it</li>
                    <li>When prompted about starting in safe mode, click <strong>Yes</strong></li>
                    <li>Check if calendar sync works in safe mode (this disables all add-ins)</li>
                    <li>If it works in safe mode, the issue is likely caused by an add-in</li>
                    <li>Re-enable add-ins one by one to identify the problematic one</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft 365 Admin Center: Troubleshooting Outlook calendar sync issues</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 3: Reset your Outlook profile</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open the Windows Control Panel</li>
                    <li>Navigate to <strong>User Accounts</strong> &gt; <strong>Mail (Microsoft Outlook)</strong></li>
                    <li>Select <strong>Show Profiles</strong></li>
                    <li>Click <strong>Add</strong> to create a new profile</li>
                    <li>Enter a name for the new profile (e.g., "Outlook New")</li>
                    <li>Add your email account to the new profile</li>
                    <li>Set the new profile as the default</li>
                    <li>Restart Outlook using the new profile</li>
                  </ol>
                  <p className="text-xs text-gray-600">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Exchange Team Blog: Profile rebuilding for persistent sync issues</a>
                  </p>
                </div>
                
                <div className="mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-800">💡 How to find your Outlook version:</h4>
                  <ol className="list-decimal pl-5 mt-1 text-sm">
                    <li>Open Outlook</li>
                    <li>Go to <strong>File</strong> &gt; <strong>Office Account</strong></li>
                    <li>Click on <strong>About Outlook</strong></li>
                    <li>The version and build numbers will be displayed</li>
                  </ol>
                </div>
                
                <p className="mt-3">Let me know if these steps resolve your calendar sync issue, or if you're still experiencing problems.</p>
              </div>
            </div>
          </>
        );
      } else if (platform === 'web') {
        addCopilotMessage(
          <>
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p>Thanks. I'll help you resolve the calendar sync issue with Outlook Web Access (OWA). Here are detailed steps to try:</p>
                
                <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-semibold text-blue-800 mb-2">Comprehensive Troubleshooting Steps:</h3>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 1: Clear browser cache and cookies</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open your browser settings (usually found in the menu represented by three dots)</li>
                    <li>Navigate to Privacy and Security or History settings</li>
                    <li>Select the option to clear browsing data or clear history</li>
                    <li>Make sure "Cookies and site data" and "Cached images and files" are selected</li>
                    <li>Set the time range to "Last 24 hours" or "Last 7 days"</li>
                    <li>Click Clear Data or Clear Now</li>
                    <li>Sign out of Outlook Web Access and sign back in</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Exchange Online: Resolving web client performance issues</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 2: Try using a different browser</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>If you're currently using Chrome, try using Edge, Firefox, or Safari</li>
                    <li>Navigate to <a href="https://outlook.office.com" className="text-blue-600">https://outlook.office.com</a></li>
                    <li>Sign in with your account credentials</li>
                    <li>Check if your calendar events are syncing properly in the new browser</li>
                    <li>If it works in the new browser, consider making it your default for Outlook Web</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft 365 Recommended Browsers Documentation</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 3: Check browser extensions and disabled cookies</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open your browser in incognito/private mode</li>
                    <li>Sign in to Outlook Web Access</li>
                    <li>If calendar sync works in incognito mode, an extension may be causing the issue</li>
                    <li>Return to normal browsing mode and disable extensions one by one</li>
                    <li>Check that cookies are enabled for outlook.office.com</li>
                    <li>Ensure your browser is not set to delete cookies when closed</li>
                    <li>Add outlook.office.com to your trusted sites if necessary</li>
                  </ol>
                  <p className="text-xs text-gray-600">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Support: Browser requirements for Microsoft 365</a>
                  </p>
                </div>
                
                <p className="mt-3">Let me know if these steps resolve your calendar sync issue, or if you're still experiencing problems.</p>
              </div>
            </div>
          </>
        );
      } else {
        addCopilotMessage(
          <>
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p>Thanks. I'll help you resolve the calendar sync issue with your Outlook Mobile app. Here are detailed steps to try:</p>
                
                <div className="mt-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-semibold text-blue-800 mb-2">Comprehensive Troubleshooting Steps:</h3>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 1: Force close and restart the Outlook app</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Exit the Outlook app completely</li>
                    <li>For iOS: Swipe up from the bottom of your screen and swipe the Outlook app away</li>
                    <li>For Android: Go to Recent Apps and swipe the Outlook app away</li>
                    <li>Wait 30 seconds</li>
                    <li>Reopen the Outlook app</li>
                    <li>Navigate to the Calendar tab and pull down to refresh</li>
                    <li>Check if your calendar events are now syncing properly</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Mobile Apps Support: Troubleshooting sync issues</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 2: Update the Outlook mobile app</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open the App Store (iOS) or Google Play Store (Android)</li>
                    <li>Search for "Microsoft Outlook"</li>
                    <li>If an update is available, tap "Update"</li>
                    <li>Once updated, open the app and sign in if necessary</li>
                    <li>Check if calendar sync is working after the update</li>
                    <li>Enable auto-updates for the Outlook app to prevent future issues</li>
                  </ol>
                  <p className="text-xs text-gray-600 mb-2">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Outlook Mobile Release Notes and Updates</a>
                  </p>
                  
                  <h4 className="font-medium mb-1 mt-3">🔧 Step 3: Remove and re-add your account</h4>
                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                    <li>Open the Outlook mobile app</li>
                    <li>Tap your profile picture or initials in the top-left corner</li>
                    <li>Tap the gear icon to access Settings</li>
                    <li>Select your email account</li>
                    <li>Scroll down and select "Delete Account" (don't worry, this only removes it from the app)</li>
                    <li>Confirm the deletion</li>
                    <li>Return to Settings and tap "Add Account"</li>
                    <li>Follow the prompts to add your account again</li>
                    <li>Wait for initial sync to complete (may take several minutes)</li>
                  </ol>
                  <p className="text-xs text-gray-600">
                    <Info size={12} className="inline mr-1" /> Source: <a href="#" className="text-blue-600 hover:underline">Microsoft Outlook Mobile Documentation: Account Management</a>
                  </p>
                </div>
                
                <div className="mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-800">💡 How to find your Outlook mobile app version:</h4>
                  <ol className="list-decimal pl-5 mt-1 text-sm">
                    <li>Open the Outlook mobile app</li>
                    <li>Tap your profile picture or initials in the top-left corner</li>
                    <li>Tap the gear icon to access Settings</li>
                    <li>Scroll down to the bottom of the settings page</li>
                    <li>The version number will be displayed there</li>
                  </ol>
                </div>
                
                <p className="mt-3">Let me know if these steps resolve your calendar sync issue, or if you're still experiencing problems.</p>
              </div>
            </div>
          </>
        );
      }      setStage(2);
    }, 500); // 0.5 second delay for all responses
  };

  const handleStillNotSyncing = () => {
    addUserMessage("Still not syncing.");
      // Simulate Copilot thinking and responding with ticket form
    setTimeout(() => {
      addCopilotMessage(
        <>
          <p>Thanks for confirming. I'll help you raise a support ticket so this can be looked into in more detail.</p>
          <p className="mt-2">Let's gather the details needed for the ticket. Please fill in the following:</p>
        </>
      );      setStage(3);
    }, 500); // 0.5 second delay
  };  const handleSubmitTicket = () => {
    // Validate form data
    if (!formData.outlookVersion || !formData.windowsVersion || !formData.issueStartDate) {
      // Add an error message
      addCopilotMessage(
        <>
          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
            <p className="font-medium text-red-800">Please fill in the required fields:</p>
            <ul className="list-disc pl-5 text-red-700">
              {!formData.outlookVersion && <li>Outlook version</li>}
              {!formData.windowsVersion && <li>Windows version</li>}
              {!formData.issueStartDate && <li>Issue start date</li>}
            </ul>
          </div>
        </>
      );
      return;
    }
    
    setIsSubmittingForm(true);
    
    // Generate a random ticket ID for a more realistic experience
    const generatedTicketId = Math.floor(10000 + Math.random() * 90000).toString();
    setTicketId(generatedTicketId);
    
    // Format today's date for ticket creation
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Get platform-specific steps text based on platform selected
    const stepsTriedContent = (() => {
      if (platformSelected === 'desktop') {
        return (
          <>
            <li>Repaired Outlook account via Account Settings</li>
            <li>Launched Outlook in Safe Mode to eliminate add-ins</li>
            <li>Rebuilt Outlook profile via Control Panel &gt; Mail</li>
          </>
        );
      } else if (platformSelected === 'web') {
        return (
          <>
            <li>Cleared browser cache and cookies</li>
            <li>Tried alternative web browsers</li>
            <li>Disabled browser extensions and checked cookie settings</li>
          </>
        );
      } else if (platformSelected === 'mobile') {
        return (
          <>
            <li>Force closed and restarted the Outlook app</li>
            <li>Updated the Outlook mobile app to latest version</li>
            <li>Removed and re-added account to the app</li>
          </>
        );
      } else {
        return <li>Basic troubleshooting steps have been attempted</li>;
      }
    })();
    
    // Get platform-specific issue summary
    const issueSummary = (() => {
      if (platformSelected === 'desktop') {
        return "Outlook calendar events not syncing on Windows desktop app";
      } else if (platformSelected === 'web') {
        return "Outlook calendar events not syncing in web browser (OWA)";
      } else if (platformSelected === 'mobile') {
        return "Outlook calendar events not syncing on mobile app";
      } else {
        return "Outlook calendar events not syncing across devices";
      }
    })();
    
    // Simulate ticket creation with delay
    setTimeout(() => {
      setIsSubmittingForm(false);
      setTicketCreated(true);
      
      // Display ticket creation confirmation
      addCopilotMessage(
        <>
          <h3 className="font-medium text-green-700 mb-3">📨 Ticket Created Successfully!</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="mb-2">
              <strong>📄 Ticket ID:</strong> {generatedTicketId} 
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedTicketId);
                  // Could add toast notification here
                }}
                className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-0.5 px-2 rounded text-xs inline-flex items-center"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
                Copy
              </button>
            </p>
            <p className="mb-2"><strong>🎫 Issue Summary:</strong> {issueSummary}</p>
            <p className="mb-2"><strong>📅 Created On:</strong> {formattedDate}</p>
            <p className="mb-2"><strong>📦 Outlook Version:</strong> {formData.outlookVersion || "[Not provided]"}</p>
            <p className="mb-2"><strong>💻 Windows Version:</strong> {formData.windowsVersion || "[Not provided]"}</p>
            <p className="mb-2"><strong>📅 Issue Started:</strong> {formData.issueStartDate ? new Date(formData.issueStartDate).toLocaleDateString() : "[Not provided]"}</p>
            <p className="mb-3"><strong>🔄 Recent Changes:</strong> {formData.recentChanges || "[Not provided]"}</p>
            
            <h4 className="font-medium mb-2">🛠️ Steps Already Tried:</h4>
            <ul className="list-disc pl-5 mb-3">
              {stepsTriedContent}
            </ul>
            
            <p className="font-medium">🧾 Status: <span className="text-blue-700">Assigned to support team for deeper investigation</span></p>
            
            <div className="mt-4 border-t border-blue-200 pt-3">
              <a 
                href={`https://support.contoso.com/ticket/${generatedTicketId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FileText size={16} className="mr-1" /> View Ticket Online
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
          
          <p className="mt-3">You'll be notified here and via email when the support team provides an update, requests more information, or resolves the issue.</p>
          
          <div className="mt-4">
            <button
              onClick={() => {
                setShowNextStepSuggestion(false);
                setInput("Let me check the ticket status later");
                // Create a synthetic event
                const syntheticEvent = {
                  preventDefault: () => {}
                } as React.FormEvent;
                handleSendMessage(syntheticEvent);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-sm flex items-center"
            >
              <FileText size={16} className="mr-2" /> Check Ticket Status Later
            </button>
          </div>
        </>
      );
      setStage(4);
      
      // Show next step suggestion after a delay
      setTimeout(() => {
        setShowNextStepSuggestion(true);
      }, 5000);
    }, 500); // 0.5 second delay
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (stage === 2) {
      handleStillNotSyncing();
    } else {
      addUserMessage(input);        // Generic response for any message after ticket creation
      if (ticketCreated) {
        setTimeout(() => {
          if (input.toLowerCase().includes("ticket status") || input.toLowerCase().includes("check status")) {
            addCopilotMessage(
              <>
                <p>You can check your ticket status at any time by using the "Check Ticket Status" conversation starter from the main menu.</p>
                <p className="mt-2">Your ticket ID is {ticketId}. The support team will also send you updates via email as they investigate your calendar sync issue.</p>
              </>
            );
          } else {
            addCopilotMessage(
              <>
                <p>Thanks for your message. Your ticket (ID: {ticketId}) is still being worked on by our support team.</p>
                <p className="mt-2">You'll be notified as soon as there's an update. If you have any additional questions about your ticket, feel free to use the "Check Ticket Status" conversation starter.</p>
              </>
            );          
          }
        }, 500); // 0.5 second delay
      }
    }
  };

  // Ticket form component
  const TicketForm = () => (
    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
      <h3 className="font-medium text-blue-800 mb-3">📝 Support Ticket Information</h3>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          📦 Outlook version:
          <span 
            className="ml-2 text-xs text-blue-600 hover:underline cursor-help flex items-center"
            onClick={() => setShowOutlookVersionHelp(!showOutlookVersionHelp)}
          >
            <HelpCircle size={12} className="mr-1" /> How do I find this?
          </span>
        </label>
        {showOutlookVersionHelp && (
          <div className="mb-2 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400 text-sm">
            <h4 className="font-medium text-yellow-800">📋 How to find your Outlook version:</h4>
            <ol className="list-decimal pl-5 mt-1 text-sm">
              <li>Open Outlook</li>
              <li>Go to <strong>File</strong> &gt; <strong>Office Account</strong></li>
              <li>Click on <strong>About Outlook</strong></li>
              <li>The version and build numbers will be displayed</li>
            </ol>
          </div>
        )}
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.outlookVersion}
          onChange={(e) => setFormData({...formData, outlookVersion: e.target.value})}
        >
          <option value="">Select your Outlook version</option>
          {outlookVersionOptions.map((version, index) => (
            <option key={index} value={version}>{version}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          💻 Windows version:
          <span 
            className="ml-2 text-xs text-blue-600 hover:underline cursor-help flex items-center"
            onClick={() => setShowWindowsVersionHelp(!showWindowsVersionHelp)}
          >
            <HelpCircle size={12} className="mr-1" /> How do I find this?
          </span>
        </label>
        {showWindowsVersionHelp && (
          <div className="mb-2 bg-yellow-50 p-2 rounded-lg border-l-4 border-yellow-400 text-sm">
            <h4 className="font-medium text-yellow-800">📋 How to find your Windows version:</h4>
            <ol className="list-decimal pl-5 mt-1 text-sm">
              <li>Press <strong>Windows key + R</strong> to open Run</li>
              <li>Type <strong>winver</strong> and press Enter</li>
              <li>A window will open showing your Windows version</li>
              <li>Note both the version (e.g., Windows 11) and the build number</li>
            </ol>
          </div>
        )}
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.windowsVersion}
          onChange={(e) => setFormData({...formData, windowsVersion: e.target.value})}
        >
          <option value="">Select your Windows version</option>
          {windowsVersionOptions.map((version, index) => (
            <option key={index} value={version}>{version}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          📅 Issue start date:
        </label>
        <input 
          type="date" 
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.issueStartDate}
          onChange={(e) => setFormData({...formData, issueStartDate: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          🔄 Recent changes:
        </label>
        <textarea 
          placeholder="Mention any password resets, app reinstallations, or device changes"
          className="w-full p-2 border border-gray-300 rounded h-24"
          value={formData.recentChanges}
          onChange={(e) => setFormData({...formData, recentChanges: e.target.value})}
        />
      </div>
      <button 
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
        onClick={handleSubmitTicket}
        disabled={isSubmittingForm}
      >
        {isSubmittingForm ? "Submitting..." : "Submit Ticket"}
      </button>
    </div>  );  // Function to get hover card text based on message ID  
  const getHoverCardText = (messageId: string) => {
    // First response (ID: 2) gets the contextual troubleshooting text
    if (messageId === '2') {
      return "Contextual Troubleshooting with Step-by-Step Guidance: When users report generic issues, Copilot first gathers key details — such as OS version, Outlook client type, or environment — before presenting tailored troubleshooting steps. This ensures users aren't overwhelmed and receive only the most relevant guidance for their situation.";
    }
    // Response after platform selection gets the step-by-step instructions text
    else if (messageId.startsWith('copilot-') && messages.findIndex(m => m.id === messageId) === 3) {
      return "After collecting the right details, Copilot shows users clear, step-by-step instructions that match their setup — making it easier to fix issues without any confusion.";
    }
    // Response after "Still not syncing" gets the ticket creation text
    else if (stage >= 3 && messageId.startsWith('copilot-') && messages.length >= 6 && messages[messages.length - 1].id === messageId) {
      return "Seamless Ticket Creation: If the issue can't be fixed through self-help, Copilot guides the user through creating an IT ticket — automatically capturing all the details to speed up resolution.";
    }    // Default text for other responses
    return "Contextual Troubleshooting with Step-by-Step Guidance: When users report generic issues, Copilot first gathers key details before presenting tailored troubleshooting steps.";
  };

  // Add state for hovered Copilot message
  const [hoveredCopilotMsg, setHoveredCopilotMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`relative max-w-[80%] p-3 rounded-lg shadow-sm ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200'
              }`}
              onMouseEnter={() => message.sender === 'copilot' && setHoveredCopilotMsg(message.id)}
              onMouseLeave={() => message.sender === 'copilot' && setHoveredCopilotMsg(null)}
              onFocus={() => message.sender === 'copilot' && setHoveredCopilotMsg(message.id)}
              onBlur={() => message.sender === 'copilot' && setHoveredCopilotMsg(null)}
              tabIndex={message.sender === 'copilot' ? 0 : -1}
            >
              <div className="font-medium mb-1">
                {message.sender === 'user' ? 'You' : 'Copilot'}
              </div>
              <div>{message.text}</div>
              <div 
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </div>              {/* Copilot hover card - positioned conditionally */}
              {message.sender === 'copilot' && hoveredCopilotMsg === message.id && (                <div className={`absolute z-50 ${
                  // Position based on which response
                  message.id === '2' 
                    ? 'left-full ml-4 top-0' // First response: right side
                    : messages.findIndex(m => m.id === message.id) === 3 
                      ? 'bottom-full mb-4 left-1/2 -translate-x-1/2' // Second response: above
                      : stage >= 3 && messages.length >= 6 && messages[messages.length - 1].id === message.id
                        ? 'top-full mt-4 left-1/2 -translate-x-1/2' // "Still not syncing" response: below
                        : 'left-full ml-4 top-0' // All others: right side
                } w-80 bg-blue-50 bg-opacity-80 border border-blue-200 shadow-lg rounded-xl p-5 text-sm text-blue-900 animate-fade-in pointer-events-none backdrop-blur-sm`} style={{backdropFilter: 'blur(4px)'}}>
                  <div className="leading-relaxed">{getHoverCardText(message.id)}</div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Stage 2 helper buttons */}
        {stage === 2 && platformSelected && (
          <div className="flex justify-center">
            <button 
              onClick={handleStillNotSyncing}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm"
            >
              Still not syncing
            </button>
          </div>
        )}
        
        {/* Stage 4 next step suggestion */}
        {stage === 4 && showNextStepSuggestion && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => {
                setShowNextStepSuggestion(false);
                setInput("Let me check the ticket status later");
                // Create a synthetic event
                const syntheticEvent = {
                  preventDefault: () => {}
                } as React.FormEvent;
                handleSendMessage(syntheticEvent);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-sm flex items-center"
            >
              <FileText size={16} className="mr-2" /> Check Ticket Status Later
            </button>
          </div>
        )}
        {/* Ticket form rendered as a persistent component */}
        {stage === 3 && !ticketCreated && <TicketForm />}
      </div>
      {/* Input Field */}
      <div className="border-t border-gray-200 p-3">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button 
            type="button" 
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-0 focus:ring-0 focus:outline-none px-3 py-2"
          />
          <button 
            type="submit" 
            className="p-2 text-blue-600 hover:text-blue-800"
            disabled={!input.trim() && !(stage === 2)}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Adding the missing Globe component
const Globe: React.FC<{ size: number, className?: string }> = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

export default CalendarSyncChat;
