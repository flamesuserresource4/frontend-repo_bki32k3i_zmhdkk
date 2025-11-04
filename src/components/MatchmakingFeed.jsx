import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, MessageCircle, Send, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const investorsMock = [
  { id: 1, name: 'Astra Capital', industry: 'Fintech', stageInterest: 'Seed', region: ['NA', 'EU'], ticketRange: 500000, interests: ['Payments', 'APIs', 'B2B'] },
  { id: 2, name: 'Neon Ventures', industry: 'AI', stageInterest: 'Pre-Seed', region: ['EU'], ticketRange: 250000, interests: ['Infra', 'LLMs', 'MLOps'] },
  { id: 3, name: 'Horizon Fund', industry: 'SaaS', stageInterest: 'Seed', region: ['NA', 'APAC'], ticketRange: 800000, interests: ['PLG', 'DevTools', 'Security'] },
  { id: 4, name: 'Quantum Angels', industry: 'Fintech', stageInterest: 'Seed', region: ['NA'], ticketRange: 300000, interests: ['Credit', 'Banking', 'Risk'] },
];

const founder = {
  name: 'Ava (Foundr.)',
  industry: 'Fintech',
  stage: 'Seed',
  region: 'NA',
  fundingGoal: 600000,
  interests: ['Payments', 'APIs', 'Risk'],
};

function compat(founder, investor) {
  let score = 0;
  if (founder.industry === investor.industry) score += 30;
  if (founder.stage === investor.stageInterest) score += 20;
  if (investor.region.includes(founder.region)) score += 10;
  if (investor.ticketRange >= founder.fundingGoal * 0.5) score += 20;
  const shared = investor.interests.filter((x) => founder.interests.includes(x)).length;
  score += Math.min(shared * 5, 10);
  score += Math.random() * 10;
  return Math.min(Math.round(score), 100);
}

export default function MatchmakingFeed() {
  const [filters, setFilters] = useState({ industry: 'All', stage: 'All', region: 'All' });
  const [activeInvestor, setActiveInvestor] = useState(null);

  const filtered = useMemo(() => {
    return investorsMock
      .filter((i) => (filters.industry === 'All' ? true : i.industry === filters.industry))
      .filter((i) => (filters.stage === 'All' ? true : i.stageInterest === filters.stage))
      .filter((i) => (filters.region === 'All' ? true : i.region.includes(filters.region)))
      .map((i) => ({ ...i, score: compat(founder, i) }))
      .sort((a, b) => b.score - a.score);
  }, [filters]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">AI Matchmaking Feed</h3>
          <p className="text-slate-300 text-sm">Sorted by compatibility score</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            label="Industry"
            options={["All", "Fintech", "AI", "SaaS"]}
            value={filters.industry}
            onChange={(v) => setFilters((f) => ({ ...f, industry: v }))}
          />
          <FilterSelect
            label="Stage"
            options={["All", "Pre-Seed", "Seed"]}
            value={filters.stage}
            onChange={(v) => setFilters((f) => ({ ...f, stage: v }))}
          />
          <FilterSelect
            label="Region"
            options={["All", "NA", "EU", "APAC"]}
            value={filters.region}
            onChange={(v) => setFilters((f) => ({ ...f, region: v }))}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((inv) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-4 hover:border-cyan-400/40 transition shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white font-medium">{inv.name}</div>
                <div className="text-xs text-slate-300 mt-0.5">{inv.industry} • {inv.stageInterest} • {inv.region.join(', ')}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{inv.score}%</div>
                <div className="text-[10px] text-slate-300">compatibility</div>
              </div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                style={{ width: `${inv.score}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {inv.interests.map((tag) => (
                <span key={tag} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-200">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setActiveInvestor(inv)}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-3 py-2 text-sm text-white shadow-cyan-500/30 shadow hover:brightness-110"
              >
                Match
              </button>
              <button className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                Quick View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeInvestor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setActiveInvestor(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/90 p-6 backdrop-blur-xl"
            >
              <h4 className="text-white text-lg font-semibold">Compatibility breakdown</h4>
              <p className="text-slate-300 text-sm">{founder.name} × {activeInvestor.name}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Breakdown label="Industry" value={founder.industry === activeInvestor.industry ? 100 : 40} />
                <Breakdown label="Stage" value={founder.stage === activeInvestor.stageInterest ? 100 : 30} />
                <Breakdown label="Region" value={activeInvestor.region.includes(founder.region) ? 100 : 40} />
                <Breakdown label="Ticket Fit" value={activeInvestor.ticketRange >= founder.fundingGoal * 0.5 ? 100 : 20} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {activeInvestor.interests.map((t) => (
                  <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-200">{t}</span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-3 py-2 text-sm text-white">
                  <MessageCircle className="h-4 w-4" /> Start Chat
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                  <Send className="h-4 w-4" /> Send Pitch
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                  <CalendarDays className="h-4 w-4" /> Request Meet
                </button>
              </div>

              <button
                onClick={() => setActiveInvestor(null)}
                className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSelect({ label, options, value, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
      <SlidersHorizontal className="h-4 w-4 text-cyan-300" />
      <span className="text-slate-300">{label}</span>
      <select
        className="bg-transparent text-white outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-slate-900">{o}</option>
        ))}
      </select>
    </label>
  );
}

function Breakdown({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-slate-300">{label}</div>
      <div className="mt-1 text-white font-medium">{value}%</div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
