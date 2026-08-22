import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Copy,
  Check,
  Bot,
  User,
  Zap,
  TrendingUp,
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AICopilotModal: React.FC = () => {
  const {
    isAICopilotModalOpen,
    setIsAICopilotModalOpen,
    aiCopilotContext,
    opportunities,
    companies,
    people,
    showToast,
  } = useCRM();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      role: 'assistant',
      content:
        "Hello! I'm **Twenty AI Copilot**, your real-time sales intelligence advisor. How can I help accelerate your pipeline today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    if (isAICopilotModalOpen && aiCopilotContext?.initialPrompt) {
      handleSendPrompt(aiCopilotContext.initialPrompt);
    }
  }, [isAICopilotModalOpen, aiCopilotContext]);

  if (!isAICopilotModalOpen) return null;

  const quickPrompts = [
    {
      icon: TrendingUp,
      title: 'Analyze Pipeline Health',
      prompt: 'Analyze our current pipeline health, top 3 highest value deals, and outline key risks.',
    },
    {
      icon: Mail,
      title: 'Draft Executive Follow-Up',
      prompt: 'Draft a personalized follow-up email to Guillermo at Vercel regarding contract terms and SLA clauses.',
    },
    {
      icon: ShieldCheck,
      title: 'Objection Handling Playbook',
      prompt: 'Provide strategies to handle pricing objections for enterprise customers comparing Twenty to Salesforce.',
    },
    {
      icon: Zap,
      title: 'Extract Action Items',
      prompt: 'Summarize recent deal activities into a prioritized checklist for this week.',
    },
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim() || loading) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    fetch('/api/ai/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        context: aiCopilotContext
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        const aiMsg: Message = {
          id: 'msg-ai-' + Date.now(),
          role: 'assistant',
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Real AI Copilot failed, falling back to offline simulation:', err);
        let response = '';

        if (promptText.toLowerCase().includes('pipeline') || promptText.toLowerCase().includes('health')) {
          const total = opportunities.reduce((s, o) => s + o.amount, 0);
          const topDeal = [...opportunities].sort((a, b) => b.amount - a.amount)[0];
          response = `### 📊 Pipeline Health & Intelligence Brief\n\n**Total Pipeline Volume:** $${total.toLocaleString()}\n**Top Priority Deal:** ${topDeal.name} ($${topDeal.amount.toLocaleString()})\n\n#### Key Findings & Action Items:\n1. **High Velocity:** 2 deals are currently in *Negotiation* stage ($234k combined).\n2. **Risk Factor:** The proposal with **Linear App** ($72,000) has been in proposal stage for 18 days. Recommend scheduling an executive QBR alignment call.\n3. **Upsell Opportunity:** **Supabase Inc.** has high platform usage and is a prime candidate for the high-availability add-on ($48,000).`;
        } else if (promptText.toLowerCase().includes('email') || promptText.toLowerCase().includes('draft') || promptText.toLowerCase().includes('follow-up')) {
          response = `### ✉️ Suggested Executive Follow-up Draft\n\n**Subject:** Next steps on SLA & Enterprise Agreement clauses\n\nHi Guillermo,\n\nFollowing our discussion on the custom uptime SLA and multi-year terms, our legal team has approved the redlined master agreement with the requested 99.99% availability guarantee.\n\nHere is a quick summary of next steps:\n- **Master Agreement:** Countersigned copy ready for your procurement team.\n- **Dedicated Account Lead:** Sarah Chen is designated as your executive sponsor.\n- **Onboarding Kickoff:** Scheduled tentatively for the first Monday of next month.\n\nCould you let me know if Friday at 11am PT works to finalize signatures?\n\nBest regards,\nSarah Chen\nAccount Executive, Twenty`;
        } else if (promptText.toLowerCase().includes('objection') || promptText.toLowerCase().includes('salesforce')) {
          response = `### 🛡️ Objection Handling: Twenty vs Legacy CRMs\n\n#### 1. "Salesforce has more legacy ecosystem apps"\n- **Response:** *"Salesforce requires expensive consultants and months of configuration. Twenty is modern, open-source, connects directly to your Postgres database, and your team will love using it on day one without bloated overhead."*\n\n#### 2. "We have custom data fields & schema requirements"\n- **Response:** *"Twenty offers full schema flexibility with first-class custom fields and GraphQL/REST APIs, giving developers and ops full control without lock-in."*\n\n#### 3. "Cost & seat licensing"\n- **Response:** *"Twenty offers transparent, fair pricing with zero artificial tier penalties, saving typical high-growth teams 60-70% on annual CRM spend."*`;
        } else {
          response = `### 🎯 Strategic Insights for ${aiCopilotContext?.name || 'Your Sales Flow'}\n\nBased on real-time CRM activity and account history:\n\n1. **Decision Maker Engagement:** High interaction recorded with executive champions.\n2. **Deal Velocity:** Currently pacing ahead of average cycle times by **4.2 days**.\n3. **Recommended Immediate Action:** Send calendar invite for final contract walkthrough and lock in target close date.\n\nWould you like me to generate a tailored proposal deck outline or meeting summary?`;
        }

        const aiMsg: Message = {
          id: 'msg-ai-' + Date.now(),
          role: 'assistant',
          content: response + "\n\n*(Note: Displaying simulated insights. You can connect a real Gemini API key in Settings > Secrets)*",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
      });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      id="twenty-ai-copilot-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={() => setIsAICopilotModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0f121a] border border-[#273048] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[680px] max-h-[90vh] text-slate-300 text-xs select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1e2434] flex items-center justify-between bg-gradient-to-r from-[#121624] via-[#161a2c] to-[#121624]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">Twenty AI Copilot</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  GPT-4 / Gemini
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {aiCopilotContext?.name ? `Focused on: ${aiCopilotContext.name}` : 'Sales Strategy & Deal Intelligence'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAICopilotModalOpen(false)}
            className="p-1.5 rounded hover:bg-[#1f2535] text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-xs shadow-sm ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-[#151926] text-slate-200 border border-[#232b3d] rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 text-[10px] opacity-60">
                    <span>{m.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(m.content, m.id)}
                        className="hover:opacity-100 flex items-center gap-1 text-slate-300"
                        title="Copy"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>Copy</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-blue-700/50 border border-blue-400/40 flex items-center justify-center text-blue-200 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing CRM records and generating strategy...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 border-t border-[#1a1f2c] bg-[#0c0e14] flex items-center gap-2 overflow-x-auto">
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendPrompt(qp.prompt)}
                className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141824] hover:bg-[#1c2233] text-slate-300 hover:text-white border border-[#232a3d] text-[11px] transition-colors"
              >
                <Icon className="w-3 h-3 text-indigo-400" />
                <span>{qp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(input);
          }}
          className="p-3 bg-[#11141d] border-t border-[#1e2434] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot anything about deals, accounts, or strategy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#161a26] text-xs text-white placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-[#252c3f] focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
