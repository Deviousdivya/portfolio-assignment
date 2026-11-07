'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Sparkles, Box, Mail, Github, Linkedin, Laptop, Headphones, Cpu, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import EngineerWorkstation3D from '@/components/3d/EngineerWorkstation3D';

interface HeroSectionProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
}

export default function HeroSection({ onOpenResume, onExploreProjects }: HeroSectionProps) {
  const { personal, metrics } = PORTFOLIO_DATA;
  const [heroView, setHeroView] = useState<'3d' | 'avatar'>('3d');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-900">
      {/* Background radial emerald gradient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-screen layout (Hero Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Clean unboxed kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 tracking-wider uppercase">
              <span>{personal.role}</span>
              <span className="text-slate-600">·</span>
              <span>{personal.expectedGraduation}</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 [text-wrap:balance] leading-[1.12]">
              Architecting high-concurrency systems, distributed storage, and autonomous control.
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Hello, I&apos;m <span className="text-white font-medium">{personal.name}</span>. Senior engineering student specializing in low-latency infrastructure, consensus-driven storage engines in Rust & Go, and embedded robotics telemetry.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onExploreProjects}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 group active:scale-95"
              >
                <span>Explore Shipped Systems</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl transition-colors"
              >
                Curriculum Vitae
              </button>
            </div>

            {/* Status & Contact metadata line */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{personal.availability}</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Engineer Workstation (Laptop, Headphone, CPU) directly on landing page */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* View Switcher Header between 3D Workstation and Portrait */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl text-xs">
                <button
                  onClick={() => setHeroView('3d')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    heroView === '3d'
                      ? 'bg-emerald-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Workstation</span>
                </button>
                <button
                  onClick={() => setHeroView('avatar')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    heroView === 'avatar'
                      ? 'bg-emerald-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile Photo</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400">●</span>
                <span>Real-Time 3D Rendering</span>
              </div>
            </div>

            {/* Interactive 3D Workstation Container */}
            {heroView === '3d' ? (
              <EngineerWorkstation3D />
            ) : (
              <div className="relative aspect-square max-h-[500px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 p-3 sm:p-4 shadow-2xl backdrop-blur-sm">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                  <Image
                    src={personal.avatar}
                    alt="Divya Bharat - 4th Year Engineering Student"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-white">Divya Bharat</span>
                      <span className="text-xs font-mono text-emerald-400">Class of 2027</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {personal.focus}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Full-width KPI strip below the hero split */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                {m.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
                {m.label}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                {m.subtext}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
