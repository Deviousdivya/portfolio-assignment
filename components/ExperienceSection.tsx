'use client';

import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function ExperienceSection() {
  const { experiences, education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              Career Trajectory & Education
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              03. Experience & Milestones
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Internship deliverables, academic research publications, and campus leadership roles leading up to 2027 graduation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Work & Research Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-6">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Engineering & Research Roles</span>
            </h3>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base font-bold text-white">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  {/* Clean unboxed organization and location with typographic separator */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <span className="text-slate-300 font-medium">{exp.organization}</span>
                    <span className="text-slate-600">·</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Key Deliverables */}
                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack used */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-850"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Foundation & Honors */}
          <div className="lg:col-span-5 space-y-8">
            {/* Education Box */}
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Academic Foundation</span>
              </h3>

              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-5">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {education.degree}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-slate-300">{education.institution}</span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono">{education.period}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold font-mono text-emerald-400">
                    GPA: {education.gpa}
                  </div>
                </div>

                {/* Academic Honors */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Honors & Distinctions
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {education.honors.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Coursework */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Key Coursework
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[11px] text-slate-400 px-2.5 py-1 rounded bg-slate-950 border border-slate-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Certifications & Accreditations</span>
              </h3>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {cert.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 tabular-nums">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
