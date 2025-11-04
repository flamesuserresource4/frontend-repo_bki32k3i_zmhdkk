import React from 'react';
import { Trophy, Star, Zap } from 'lucide-react';

export default function AchievementsBar() {
  const progress = 60; // example XP
  const achievements = [
    { id: 1, icon: Trophy, label: 'First 5 Connections' },
    { id: 2, icon: Star, label: 'Profile Complete' },
    { id: 3, icon: Zap, label: 'Pitch Sent' },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Progress & Achievements</h3>
          <p className="text-slate-300 text-sm">You're {progress}% towards your next milestone</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200/90">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> Active
        </div>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {achievements.map((a) => (
          <div key={a.id} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <a.icon className="h-4 w-4 text-yellow-300" />
            {a.label}
          </div>
        ))}
      </div>
    </div>
  );
}
