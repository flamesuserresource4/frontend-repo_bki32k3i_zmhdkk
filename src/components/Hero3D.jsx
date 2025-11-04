import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient and glow overlays that don't block Spline interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-950/90" />
      <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(147,51,234,0.25),transparent_35%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-cyan-500/10 rounded-2xl px-6 sm:px-10 py-6 sm:py-8 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200/90">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Midnight Glass • AI Matchmaking for Founders × Investors
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Barise — where visionary founders meet aligned capital
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300">
            A sleek, AI-driven matchmaking experience with real-time insights, immersive visuals, and a premium dashboard feel.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110">
              <Rocket className="h-4 w-4" />
              Find My Matches
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-slate-200 hover:bg-white/10 transition">
              Explore Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
