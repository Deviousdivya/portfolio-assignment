'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart3, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/portfolio-data';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [simulating, setSimulating] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Media Banner */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-950">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-lg"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Category Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>{project.categoryLabel}</span>
              <span className="text-slate-600">·</span>
              <span>Year {project.year}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-lg sm:text-xl font-bold font-mono text-emerald-400 tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-400">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Problem & Overview */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Overview & Motivation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Architecture */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">System Architecture & Engineering Highlights</h3>
            <ul className="space-y-2.5">
              {project.architectureDetails.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">Technologies Employed</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Simulation Feedback Banner if triggered */}
          {simulating && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Simulation node active: Running mock stress tests on {project.title}...</span>
              </span>
              <button
                onClick={() => setSimulating(false)}
                className="text-[11px] font-mono text-emerald-400 underline hover:text-emerald-200"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
              <button
                onClick={() => setSimulating(true)}
                className="px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span>Simulate Architecture</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
