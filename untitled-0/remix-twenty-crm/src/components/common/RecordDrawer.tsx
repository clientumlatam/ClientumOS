import React, { useState } from 'react';
import {
  X,
  Building2,
  Users2,
  Calendar,
  DollarSign,
  Tag,
  Sparkles,
  MessageSquare,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  Trash2,
  CheckCircle2,
  Send,
  User,
  Plus,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';
import { Activity, Opportunity, Person, Company, Task, StageId } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const RecordDrawer: React.FC = () => {
  const {
    selectedRecord,
    setSelectedRecord,
    opportunities,
    companies,
    people,
    tasks,
    activities,
    updateOpportunity,
    deleteOpportunity,
    moveOpportunityStage,
    updateCompany,
    deleteCompany,
    updatePerson,
    deletePerson,
    updateTask,
    deleteTask,
    addActivity,
    currentUser,
    openAICopilot,
    showToast,
  } = useCRM();

  const [activeTab, setActiveTab] = useState<'timeline' | 'ai' | 'details'>('timeline');
  const [newNote, setNewNote] = useState('');
  const [activityType, setActivityType] = useState<'note' | 'call' | 'email' | 'meeting'>('note');
  const [callDuration, setCallDuration] = useState('15');
  const [emailSubject, setEmailSubject] = useState('');

  if (!selectedRecord) return null;

  // Resolve active entity
  const opp = selectedRecord.type === 'opportunity' ? opportunities.find((o) => o.id === selectedRecord.id) : null;
  const company = selectedRecord.type === 'company' ? companies.find((c) => c.id === selectedRecord.id) : null;
  const person = selectedRecord.type === 'person' ? people.find((p) => p.id === selectedRecord.id) : null;
  const task = selectedRecord.type === 'task' ? tasks.find((t) => t.id === selectedRecord.id) : null;

  if (!opp && !company && !person && !task) {
    return null;
  }

  // Filter activities for this record
  const recordActivities = activities.filter(
    (a) => a.targetType === selectedRecord.type && a.targetId === selectedRecord.id
  );

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addActivity({
      type: activityType,
      title:
        activityType === 'note'
          ? 'Internal Note Added'
          : activityType === 'call'
          ? `Call Logged (${callDuration} mins)`
          : activityType === 'email'
          ? `Email: ${emailSubject || 'No Subject'}`
          : 'Meeting Summary',
      content: newNote,
      author: currentUser.name,
      targetType: selectedRecord.type as 'opportunity' | 'company' | 'person',
      targetId: selectedRecord.id,
      meta: {
        durationMinutes: activityType === 'call' ? Number(callDuration) : undefined,
        emailSubject: activityType === 'email' ? emailSubject : undefined,
      },
    });

    setNewNote('');
    setEmailSubject('');
    showToast('Activity logged to timeline', 'success');
  };

  const getRecordTitle = () => {
    if (opp) return opp.name;
    if (company) return company.name;
    if (person) return `${person.firstName} ${person.lastName}`;
    if (task) return task.title;
    return 'Record';
  };

  return (
    <div id="twenty-record-drawer-overlay" className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-2xl bg-[#0f1219] border-l border-[#1e2330] h-full flex flex-col shadow-2xl text-xs text-slate-300"
      >
        {/* Drawer Top Header */}
        <div className="p-4 border-b border-[#1e2330] flex items-center justify-between bg-[#131722]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1e2434] text-slate-400 border border-[#273044]">
              {selectedRecord.type}
            </span>
            <h2 className="text-sm font-semibold text-white truncate">{getRecordTitle()}</h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="drawer-ai-quick-btn"
              onClick={() =>
                openAICopilot({
                  type: selectedRecord.type,
                  id: selectedRecord.id,
                  name: getRecordTitle(),
                  initialPrompt: `Provide strategic insights and recommended next actions for ${selectedRecord.type}: "${getRecordTitle()}".`,
                })
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>AI Insights</span>
            </button>

            <button
              id="drawer-close-btn"
              onClick={() => setSelectedRecord(null)}
              className="p-1.5 rounded hover:bg-[#1f2535] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Opportunity Quick Stage Ribbon */}
        {opp && (
          <div className="bg-[#11141d] px-4 py-2 border-b border-[#1a1f2c] flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1">
              {STAGES.map((s) => {
                const isCurrent = opp.stage === s.id;
                return (
                  <button
                    key={s.id}
                    id={`drawer-stage-step-${s.id}`}
                    onClick={() => moveOpportunityStage(opp.id, s.id)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-[#181c28] text-slate-400 hover:text-slate-200 hover:bg-[#202535]'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Drawer Tab Navigation */}
        <div className="flex items-center border-b border-[#1e2330] px-4 bg-[#11141c]">
          <button
            id="drawer-tab-timeline"
            onClick={() => setActiveTab('timeline')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'timeline'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Activity Timeline ({recordActivities.length})
          </button>
          <button
            id="drawer-tab-details"
            onClick={() => setActiveTab('details')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'details'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Properties & Details
          </button>
          <button
            id="drawer-tab-ai"
            onClick={() => setActiveTab('ai')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            AI Intelligence
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: ACTIVITY TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {/* Activity Input Box */}
              <form
                onSubmit={handleAddActivity}
                className="bg-[#141824] border border-[#222838] rounded-xl p-3 space-y-2.5 shadow-sm"
              >
                {/* Type Switcher */}
                <div className="flex items-center gap-1 bg-[#0e1118] p-1 rounded-md border border-[#1b202c]">
                  <button
                    type="button"
                    onClick={() => setActivityType('note')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activityType === 'note' ? 'bg-[#22293b] text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    Note
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivityType('call')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activityType === 'call' ? 'bg-[#22293b] text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivityType('email')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activityType === 'email' ? 'bg-[#22293b] text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivityType('meeting')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activityType === 'meeting' ? 'bg-[#22293b] text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CalendarDays className="w-3 h-3" />
                    Meeting
                  </button>
                </div>

                {/* Extra inputs based on type */}
                {activityType === 'email' && (
                  <input
                    type="text"
                    placeholder="Email subject..."
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-[#10131c] text-xs text-slate-200 px-3 py-1.5 rounded border border-[#242b3d] focus:outline-none focus:border-blue-500"
                  />
                )}

                {activityType === 'call' && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-[11px]">Duration (mins):</span>
                    <input
                      type="number"
                      value={callDuration}
                      onChange={(e) => setCallDuration(e.target.value)}
                      className="w-16 bg-[#10131c] text-xs text-slate-200 px-2 py-1 rounded border border-[#242b3d] focus:outline-none"
                    />
                  </div>
                )}

                <textarea
                  placeholder={`Write a ${activityType} update for this record...`}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  className="w-full bg-[#10131c] text-xs text-slate-200 p-2.5 rounded-lg border border-[#242b3d] focus:outline-none focus:border-blue-500 resize-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">
                    Logged as <strong className="text-slate-300">{currentUser.name}</strong>
                  </span>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    Log Activity
                  </button>
                </div>
              </form>

              {/* Timeline Stream */}
              <div className="space-y-3 pt-2">
                {recordActivities.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-[#1f2433] rounded-xl text-slate-400 text-xs">
                    No activities recorded yet. Log a note, call, or email above.
                  </div>
                ) : (
                  recordActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-lg bg-[#141722] border border-[#202534] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                          {act.type === 'stage_change' ? (
                            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                          ) : act.type === 'email' ? (
                            <Mail className="w-3.5 h-3.5 text-purple-400" />
                          ) : act.type === 'call' ? (
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          ) : act.type === 'ai_insight' ? (
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          ) : (
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          {act.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(act.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {act.content}
                      </p>

                      <div className="text-[10px] text-slate-400 pt-1">
                        By {act.author}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DETAILS & PROPERTIES */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              {opp && (
                <div className="space-y-3 bg-[#131722] p-4 rounded-xl border border-[#1e2330]">
                  <h3 className="text-xs font-semibold text-white mb-2">Deal Properties</h3>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] text-slate-400">Deal Name</label>
                      <input
                        type="text"
                        value={opp.name}
                        onChange={(e) => updateOpportunity(opp.id, { name: e.target.value })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400">Amount ($)</label>
                        <input
                          type="number"
                          value={opp.amount}
                          onChange={(e) => updateOpportunity(opp.id, { amount: Number(e.target.value) })}
                          className="w-full bg-[#191d2a] text-xs font-mono font-bold text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400">Probability (%)</label>
                        <input
                          type="number"
                          value={opp.probability}
                          onChange={(e) => updateOpportunity(opp.id, { probability: Number(e.target.value) })}
                          className="w-full bg-[#191d2a] text-xs font-mono text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400">Close Date</label>
                        <input
                          type="date"
                          value={opp.closeDate}
                          onChange={(e) => updateOpportunity(opp.id, { closeDate: e.target.value })}
                          className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400">Priority</label>
                        <select
                          value={opp.priority}
                          onChange={(e) => updateOpportunity(opp.id, { priority: e.target.value as any })}
                          className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400">Associated Company</label>
                      <input
                        type="text"
                        value={opp.companyName || ''}
                        onChange={(e) => updateOpportunity(opp.id, { companyName: e.target.value })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] focus:outline-none focus:border-blue-500 mt-0.5"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1e2330] flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Delete opportunity "${opp.name}"?`)) {
                          deleteOpportunity(opp.id);
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Opportunity
                    </button>
                  </div>
                </div>
              )}

              {company && (
                <div className="space-y-3 bg-[#131722] p-4 rounded-xl border border-[#1e2330]">
                  <h3 className="text-xs font-semibold text-white mb-2">Company Information</h3>
                  <div>
                    <label className="text-[11px] text-slate-400">Company Name</label>
                    <input
                      type="text"
                      value={company.name}
                      onChange={(e) => updateCompany(company.id, { name: e.target.value })}
                      className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400">Domain</label>
                      <input
                        type="text"
                        value={company.domain}
                        onChange={(e) => updateCompany(company.id, { domain: e.target.value })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">ARR ($)</label>
                      <input
                        type="number"
                        value={company.arr || 0}
                        onChange={(e) => updateCompany(company.id, { arr: Number(e.target.value) })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Description</label>
                    <textarea
                      value={company.description || ''}
                      onChange={(e) => updateCompany(company.id, { description: e.target.value })}
                      rows={3}
                      className="w-full bg-[#191d2a] text-xs text-white p-2.5 rounded border border-[#2b3345] mt-0.5 resize-none"
                    />
                  </div>
                </div>
              )}

              {person && (
                <div className="space-y-3 bg-[#131722] p-4 rounded-xl border border-[#1e2330]">
                  <h3 className="text-xs font-semibold text-white mb-2">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400">First Name</label>
                      <input
                        type="text"
                        value={person.firstName}
                        onChange={(e) => updatePerson(person.id, { firstName: e.target.value })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Last Name</label>
                      <input
                        type="text"
                        value={person.lastName}
                        onChange={(e) => updatePerson(person.id, { lastName: e.target.value })}
                        className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={person.email}
                      onChange={(e) => updatePerson(person.id, { email: e.target.value })}
                      className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Job Title</label>
                    <input
                      type="text"
                      value={person.jobTitle}
                      onChange={(e) => updatePerson(person.id, { jobTitle: e.target.value })}
                      className="w-full bg-[#191d2a] text-xs text-white px-2.5 py-1.5 rounded border border-[#2b3345] mt-0.5"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI COPILOT */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-blue-950/30 to-purple-950/40 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Twenty AI Copilot Intelligence</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time deal risk scoring, stakeholder sentiment analysis, and smart sales coaching.
                </p>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() =>
                      openAICopilot({
                        type: selectedRecord.type,
                        id: selectedRecord.id,
                        name: getRecordTitle(),
                        initialPrompt: `Analyze the deal risks and win probability for "${getRecordTitle()}". Outline 3 concrete steps to accelerate closing.`,
                      })
                    }
                    className="w-full text-left p-2.5 rounded-lg bg-[#161a26] hover:bg-[#1e2336] border border-indigo-500/20 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>🎯 Generate Deal Risk & Win Probability Assessment</span>
                    <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() =>
                      openAICopilot({
                        type: selectedRecord.type,
                        id: selectedRecord.id,
                        name: getRecordTitle(),
                        initialPrompt: `Draft a concise, high-impact executive follow-up email for "${getRecordTitle()}".`,
                      })
                    }
                    className="w-full text-left p-2.5 rounded-lg bg-[#161a26] hover:bg-[#1e2336] border border-indigo-500/20 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>✉️ Draft Personalized Follow-up Email</span>
                    <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() =>
                      openAICopilot({
                        type: selectedRecord.type,
                        id: selectedRecord.id,
                        name: getRecordTitle(),
                        initialPrompt: `Extract key action items and next steps from the latest meetings on "${getRecordTitle()}".`,
                      })
                    }
                    className="w-full text-left p-2.5 rounded-lg bg-[#161a26] hover:bg-[#1e2336] border border-indigo-500/20 text-xs text-slate-200 flex items-center justify-between group transition-colors"
                  >
                    <span>📋 Extract Next Steps & Action Checklist</span>
                    <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
