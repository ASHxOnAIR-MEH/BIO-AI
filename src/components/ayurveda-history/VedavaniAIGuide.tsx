"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  ShieldCheck,
  Loader2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  citation?: string;
  source?: string;
  followUps?: string[];
}

interface VedavaniAIGuideProps {
  isMalayalam?: boolean;
}

export default function VedavaniAIGuide({
  isMalayalam = false,
}: VedavaniAIGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: isMalayalam
        ? "നമസ്കാരം! ഞാൻ വേദ — ആയുർവേദ ഗവേഷകയും ഡിജിറ്റൽ നോളജ് ഗൈഡും. ചരകൻ, സുശ്രുതൻ, അഥർവ്വവേദം, വാഗ്ഭടൻ, അഷ്ടാംഗ ശാഖകൾ, കേരളത്തിലെ അഷ്ടവൈദ്യന്മാർ, സഹസ്രയോഗം എന്നിവയെക്കുറിച്ചുള്ള ആധികാരിക ചരിത്ര വിവരങ്ങൾ എന്നോട് ചോദിക്കാം."
        : "Namaste! I am Veda, your Ayurveda Knowledge Guide and researcher. You can ask me verified historical questions about Master Charaka, Sushruta's surgical codices, the Atharvaveda, Vagbhata's Ashtanga Hridaya, Kerala's Ashtavaidya lineages, and classical literature like Sahasrayogam.",
      citation: "Bio-AI Heritage Archive & CCRAS Literary Dossier",
      source: "Archival Knowledge Base",
      followUps: [
        "Who was Charaka?",
        "Who was Sushruta?",
        "What is the historical significance of Atharvaveda?",
        "Who was Vagbhata?",
        "What are the eight branches of Ayurveda?",
        "What is the difference between Charaka Samhita and Sushruta Samhita?",
        "How did the Ashtavaidya tradition develop?",
        "What is Sahasrayogam?",
        "Which historical sources discuss the Ashtavaidya families?",
      ],
    },
  ]);

  const handleSendMessage = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setQueryInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ayurveda-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer || "No documented information found in verified archives.",
            citation: data.citation,
            source: data.verifiedSource,
            followUps: data.suggestedFollowUps,
          },
        ]);
      } else {
        throw new Error("Failed response");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I could not reach the archival engine right now. All my historical insights remain strictly grounded in CCRAS, NCBS and SAMHiTA documented literature.",
          citation: "Offline Fail-Safe Verification",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── FLOATING TALISMAN BUTTON (BOTTOM RIGHT) ─── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#072820] via-[#0B5D46] to-[#072820] text-[#FAF7EE] border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(7,40,32,0.45)] backdrop-blur-md active:scale-95 transition-all group touch-manipulation"
          aria-label="Open Veda Ayurveda Knowledge Guide"
        >
          {/* Pulsing Aura Ping */}
          <span className="absolute -inset-1 rounded-full bg-[#D4AF37] opacity-35 animate-pulse pointer-events-none" />

          {/* Veda Avatar Circle */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37] shrink-0 shadow-sm">
            <Image
              src="/images/veda/veda-avatar.png"
              alt="Veda, Ayurveda Knowledge Guide"
              fill
              className="object-cover object-center"
              sizes="32px"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-serif font-bold text-white tracking-wider flex items-center gap-1">
              <span>VEDA</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </span>
            <span className="text-[10px] text-[#D4AF37] font-mono leading-none">
              {isMalayalam ? "ആയുർവേദ ഗൈഡ്" : "Heritage Guide"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* ─── CONVERSATIONAL DRAWER / MODAL ─── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end sm:pr-8 p-0 sm:p-4 pointer-events-none">
            {/* Backdrop on Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="sm:hidden absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="pointer-events-auto relative w-full sm:w-[420px] md:w-[480px] h-[85vh] sm:h-[620px] max-h-[90vh] bg-[#FAF7EE] text-[#072820] rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 border-[#D4AF37] flex flex-col overflow-hidden"
              role="dialog"
              aria-label="Veda Ayurveda Knowledge Guide Chat"
            >
              {/* Header */}
              <div className="px-5 py-4 bg-[#072820] text-[#FAF7EE] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
                    <Image
                      src={loading ? "/images/veda/veda-thinking.png" : "/images/veda/veda-avatar.png"}
                      alt="Veda Guide"
                      fill
                      className="object-cover object-center"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white leading-tight flex items-center gap-1.5">
                      <span>VEDA</span>
                      <span className="text-[11px] font-sans font-normal text-[#D4AF37]">
                        • {isMalayalam ? "ആയുർവേദ നോളജ് ഗൈഡ്" : "Ayurveda Knowledge Guide"}
                      </span>
                    </h3>
                    <p className="text-[10px] font-mono text-[#D4AF37]/90">
                      Grounded in CCRAS, NCBS & SAMHiTA Records
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close Veda dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Flow */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono font-bold text-[#0B5D46]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55B96A]" />
                        <span>VEDA RESEARCHER</span>
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0B5D46] text-white rounded-br-none shadow-xs font-medium"
                          : "bg-white text-[#072820] border border-[#0B5D46]/15 rounded-bl-none shadow-xs font-sans"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Citation Badge */}
                      {msg.citation && (
                        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-1.5 text-[10px] text-[#0B5D46] font-mono">
                          <ShieldCheck className="w-3 h-3 text-[#D4AF37] shrink-0" />
                          <span className="truncate">Reference: {msg.citation}</span>
                        </div>
                      )}
                    </div>

                    {/* Suggested Follow-ups */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                        {msg.followUps.map((fu, fidx) => (
                          <button
                            key={fidx}
                            type="button"
                            onClick={() => handleSendMessage(fu)}
                            className="px-2.5 py-1 rounded-full bg-white border border-[#D4AF37]/50 text-[11px] font-medium text-[#072820] hover:bg-[#FAF7EE] active:scale-95 transition-all text-left truncate max-w-full"
                          >
                            💡 {fu}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2.5 text-xs text-[#0B5D46] font-mono bg-white p-3 rounded-2xl w-fit shadow-xs border border-gray-100">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>Veda is consulting CCRAS and NCBS archival records...</span>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(queryInput);
                }}
                className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder={
                    isMalayalam
                      ? "വേദയോട് ആയുർവേദ ചരിത്രം ചോദിക്കൂ..."
                      : "Ask Veda about Charaka, Sushruta, Vagbhata, Ashtavaidyas..."
                  }
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7EE] border border-gray-300 text-xs sm:text-sm text-[#072820] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={loading || !queryInput.trim()}
                  className="w-10 h-10 rounded-full bg-[#0B5D46] hover:bg-[#072820] text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all active:scale-95"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
