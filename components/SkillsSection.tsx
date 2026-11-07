'use client';

import React, { useState } from 'react';
import { Terminal, Cpu, Database, Orbit, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '@/lib/portfolio-data';
import { calculateSkillCategoryAverage } from '@/lib/portfolio-utils';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('systems');

  const currentCategory =
    PORTFOLIO_DATA.skills.find((c) => c.id === selectedCategory) ||
    PORTFOLIO_DATA.skills[0];

  return (
    <section id="skills" className="py-20 lg:py-28 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              Technical Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              02. Systems & Engineering Stack
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Grounded in low-level memory safety, concurrency primitives, and modern distributed architectures.
          </p>
        </div>

        {/* 2-Column Skills Layout: Left = Categories, Right = Skill Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Category Selector Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {PORTFOLIO_DATA.skills.map((category) => {
              const isSelected = category.id === selectedCategory;
              const avg = calculateSkillCategoryAverage(category);

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h3
                      className={`text-sm font-semibold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="text-right pl-3">
                    <span className="text-xs font-mono text-emerald-400 font-semibold tabular-nums">
                      {avg}%
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick architectural summary note */}
            <div className="mt-4 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Foundations First</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Emphasis on zero-copy data flow, async event loops, type safety, and clean separation of concerns.
              </p>
            </div>
          </div>

          {/* Detailed Skill Cards Grid */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {currentCategory.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {currentCategory.description}
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-400">
                {currentCategory.skills.length} core competencies
              </div>
            </div>

            <div className="space-y-6">
              {currentCategory.skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="font-mono text-slate-400 tabular-nums">
                      {skill.level}% Proficiency
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Real practical context note */}
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {skill.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
