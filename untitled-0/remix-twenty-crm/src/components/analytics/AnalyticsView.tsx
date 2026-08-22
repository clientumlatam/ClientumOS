import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Award,
  BarChart,
  Target,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { STAGES } from '../../data/initialData';

export const AnalyticsView: React.FC = () => {
  const { opportunities, companies, people, users, t } = useCRM();

  // Metrics calculations
  const totalDeals = opportunities.length;
  const wonDeals = opportunities.filter((o) => o.stage === 'won');
  const lostDeals = opportunities.filter((o) => o.stage === 'lost');
  const activeDeals = opportunities.filter((o) => o.stage !== 'won' && o.stage !== 'lost');

  const totalPipelineValue = activeDeals.reduce((sum, o) => sum + o.amount, 0);
  const weightedPipeline = activeDeals.reduce((sum, o) => sum + (o.amount * o.probability) / 100, 0);
  const totalWonRevenue = wonDeals.reduce((sum, o) => sum + o.amount, 0);

  const closedCount = wonDeals.length + lostDeals.length;
  const winRate = closedCount > 0 ? Math.round((wonDeals.length / closedCount) * 100) : 100;
  const avgDealSize = totalDeals > 0 ? Math.round(opportunities.reduce((s, o) => s + o.amount, 0) / totalDeals) : 0;

  // Rep leaderboard
  const repStats = users.map((u) => {
    const userOpps = opportunities.filter((o) => o.assignedTo === u.name);
    const userWon = userOpps.filter((o) => o.stage === 'won');
    const userActive = userOpps.filter((o) => o.stage !== 'won' && o.stage !== 'lost');
    const wonTotal = userWon.reduce((s, o) => s + o.amount, 0);
    const activeTotal = userActive.reduce((s, o) => s + o.amount, 0);
    return {
      user: u,
      dealsCount: userOpps.length,
      wonTotal,
      activeTotal,
    };
  }).sort((a, b) => b.wonTotal + b.activeTotal - (a.wonTotal + a.activeTotal));

  return (
    <div id="twenty-analytics-view" className="flex-1 flex flex-col h-full bg-[#0a0c10] overflow-y-auto p-4 select-none">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">{t('analyticsDashboard')}</h2>
        <p className="text-xs text-slate-400">
          {t('analyticsSubtitle')}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {/* Pipeline Value */}
        <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t('totalPipelineValue')}</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <div className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>{activeDeals.length} {t('dealCount')}</span>
            </div>
          </div>
        </div>

        {/* Weighted Forecast */}
        <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t('weightedPipeline')}</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">
              ${Math.round(weightedPipeline).toLocaleString()}
            </div>
            <div className="text-[11px] text-purple-400 mt-1">
              Probability adjusted ARR
            </div>
          </div>
        </div>

        {/* Closed Won Revenue */}
        <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t('closedWonRevenue')}</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              ${totalWonRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1">
              {t('winRate')}: <strong>{winRate}%</strong> ({wonDeals.length} {t('dealCount')})
            </div>
          </div>
        </div>

        {/* Avg Deal Size */}
        <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t('averageDealSize')}</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-white">
              ${avgDealSize.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {totalDeals} {t('records')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        {/* Stage Distribution & Funnel Bar */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-[#12151d] border border-[#1e2330]">
          <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-blue-400" />
            Stage Distribution & Deal Velocity
          </h3>

          <div className="space-y-3">
            {STAGES.map((stage) => {
              const stageOpps = opportunities.filter((o) => o.stage === stage.id);
              const stageSum = stageOpps.reduce((acc, curr) => acc + curr.amount, 0);
              const percentage =
                totalPipelineValue > 0
                  ? Math.min(100, Math.round((stageSum / (totalPipelineValue + totalWonRevenue)) * 100))
                  : 0;

              return (
                <div key={stage.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="text-slate-300 font-medium">{t(`stage_${stage.id}` as any) || stage.name}</span>
                      <span className="text-slate-400 text-[11px]">({stageOpps.length} {t('dealCount')})</span>
                    </div>
                    <span className="font-mono text-slate-200 font-semibold">
                      ${stageSum.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-2 w-full bg-[#1b202c] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(percentage, stageOpps.length > 0 ? 5 : 0)}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rep Leaderboard */}
        <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330]">
          <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Sales Rep Leaderboard
          </h3>

          <div className="space-y-3">
            {repStats.map((stat, idx) => (
              <div
                key={stat.user.id}
                className="p-2.5 rounded-lg bg-[#161a24] border border-[#202534] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 font-mono text-xs font-bold text-slate-400 text-center">
                    #{idx + 1}
                  </div>
                  <img
                    src={stat.user.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover border border-[#2b3345]"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      {stat.user.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {stat.dealsCount} deals managed
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    ${Math.round(stat.wonTotal / 1000)}k won
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    ${Math.round(stat.activeTotal / 1000)}k active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
