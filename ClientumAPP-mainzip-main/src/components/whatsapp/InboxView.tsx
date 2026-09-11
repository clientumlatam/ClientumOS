import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Paperclip,
  Smile,
  Mic,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Search,
  Phone,
  ArrowRight,
  Filter,
  UserCheck,
  Clock,
  Tag
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

interface Message {
  id: string;
  sender: 'client' | 'agent' | 'bot';
  text: string;
  time: string;
  type?: 'text' | 'audio' | 'image';
}

interface Thread {
  id: string;
  name: string;
  phone: string;
  company: string;
  mode: 'bot' | 'human';
  assignedAgent: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  messages: Message[];
}

export const InboxView: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 't-1',
      name: 'Carlos Mendoza',
      phone: '+54 9 11 4839-2012',
      company: 'ABEPOL S.R.L.',
      mode: 'human',
      assignedAgent: 'Agustín (Tú)',
      lastMessage: 'Perfecto, agendemos la reunión para mañana a las 15hs.',
      time: '14:25',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      messages: [
        { id: 'm1', sender: 'agent', text: 'Hola Carlos, ¿pudiste revisar la propuesta comercial?', time: '14:10' },
        { id: 'm2', sender: 'client', text: 'Sí, la estuvimos analizando con el directorio. Todo OK.', time: '14:20' },
        { id: 'm3', sender: 'client', text: 'Perfecto, agendemos la reunión para mañana a las 15hs.', time: '14:25' }
      ]
    },
    {
      id: 't-2',
      name: 'Mariana Gomez',
      phone: '+54 9 11 5921-3342',
      company: 'ACHA PLAST S.A.',
      mode: 'bot',
      assignedAgent: 'ClientumCRM AI Bot',
      lastMessage: '¿Tienen disponibilidad para integración con SAP?',
      time: 'Ayer',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      messages: [
        { id: 'm20', sender: 'bot', text: '¡Hola Mariana! Soy el asistente virtual de ClientumCRM. ¿En qué te ayudo?', time: '09:14' },
        { id: 'm21', sender: 'client', text: '¿Tienen disponibilidad para integración con SAP?', time: '09:16' }
      ]
    }
  ]);

  const [selectedThreadId, setSelectedThreadId] = useState<string>('t-1');
  const [inputText, setInputText] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'bot' | 'human'>('all');

  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(th => {
      if (th.id === selectedThreadId) {
        return {
          ...th,
          lastMessage: inputText,
          time: 'Ahora',
          messages: [...th.messages, newMsg]
        };
      }
      return th;
    }));

    setInputText('');
    showToast('Mensaje enviado por WhatsApp', 'success');
  };

  const toggleMode = (threadId: string) => {
    setThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        const newMode = th.mode === 'bot' ? 'human' : 'bot';
        showToast(`Modo cambiado a: ${newMode === 'bot' ? '🤖 Bot AI' : '👤 Humano'}`, 'info');
        return {
          ...th,
          mode: newMode,
          assignedAgent: newMode === 'bot' ? 'ClientumCRM AI Bot' : 'Agustín (Tú)'
        };
      }
      return th;
    }));
  };

  const filteredThreads = threads.filter(t => {
    if (filterMode === 'bot') return t.mode === 'bot';
    if (filterMode === 'human') return t.mode === 'human';
    return true;
  });

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0a0c10] text-slate-300 text-xs">
      
      {/* Left Sidebar: Threads */}
      <div className="w-80 border-r border-[#1e2330] bg-[#0d0f17] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#1e2330] space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar chat, teléfono o empresa..."
              className="w-full bg-[#151924] text-white pl-9 pr-3 py-2 rounded-lg border border-[#232b3f] text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterMode('all')}
              className={`flex-1 py-1 rounded font-medium text-[11px] ${filterMode === 'all' ? 'bg-[#20283b] text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterMode('bot')}
              className={`flex-1 py-1 rounded font-medium text-[11px] ${filterMode === 'bot' ? 'bg-purple-900/30 text-purple-300 border border-purple-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              🤖 Bot IA
            </button>
            <button
              onClick={() => setFilterMode('human')}
              className={`flex-1 py-1 rounded font-medium text-[11px] ${filterMode === 'human' ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              👤 Humano
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#161b26]">
          {filteredThreads.map(th => {
            const isSelected = th.id === selectedThreadId;
            return (
              <div
                key={th.id}
                onClick={() => setSelectedThreadId(th.id)}
                className={`p-3.5 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-[#182033]' : 'hover:bg-[#121622]'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={th.avatar} alt={th.name} className="w-10 h-10 rounded-full object-cover border border-[#2a3449]" />
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#0d0f17] ${
                    th.mode === 'bot' ? 'bg-purple-500' : 'bg-emerald-500'
                  }`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-white truncate">{th.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{th.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-emerald-400 font-medium truncate">{th.company}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      th.mode === 'bot' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {th.mode === 'bot' ? '🤖 Bot' : '👤 Humano'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{th.lastMessage}</p>
                </div>

                {th.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-bold text-[10px] flex items-center justify-center shrink-0">
                    {th.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Conversation Window */}
      <div className="flex-1 flex flex-col bg-[#0a0c10]">
        
        {/* Header with Dual Mode Toggle */}
        <div className="h-14 border-b border-[#1e2330] bg-[#0d0f17] px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src={activeThread.avatar} alt={activeThread.name} className="w-9 h-9 rounded-full object-cover border border-[#2a3449]" />
            <div>
              <h3 className="font-bold text-white text-xs">{activeThread.name}</h3>
              <p className="text-[10px] text-slate-400">{activeThread.phone} • <span className="text-emerald-400">{activeThread.company}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#151924] p-1 rounded-lg border border-[#232b3f]">
              <span className="text-[10px] text-slate-400 px-2">Modo AtENCIÓN:</span>
              <button
                onClick={() => toggleMode(activeThread.id)}
                className={`px-3 py-1 rounded-md font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeThread.mode === 'bot'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                {activeThread.mode === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                <span>{activeThread.mode === 'bot' ? 'Bot IA Activo' : 'Agente Humano'}</span>
              </button>
            </div>

            <div className="text-[10px] px-2.5 py-1 rounded-lg bg-[#151924] border border-[#232b3f] text-slate-300">
              Asignado: <strong className="text-white">{activeThread.assignedAgent}</strong>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#0a0c10] to-[#0e121a]">
          {activeThread.messages.map(msg => {
            const isAgent = msg.sender === 'agent';
            const isBot = msg.sender === 'bot';
            return (
              <div key={msg.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                  isAgent
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : isBot
                    ? 'bg-purple-950/80 text-purple-200 border border-purple-500/30 rounded-tl-none'
                    : 'bg-[#161b26] text-slate-200 border border-[#232b3f] rounded-tl-none'
                }`}>
                  {isBot && (
                    <div className="flex items-center gap-1 text-[10px] text-purple-300 font-semibold mb-1">
                      <Bot className="w-3 h-3" />
                      <span>ClientumCRM AI Assistant</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isAgent ? 'text-emerald-100' : 'text-slate-400'}`}>
                    <span>{msg.time}</span>
                    {isAgent && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Footer */}
        <form onSubmit={handleSendMessage} className="p-3.5 border-t border-[#1e2330] bg-[#0d0f17] flex items-center gap-3">
          <button type="button" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#161b26] transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#161b26] transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={activeThread.mode === 'bot' ? 'El Bot IA está respondiendo (escribe para intervenir)...' : 'Escribe un mensaje de WhatsApp...'}
            className="flex-1 bg-[#151924] text-white px-4 py-2.5 rounded-xl border border-[#232b3f] text-xs focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
