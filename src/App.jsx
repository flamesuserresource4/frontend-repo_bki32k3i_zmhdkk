import React from 'react';
import Hero3D from './components/Hero3D';
import InsightCards from './components/InsightCards';
import MatchmakingFeed from './components/MatchmakingFeed';
import AchievementsBar from './components/AchievementsBar';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
        <header className="mb-6 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight text-white">Barise</div>
          <nav className="flex items-center gap-2">
            <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">Home</button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">Matchmaking</button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">Chat</button>
          </nav>
        </header>

        <Hero3D />

        <section className="mt-8 space-y-6">
          <InsightCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MatchmakingFeed />
            </div>
            <div>
              <AchievementsBar />
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Barise. Crafted with midnight glass aesthetics.
        </footer>
      </div>
    </div>
  );
}
