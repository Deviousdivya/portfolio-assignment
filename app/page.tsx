'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import InteractiveTerminal from '@/components/InteractiveTerminal';

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        <ProjectsSection />

        <SkillsSection />

        <ExperienceSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResume={() => {
          setTerminalOpen(false);
          setResumeOpen(true);
        }}
      />
    </div>
  );
}
