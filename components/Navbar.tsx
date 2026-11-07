'use client';

import React, { useState } from 'react';
import { Menu, X, FileText, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenResume, onOpenTerminal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
        >
          Divya Bharat
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
              title="Open Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-md"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          {onOpenTerminal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-colors"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Interactive Terminal CLI</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
