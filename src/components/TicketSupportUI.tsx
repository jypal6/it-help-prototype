import React, { useState } from "react";
import {
  BadgeCheck,
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  AlertCircle,
  Tag,
  X,
  ClipboardCopy,
  CheckCircle2,
} from "lucide-react";

const SUGGESTIONS = [
  {
    id: 1,
    source: "Past Ticket #81234",
    sourceType: "ticket",
    confidence: "high",
    summary: "Clear Teams cache and re-authenticate after password reset.",
    details: [
      "Exit Teams completely (from tray)",
      "Delete cache folder: %appdata%\\Microsoft\\Teams",
      "Reopen Teams and sign in with new credentials",
    ],
    button: "View Source Ticket",
    sourceMeta: {
      date: "2024-05-10",
      author: "IT Agent A",
      system: "Ticketing",
      content: `User reported Teams login issues after password reset. Resolved by clearing Teams cache and re-authenticating.`,
      highlight: "Resolved by clearing Teams cache and re-authenticating.",
    },
  },
  {
    id: 2,
    source: "KB Article KB-1023",
    sourceType: "kb",
    confidence: "medium",
    summary: "Allow 15–30 mins after password reset for AD sync.",
    details: [
      "In hybrid AD environments, Teams access may take up to 30 mins to restore.",
    ],
    button: "Open KB-1023",
    sourceMeta: {
      date: "2024-04-22",
      author: "IT Knowledge Base",
      system: "KB",
      content: `In hybrid AD environments, Teams access may take up to 30 mins to restore after a password reset due to directory sync delays.`,
      highlight:
        "Teams access may take up to 30 mins to restore after a password reset",
    },
  },
  {
    id: 3,
    source: "Outlook thread (IT Announcements, 12 May)",
    sourceType: "email",
    confidence: "medium",
    summary: "Check Credential Manager to remove old saved Teams credentials.",
    details: [
      "Some users resolved access issues by clearing saved passwords from Windows Credential Manager > Generic Credentials.",
    ],
    button: "View Email Snippet",
    sourceMeta: {
      date: "2024-05-12",
      author: "IT Announcements",
      system: "Outlook",
      content: `Some users resolved access issues by clearing saved passwords from Windows Credential Manager > Generic Credentials.`,
      highlight: "clearing saved passwords from Windows Credential Manager",
    },
  },
];

const TAGS = [
  { label: "Known Issue", color: "bg-red-100 text-red-700" },
  { label: "Resolved in past", color: "bg-green-100 text-green-700" },
  { label: "AD sync delay", color: "bg-yellow-100 text-yellow-800" },
];

const CONFIDENCE = {
  high: { color: "bg-green-500", label: "High" },
  medium: { color: "bg-orange-400", label: "Medium" },
  low: { color: "bg-red-500", label: "Low" },
};

export default function TicketSupportUI() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modal, setModal] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (expanded !== null) {
      const suggestion = SUGGESTIONS.find((s) => s.id === expanded);
      if (suggestion) {
        navigator.clipboard.writeText(suggestion.summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    }
  };

  const modalSuggestion = SUGGESTIONS.find((s) => s.id === modal);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col pb-32">
      {/* Issue Summary */}
      <div className="w-full bg-white shadow-sm px-8 py-6 flex flex-col md:flex-row md:items-center gap-4 border-b">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <BadgeCheck className="text-blue-600" size={22} />
            Issue: User unable to access Microsoft Teams after password reset
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Teams login", "password reset", "authentication"].map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium"
              >
                <Tag className="w-3 h-3 mr-1" /> {kw}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-none text-sm text-gray-500">
          Ticket ID: <span className="font-mono text-gray-700">#89453</span>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col md:flex-row gap-6 px-8 py-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-base font-semibold text-gray-700 mb-2">
            Suggested Resolutions
          </div>
          {SUGGESTIONS.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow group border border-gray-100"
            >
              <div
                className="flex items-center px-5 py-4 cursor-pointer select-none"
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setExpanded(expanded === s.id ? null : s.id);
                  }
                }}
                aria-expanded={expanded === s.id}
                role="button"
              >
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-3 ${CONFIDENCE[s.confidence].color}`}
                  title={`Confidence: ${CONFIDENCE[s.confidence].label}`}
                />
                <span className="mr-2">
                  {s.sourceType === "ticket" && (
                    <FileText className="text-blue-500" size={18} />
                  )}
                  {s.sourceType === "kb" && (
                    <FileText className="text-purple-500" size={18} />
                  )}
                  {s.sourceType === "email" && (
                    <Mail className="text-yellow-500" size={18} />
                  )}
                </span>
                <span className="font-medium text-gray-800 flex-1">
                  {s.summary}
                </span>
                <span className="text-xs text-gray-500 mr-3">{s.source}</span>
                <span>
                  {expanded === s.id ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </span>
              </div>
              {expanded === s.id && (
                <div className="px-7 pb-5 pt-1 transition-all">
                  <ul className="list-disc ml-6 text-sm text-gray-700 mb-2">
                    {s.details.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                  <button
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium mt-1"
                    onClick={() => setModal(s.id)}
                  >
                    <ArrowUpRight size={16} /> {s.button}
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Tags */}
          <div className="mt-4 flex gap-2 flex-wrap">
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

        <div className="hidden md:block w-72 flex-none" />
      </div>

      {/* Modal */}
      {modalSuggestion && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setModal(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>
                {modalSuggestion.sourceType === "ticket" && (
                  <FileText className="text-blue-500" size={16} />
                )}
                {modalSuggestion.sourceType === "kb" && (
                  <FileText className="text-purple-500" size={16} />
                )}
                {modalSuggestion.sourceType === "email" && (
                  <Mail className="text-yellow-500" size={16} />
                )}
              </span>
              <span>{modalSuggestion.source}</span>
              <span>•</span>
              <span>{modalSuggestion.sourceMeta.date}</span>
              <span>•</span>
              <span>{modalSuggestion.sourceMeta.author}</span>
              <span>•</span>
              <span className="capitalize">
                {modalSuggestion.sourceMeta.system}
              </span>
            </div>
            <div className="mt-2 text-gray-800 text-sm whitespace-pre-line">
              {modalSuggestion.sourceMeta.content
                .split(modalSuggestion.sourceMeta.highlight)
                .map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <React.Fragment key={i}>
                      {part}
                      <span className="bg-yellow-200 px-1 rounded">
                        {modalSuggestion.sourceMeta.highlight}
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

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={handleCopy}
            disabled={expanded === null}
          >
            <ClipboardCopy size={18} />
            {copied ? "Copied!" : "Copy to Ticket Response"}
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            <CheckCircle2 size={18} />
            Mark as Resolved
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">
            <AlertCircle size={18} />
            Escalate
          </button>
        </div>
        <span className="text-xs text-gray-400 hidden md:inline">
          Tip: Use <kbd>Tab</kbd> + <kbd>Enter</kbd> to toggle cards,{" "}
          <kbd>Ctrl+C</kbd> to copy, <kbd>Ctrl+E</kbd> to escalate
        </span>
      </div>
    </div>
  );
}
