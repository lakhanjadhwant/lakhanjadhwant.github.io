import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

import IntroCard from './IntroCard';
import ProfileCard from './ProfileCard';
import TechMarquee from './TechMarquee';
import SkillsCard from './SkillsCard';
import EducationCard from './EducationCard';
import CertificatesCard from './CertificatesCard';

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safety timeout: guarantees all cards are visible if JS execution is interrupted
    const safetyTimer = setTimeout(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.bento-card');
        cards.forEach((card) => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
      }
    }, 3000);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.bento-card');
      if (!cards || cards.length === 0) return;

      if (prefersReduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      // Initial state set before animating to prevent FOUC
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });
    }, sectionRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto"
      aria-label="About Lakhan Jadhwant"
    >
      {/* Section Header */}
      <div className="mb-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>01 &bull; Overview</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            About
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md">
          A glimpse into my engineering journey, problem-solving mindset, and the tools I wield to build production AI.
        </p>
      </div>

      {/* 12-Column Bento Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-auto"
      >
        {/* Row 1-2: Intro (7col) & Photo (5col) */}
        <IntroCard />
        <ProfileCard />


        {/* Row 4: Tech Stack Marquee (12col) */}
        <TechMarquee />

        {/* Row 5-6: Skills by Category (7col) & Education + Certifications (5col) */}
        <SkillsCard />
        <div className="lg:col-span-5 flex flex-col gap-6">
          <EducationCard />
          <CertificatesCard />
        </div>
      </div>
    </section>
  );
}
