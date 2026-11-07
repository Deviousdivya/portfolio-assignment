'use client';

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-white font-bold tracking-tight text-sm">
              Divya Bharat
            </span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span>4th-Year Computer Science & Systems Engineering</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="font-mono text-emerald-400">Class of 2027</span>
          </div>

          {/* Social links & Back to top */}
          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-emerald-400 transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Divya Bharat. Designed with clean minimalist aesthetics, modern animations, and procedural 3D models.
          </div>
          <div className="font-mono">
            Bangalore, India · Open for Full-Time Roles 2027
          </div>
        </div>
      </div>
    </footer>
  );
}
