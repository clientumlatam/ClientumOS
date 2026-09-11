import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  WalletCards,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCRM } from '../../context/CRMContext';
import { Opportunity, StageId } from '../../types';
import { STAGES } from '../../data/initialData';

const CHART_COLORS = ['#11c5b5', '#4388ff', '#8561ff', '#f59e0b', '#64748b'];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

const money = (amount: number) => `$ ${amount.toLocaleString('es-AR')}`;
const dateOnly = (value: string) => new Date(`${value.slice(0, 10)}T00:00:00`);
const formatShortDate = (value: string) =>
  dateOnly(value).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });

export const ExecutiveDashboardView: React.FC = () => {
  const {
    opportunities,
    tasks,
    activities,
    people,
    currentUser,
    setActiveTab,
    setSelectedRecord,
    openNewRecordModal,
    showToast,
    moveOpportunityStage,
    toggleTaskStatus,
  } = useCRM();
  const [pipelineFilter, setPipelineFilter] = useState<'Todos los negocios' | Opportunity['type']>('Todos los negocios');
  const [isPipelineDropdownOpen, setIsPipelineDropdownOpen] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm-1', sender: 'assistant', text: 'Hola. Puedo resumir tus negocios, revisar pendientes o ayudarte a preparar el próximo paso.', time: 'Ahora' },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const filteredOpportunities = opportunities.filter((opportunity) =>
    pipelineFilter === 'Todos los negocios' || opportunity.type === pipelineFilter,
  );
  const activeOpportunities = filteredOpportunities.filter(({ stage }) => stage !== 'won' && stage !== 'lost');
  const pipelineTotal = activeOpportunities.reduce((total, opportunity) => total + opportunity.amount, 0);
  const weightedPipeline = activeOpportunities.reduce(
    (total, opportunity) => total + opportunity.amount * (opportunity.probability / 100),
    0,
  );
  const wonDeals = opportunities.filter(({ stage }) => stage === 'won');
  const decidedDeals = opportunities.filter(({ stage }) => stage === 'won' || stage === 'lost');
  const winRate = decidedDeals.length ? Math.round((wonDeals.length / decidedDeals.length) * 1000) / 10 : 0;
  const averageCycleDays = opportunities.length
    ? Math.round(opportunities.reduce((total, opportunity) => {
      const created = dateOnly(opportunity.createdAt).getTime();
      const close = dateOnly(opportunity.closeDate).getTime();
      return total + Math.max(0, (close - created) / 86400000);
    }, 0) / opportunities.length)
    : 0;
  const pendingTasks = tasks.filter((task) => task.status !== 'Completed');
  const overdueTasks = pendingTasks.filter((task) => dateOnly(task.dueDate) < today);
  const staleOpportunities = activeOpportunities
    .filter((opportunity) => (today.getTime() - dateOnly(opportunity.updatedAt).getTime()) / 86400000 > 7)
    .sort((left, right) => right.amount - left.amount);
  const revenueData = Array.from(
    wonDeals.reduce((months, opportunity) => {
      const date = dateOnly(opportunity.closeDate);
      const month = date.toLocaleDateString('es-AR', { month: 'short' });
      months.set(month, (months.get(month) || 0) + opportunity.amount);
      return months;
    }, new Map<string, number>()),
  ).map(([month, value]) => ({ month, value }));
  const sourceData = Array.from(
    opportunities.reduce((types, opportunity) => {
      types.set(opportunity.type, (types.get(opportunity.type) || 0) + 1);
      return types;
    }, new Map<Opportunity['type'], number>()),
  ).map(([name, count], index, all) => ({
    name,
    count,
    value: all.length ? Math.round((count / opportunities.length) * 100) : 0,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const handleDragStart = (event: React.DragEvent, id: string) => {
    event.dataTransfer.setData('text/plain', id);
    setDraggedDealId(id);
  };

  const handleDrop = (event: React.DragEvent, targetStage: StageId) => {
    event.preventDefault();
    const dealId = event.dataTransfer.getData('text/plain') || draggedDealId;
    if (!dealId) return;
    const deal = opportunities.find((opportunity) => opportunity.id === dealId);
    if (!deal || deal.stage === targetStage) return;
    moveOpportunityStage(dealId, targetStage);
    showToast(`Negocio movido a ${STAGES.find((stage) => stage.id === targetStage)?.name}`, 'success');
    setDraggedDealId(null);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage.trim();
    setChatMessages((previous) => [...previous, {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputMessage('');
    setIsAiTyping(true);

    window.setTimeout(() => {
      const query = userText.toLowerCase();
      let reply = 'He actualizado los datos del CRM y registrado tu consulta. ¿Deseas que prepare una propuesta o un recordatorio?';
      if (query.includes('resumen') || query.includes('métrica') || query.includes('ingreso')) {
        reply = 'Resumen ejecutivo actual:\n• Ingresos totales del mes: $ 124.800 (↑ 18.8%)\n• 22 negocios activos en pipeline\n• Tasa de cierre promedio: 32.4%\n• Ticket promedio por cliente: $ 6.218';
      } else if (query.includes('tarea') || query.includes('actividad') || query.includes('hoy')) {
        reply = 'Tienes 5 actividades para hoy:\n• 10:00 Llamada con TechGlobal\n• 11:30 Reunión con SoftBuild\n• 14:00 Enviar propuesta a MoviLab\n• 15:30 Seguimiento con NetSolutions\n• 17:00 Demo técnica EduSmart';
      } else if (query.includes('negocio') || query.includes('lead') || query.includes('crear')) {
        reply = 'Puedo dar de alta el negocio directamente o abrir el modal de captura rápida. ¿Cuál es el monto y la empresa?';
      }
      setChatMessages((previous) => [...previous, {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setIsAiTyping(false);
    }, 700);
  };

  return (
    <div className={`crm-dashboard ${isChatOpen ? '' : 'crm-dashboard--chat-closed'}`}>
      <section className="crm-dashboard__content">
        <div className="crm-dashboard__header">
          <div>
            <div className="crm-eyebrow"><span className="crm-status-dot" /> VISTA EJECUTIVA · DATOS DEL CRM</div>
            <h1>Resumen ejecutivo</h1>
            <p>Entendé cómo está el negocio y dónde conviene intervenir primero.</p>
          </div>
          <div className="crm-dashboard__actions">
            <div className="crm-select-wrap">
              <button className="crm-select-button" onClick={() => setIsPipelineDropdownOpen((open) => !open)}>
                  {pipelineFilter}<ChevronDown size={14} />
              </button>
              {isPipelineDropdownOpen && (
                <div className="crm-dropdown">
                    {(['Todos los negocios', 'New Business', 'Expansion', 'Renewal'] as const).map((item) => (
                    <button key={item} onClick={() => { setPipelineFilter(item); setIsPipelineDropdownOpen(false); }}>{item}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="crm-icon-button" onClick={() => showToast('Filtro de oportunidades aplicado', 'info')} title="Filtrar"><Filter size={15} /></button>
            <button className="crm-icon-button" onClick={() => showToast('Opciones del pipeline', 'info')} title="Más opciones"><MoreHorizontal size={16} /></button>
            <button
              className={`crm-ai-toggle ${isChatOpen ? 'is-active' : ''}`}
              onClick={() => setIsChatOpen((open) => !open)}
              aria-pressed={isChatOpen}
              aria-label={isChatOpen ? 'Ocultar asistente IA' : 'Abrir asistente IA'}
            >
              <Sparkles size={15} /> {isChatOpen ? 'Ocultar asistente' : 'Abrir asistente'} <span className="crm-online-pip" />
            </button>
          </div>
        </div>

        <section className="crm-attention-panel" aria-labelledby="crm-attention-title">
          <div className="crm-attention-panel__header">
            <div>
              <span className="crm-section-kicker">Próxima acción</span>
              <h2 id="crm-attention-title">Atención prioritaria</h2>
              <p>{overdueTasks.length} tareas vencidas · {staleOpportunities.length} negocios sin actividad reciente · {activities.length} registros de actividad</p>
            </div>
            <button type="button" className="crm-report-link" onClick={() => setActiveTab('tasks')}>
              Ver actividades <ArrowRight size={13} />
            </button>
          </div>
          <div className="crm-attention-list">
            {pendingTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="crm-attention-item"
              >
                <button
                  type="button"
                  className="crm-attention-item__main"
                  onClick={() => { setSelectedRecord({ type: 'task', id: task.id }); setActiveTab('tasks'); }}
                >
                  <span className={`crm-attention-item__icon ${dateOnly(task.dueDate) < today ? 'is-warning' : 'is-info'}`}>
                    {dateOnly(task.dueDate) < today ? <AlertTriangle size={14} /> : <CalendarDays size={14} />}
                  </span>
                  <span className="crm-attention-item__body">
                    <strong>{task.title}</strong>
                    <small>{dateOnly(task.dueDate) < today ? `Vencida · ${formatShortDate(task.dueDate)}` : `Vence ${formatShortDate(task.dueDate)}`}</small>
                  </span>
                </button>
                <span className="crm-attention-item__action">
                  <button
                    type="button"
                    onClick={() => toggleTaskStatus(task.id)}
                    aria-label={`Completar ${task.title}`}
                    title="Marcar como completada"
                  >
                    <CheckCircle2 size={15} />
                  </button>
                </span>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <div className="crm-attention-empty">
                <CheckCircle2 size={16} /> No hay tareas pendientes.
              </div>
            )}
            {pendingTasks.length > 3 && (
              <button type="button" className="crm-attention-more" onClick={() => setActiveTab('tasks')}>
                +{pendingTasks.length - 3} actividades más
              </button>
            )}
          </div>
          {staleOpportunities.length > 0 && (
            <div className="crm-stale-deals">
              <div className="crm-stale-deals__label"><Clock3 size={13} /> Negocios que necesitan seguimiento</div>
              <div className="crm-stale-deals__list">
                {staleOpportunities.slice(0, 3).map((opportunity) => (
                  <button
                    key={opportunity.id}
                    type="button"
                    onClick={() => { setSelectedRecord({ type: 'opportunity', id: opportunity.id }); setActiveTab('opportunities'); }}
                  >
                    <span>{opportunity.name}</span>
                    <strong>{money(opportunity.amount)}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="crm-pipeline-heading">
          <div>
            <span className="crm-section-kicker">Dónde intervenir</span>
            <h2>Pipeline comercial</h2>
          </div>
          <span>Arrastrá un negocio para actualizar su etapa</span>
        </div>

        <div className="crm-board-shell">
          <div className="crm-board-scroll">
            {STAGES.filter((stage) => stage.id !== 'lost').map((stage) => {
              const columnDeals = filteredOpportunities.filter((deal) => deal.stage === stage.id);
              const total = columnDeals.reduce((sum, deal) => sum + deal.amount, 0);
              return (
                <div
                  key={stage.id}
                  className="crm-stage"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, stage.id)}
                  style={{ '--stage-color': stage.color } as React.CSSProperties}
                >
                  <div className="crm-stage__header">
                    <div className="crm-stage__title"><span className="crm-stage__dot" />{stage.name}<span className="crm-stage__count">{columnDeals.length}</span></div>
                    <span className="crm-stage__total">{money(total)}</span>
                  </div>
                  <div className="crm-stage__cards custom-scrollbar">
                    {columnDeals.map((deal) => (
                      <article
                        key={deal.id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, deal.id)}
                        onClick={() => { setSelectedRecord({ type: 'opportunity', id: deal.id }); setActiveTab('opportunities'); }}
                        className="crm-deal-card"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedRecord({ type: 'opportunity', id: deal.id });
                            setActiveTab('opportunities');
                          }
                        }}
                      >
                        <div className="crm-deal-card__top"><span>{deal.companyName || 'Sin empresa'}</span><MoreHorizontal size={13} /></div>
                        <h3>{deal.name}</h3>
                        <div className="crm-deal-card__footer">
                          <strong>{money(deal.amount)}</strong>
                          <div className="crm-deal-card__person">
                            {deal.stage === 'won' && <span className="crm-won"><Check size={10} /> Ganado</span>}
                            <img src={people.find((person) => person.id === deal.contactId)?.avatar || currentUser.avatar} alt="" />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button className="crm-new-deal" onClick={() => openNewRecordModal('opportunity')}><Plus size={14} /> Nuevo negocio</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="crm-kpi-grid">
          <div className="crm-kpi-card crm-kpi-card--accent">
            <div className="crm-kpi-card__head"><span>Valor total del pipeline</span><span className="crm-kpi-icon"><TrendingUp size={17} /></span></div>
            <strong>{money(pipelineTotal)}</strong><small><ArrowUpRight size={12} /> {money(weightedPipeline)} <em>ponderado activo</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Negocios ganados</span><span className="crm-kpi-icon"><BriefcaseBusiness size={17} /></span></div>
            <strong>{wonDeals.length}</strong><small><ArrowUpRight size={12} /> {money(wonDeals.reduce((total, deal) => total + deal.amount, 0))} <em>valor ganado</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Tasa de cierre</span><span className="crm-kpi-icon"><Target size={17} /></span></div>
            <strong>{winRate.toLocaleString('es-AR')}%</strong><small><ArrowUpRight size={12} /> {decidedDeals.length} <em>negocios decididos</em></small>
          </div>
          <div className="crm-kpi-card">
            <div className="crm-kpi-card__head"><span>Ciclo de venta</span><span className="crm-kpi-icon"><WalletCards size={17} /></span></div>
            <strong>{averageCycleDays} días</strong><small><ArrowUpRight size={12} /> {opportunities.length} <em>negocios analizados</em></small>
          </div>
        </div>

        <div className="crm-analytics-grid">
          <section className="crm-panel crm-revenue-panel">
            <div className="crm-panel__header">
              <div><div className="crm-panel__title"><BarChart3 size={16} /> Ingresos <button className="crm-period">Negocios ganados <ChevronDown size={12} /></button></div><p>Valor de negocios en estado ganado</p></div>
              <div className="crm-panel__total"><span>Ingresos registrados</span><strong>{money(wonDeals.reduce((total, deal) => total + deal.amount, 0))}</strong><small><ArrowUpRight size={11} /> {wonDeals.length} <em>cierres registrados</em></small></div>
            </div>
            <div className="crm-revenue-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 12, right: 6, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="crmRevenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1bcfc0" stopOpacity={0.28} /><stop offset="100%" stopColor="#1bcfc0" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="month" stroke="#6f829c" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6f829c" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#101c2e', border: '1px solid #29415a', borderRadius: 10, fontSize: 11, color: '#f4f8ff' }} formatter={(value: any) => [`$ ${Number(value).toLocaleString('es-AR')}`, 'Ingresos']} />
                  <Area type="monotone" dataKey="value" stroke="#1bd3c2" strokeWidth={2.5} fill="url(#crmRevenueGradient)" dot={false} activeDot={{ r: 4, fill: '#1bd3c2', stroke: '#0b1220', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="crm-panel crm-sources-panel">
            <div className="crm-panel__header"><div><div className="crm-panel__title"><span className="crm-title-mark" /> Fuentes de negocio</div><p>Origen de tus oportunidades</p></div><button className="crm-icon-button crm-icon-button--small" onClick={() => showToast('Detalle de fuentes abierto', 'info')}><MoreHorizontal size={15} /></button></div>
            <div className="crm-sources-content">
              <div className="crm-donut">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart><Pie data={sourceData} cx="50%" cy="50%" innerRadius={46} outerRadius={66} paddingAngle={3} dataKey="value" stroke="none">{sourceData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie></PieChart>
                </ResponsiveContainer>
                <div><strong>{opportunities.length}</strong><span>Total</span></div>
              </div>
              <div className="crm-source-list">
                {sourceData.map((item) => <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}% <em>({item.count})</em></strong></div>)}
              </div>
            </div>
            <button className="crm-report-link" onClick={() => setActiveTab('analytics')}>Ver reporte completo <ArrowRight size={13} /></button>
          </section>
        </div>
      </section>

      {isChatOpen && (
        <>
          <div className="crm-assistant-backdrop" onClick={() => setIsChatOpen(false)} aria-hidden="true" />
          <aside className="crm-assistant" aria-label="Asistente IA">
            <div className="crm-assistant__header">
              <div className="crm-assistant__identity"><div className="crm-assistant__avatar"><Sparkles size={17} /><span /></div><div><strong>Asistente IA</strong><small>En línea</small></div></div>
              <div className="crm-assistant__tools">
                <button onClick={() => showToast('Iniciando llamada de voz...', 'info')} aria-label="Iniciar llamada de voz"><Phone size={14} /></button>
                <button onClick={() => showToast('Videollamada en preparación...', 'info')} aria-label="Iniciar videollamada"><Video size={14} /></button>
                <button onClick={() => setIsChatOpen(false)} aria-label="Cerrar asistente"><X size={15} /></button>
              </div>
            </div>
            <div className="crm-assistant__intro"><Sparkles size={13} /> Insights automáticos de tu pipeline</div>
            <div className="crm-assistant__messages custom-scrollbar">
              <div className="crm-chat-day">Hoy</div>
              {chatMessages.map((message) => (
                <div key={message.id} className={`crm-message ${message.sender === 'user' ? 'crm-message--user' : ''}`}>
                  <div className="crm-message__bubble"><p>{message.text}</p><span>{message.time} {message.sender === 'user' && <CheckCheck size={12} />}</span></div>
                </div>
              ))}
              {isAiTyping && <div className="crm-message__typing" role="status" aria-label="El asistente está escribiendo"><i /><i /><i /></div>}
            </div>
            <div className="crm-assistant__composer">
              <button onClick={() => setInputMessage((previous) => `${previous} ✨`)} aria-label="Agregar sugerencia"><Smile size={16} /></button>
              <input value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') handleSendMessage(); }} placeholder="Escribe un mensaje..." />
              <button onClick={() => showToast('Adjuntar archivo...', 'info')} aria-label="Adjuntar archivo"><Paperclip size={15} /></button>
              <button className="crm-send-button" onClick={handleSendMessage} aria-label="Enviar mensaje"><Send size={14} /></button>
            </div>
          </aside>
        </>
      )}

      {!isChatOpen && <button className="crm-chat-reopen" onClick={() => setIsChatOpen(true)} aria-label="Abrir asistente IA"><Sparkles size={15} /> Abrir asistente</button>}
    </div>
  );
};