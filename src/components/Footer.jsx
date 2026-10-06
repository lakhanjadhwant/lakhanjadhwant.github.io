import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 py-12 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Copyright & Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-neutral-400 text-center sm:text-left">
          <span>&copy; 2026 {profile.name}. All rights reserved.</span>
          <span className="hidden sm:inline text-neutral-600">&bull;</span>
          <span className="text-neutral-500">Built with React, GSAP & Tailwind</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-xs text-neutral-300 hover:text-white transition-all active:scale-95 shadow-sm"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
