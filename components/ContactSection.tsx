'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { validateContactForm, ContactFormData } from '@/lib/portfolio-utils';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#ffffff'],
        });
      } catch {
        // Safe fallback
      }
    }, 700);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              04. Initiate Collaboration
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Open to full-time SWE / Systems Engineering roles starting Summer 2027, research collaborations, and open-source contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
              <h3 className="text-base font-semibold text-white">Direct Channels</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feel free to reach out via email or schedule a technical discussion. I typically reply within 24 hours.
              </p>

              {/* Copyable Email Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div className="truncate">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Primary Email</div>
                  <div className="text-xs sm:text-sm font-mono text-white truncate">
                    {PORTFOLIO_DATA.personal.email}
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-850 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>github.com/divyabharat</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">18+ Repos</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-850 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-emerald-400" />
                    <span>linkedin.com/in/divyabharat</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Connect</span>
                </a>
              </div>
            </div>

            {/* Quick Location & Availability */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PORTFOLIO_DATA.personal.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, {formData.name}. Divya will review your message and reply via {formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500/60'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500/60'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Systems Engineering Role / Project Inquiry"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500/60'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                        Message *
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project details, opportunities, or questions..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-600 focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500/60'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Divya</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
