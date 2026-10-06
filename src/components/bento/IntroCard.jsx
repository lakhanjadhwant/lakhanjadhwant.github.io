import React from 'react';
import { FileDown, Send, Sparkles } from 'lucide-react';
import { profile } from '../../data/portfolio';

export default function IntroCard() {
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeUrl}`;

  return (
    <div className="bento-card lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-blue-500/10 hover:border-white/20 transition-all duration-300">
      <div>
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to AI/ML Roles</span>
        </div>

        {/* Heading */}
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4 flex items-center gap-2">
          Hi, I&apos;m Lakhan
          <Sparkles className="w-5 h-5 text-amber-300" />
        </h3>

        {/* Summary text */}
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
          {profile.summary}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-95"
        >
          <FileDown className="w-4 h-4 text-cyan-300" />
          <span>Download Resume</span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all active:scale-95"
        >
          <Send className="w-3.5 h-3.5 text-neutral-300" />
          <span>Get in touch</span>
        </a>
      </div>
    </div>
  );
}
