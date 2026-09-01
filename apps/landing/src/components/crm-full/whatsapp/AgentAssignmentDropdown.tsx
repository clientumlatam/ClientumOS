import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Bot,
  ChevronDown,
  Search,
  Check,
  ArrowRightLeft,
  Sparkles,
  MessageSquare,
  Shield,
  X
} from 'lucide-react';
import { WhatsAppAgent, WaConversationExtended } from './types';

interface AgentAssignmentDropdownProps {
  conversation: WaConversationExtended;
  agents: WhatsAppAgent[];
  currentAgent: WhatsAppAgent;
  onAssignAgent: (conversationId: number, agentId: string | null, transferNote?: string) => void;
  variant?: 'compact' | 'full' | 'header';
}

export const AgentAssignmentDropdown: React.FC<AgentAssignmentDropdownProps> = ({
  conversation,
  agents,
  currentAgent,
  onAssignAgent,
  variant = 'header'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransferNoteModal, setShowTransferNoteModal] = useState(false);
  const [targetAgentToTransfer, setTargetAgentToTransfer] = useState<WhatsAppAgent | null>(null);
  const [transferNote, setTransferNote] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const assignedAgent = agents.find(a => a.id === conversation.assigned_agent_id);

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAgent = (agent: WhatsAppAgent | null) => {
    if (!agent) {
      // Unassign
      onAssignAgent(conversation.id, null);
      setIsOpen(false);
      return;
    }

    if (agent.id === conversation.assigned_agent_id) {
      setIsOpen(false);
      return;
    }

    // Open transfer note modal if changing to someone else
    setTargetAgentToTransfer(agent);
    setTransferNote('');
    setShowTransferNoteModal(true);
    setIsOpen(false);
  };

  const handleConfirmTransfer = () => {
    if (targetAgentToTransfer) {
      onAssignAgent(conversation.id, targetAgentToTransfer.id, transferNote.trim() || undefined);
    }
    setShowTransferNoteModal(false);
    setTargetAgentToTransfer(null);
    setTransferNote('');
  };

  const handleAssignToMe = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAssignAgent(conversation.id, currentAgent.id, 'Auto-asignado desde panel comercial');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      {variant === 'header' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm"
          title="Asignar o derivar conversación a un asesor"
        >
          {assignedAgent ? (
            <>
              <div className={`w-5 h-5 rounded-full ${assignedAgent.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}>
                {assignedAgent.isBot ? <Bot className="w-3 h-3" /> : assignedAgent.avatarInitials}
              </div>
              <span className="truncate max-w-[120px] text-white font-semibold">{assignedAgent.name}</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-[10px]">
                <UserPlus className="w-3 h-3" />
              </div>
              <span className="text-amber-400 font-semibold">Sin Asignar</span>
            </>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
        </button>
      )}

      {variant === 'compact' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
        >
          {assignedAgent ? (
            <span className="text-emerald-400 font-medium truncate max-w-[80px]">{assignedAgent.name.split(' ')[0]}</span>
          ) : (
            <span className="text-amber-400/80">Sin asignar</span>
          )}
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0b1324] border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden text-slate-200 animate-slide-down">
          {/* Header & Quick Action */}
          <div className="p-3 border-b border-slate-800 bg-[#070c18] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Asignar Agente Comercial
              </span>
              {assignedAgent?.id !== currentAgent.id && (
                <button
                  onClick={handleAssignToMe}
                  className="text-[10px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-lg border border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <UserCheck className="w-3 h-3" />
                  Asignarme a mí
                </button>
              )}
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar comercial o rol..."
                className="w-full bg-[#050B14] border border-slate-800 rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
            </div>
          </div>

          {/* Agents List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/60 p-1">
            {/* Unassign option */}
            <button
              onClick={() => handleSelectAgent(null)}
              className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/[0.04] transition-colors ${
                !conversation.assigned_agent_id ? 'bg-amber-500/10 text-amber-300' : 'text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Sin Asignar / Cola General</p>
                  <p className="text-[10px] text-slate-500">Disponible para cualquier asesor</p>
                </div>
              </div>
              {!conversation.assigned_agent_id && <Check className="w-4 h-4 text-amber-400" />}
            </button>

            {filteredAgents.map(agent => {
              const isSelected = conversation.assigned_agent_id === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent)}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/[0.04] transition-colors ${
                    isSelected ? 'bg-emerald-500/10 border-l-2 border-emerald-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className={`w-7 h-7 rounded-full ${agent.avatarColor} text-white flex items-center justify-center text-xs font-bold shrink-0 relative`}>
                      {agent.isBot ? <Bot className="w-3.5 h-3.5" /> : agent.avatarInitials}
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-900 ${
                        agent.status === 'online' ? 'bg-emerald-400' : agent.status === 'busy' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                        {agent.isBot && (
                          <span className="text-[9px] px-1 py-0.2 bg-purple-500/20 text-purple-300 rounded font-bold">IA</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{agent.role}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Transfer Notes Modal */}
      {showTransferNoteModal && targetAgentToTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b1324] border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-5 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Derivar Conversación</h4>
                  <p className="text-[11px] text-slate-400">Transferir lead a {targetAgentToTransfer.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTransferNoteModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-[#060c18] p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${targetAgentToTransfer.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                  {targetAgentToTransfer.avatarInitials}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{targetAgentToTransfer.name}</p>
                  <p className="text-[10px] text-slate-400">{targetAgentToTransfer.role} · {targetAgentToTransfer.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Nota interna de traspaso (Opcional):
                </label>
                <textarea
                  value={transferNote}
                  onChange={e => setTransferNote(e.target.value)}
                  placeholder="Ej: Cliente interesado en presupuesto para 20 usuarios. Ya vio la demo inicial."
                  rows={3}
                  className="w-full bg-[#050B14] border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowTransferNoteModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Confirmar Transferencia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
