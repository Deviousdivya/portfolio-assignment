'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function InteractiveTerminal({
  isOpen,
  onClose,
  onOpenResume,
}: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-slate-300 leading-relaxed">
          <p className="text-emerald-400 font-bold">Divya Bharat [Systems Engineering CLI v2.4]</p>
          <p className="text-xs text-slate-400 mt-1">
            Type <span className="text-emerald-300 font-mono">help</span> to view available terminal commands, or <span className="text-emerald-300 font-mono">projects</span> to inspect shipped systems.
          </p>
        </div>
      ),
    },
  ]);

  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    setEnteredCommands((prev) => [...prev, cmd]);
    setCommandIndex(-1);
    setInputVal('');

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono">
              <div><span className="text-emerald-300">about</span> - Background & engineering focus</div>
              <div><span className="text-emerald-300">projects</span> - Shipped systems & repositories</div>
              <div><span className="text-emerald-300">skills</span> - Core languages & architecture stack</div>
              <div><span className="text-emerald-300">education</span> - University degree & GPA</div>
              <div><span className="text-emerald-300">contact</span> - Email & contact credentials</div>
              <div><span className="text-emerald-300">resume</span> - Launch Interactive Resume viewer</div>
              <div><span className="text-emerald-300">clear</span> - Clear terminal session output</div>
              <div><span className="text-emerald-300">exit</span> - Close terminal CLI</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="font-bold text-white">{PORTFOLIO_DATA.personal.name}</p>
            <p className="text-slate-400">{PORTFOLIO_DATA.personal.role}</p>
            <p>{PORTFOLIO_DATA.personal.bio}</p>
            <p className="text-emerald-400 font-mono">Location: {PORTFOLIO_DATA.personal.location}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs space-y-2">
            <p className="text-emerald-400 font-bold">Featured Shipped Systems:</p>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-l border-slate-800 pl-2">
                <span className="text-white font-bold">{p.title}</span> ({p.categoryLabel})
                <p className="text-slate-400">{p.tagline}</p>
                <p className="text-slate-500 font-mono text-[11px]">Stack: {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-2">
            <p className="text-emerald-400 font-bold">Core Competencies:</p>
            {PORTFOLIO_DATA.skills.map((s) => (
              <div key={s.id}>
                <span className="text-white font-semibold">{s.title}:</span>{' '}
                <span className="text-slate-400">{s.skills.map((k) => k.name).join(' · ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-white font-bold">{PORTFOLIO_DATA.education.degree}</p>
            <p>{PORTFOLIO_DATA.education.institution} ({PORTFOLIO_DATA.education.period})</p>
            <p className="text-emerald-400 font-mono">GPA: {PORTFOLIO_DATA.education.gpa}</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 font-mono text-slate-300">
            <p>Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-emerald-300 underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p>GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-emerald-300 underline">{PORTFOLIO_DATA.personal.github}</a></p>
            <p>LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-emerald-300 underline">{PORTFOLIO_DATA.personal.linkedin}</a></p>
          </div>
        );
        break;

      case 'resume':
        outputNode = (
          <p className="text-xs text-emerald-300">Opening full credentials & resume modal viewer...</p>
        );
        if (onOpenResume) onOpenResume();
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        outputNode = (
          <p className="text-xs text-rose-400">
            command not found: {cmd}. Type <span className="text-emerald-300 font-mono">help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length > 0) {
        const nextIndex =
          commandIndex === -1 ? enteredCommands.length - 1 : Math.max(0, commandIndex - 1);
        setCommandIndex(nextIndex);
        setInputVal(enteredCommands[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex !== -1) {
        const nextIndex = commandIndex + 1;
        if (nextIndex >= enteredCommands.length) {
          setCommandIndex(-1);
          setInputVal('');
        } else {
          setCommandIndex(nextIndex);
          setInputVal(enteredCommands[nextIndex]);
        }
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Interactive Terminal CLI"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">divya@systems-node:~</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-4"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-slate-500">divya@portfolio:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={handleCommandSubmit}
          className="bg-slate-900/90 px-4 py-3 border-t border-slate-800 flex items-center gap-2 font-mono text-xs"
        >
          <span className="text-emerald-400">divya@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-white focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="text-slate-400 hover:text-emerald-300"
            aria-label="Execute Command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
