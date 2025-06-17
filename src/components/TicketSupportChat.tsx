import React, { useState } from "react";
import {
  BadgeCheck,
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Tag,
  X,
  User,
  Bot,
  CheckCircle
} from "lucide-react";

// Define types for our data structures
interface SourceMeta {
  date: string;
  author: string;
  system: string;
  content: string;
  highlight: string;
}

interface Suggestion {
  id: number;
  source: string;
  sourceType: 'kb' | 'ticket' | 'email';
  confidence: 'high' | 'medium' | 'low';
  summary: string;
  details: string[];
  button: string;
  sourceMeta: SourceMeta;
  relatedCount: number;
}

// Define message type
type Message = {
  type: 'user' | 'bot';
  content: string | React.ReactNode;
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: 2,
    source: "KB Article: Teams Authentication After Password Changes",
    sourceType: "kb",
    confidence: "high", // Changed to high for KB article
    summary: "Allow 15–30 mins after password reset for AD sync.",
    details: [
      "Wait at least 15-30 minutes after a password reset for Active Directory synchronization to complete.",
      "Verify that the user's account is not locked in Azure AD or on-premises AD.",
      "Check if the user can access other Microsoft 365 services like Outlook or SharePoint.",
      "If the user still cannot access after 30 minutes, proceed to clearing credentials."
    ],
    button: "Open KB Article",
    sourceMeta: {
      date: "2024-04-22",
      author: "IT Knowledge Base",
      system: "KB",
      content: `In hybrid AD environments, Teams access may take up to 30 minutes to restore after a password reset due to directory sync delays. This is a common issue when using Azure AD Connect with password hash synchronization or pass-through authentication. Users should attempt to access Teams after waiting for the synchronization to complete.`,
      highlight: "Teams access may take up to 30 mins to restore after a password reset",
    },
    relatedCount: 14, // Number of related items
  },
  {
    id: 1,
    source: "Past Tickets (12 similar cases)",
    sourceType: "ticket",
    confidence: "high",
    summary: "Clear Teams cache and re-authenticate after password reset.",
    details: [
      "1. Ask the user to completely exit Microsoft Teams (right-click the Teams icon in the system tray and select 'Quit').",
      "2. Navigate to the Teams cache folder by pressing Win+R and typing: %appdata%\\Microsoft\\Teams",
      "3. Delete all contents of the following folders:",
      "   • Application Cache",
      "   • Blob_storage",
      "   • Cache",
      "   • databases",
      "   • GPUCache",
      "   • IndexedDB",
      "   • Local Storage",
      "4. Restart the computer for good measure.",
      "5. Launch Teams and sign in with the new credentials."
    ],
    button: "View Similar Tickets",
    sourceMeta: {
      date: "2024-05-10",
      author: "IT Agent A",
      system: "Ticketing",
      content: `User reported Teams login issues after password reset. Resolved by clearing Teams cache and re-authenticating. This is a common issue when users have cached credentials that don't match their new password.`,
      highlight: "Resolved by clearing Teams cache and re-authenticating.",
    },
    relatedCount: 12, // Number of related tickets
  },
  {
    id: 3,
    source: "Outlook thread (IT Announcements, 12 May)",
    sourceType: "email",
    confidence: "medium",
    summary: "Check Credential Manager to remove old saved Teams credentials.",
    details: [
      "1. Press Win+R and type 'control keymgr.dll' to open Credential Manager.",
      "2. Select 'Windows Credentials'.",
      "3. Look for any entries containing 'Microsoft Teams', 'MicrosoftOffice', or 'Microsoft_OfficeAppID'.",
      "4. For each relevant entry:",
      "   • Click on the entry to expand it",
      "   • Click 'Remove' and confirm the deletion",
      "5. Also check 'Generic Credentials' section for any Teams-related entries.",
      "6. Close Credential Manager and restart the computer.",
      "7. Launch Teams and have the user sign in with their new password."
    ],
    button: "View Email Thread",
    sourceMeta: {
      date: "2024-05-12",
      author: "IT Announcements",
      system: "Outlook",
      content: `Some users resolved access issues by clearing saved passwords from Windows Credential Manager > Generic Credentials. This approach has helped in scenarios where simple cache clearing didn't resolve the issue.`,
      highlight: "clearing saved passwords from Windows Credential Manager",
    },
    relatedCount: 3, // Number of related emails
  },
];

