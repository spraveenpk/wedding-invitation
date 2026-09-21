"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Contact, CallStatus } from "@/lib/telephony/types";
import { ANU_VOICE_PROFILE, DEFAULT_SCRIPT_TEMPLATE } from "@/lib/telephony/scriptGenerator";

export default function CallsDashboardPage() {
  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [metrics, setMetrics] = useState<Record<string, number>>({
    Total: 0,
    Pending: 0,
    Called: 0,
    Answered: 0,
    Busy: 0,
    "No Answer": 0,
    Failed: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Settings & Test Mode
  const [settings, setSettings] = useState({
    testMode: true,
    testPhoneNumber: "+919876543210",
    scriptTemplate: "",
    activeProvider: "mock",
    hasTwilioConfig: false,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempTestPhone, setTempTestPhone] = useState("");
  const [tempTemplate, setTempTemplate] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  // Modals & Actions
  const [isTestCallModalOpen, setIsTestCallModalOpen] = useState(false);
  const [selectedContactForCall, setSelectedContactForCall] = useState<Contact | null>(null);
  const [callingState, setCallingState] = useState<"idle" | "calling" | "success" | "error">("idle");
  const [callMessage, setCallMessage] = useState<string>("");
  const [activeCallSid, setActiveCallSid] = useState<string>("");

  // Script Preview Modal
  const [previewContact, setPreviewContact] = useState<Contact | null>(null);

  // Voice Preview (Web Speech API)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // CSV Import
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importNotice, setImportNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);



  const fetchContacts = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        status: selectedStatus,
        search: searchQuery,
        page: currentPage.toString(),
        limit: "25",
      });
      const res = await fetch(`/api/calls/contacts?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
        setMetrics(data.metrics || {});
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchQuery, currentPage]);

  // Effects
  useEffect(() => {
    let ignore = false;
    fetch("/api/calls/settings")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success) {
          setSettings(data.settings);
          setTempTestPhone(data.settings.testPhoneNumber || "");
          setTempTemplate(data.settings.scriptTemplate || DEFAULT_SCRIPT_TEMPLATE);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const params = new URLSearchParams({
      status: selectedStatus,
      search: searchQuery,
      page: currentPage.toString(),
      limit: "25",
    });

    fetch(`/api/calls/contacts?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success) {
          setContacts(data.contacts || []);
          setMetrics(data.metrics || {});
          setTotalPages(data.totalPages || 1);
          setTotalCount(data.total || 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading contacts:", err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedStatus, searchQuery, currentPage]);

  // Load browser speech synthesis voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    }
  }, []);

  // Trigger Outbound Call (Mock or Twilio)
  const handleTriggerCall = async (contact?: Contact | null) => {
    setCallingState("calling");
    setCallMessage("Dialing securely...");
    try {
      const payload: { contactId?: string; name?: string; phoneNumber?: string } = {};
      if (contact) {
        payload.contactId = contact.id;
      } else {
        payload.name = "Praveen (Test)";
        payload.phoneNumber = settings.testPhoneNumber;
      }

      const res = await fetch("/api/calls/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setCallingState("success");
        setCallMessage(data.message);
        setActiveCallSid(data.result?.callSid || "");
        fetchContacts();

        // If in mock mode, automatically simulate call progression to Answered after 4 seconds
        if (settings.activeProvider === "mock" && contact) {
          setTimeout(async () => {
            try {
              await fetch("/api/calls/simulate-update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contactId: contact.id,
                  status: "Answered",
                  durationSeconds: 52,
                }),
              });
              fetchContacts();
            } catch (e) {
              console.error(e);
            }
          }, 3500);
        }
      } else {
        setCallingState("error");
        setCallMessage(data.error || "Call failed.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error while triggering call.";
      setCallingState("error");
      setCallMessage(message);
    }
  };

  // In-Browser Speech Audition for Anu's Voice
  const handleSpeakAnu = (textToSpeak: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Browser speech synthesis is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Find best voice matching Indian English or sweet female voice
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(
      (v) =>
        (v.lang === "en-IN" || v.lang === "ta-IN" || v.name.includes("India") || v.name.includes("Heera") || v.name.includes("Veena")) &&
        (v.name.toLowerCase().includes("female") || !v.name.toLowerCase().includes("male"))
    );
    const fallbackFemale = voices.find(
      (v) =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("female")
    );

    if (indianVoice) {
      utterance.voice = indianVoice;
    } else if (fallbackFemale) {
      utterance.voice = fallbackFemale;
    }

    utterance.rate = 0.93; // Slightly measured, warm conversational pace
    utterance.pitch = 1.05; // Pleasant female pitch

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // CSV File Upload Handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportNotice(null);

    try {
      const text = await file.text();
      const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);

      if (lines.length < 2) {
        throw new Error("CSV file is empty or missing data rows.");
      }

      // Parse headers
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]+/g, ""));
      const nameIdx = headers.findIndex((h) => h.includes("name"));
      const phoneIdx = headers.findIndex((h) => h.includes("phone") || h.includes("mobile") || h.includes("number") || h.includes("contact"));
      const notesIdx = headers.findIndex((h) => h.includes("note") || h.includes("relation") || h.includes("group"));

      if (nameIdx === -1 || phoneIdx === -1) {
        throw new Error("Could not detect Name and Phone Number columns in header. Please ensure columns include 'Name' and 'Phone'.");
      }

      const parsedContacts: Array<{ name: string; phoneNumber: string; notes?: string }> = [];

      for (let i = 1; i < lines.length; i++) {
        // Simple regex parser handling optional quotes
        const row = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
        const name = row[nameIdx];
        let phone = row[phoneIdx];
        const notes = notesIdx !== -1 ? row[notesIdx] : "";

        if (name && phone) {
          // Format phone number: if 10 digits without +91, prepend +91
          const digits = phone.replace(/\D/g, "");
          if (digits.length === 10) {
            phone = `+91${digits}`;
          } else if (digits.length === 12 && digits.startsWith("91")) {
            phone = `+${digits}`;
          } else if (!phone.startsWith("+")) {
            phone = `+${phone}`;
          }

          parsedContacts.push({ name, phoneNumber: phone, notes });
        }
      }

      if (parsedContacts.length === 0) {
        throw new Error("No valid contact rows found in file.");
      }

      const res = await fetch("/api/calls/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts: parsedContacts }),
      });

      const data = await res.json();
      if (data.success) {
        setImportNotice({
          type: "success",
          text: `Successfully imported ${data.addedCount} contacts! (${data.duplicateCount} duplicates skipped)`,
        });
        fetchContacts();
      } else {
        throw new Error(data.error || "Failed to import contacts");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to read CSV";
      setImportNotice({ type: "error", text: message });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Download Sample CSV
  const handleDownloadSampleCsv = () => {
    const sample = `Name,Phone Number,Notes
Karthik Raja,+919842100001,School Friend
Ananya Sundaram,+919842100002,Family Relative
Vigneshwaran M,+919842100003,Colleague
Meenakshi Raman,+919842100004,Neighbour`;

    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "wedding_contacts_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/calls/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testPhoneNumber: tempTestPhone,
          scriptTemplate: tempTemplate,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setIsSettingsOpen(false);
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSettings(false);
    }
  };

  // Reset statuses
  const handleResetStatuses = async () => {
    if (!confirm("Are you sure you want to reset all call statuses back to Pending?")) return;
    try {
      const res = await fetch("/api/calls/contacts?action=reset-statuses", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchContacts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Status Badge Colors
  const getStatusBadge = (status: CallStatus) => {
    switch (status) {
      case "Answered":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-500/20";
      case "Called":
        return "bg-sky-950/80 text-sky-300 border-sky-500/40 animate-pulse";
      case "Busy":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "No Answer":
        return "bg-purple-950/80 text-purple-300 border-purple-500/40";
      case "Failed":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      case "Pending":
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-[#0d0d12]/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Invitation Page
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-wide text-amber-200/90 font-serif">
                  Praveen & Arunachala Priya
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Calling Portal
                </span>
              </div>
              <p className="text-xs text-zinc-400">Wedding Reminder & AI Voice Calling Automation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Provider Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400">Provider:</span>
              <span className="font-medium text-zinc-200">
                {settings.activeProvider === "mock" ? "Mock Simulator (Free)" : "Twilio Voice"}
              </span>
            </div>

            {/* Test Mode Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-600/40 text-xs text-amber-300">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-semibold">TEST MODE ON</span>
            </div>

            {/* Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Settings & Telephony Config"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Safety Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-600/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-amber-950/10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 mt-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                  Strict Safety Guard Active
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200">
                  Protected
                </span>
              </div>
              <p className="text-sm text-zinc-300 mt-1">
                Outbound calls are restricted exclusively to your test number:{" "}
                <strong className="text-white font-mono bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  {settings.testPhoneNumber || "Not Set"}
                </strong>
                . Calls to all other 800+ contacts are safely locked until you decide to enable Live Broadcast.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedContactForCall(null);
                setIsTestCallModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Test Call to My Number
            </button>
          </div>
        </div>

        {/* AI Voice "Anu" Showcase Card */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
                🎙️
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">AI Voice: &quot;Anu&quot;</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                    Neural Indian English Female
                  </span>
                </div>
                <p className="text-sm text-zinc-400 max-w-2xl">
                  {ANU_VOICE_PROFILE.description} Speaks wedding details respectfully with clear pronunciation of Tamil names and Coimbatore venue details.
                </p>
                <div className="text-xs text-zinc-500 flex flex-wrap items-center gap-3 pt-1">
                  <span>Provider Mapping: <code className="text-zinc-300">{ANU_VOICE_PROFILE.twilioVoice}</code></span>
                  <span>•</span>
                  <span>Locale: <code className="text-zinc-300">{ANU_VOICE_PROFILE.twilioLanguage}</code></span>
                  <span>•</span>
                  <span>Zero Cost Browser Audition Ready</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleSpeakAnu(generateSampleSpeech())}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2.5 ${
                  isPlayingAudio
                    ? "bg-rose-950/60 border-rose-500/50 text-rose-300 animate-pulse"
                    : "bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700 text-amber-200"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                    Stop Speaking
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    🔊 Listen to Anu Speak
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setPreviewContact(contacts[0] || null);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-sm transition-colors"
                title="View Full Script"
              >
                View Script
              </button>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {[
            { label: "Total Contacts", count: metrics.Total || 0, color: "from-zinc-800 to-zinc-900 border-zinc-700", text: "text-white" },
            { label: "Pending", count: metrics.Pending || 0, color: "from-zinc-900 to-zinc-950 border-zinc-800", text: "text-zinc-300" },
            { label: "Called", count: metrics.Called || 0, color: "from-sky-950/40 to-zinc-900 border-sky-800/40", text: "text-sky-300" },
            { label: "Answered", count: metrics.Answered || 0, color: "from-emerald-950/40 to-zinc-900 border-emerald-800/40", text: "text-emerald-300" },
            { label: "Busy", count: metrics.Busy || 0, color: "from-amber-950/40 to-zinc-900 border-amber-800/40", text: "text-amber-300" },
            { label: "No Answer", count: metrics["No Answer"] || 0, color: "from-purple-950/40 to-zinc-900 border-purple-800/40", text: "text-purple-300" },
            { label: "Failed", count: metrics.Failed || 0, color: "from-rose-950/40 to-zinc-900 border-rose-800/40", text: "text-rose-300" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelectedStatus(item.label === "Total Contacts" ? "All" : item.label);
                setCurrentPage(1);
              }}
              className={`p-4 rounded-xl border bg-gradient-to-br transition-all text-left group hover:scale-[1.02] ${item.color} ${
                (selectedStatus === "All" && item.label === "Total Contacts") || selectedStatus === item.label
                  ? "ring-2 ring-amber-400/60"
                  : ""
              }`}
            >
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium block">
                {item.label}
              </span>
              <span className={`text-2xl font-bold mt-1 block font-mono ${item.text}`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Action Controls & Search Bar */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <svg
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search contact name or phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Actions: Import CSV, Sample, Reset */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors flex items-center gap-2 border border-zinc-700"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {importing ? "Importing..." : "Import CSV (800+ Contacts)"}
              </button>

              <button
                onClick={handleDownloadSampleCsv}
                className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs border border-zinc-800 transition-colors"
                title="Download CSV template"
              >
                Sample CSV
              </button>

              <button
                onClick={handleResetStatuses}
                className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs border border-zinc-800 transition-colors"
                title="Reset all calls to Pending"
              >
                Reset Statuses
              </button>
            </div>
          </div>

          {/* Import Notice */}
          {importNotice && (
            <div
              className={`text-xs p-3 rounded-xl flex items-center justify-between ${
                importNotice.type === "success"
                  ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-200"
                  : "bg-rose-950/80 border border-rose-500/30 text-rose-200"
              }`}
            >
              <span>{importNotice.text}</span>
              <button onClick={() => setImportNotice(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Contacts Table */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950/80 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Contact Name</th>
                  <th className="px-6 py-4 font-semibold">Phone Number</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Duration / SID</th>
                  <th className="px-6 py-4 font-semibold">Last Activity</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-normal">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      Loading contacts...
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      No contacts found matching criteria. Use the &quot;Import CSV&quot; button to load your contacts.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-zinc-800/40 transition-colors group">
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{contact.name}</div>
                        {contact.notes && (
                          <div className="text-xs text-zinc-500 truncate max-w-xs">{contact.notes}</div>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 font-mono text-xs text-zinc-300">
                        {contact.phoneNumber}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            contact.status
                          )}`}
                        >
                          {contact.status}
                        </span>
                      </td>

                      {/* Duration / SID */}
                      <td className="px-6 py-4 text-xs">
                        {contact.durationSeconds ? (
                          <span className="text-emerald-400 font-mono font-medium">
                            {contact.durationSeconds}s
                          </span>
                        ) : contact.callSid ? (
                          <span className="font-mono text-zinc-500 text-[11px] truncate block max-w-[120px]">
                            {contact.callSid}
                          </span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>

                      {/* Last Called */}
                      <td className="px-6 py-4 text-xs text-zinc-400">
                        {contact.lastCalledAt
                          ? new Date(contact.lastCalledAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                            })
                          : "Never"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right space-x-2">
                        {/* Listen preview button */}
                        <button
                          onClick={() =>
                            handleSpeakAnu(
                              contact.personalizedScript || generateSampleSpeech(contact.name)
                            )
                          }
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-amber-300 transition-colors inline-block"
                          title="Listen to personalized invitation for this contact"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5z" />
                          </svg>
                        </button>

                        {/* Test Call This Contact */}
                        <button
                          onClick={() => {
                            setSelectedContactForCall(contact);
                            setIsTestCallModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-600/30 border border-zinc-700 hover:border-amber-500/40 text-zinc-300 hover:text-amber-200 text-xs font-medium transition-all"
                        >
                          Trigger Call
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <div>
              Showing {contacts.length} of {totalCount} contacts
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 transition-colors"
              >
                Previous
              </button>
              <span className="px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: Test Call Confirmation */}
      {isTestCallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white">Explicit Call Trigger</h3>
              </div>
              <button
                onClick={() => {
                  setIsTestCallModalOpen(false);
                  setCallingState("idle");
                }}
                className="text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            </div>

            {/* Test Safety Notice */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Target Contact:</span>
                <span className="font-semibold text-white">
                  {selectedContactForCall ? selectedContactForCall.name : "Test Number (Direct)"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Recipient Phone:</span>
                <span className="font-mono text-amber-300">
                  {selectedContactForCall ? selectedContactForCall.phoneNumber : settings.testPhoneNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Active Provider:</span>
                <span className="text-zinc-200">
                  {settings.activeProvider === "mock" ? "Mock Simulator (Free)" : "Twilio API"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">AI Voice:</span>
                <span className="text-zinc-200">Anu (Polly.Kajal-Neural)</span>
              </div>
            </div>

            {/* Safety Mode Warning */}
            {settings.testMode && selectedContactForCall && selectedContactForCall.phoneNumber !== settings.testPhoneNumber && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                <svg className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong>Safety Guard Active:</strong> Because TEST MODE is enabled, calls to numbers other than your test number ({settings.testPhoneNumber}) will be blocked to prevent accidental real dials.
                </span>
              </div>
            )}

            {/* Call State Feedback */}
            {callingState === "calling" && (
              <div className="p-4 bg-sky-950/60 border border-sky-600/40 rounded-xl text-center space-y-2">
                <div className="w-8 h-8 mx-auto border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-sky-300">Initiating call via telephony service...</p>
              </div>
            )}

            {callingState === "success" && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-center space-y-2">
                <div className="text-2xl">🎉</div>
                <p className="text-xs font-semibold text-emerald-300">{callMessage}</p>
                {activeCallSid && (
                  <p className="text-[11px] font-mono text-zinc-400">SID: {activeCallSid}</p>
                )}
              </div>
            )}

            {callingState === "error" && (
              <div className="p-4 bg-rose-950/60 border border-rose-600/40 rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-rose-300">Call Blocked / Failed</p>
                <p className="text-xs text-zinc-400">{callMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsTestCallModalOpen(false);
                  setCallingState("idle");
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                disabled={callingState === "calling"}
                onClick={() => handleTriggerCall(selectedContactForCall)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                {callingState === "calling" ? "Connecting..." : "Trigger Call Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Script Preview */}
      {previewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Personalized Wedding Reminder Script</h3>
                <p className="text-xs text-zinc-400">Spoken by AI Voice &quot;Anu&quot; to {previewContact.name}</p>
              </div>
              <button onClick={() => setPreviewContact(null)} className="text-zinc-500 hover:text-zinc-300">
                ✕
              </button>
            </div>

            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-serif text-sm text-zinc-200 leading-relaxed italic">
              &ldquo;{previewContact.personalizedScript || generateSampleSpeech(previewContact.name)}&rdquo;
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() =>
                  handleSpeakAnu(
                    previewContact.personalizedScript || generateSampleSpeech(previewContact.name)
                  )
                }
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-medium transition-colors flex items-center gap-2"
              >
                🔊 Audition This Script
              </button>

              <button
                onClick={() => setPreviewContact(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Settings Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Calling Application Settings</h3>
                <p className="text-xs text-zinc-400">Configure safety guards, test numbers, and voice scripts</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Test Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Verified Test Phone Number (Your Phone)
                </label>
                <input
                  type="text"
                  value={tempTestPhone}
                  onChange={(e) => setTempTestPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-500/50"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  In Test Mode, all call actions are hard-locked to this number to guarantee safety.
                </p>
              </div>

              {/* Script Template */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Invitation Script Template
                </label>
                <textarea
                  rows={5}
                  value={tempTemplate}
                  onChange={(e) => setTempTemplate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500/50 leading-relaxed"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Available tags: <code>{'{name}'}</code>, <code>{'{groom}'}</code>, <code>{'{bride}'}</code>, <code>{'{receptionDate}'}</code>, <code>{'{muhurthamDate}'}</code>, <code>{'{venue}'}</code>, <code>{'{location}'}</code>
                </p>
              </div>

              {/* Provider Info */}
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-2">
                <span className="font-semibold text-zinc-300 block">Telephony Environment Status</span>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Current Active Provider:</span>
                  <span className="text-amber-300 font-mono">
                    {settings.activeProvider}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Twilio Credentials Found in .env:</span>
                  <span className={settings.hasTwilioConfig ? "text-emerald-400" : "text-zinc-500"}>
                    {settings.hasTwilioConfig ? "Configured" : "None (Mock Active)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingSettings}
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold transition-colors"
              >
                {savingSettings ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function generateSampleSpeech(name: string = "Karthik") {
  return (
    `Vanakkam ${name}! This is Anu calling with joyous tidings on behalf of Praveen Kumar and Sri Arunachala Priya. ` +
    `We warmly invite you and your family to celebrate their wedding ceremonies. ` +
    `The Reception will take place on Sunday, 15th November from 6:00 PM, and the auspicious Muhurtham on Monday, 16th November from 6:00 AM, at Kettimelam Mahal, Coimbatore. ` +
    `Your gracious presence and blessings mean the world to our families. We eagerly look forward to welcoming you! Have a wonderful day ahead.`
  );
}
