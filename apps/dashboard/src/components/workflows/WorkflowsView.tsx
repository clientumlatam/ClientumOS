import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Play,
  Sparkles,
  CheckSquare,
  MessageSquare,
  Zap,
  Trash2,
  Trophy,
  UserPlus,
  Clock,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@clientum/ui';
import { WorkflowRule } from '@clientum/types';

export const WorkflowsView: React.FC = () => {
  const { workflows, addWorkflow, toggleWorkflow, deleteWorkflow, showToast, triggerConfetti } = useCRM();

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(workflows[0]?.id || '');
  const [isNewWfModalOpen, setIsNewWfModalOpen] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // New Workflow Form State
  const [wfName, setWfName] = useState('');
  const [wfDescription, setWfDescription] = useState('');
  const [wfTrigger, setWfTrigger] = useState<WorkflowRule['triggerType']>('record_created');
  const [wfTarget, setWfTarget] = useState<WorkflowRule['targetObject']>('person');

  const selectedWf = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wfName) return;

    const created = addWorkflow({
      name: wfName,
      description: wfDescription || 'Automated workflow rule',
      isActive: true,
      triggerType: wfTrigger,
      targetObject: wfTarget,
      nodes: [
        {
          id: 'n1',
          type: 'trigger',
          title: `Trigger: ${wfTrigger.replace('_', ' ').toUpperCase()}`,
          description: `Runs when ${wfTarget} triggers event`,
          config: {},
          icon: 'Zap',
        },
        {
          id: 'n2',
          type: 'action',
          title: 'Gemini AI Automation Step',
          description: 'Evaluate intent & summarize payload',
          config: {},
          icon: 'Sparkles',
        },
        {
          id: 'n3',
          type: 'action',
          title: 'Send WhatsApp Notification',
          description: 'Dispatch message via ClientumCRM Engine',
          config: {},
          icon: 'MessageSquare',
        },
      ],
    });

    setSelectedWorkflowId(created.id);
    setIsNewWfModalOpen(false);
    setWfName('');
    setWfDescription('');
  };

  const handleRunSimulation = () => {
    if (!selectedWf) return;
    setIsSimulating(true);
    setSimulationLogs(['[00:00.01] 🚀 Triggering workflow execution simulation...']);

    setTimeout(() => {
      setSimulationLogs((prev) => [...prev, `[00:00.15] ⚡ Event received for Target: ${selectedWf.targetObject.toUpperCase()}`]);
    }, 400);

    setTimeout(() => {
      setSimulationLogs((prev) => [...prev, `[00:00.52] 🤖 Executing Gemini AI Analysis Node: High Lead Score Verified`]);
    }, 900);

    setTimeout(() => {
      setSimulationLogs((prev) => [...prev, `[00:01.20] 📲 Dispatching WhatsApp Message via ClientumCRM Engine: SUCCESS`]);
    }, 1400);

    setTimeout(() => {
      setSimulationLogs((prev) => [...prev, `[00:01.85] ✅ Workflow completed with exit code 0`]);
      setIsSimulating(false);
      triggerConfetti();
      showToast('Workflow execution test succeeded!', 'success');
    }, 2000);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'MessageSquare': return MessageSquare;
      case 'UserPlus': return UserPlus;
      case 'Trophy': return Trophy;
      case 'CheckSquare': return CheckSquare;
      default: return Zap;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0c10] text-[#e1e4ea]">
      {/* Header Banner */}
      <div className="px-6 py-4 border-b border-[#1e222d] bg-[#0d0f14] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">ClientumCRM Automations & Workflows</h1>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Visual Flow Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Build event-driven automations, AI scoring pipelines, WhatsApp webhooks, and automatic CRM updates.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsNewWfModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left List of Workflows */}
        <div className="w-72 border-r border-[#1e222d] bg-[#0c0e14] p-3 flex flex-col gap-2 shrink-0 overflow-y-auto">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 px-2 pt-1 pb-2">
            Active Workflows ({workflows.length})
          </div>

          {workflows.map((wf) => {
            const isSelected = wf.id === selectedWorkflowId;
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`w-full p-3 rounded-xl text-left cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#1a202c] border-emerald-500/40 text-white shadow-sm'
                    : 'bg-[#10131c] border-[#1d2230] text-slate-400 hover:text-slate-200 hover:bg-[#151924]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs truncate text-white">{wf.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWorkflow(wf.id);
                    }}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all ${
                      wf.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}
                  >
                    {wf.isActive ? 'ACTIVE' : 'PAUSED'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                  {wf.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-[#232938]">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Runs: {wf.runCount}
                  </span>
                  <span className="uppercase text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#1e2330] text-slate-300">
                    {wf.targetObject}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Flowchart & Visual Node Diagram */}
        {selectedWf ? (
          <div className="flex-1 flex flex-col min-w-0 bg-[#0a0c10] overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 py-3 border-b border-[#1e222d] bg-[#0d0f14] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedWf.name}</span>
                  <span className="text-xs font-normal text-slate-400">({selectedWf.nodes.length} nodes)</span>
                </h2>
                <p className="text-xs text-slate-400">{selectedWf.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Testing Workflow...' : 'Test Run Workflow'}
                </button>

                <button
                  onClick={() => deleteWorkflow(selectedWf.id)}
                  className="p-1.5 rounded-lg bg-[#1a1f2c] hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-colors"
                  title="Delete Workflow"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Canvas Area */}
            <div className="flex-1 overflow-y-auto p-8 relative flex flex-col items-center">
              <div className="w-full max-w-xl space-y-6">
                {selectedWf.nodes.map((node, index) => {
                  const NodeIcon = getNodeIcon(node.icon);
                  const isTrigger = node.type === 'trigger';

                  return (
                    <React.Fragment key={node.id}>
                      <div
                        className={`p-4 rounded-xl border transition-all shadow-xl ${
                          isTrigger
                            ? 'bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border-emerald-500/30'
                            : 'bg-[#10131d] border-[#1e2332]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              isTrigger
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}
                          >
                            <NodeIcon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-bold text-white">{node.title}</h3>
                              <span
                                className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                                  isTrigger ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {node.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                              {node.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow Connector between nodes */}
                      {index < selectedWf.nodes.length - 1 && (
                        <div className="flex flex-col items-center my-1">
                          <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500/50 to-blue-500/50" />
                          <ArrowRight className="w-4 h-4 text-blue-400 rotate-90 -my-1" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Simulation Terminal Log Box */}
              {simulationLogs.length > 0 && (
                <div className="w-full max-w-xl mt-8 p-4 rounded-xl border border-[#222838] bg-[#07080b] font-mono text-xs">
                  <div className="flex items-center justify-between mb-2 text-slate-400 pb-2 border-b border-[#1b202e]">
                    <span className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                      <Activity className="w-3.5 h-3.5" />
                      Live Execution Terminal Output
                    </span>
                    <button
                      onClick={() => setSimulationLogs([])}
                      className="text-[10px] text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1 text-slate-300">
                    {simulationLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: New Workflow */}
      {isNewWfModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0d0f14] border border-[#1e222d] rounded-2xl shadow-2xl p-6 text-xs text-slate-200">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Build New Visual Workflow
            </h3>
            <p className="text-slate-400 mb-4">Set up triggers and automated node sequences.</p>

            <form onSubmit={handleCreateWorkflow} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Workflow Title</label>
                <input
                  type="text"
                  placeholder="e.g. Instant Lead Qualification & WhatsApp Dispatch"
                  value={wfName}
                  onChange={(e) => setWfName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#222736] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  placeholder="Brief summary of workflow actions..."
                  value={wfDescription}
                  onChange={(e) => setWfDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#222736] text-white focus:outline-none focus:border-emerald-500 h-16"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Trigger Type</label>
                  <select
                    value={wfTrigger}
                    onChange={(e) => setWfTrigger(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#222736] text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="record_created">Record Created</option>
                    <option value="stage_changed">Stage Changed</option>
                    <option value="field_updated">Field Updated</option>
                    <option value="schedule">Scheduled Cron</option>
                    <option value="webhook">Webhook HTTP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target Entity</label>
                  <select
                    value={wfTarget}
                    onChange={(e) => setWfTarget(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#141720] border border-[#222736] text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="person">People / Contacts</option>
                    <option value="opportunity">Opportunities / Deals</option>
                    <option value="company">Companies</option>
                    <option value="whatsapp">WhatsApp Inbox</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewWfModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#1e2330] text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md"
                >
                  Create & Activate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