const TAGS = [
  { label: "Known Issue", color: "bg-red-100 text-red-700" },
  { label: "Resolved in past", color: "bg-green-100 text-green-700" },
  { label: "AD sync delay", color: "bg-yellow-100 text-yellow-800" },
];

const CONFIDENCE: Record<Suggestion['confidence'], { color: string; label: string }> = {
  high: { color: "bg-green-500", label: "High" },
  medium: { color: "bg-orange-400", label: "Medium" },
  low: { color: "bg-red-500", label: "Low" },
};

export default function TicketSupportChat({ initialPrompt }: { initialPrompt: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: initialPrompt,
    }  ]);  const [input, setInput] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Create ref for the messages container
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    // Using setTimeout to ensure the DOM is updated before scrolling
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      
      // Alternative approach to ensure scrolling works
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [messages]);  function handleSend(e: React.FormEvent | { preventDefault: () => void }) {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages((msgs) => [
      ...msgs,
      { type: "user", content: input.trim() }
    ]);
    
    // After user enters ticket information, show the ticket response
    if (!ticketSubmitted) {      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            type: "bot",
            content: (
              <div>
                <div className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-1">
                  <BadgeCheck className="text-blue-600" size={20} />
                  Issue: User unable to access Microsoft Teams after password reset
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Teams login", "password reset", "authentication"].map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium"
                    >
                      <Tag className="w-3 h-3 mr-1" /> {kw}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Ticket ID: <span className="font-mono text-gray-700">#89453</span>
                </div>
                <div className="font-semibold text-gray-700 mb-1">
                  Suggested Resolutions:
                </div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <SuggestionCard key={s.id} suggestion={s} />
                  ))}
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {TAGS.map((tag) => (
                    <span
                      key={tag.label}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tag.color}`}
                    >
                      <Tag className="w-3 h-3 mr-1" /> {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ),
          }
        ]);
        setTicketSubmitted(true);      }, 1000); // Simulate processing delay    } else {      // For subsequent messages after ticket is submitted
      setTimeout(() => {
        // If the user asks to create an email update
        if (input.trim().toLowerCase().includes("create an email update")) {
          setMessages((msgs) => [
            ...msgs,
            {
              type: "bot",
              content: (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-blue-500" size={18} />
                    <span className="font-semibold text-gray-800">Email Draft Created</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3">
                    <div className="mb-2">
                      <strong className="text-sm text-gray-600">To:</strong>
                      <span className="text-sm ml-2">user@contoso.com</span>
                    </div>
                    <div className="mb-2">
                      <strong className="text-sm text-gray-600">Subject:</strong>
                      <span className="text-sm ml-2">Resolution for your Microsoft Teams access issue (Ticket #89453)</span>
                    </div>
                    <div className="mb-2">
                      <strong className="text-sm text-gray-600">Body:</strong>
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-line bg-white p-3 border border-gray-200 rounded-md">
                      {`Hello,

Thank you for reporting the issue with Microsoft Teams access after your password reset. I've investigated this ticket and found two high-confidence solutions that should resolve your problem:

1. Wait for Active Directory Synchronization (15-30 minutes)
   - After a password reset, please allow 15-30 minutes for the Active Directory synchronization to complete
   - This is a common timing issue in hybrid environments using Azure AD Connect

2. Clear Teams Cache and Re-authenticate
   - Exit Microsoft Teams completely (right-click Teams icon in system tray and select 'Quit')
   - Clear the Teams cache folders:
     • Press Win+R and type: %appdata%\\Microsoft\\Teams
     • Delete contents of the cache folders (Application Cache, Blob_storage, Cache, etc.)
   - Restart your computer
   - Launch Teams and sign in with your new credentials

If you're still experiencing issues after trying these solutions, please reply to this email and I'll provide additional assistance.

Best regards,
IT Support Team`}
                    </div>
                  </div>                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                      Edit draft
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
                      onClick={() => {
                        setEmailSent(true);
                        setTimeout(() => {
                          setMessages((msgs) => [
                            ...msgs,
                            {
                              type: "bot",
                              content: (
                                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-md border border-green-200">
                                  <CheckCircle size={16} className="text-green-600" />
                                  Email sent successfully to user@contoso.com
                                </div>
                              ),
                            },
                          ]);
                        }, 500);
                      }}
                    >
                      Send email
                    </button>
                  </div>
                </div>
              ),
            },
          ]);
        } else if (input.trim().toLowerCase().includes("update ticket")) {
          setMessages((msgs) => [
            ...msgs,
            {
              type: "bot",
              content: (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="text-green-600" size={18} />
                    <span className="font-semibold text-gray-800">Ticket #89453 Updated</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Ticket Summary</h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Awaiting Customer Response
                      </span>
                    </div>
                    <div className="border-b border-gray-200 pb-2 mb-2">
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="col-span-1 text-gray-500">ID:</div>
                        <div className="col-span-4 font-mono">#89453</div>
                        
                        <div className="col-span-1 text-gray-500">Requester:</div>
                        <div className="col-span-4">user@contoso.com</div>
                        
                        <div className="col-span-1 text-gray-500">Subject:</div>
                        <div className="col-span-4">Microsoft Teams access issues after password reset</div>
                        
                        <div className="col-span-1 text-gray-500">Assigned to:</div>
                        <div className="col-span-4">IT Support Team</div>
                        
                        <div className="col-span-1 text-gray-500">Updated:</div>
                        <div className="col-span-4">June 16, 2025 (just now)</div>
                      </div>
                    </div>
                    <div className="mb-1 text-sm text-gray-600 font-semibold">Latest Activity:</div>
                    <div className="bg-white p-3 border border-gray-200 rounded-md text-sm">
                      <div className="font-medium text-blue-700 mb-1">
                        Email sent to customer with resolution steps
                      </div>
                      <div className="text-gray-600 text-xs mb-2">
                        June 16, 2025 - 1:42 PM
                      </div>
                      <div className="text-gray-700">
                        <p>Provided two high-confidence solutions:</p>
                        <ol className="list-decimal ml-5 mt-1 mb-2 space-y-1">
                          <li>Wait for AD sync (15-30 mins)</li>
                          <li>Clear Teams cache and re-authenticate</li>
                        </ol>
                        <p>Status updated to "Awaiting Customer Response"</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    The ticket has been updated with the email communication and its status has been changed to "Awaiting Customer Response".
                  </div>
                </div>
              ),
            },
          ]);
        } else {          setMessages((msgs) => [
            ...msgs,
            {
              type: "bot",
              content: (
                <div className="italic text-gray-500">
                  (Copilot response placeholder for: {input.trim()})
                </div>
              ),
            },
          ]);
        }
      }, 500);
    }
    
    setInput("");
  }
  return (    <div className="flex flex-col h-screen bg-gray-50 pt-10 pb-6">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4" ref={messagesContainerRef} style={{ scrollbarWidth: 'thin' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div              className={`max-w-7xl px-4 py-3 rounded-lg shadow ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.type === "user" ? (
                  <User size={16} className="text-blue-200" />
                ) : (
                  <Bot size={16} className="text-blue-400" />
                )}
                <span className="text-xs font-semibold">
                  {msg.type === "user" ? "You" : "Copilot"}
                </span>
              </div>              <div>{msg.content}</div>
            </div>
          </div>
        ))}
        {/* This div is for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>{ticketSubmitted && (
        <div className="w-full bg-blue-50 border-t border-blue-100 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Suggested actions:</span>
            {!emailSent ? (              <button
                onClick={() => {
                  // Direct approach without using handleSend
                  setMessages((msgs) => [
                    ...msgs,
                    { 
                      type: "user", 
                      content: "Create an email update for the user with the first two high confidence resolutions" 
                    },
                    {
                      type: "bot",
                      content: (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="text-blue-500" size={18} />
                            <span className="font-semibold text-gray-800">Email Draft Created</span>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-3">
                            <div className="mb-2">
                              <strong className="text-sm text-gray-600">To:</strong>
                              <span className="text-sm ml-2">user@contoso.com</span>
                            </div>
                            <div className="mb-2">
                              <strong className="text-sm text-gray-600">Subject:</strong>
                              <span className="text-sm ml-2">Resolution for your Microsoft Teams access issue (Ticket #89453)</span>
                            </div>
                            <div className="mb-2">
                              <strong className="text-sm text-gray-600">Body:</strong>
                            </div>
                            <div className="text-sm text-gray-800 whitespace-pre-line bg-white p-3 border border-gray-200 rounded-md">
                              {`Hello,

Thank you for reporting the issue with Microsoft Teams access after your password reset. I've investigated this ticket and found two high-confidence solutions that should resolve your problem:

1. Wait for Active Directory Synchronization (15-30 minutes)
   - After a password reset, please allow 15-30 minutes for the Active Directory synchronization to complete
   - This is a common timing issue in hybrid environments using Azure AD Connect

2. Clear Teams Cache and Re-authenticate
   - Exit Microsoft Teams completely (right-click Teams icon in system tray and select 'Quit')
   - Clear the Teams cache folders:
     • Press Win+R and type: %appdata%\\Microsoft\\Teams
     • Delete contents of the cache folders (Application Cache, Blob_storage, Cache, etc.)
   - Restart your computer
   - Launch Teams and sign in with your new credentials

If you're still experiencing issues after trying these solutions, please reply to this email and I'll provide additional assistance.

Best regards,
IT Support Team`}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                              Edit draft
                            </button>
                            <button 
                              className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEmailSent(true);
                                setTimeout(() => {
                                  setMessages((msgs) => [
                                    ...msgs,
                                    {
                                      type: "bot",
                                      content: (
                                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-md border border-green-200">
                                          <CheckCircle size={16} className="text-green-600" />
                                          Email sent successfully to user@contoso.com
                                        </div>
                                      ),
                                    },
                                  ]);
                                }, 500);
                              }}
                            >
                              Send email
                            </button>
                          </div>
                        </div>
                      ),
                    }
                  ]);
                }}
                className="px-3 py-1.5 bg-white text-blue-700 border border-blue-300 rounded-full text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Mail size={14} />
                Create email update for user
              </button>
            ) : (              <button
                onClick={() => {
                  // Direct approach without using handleSend
                  setMessages((msgs) => [
                    ...msgs,
                    { 
                      type: "user", 
                      content: "Update ticket status and add email as a comment" 
                    },
                    {
                      type: "bot",
                      content: (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="text-green-600" size={18} />
                            <span className="font-semibold text-gray-800">Ticket #89453 Updated</span>
                          </div>
                          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-3">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-gray-800">Ticket Summary</h3>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                Awaiting Customer Response
                              </span>
                            </div>
                            <div className="border-b border-gray-200 pb-2 mb-2">
                              <div className="grid grid-cols-5 gap-4 text-sm">
                                <div className="col-span-1 text-gray-500">ID:</div>
                                <div className="col-span-4 font-mono">#89453</div>
                                
                                <div className="col-span-1 text-gray-500">Requester:</div>
                                <div className="col-span-4">user@contoso.com</div>
                                
                                <div className="col-span-1 text-gray-500">Subject:</div>
                                <div className="col-span-4">Microsoft Teams access issues after password reset</div>
                                
                                <div className="col-span-1 text-gray-500">Assigned to:</div>
                                <div className="col-span-4">IT Support Team</div>
                                
                                <div className="col-span-1 text-gray-500">Updated:</div>
                                <div className="col-span-4">June 16, 2025 (just now)</div>
                              </div>
                            </div>
                            <div className="mb-1 text-sm text-gray-600 font-semibold">Latest Activity:</div>
                            <div className="bg-white p-3 border border-gray-200 rounded-md text-sm">
                              <div className="font-medium text-blue-700 mb-1">
                                Email sent to customer with resolution steps
                              </div>
                              <div className="text-gray-600 text-xs mb-2">
                                June 16, 2025 - 1:42 PM
                              </div>
                              <div className="text-gray-700">
                                <p>Provided two high-confidence solutions:</p>
                                <ol className="list-decimal ml-5 mt-1 mb-2 space-y-1">
                                  <li>Wait for AD sync (15-30 mins)</li>
                                  <li>Clear Teams cache and re-authenticate</li>
                                </ol>
                                <p>Status updated to "Awaiting Customer Response"</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">                            The ticket has been updated with the email communication and its status has been changed to "Awaiting Customer Response".
                          </div>
                        </div>
                      ),
                    }
                  ]);
                }}
                className="px-3 py-1.5 bg-white text-green-700 border border-green-300 rounded-full text-sm font-medium hover:bg-green-700 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <FileText size={14} />
                Update ticket with email and status change
              </button>
            )}
          </div>
        </div>
      )}      <form
        onSubmit={handleSend}
        className="w-full bg-white border-t px-4 py-3 flex gap-2 mb-8"
      >
        <input
          type="text"
          className={`flex-1 px-4 py-2 rounded border ${!ticketSubmitted ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder={!ticketSubmitted ? "Paste ticket link or describe the issue..." : "Message Copilot…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
        >
          {!ticketSubmitted ? "Submit" : "Send"}
        </button>
      </form>
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [ticketsList, setTicketsList] = useState(false);
  const s = suggestion;

  return (
    <div className="bg-gray-100 rounded-lg border border-gray-200 mb-3">
      <div
        className="flex items-center px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        }}
        aria-expanded={expanded}
        role="button"
      >
        <span
          className={`inline-block w-3 h-3 rounded-full mr-3 ${CONFIDENCE[s.confidence].color}`}
          title={`Confidence: ${CONFIDENCE[s.confidence].label}`}
        />
        {/* Source icon with badge for related count */}
        <div className="relative mr-3">          {s.sourceType === "ticket" && <FileText className="text-blue-500" size={20} />}
          {s.sourceType === "kb" && <FileText className="text-green-600" size={20} />}
          {s.sourceType === "email" && <Mail className="text-yellow-500" size={20} />}
        </div>
        <div className="flex-1">
          <span className="font-medium text-gray-800 block">{s.summary}</span>
          <span className="text-xs font-semibold text-blue-700">
            {s.sourceType === "ticket" && "From Past Tickets"}
            {s.sourceType === "kb" && "Knowledge Base Article"}
            {s.sourceType === "email" && "Internal Communication"}
          </span>
        </div>
        <span className="text-xs text-gray-500 mr-3">{s.source}</span>
        <span>
          {expanded ? (
            <ChevronUp className="text-gray-400" size={20} />
          ) : (
            <ChevronDown className="text-gray-400" size={20} />
          )}
        </span>
      </div>
      {expanded && (
        <div className="px-7 pb-5 pt-2">
          <h4 className="font-medium text-gray-700 mb-2">Resolution Steps:</h4>
          <ul className="list-disc ml-6 text-sm text-gray-700 mb-3 space-y-1">
            {s.details.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <div className="flex gap-3 mt-3">
            <button
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
              onClick={() => setModal(true)}
            >
              <ArrowUpRight size={16} /> {s.button.replace("View Similar Tickets", "View Source")}
            </button>
            {s.relatedCount > 1 && s.sourceType === "ticket" && (
              <button
                className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                onClick={() => setTicketsList(true)}
              >
                <FileText size={16} /> View All {s.relatedCount} Similar Tickets
              </button>
            )}
          </div>
        </div>
      )}
        {/* Source Modal */}
      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 p-1 rounded-full">
                {s.sourceType === "ticket" && <FileText className="text-blue-500" size={18} />}
                {s.sourceType === "kb" && <FileText className="text-green-600" size={18} />}
                {s.sourceType === "email" && <Mail className="text-yellow-500" size={18} />}
              </span>
              <span className="font-medium">{s.source}</span>
              <span>•</span>
              <span>{s.sourceMeta.date}</span>
              <span>•</span>
              <span>{s.sourceMeta.author}</span>
            </div>            <h3 className="font-bold text-gray-800 mb-2">
              {s.sourceType === "ticket" && "Ticket Details"}
              {s.sourceType === "kb" && "KB Article: Teams Authentication After Password Changes"}
              {s.sourceType === "email" && "Email Content"}
            </h3>
            <div className="mt-2 text-gray-800 text-sm whitespace-pre-line">
              {s.sourceMeta.content
                .split(s.sourceMeta.highlight)
                .map((part: string, i: number, arr: string[]) =>
                  i < arr.length - 1 ? (
                    <React.Fragment key={i}>
                      {part}
                      <span className="bg-yellow-200 px-1 rounded">
                        {s.sourceMeta.highlight}
                      </span>
                    </React.Fragment>
                  ) : (
                    part
                  )
                )}
            </div>
          </div>
        </div>
      )}
        {/* Tickets List Modal */}
      {ticketsList && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setTicketsList(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h3 className="font-bold text-gray-800 mb-4">
              Similar Tickets ({s.relatedCount})
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {[...Array(Math.min(s.relatedCount, 10))].map((_, i) => (
                <div key={i} className="border-b border-gray-200 py-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-blue-700">Ticket #{81234 - i}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(2024, 4, 10 - i).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    User unable to access Teams after password reset
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="font-semibold">Resolution:</span>
                    <span>Cache cleared, credentials updated</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
