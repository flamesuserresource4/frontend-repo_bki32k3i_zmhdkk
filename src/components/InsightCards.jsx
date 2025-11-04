import React, { useEffect, useState } from 'react';
import { Users, LineChart, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({ icon: Icon, label, target, suffix = '', color = 'from-cyan-500 to-violet-500' }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 900;
    const step = Math.max(16, Math.floor(duration / (end || 1)));
    const id = setInterval(() => {
      start += Math.ceil(end / (duration / step));
      if (start >= end) {
        start = end;
        clearInterval(id);
      }
      setValue(start);
    }, step);
    return () => clearInterval(id);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-lg shadow-cyan-500/10"
    >
      <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${color} p-2.5 text-white/90 shadow-sm shadow-black/20`}> 
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-3xl font-semibold text-white">
        {value}{suffix}
      </div>
      <div className="mt-1 text-sm text-slate-300">{label}</div>
      <div className="mt-4 h-10 w-full overflow-hidden rounded-md bg-gradient-to-r from-white/5 to-white/0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_50%,rgba(56,189,248,0.2),transparent_25%),radial-gradient(circle_at_80%_50%,rgba(147,51,234,0.2),transparent_25%)]" />
      </div>
    </motion.div>
  );
}

export default function InsightCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={Users} label="Potential investor matches this week" target={42} />
      <StatCard icon={Inbox} label="New connection requests" target={7} color="from-emerald-500 to-cyan-500" />
      <StatCard icon={LineChart} label="Growth this month" target={18} suffix="%" color="from-fuchsia-500 to-rose-500" />
    </div>
  );
}
