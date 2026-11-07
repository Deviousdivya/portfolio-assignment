'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, ArrowUpRight, Github, Filter, Layers, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '@/lib/portfolio-data';
import { filterProjects } from '@/lib/portfolio-utils';
import ProjectDetailModal from './ProjectDetailModal';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'distributed', label: 'Distributed Systems' },
    { id: 'robotics', label: 'Robotics & Control' },
    { id: 'fullstack', label: 'Full-Stack Architecture' },
    { id: 'ml', label: 'Embedded AI' },
  ];

  const filteredProjects = useMemo(() => {
    return filterProjects(PORTFOLIO_DATA.projects, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              01. Selected Systems & Architectures
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Production-grade distributed clusters, autonomous perception stacks, and high-performance protocols designed during 4 years of engineering studies.
          </p>
        </div>

        {/* Filter Toolbar & Search Bar adhering to Section 1.A */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          {/* Functional filter segmented buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-emerald-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid (Bento Box style from 7_portfolio_photography.md) */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
            <p className="text-sm text-slate-400">No systems match your search query.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 text-xs text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx === 0 || idx === 1;

              return (
                <div
                  key={project.id}
                  className={`group relative rounded-3xl border border-slate-800/80 bg-slate-900/30 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between ${
                    isLarge ? 'lg:col-span-6' : 'lg:col-span-6'
                  }`}
                >
                  <div>
                    {/* Media Frame */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                      {/* Unboxed Metadata Header on top of image */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-emerald-300 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                          <span>{project.categoryLabel}</span>
                          <span className="text-slate-600">·</span>
                          <span>{project.year}</span>
                        </div>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
                          aria-label={`GitHub Repository for ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Metrics bar along bottom of media */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-4 text-xs font-mono text-slate-300">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold tabular-nums">{m.value}</span>
                            <span className="text-[11px] text-slate-400">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack items rendered cleanly */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors group/btn"
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono"
                    >
                      source code →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
