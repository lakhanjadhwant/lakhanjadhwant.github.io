import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { experience } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (lineRef.current && containerRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto"
      aria-label="Work Experience"
    >
      {/* Section Header */}
      <div className="mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-violet-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>02 &bull; Experience</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Work History
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md">
          Hands-on industry engineering roles developing vision pipelines, agentic workflows, and real-time inference systems.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 sm:pl-10">
        {/* Static Background Track */}
        <div
          className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-white/10"
          aria-hidden="true"
        />

        {/* Dynamic Glowing Scrubbed Line */}
        <div
          ref={lineRef}
          className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          aria-hidden="true"
        />

        {/* Experience List */}
        <div className="space-y-12">
          {experience.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Marker Node */}
              <div
                className="absolute -left-[27px] sm:-left-[35px] top-6 w-5 h-5 rounded-full bg-[#07070a] border-2 border-violet-500 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.6)] group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:bg-cyan-300 transition-colors" />
              </div>

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-violet-500/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
              >
                {/* Header row: Company, Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white group-hover:text-blue-300 transition-colors">
                      {item.company}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium mt-1">
                      <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item.role}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono self-start sm:self-center">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-6">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tag Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium hover:border-violet-400/40 hover:bg-violet-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
