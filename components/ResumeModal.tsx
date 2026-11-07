'use client';

import React, { useEffect, useState } from 'react';
import { X, Printer, Download, Copy, Check, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const { personal, education, experiences, projects, skills, certifications } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textSummary = `
${personal.name}
${personal.role} | ${personal.focus}
Email: ${personal.email} | Location: ${personal.location}

EDUCATION:
${education.degree} - ${education.institution} (${education.period})
GPA: ${education.gpa}

EXPERIENCE:
${experiences.map((e) => `${e.role} @ ${e.organization} (${e.period})
${e.highlights.map((h) => `- ${h}`).join('\n')}`).join('\n\n')}

FEATURED PROJECTS:
${projects.map((p) => `${p.title}: ${p.description}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Curriculum Vitae
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">Class of 2027</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy plain text summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content Document */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-900 text-slate-200 text-xs sm:text-sm space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 id="resume-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {personal.name}
            </h1>
            <p className="text-sm font-medium text-emerald-400 mt-1">
              {personal.role}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {personal.focus}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-3">
              <span>{personal.location}</span>
              <span>·</span>
              <a href={`mailto:${personal.email}`} className="text-emerald-400 hover:underline">
                {personal.email}
              </a>
              <span>·</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                GitHub
              </a>
              <span>·</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-3">
              Education
            </h2>
            <div>
              <div className="flex items-center justify-between font-bold text-white">
                <span>{education.degree}</span>
                <span className="font-mono text-xs text-emerald-400 tabular-nums">{education.period}</span>
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                {education.institution} · <span className="text-slate-200 font-semibold">{education.gpa}</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                <span className="text-slate-300 font-semibold">Coursework: </span>
                {education.coursework.join(', ')}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-4">
              Engineering & Research Experience
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{exp.role} · <span className="text-emerald-300 font-normal">{exp.organization}</span></span>
                    <span className="font-mono text-xs text-emerald-400 tabular-nums">{exp.period}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mb-2">
                    {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Stack: {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Systems Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-4">
              Key Engineering Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{proj.title} <span className="text-xs font-normal text-slate-400 font-mono">({proj.categoryLabel})</span></span>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">{proj.year}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="mt-1 text-[11px] font-mono text-slate-400">
                    Technologies: {proj.tags.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-3">
              Technical Stack & Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <span className="font-bold text-white">{cat.title}: </span>
                  <span className="text-slate-300">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-2">
              Certifications & Honors
            </h2>
            <div className="space-y-1 text-xs text-slate-300">
              {certifications.map((c, i) => (
                <div key={i} className="flex justify-between">
                  <span>{c.title} ({c.issuer})</span>
                  <span className="font-mono text-slate-400 tabular-nums">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
