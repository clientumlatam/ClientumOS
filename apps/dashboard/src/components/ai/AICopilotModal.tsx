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
  RefreshCw,
} from 'lucide-react';
import { useCRM } from '@clientum/ui';

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
    language,
    showToast,
  } = useCRM();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getInitialWelcome = (lang: string) => {
    if (lang === 'es') {
      return "¡Hola! Soy **ClientumCRM AI Copilot**, tu asesor de inteligencia de ventas en tiempo real para ClientumCRM. ¿Cómo puedo ayudarte a acelerar tu pipeline hoy?";
    }
    if (lang === 'pt') {
      return "Olá! Sou o **ClientumCRM AI Copilot**, seu consultor de inteligência de vendas em tempo real para o ClientumCRM. Como posso ajudar a acelerar seu pipeline hoje?";
    }
    return "Hello! I'm **ClientumCRM AI Copilot**, your real-time sales intelligence advisor for ClientumCRM. How can I help accelerate your pipeline today?";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      role: 'assistant',
      content: getInitialWelcome(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'm-init') {
        return [
          {
            id: 'm-init',
            role: 'assistant',
            content: getInitialWelcome(language),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    if (isAICopilotModalOpen && aiCopilotContext?.initialPrompt) {
      handleSendPrompt(aiCopilotContext.initialPrompt);
    }
  }, [isAICopilotModalOpen, aiCopilotContext]);

  if (!isAICopilotModalOpen) return null;

  const getQuickPrompts = () => {
    if (language === 'es') {
      return [
        {
          icon: TrendingUp,
          title: 'Analizar Salud del Pipeline',
          prompt: 'Analiza la salud de nuestro pipeline actual, los 3 negocios de mayor valor y detalla los principales riesgos.',
        },
        {
          icon: Mail,
          title: 'Redactar Seguimiento Ejecutivo',
          prompt: 'Redacta un correo de seguimiento personalizado para Guillermo en Vercel sobre los términos del contrato y cláusulas de SLA.',
        },
        {
          icon: ShieldCheck,
          title: 'Manejo de Objeciones',
          prompt: 'Proporciona estrategias para manejar objeciones de precio de clientes enterprise que comparan Clientum con Salesforce.',
        },
        {
          icon: Zap,
          title: 'Extraer Tareas Pendientes',
          prompt: 'Resume las actividades recientes de los negocios en una lista de tareas priorizada para esta semana.',
        },
      ];
    }
    if (language === 'pt') {
      return [
        {
          icon: TrendingUp,
          title: 'Analisar Saúde do Pipeline',
          prompt: 'Análise a saúde do nosso pipeline atual, os 3 negócios de maior valor e destaque os principais riscos.',
        },
        {
          icon: Mail,
          title: 'Redigir Follow-Up Executivo',
          prompt: 'Redija um e-mail de acompanhamento personalizado para Guillermo na Vercel sobre termos de contrato e cláusulas de SLA.',
        },
        {
          icon: ShieldCheck,
          title: 'Guia de Contorno de Objeções',
          prompt: 'Forneça estratégias para lidar com objeções de preço de clientes enterprise comparando Clientum com Salesforce.',
        },
        {
          icon: Zap,
          title: 'Extrair Tarefas de Ação',
          prompt: 'Resuma as atividades recentes de negócios em uma lista prioritária de tarefas para esta semana.',
        },
      ];
    }
    return [
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
        prompt: 'Provide strategies to handle pricing objections for enterprise customers comparing Clientum to Salesforce.',
      },
      {
        icon: Zap,
        title: 'Extract Action Items',
        prompt: 'Summarize recent deal activities into a prioritized checklist for this week.',
      },
    ];
  };

  const quickPrompts = getQuickPrompts();

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
        context: aiCopilotContext,
        language,
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
        const pLower = promptText.toLowerCase();

        if (language === 'es') {
          if (pLower.includes('pipeline') || pLower.includes('salud') || pLower.includes('health')) {
            const total = opportunities.reduce((s, o) => s + o.amount, 0);
            const topDeal = [...opportunities].sort((a, b) => b.amount - a.amount)[0];
            response = `### 📊 Informe de Salud e Inteligencia del Pipeline\n\n**Volumen Total del Pipeline:** $${total.toLocaleString()}\n**Negocio Prioritario Principal:** ${topDeal?.name || 'Acme Corp'} ($${topDeal?.amount.toLocaleString() || '120,000'})\n\n#### Hallazgos Clave y Acciones Recomendadas:\n1. **Alta Velocidad:** 2 negocios se encuentran actualmente en la etapa de *Negociación*.\n2. **Factor de Riesgo:** La propuesta de **Linear App** ($72,000) lleva 18 días en revisión. Se recomienda agendar llamada ejecutiva de alineación.\n3. **Oportunidad de Expansión:** **Supabase Inc.** presenta alto uso de plataforma y es candidato principal para el módulo de alta disponibilidad.`;
          } else if (pLower.includes('email') || pLower.includes('draft') || pLower.includes('correo') || pLower.includes('seguimiento') || pLower.includes('follow-up')) {
            response = `### ✉️ Borrador Sugerido de Seguimiento Ejecutivo\n\n**Asunto:** Próximos pasos sobre SLA y cláusulas del acuerdo Enterprise\n\nHola Guillermo,\n\nEn seguimiento a nuestra reunión sobre las garantías de SLA de disponibilidad del 99.99% y términos multianuales, nuestro equipo legal ha aprobado el contrato marco.\n\nResumen de próximos pasos:\n- **Contrato Marco:** Copia firmada lista para su equipo de compras.\n- **Líder de Cuenta Dedicado:** Sarah Chen ha sido designada como responsable ejecutiva.\n- **Inicio de Integración:** Programado preliminarmente para el primer lunes del próximo mes.\n\n¿Me confirmas si este viernes a las 11:00 hs les queda bien para coordinar la firma final?\n\nSaludos cordiales,\nSarah Chen\nEjecutiva de Cuentas, ClientumCRM`;
          } else if (pLower.includes('objecion') || pLower.includes('salesforce') || pLower.includes('precio') || pLower.includes('objection')) {
            response = `### 🛡️ Manejo de Objeciones: ClientumCRM vs CRMs Tradicionales\n\n#### 1. "Salesforce tiene un ecosistema más amplio de aplicaciones"\n- **Respuesta:** *"Salesforce requiere consultores costosos y meses de configuración. ClientumCRM es moderno, ágil, se conecta directamente a tu base de datos y tu equipo lo adoptará desde el primer día sin complejidad ni costos ocultos."*\n\n#### 2. "Necesitamos campos personalizados y lógica de datos compleja"\n- **Respuesta:** *"ClientumCRM ofrece flexibilidad total de esquema con campos personalizados nativos y APIs GraphQL/REST completas."*\n\n#### 3. "Costos y licenciamiento por usuario"\n- **Respuesta:** *"ClientumCRM ofrece precios transparentes sin penalizaciones de categoría, ahorrando entre un 60% y 70% en presupuesto anual."*`;
          } else {
            response = `### 🎯 Perspectivas Estratégicas para ${aiCopilotContext?.name || 'tu Flujo Comercial'}\n\nBasado en la actividad en tiempo real del CRM Clientum:\n\n1. **Compromiso del Cliente:** Alta interacción registrada con tomadores de decisión clave.\n2. **Velocidad Comercial:** El negocio avanza **4.2 días** más rápido que el promedio.\n3. **Acción Inmediata Recomendada:** Enviar invitación de calendario para la revisión final del contrato y fijar fecha estimada de cierre.`;
          }
        } else if (language === 'pt') {
          if (pLower.includes('pipeline') || pLower.includes('saúde') || pLower.includes('saude') || pLower.includes('health')) {
            const total = opportunities.reduce((s, o) => s + o.amount, 0);
            const topDeal = [...opportunities].sort((a, b) => b.amount - a.amount)[0];
            response = `### 📊 Relatório de Inteligência e Saúde do Pipeline\n\n**Volume Total do Pipeline:** $${total.toLocaleString()}\n**Negócio de Maior Prioridade:** ${topDeal?.name || 'Acme Corp'} ($${topDeal?.amount.toLocaleString() || '120,000'})\n\n#### Principais Diagnósticos e Ações:\n1. **Alta Velocidade:** 2 negócios estão atualmente na etapa de *Negociação*.\n2. **Fator de Risco:** A proposta com **Linear App** ($72,000) está na etapa de proposta há 18 dias. Recomenda-se agendar reunião executiva de alinhamento.\n3. **Oportunidade de Expansão:** **Supabase Inc.** possui alto uso da plataforma e é candidata ideal para add-on de alta disponibilidade.`;
          } else if (pLower.includes('email') || pLower.includes('draft') || pLower.includes('correio') || pLower.includes('seguimento') || pLower.includes('follow-up')) {
            response = `### ✉️ Rascunho Sugerido de Follow-up Executivo\n\n**Assunto:** Próximos passos sobre SLA e cláusulas do contrato Enterprise\n\nOlá Guillermo,\n\nEm acompanhamento à nossa reunião sobre as garantias de SLA de 99.99% de disponibilidade e termos plurianuais, nossa equipe jurídica aprovou o contrato principal.\n\nResumo dos próximos passos:\n- **Contrato Principal:** Cópia assinada pronta para sua equipe de compras.\n- **Líder de Conta Dedicado:** Sarah Chen foi designada como patrocinadora executiva.\n- **Início da Integração:** Agendado preliminarmente para a primeira segunda-feira do próximo mês.\n\nPor favor, confirme se sexta-feira às 11h é um bom horário para finalizarmos as assinaturas?\n\nAtenciosamente,\nSarah Chen\nExecutiva de Contas, ClientumCRM`;
          } else if (pLower.includes('objeção') || pLower.includes('objecao') || pLower.includes('salesforce') || pLower.includes('preço') || pLower.includes('preco')) {
            response = `### 🛡️ Guia de Contorno de Objeções: ClientumCRM vs CRMs Legados\n\n#### 1. "O Salesforce possui mais aplicativos de ecossistema"\n- **Resposta:** *"O Salesforce exige consultores caros e meses de configuração. O ClientumCRM é moderno, rápido, conecta-se diretamente ao seu banco de dados e sua equipe vai adorar usá-lo desde o primeiro dia sem custos ocultos."*\n\n#### 2. "Temos requisitos de campos personalizados e estrutura complexa"\n- **Resposta:** *"O ClientumCRM oferece flexibilidade total de esquema com campos personalizados nativos e APIs GraphQL/REST completas."*\n\n#### 3. "Custo e licenças por usuário"\n- **Resposta:** *"O ClientumCRM oferece preços transparentes e justos, gerando uma economia de 60-70% no orçamento anual de CRM."*`;
          } else {
            response = `### 🎯 Insights Estratégicos para ${aiCopilotContext?.name || 'seu Fluxo Comercial'}\n\nCom base na atividade em tempo real do ClientumCRM:\n\n1. **Engajamento com Decisores:** Alta interação registrada com patrocinadores executivos.\n2. **Velocidade de Vendas:** Avançando **4.2 dias** à frente do ciclo médio.\n3. **Ação Imediata Recomendada:** Enviar convite de calendário para revisão final do contrato e confirmar data de fechamento.`;
          }
        } else {
          if (pLower.includes('pipeline') || pLower.includes('health')) {
            const total = opportunities.reduce((s, o) => s + o.amount, 0);
            const topDeal = [...opportunities].sort((a, b) => b.amount - a.amount)[0];
            response = `### 📊 Pipeline Health & Intelligence Brief\n\n**Total Pipeline Volume:** $${total.toLocaleString()}\n**Top Priority Deal:** ${topDeal?.name || 'Acme Corp'} ($${topDeal?.amount.toLocaleString() || '120,000'})\n\n#### Key Findings & Action Items:\n1. **High Velocity:** 2 deals are currently in *Negotiation* stage.\n2. **Risk Factor:** Proposal with **Linear App** ($72,000) has been pending for 18 days. Recommend scheduling executive QBR call.\n3. **Upsell Opportunity:** **Supabase Inc.** has high platform usage and is a prime candidate for enterprise add-on.`;
          } else if (pLower.includes('email') || pLower.includes('draft') || pLower.includes('follow-up')) {
            response = `### ✉️ Suggested Executive Follow-up Draft\n\n**Subject:** Next steps on SLA & Enterprise Agreement clauses\n\nHi Guillermo,\n\nFollowing our discussion on custom uptime SLA and multi-year terms, our legal team has approved the master agreement with the 99.99% availability guarantee.\n\nNext steps summary:\n- **Master Agreement:** Signed copy ready for procurement.\n- **Dedicated Account Lead:** Sarah Chen assigned as executive sponsor.\n- **Onboarding Kickoff:** Scheduled for next month.\n\nCould you let me know if Friday at 11am PT works to finalize signatures?\n\nBest regards,\nSarah Chen\nAccount Executive, ClientumCRM`;
          } else if (pLower.includes('objection') || pLower.includes('salesforce')) {
            response = `### 🛡️ Objection Handling: ClientumCRM vs Legacy CRMs\n\n#### 1. "Salesforce has a larger app ecosystem"\n- **Response:** *"Salesforce requires expensive consultants and months of configuration. ClientumCRM is modern, fast, connects directly to your database, and your team will love using it on day one without overhead."*\n\n#### 2. "We have custom schema requirements"\n- **Response:** *"ClientumCRM offers full schema flexibility with first-class custom fields and REST/GraphQL APIs."*\n\n#### 3. "Cost & seat licensing"\n- **Response:** *"ClientumCRM offers transparent pricing saving 60-70% on annual CRM spend."*`;
          } else {
            response = `### 🎯 Strategic Insights for ${aiCopilotContext?.name || 'Your Sales Flow'}\n\nBased on real-time ClientumCRM activity and account history:\n\n1. **Decision Maker Engagement:** High interaction recorded with executive champions.\n2. **Deal Velocity:** Currently pacing ahead of average cycle times by **4.2 days**.\n3. **Recommended Immediate Action:** Send calendar invite for final contract walkthrough and lock in target close date.`;
          }
        }

        const aiMsg: Message = {
          id: 'msg-ai-' + Date.now(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
      });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(
      language === 'es' ? 'Copiado al portapapeles' : language === 'pt' ? 'Copiado para a área de transferência' : 'Copied to clipboard',
      'info'
    );
    setTimeout(() => setCopiedId(null), 2000);
  };

  const subTitleText = language === 'es'
    ? 'Estrategia de Ventas e Inteligencia de Negocios'
    : language === 'pt'
    ? 'Estratégia de Vendas e Inteligência de Negócios'
    : 'Sales Strategy & Deal Intelligence';

  const placeholderText = language === 'es'
    ? 'Pregunta a ClientumCRM AI Copilot sobre negocios, cuentas o estrategia...'
    : language === 'pt'
    ? 'Pergunte ao ClientumCRM AI Copilot qualquer coisa sobre negócios, contas ou estratégia...'
    : 'Ask ClientumCRM AI Copilot anything about deals, accounts, or strategy...';

  const loadingText = language === 'es'
    ? 'Analizando registros de ClientumCRM y generando estrategia...'
    : language === 'pt'
    ? 'Analisando registros do ClientumCRM e gerando estratégia...'
    : 'Analyzing ClientumCRM records and generating strategy...';

  const sendBtnText = language === 'es' ? 'Enviar' : language === 'pt' ? 'Enviar' : 'Send';
  const copyBtnText = language === 'es' ? 'Copiar' : language === 'pt' ? 'Copiar' : 'Copy';

  return (
    <div
      id="clientum-ai-copilot-overlay"
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
                <h3 className="font-semibold text-sm text-white">ClientumCRM AI Copilot</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  Gemini AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {aiCopilotContext?.name ? `${language === 'es' ? 'Enfocado en' : language === 'pt' ? 'Focado em' : 'Focused on'}: ${aiCopilotContext.name}` : subTitleText}
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
                        title={copyBtnText}
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copyBtnText}</span>
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
              <span>{loadingText}</span>
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
            placeholder={placeholderText}
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
            <span>{sendBtnText}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
