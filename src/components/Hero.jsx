import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, ArrowDown, Mouse } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useNetworkCanvas } from '../hooks/useNetworkCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const scrollProgressRef = useRef(0);

  // Animated elements
  const eyebrowRef = useRef(null);
  const titlePart1Ref = useRef(null);
  const titlePart2Ref = useRef(null);
  const taglineRef = useRef(null);
  const indicatorRef = useRef(null);
  const socialsRef = useRef(null);
  const mainContentRef = useRef(null);

  // Caption overlays
  const caption1Ref = useRef(null);
  const caption2Ref = useRef(null);
  const caption3Ref = useRef(null);

  const canvasRef = useNetworkCanvas(scrollProgressRef);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safety fallback timer to ensure everything is visible even if GSAP encounters a boundary
    const safetyTimer = setTimeout(() => {
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = '1';
      if (titlePart1Ref.current) titlePart1Ref.current.style.opacity = '1';
      if (titlePart2Ref.current) titlePart2Ref.current.style.opacity = '1';
      if (taglineRef.current) taglineRef.current.style.opacity = '1';
      if (indicatorRef.current) indicatorRef.current.style.opacity = '1';
      if (socialsRef.current) socialsRef.current.style.opacity = '1';
    }, 2500);

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Immediate display for reduced motion
        gsap.set(
          [
            eyebrowRef.current,
            titlePart1Ref.current,
            titlePart2Ref.current,
            taglineRef.current,
            indicatorRef.current,
            socialsRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial States before animation to eliminate FOUC
      gsap.set(
        [
          eyebrowRef.current,
          titlePart1Ref.current,
          titlePart2Ref.current,
          taglineRef.current,
          indicatorRef.current,
          socialsRef.current,
        ],
        { opacity: 0 }
      );
      gsap.set([titlePart1Ref.current, titlePart2Ref.current], { y: 40 });
      gsap.set(
        [eyebrowRef.current, taglineRef.current, indicatorRef.current, socialsRef.current],
        { y: 20 }
      );
      gsap.set([caption1Ref.current, caption2Ref.current, caption3Ref.current], {
        opacity: 0,
        y: 20,
        scale: 0.95,
      });

      // Intro Timeline on page load
      const introTl = gsap.timeline({ delay: 0.15 });
      introTl
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(
          [titlePart1Ref.current, titlePart2Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          },
          '-=0.35'
        )
        .to(
          [taglineRef.current, socialsRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          indicatorRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

      // ScrollTrigger scrubbed animation over 300vh
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // 1. Canvas scale from 1 to 1.25
      scrubTl.to(
        canvasWrapRef.current,
        {
          scale: 1.25,
          ease: 'none',
        },
        0
      );

      // 2. Caption 1 ("LLMs & RAG") fade in & out around 20%
      scrubTl
        .to(
          caption1Ref.current,
          { opacity: 0.85, y: 0, scale: 1, duration: 0.1, ease: 'power2.out' },
          0.14
        )
        .to(
          caption1Ref.current,
          { opacity: 0, y: -20, scale: 1.05, duration: 0.1, ease: 'power2.in' },
          0.28
        );

      // 3. Caption 2 ("Computer Vision") around 45%
      scrubTl
        .to(
          caption2Ref.current,
          { opacity: 0.85, y: 0, scale: 1, duration: 0.1, ease: 'power2.out' },
          0.38
        )
        .to(
          caption2Ref.current,
          { opacity: 0, y: -20, scale: 1.05, duration: 0.1, ease: 'power2.in' },
          0.52
        );

      // 4. Caption 3 ("Production AI") around 70%
      scrubTl
        .to(
          caption3Ref.current,
          { opacity: 0.85, y: 0, scale: 1, duration: 0.1, ease: 'power2.out' },
          0.62
        )
        .to(
          caption3Ref.current,
          { opacity: 0, y: -20, scale: 1.05, duration: 0.1, ease: 'power2.in' },
          0.76
        );

      // 5. Main Content moves up and fades out between ~70% and 100%
      scrubTl.to(
        mainContentRef.current,
        {
          y: -90,
          opacity: 0,
          ease: 'power2.inOut',
        },
        0.72
      );

      // Mobile address bar scroll adjustment: refresh ScrollTrigger only on width change
      let currentWidth = window.innerWidth;
      const handleResize = () => {
        if (window.innerWidth !== currentWidth) {
          currentWidth = window.innerWidth;
          ScrollTrigger.refresh();
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[300vh] w-full bg-[#050505]"
      aria-label="Hero Introduction"
    >
      {/* Sticky Fullscreen Viewport Wrapper */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Floating gradient orbs behind canvas */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none animate-pulse"
          style={{ animationDuration: '8s' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/15 blur-[130px] pointer-events-none animate-pulse"
          style={{ animationDuration: '10s' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-cyan-500/10 blur-[110px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Canvas Neural Network Wrapper with CSS filter saturate(1.25) */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 w-full h-full pointer-events-auto [filter:saturate(1.25)] origin-center"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="Interactive generative neural network constellation"
          />
        </div>

        {/* Visual Overlays */}
        {/* 1. Global darken */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />
        {/* 2. Vignette */}
        <div
          className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)]"
          aria-hidden="true"
        />
        {/* 3. Bottom Gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* 4. Pure CSS Dot Grid Texture ~4% opacity */}
        <div
          className="absolute inset-0 bg-dot-grid opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        />

        {/* Scroll Caption Overlays (Centered, Large Syne text, low opacity gradient text) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6"
          aria-hidden="true"
        >
          <div
            ref={caption1Ref}
            className="absolute font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-center bg-gradient-to-r from-blue-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent opacity-0 drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]"
          >
            LLMs & RAG
          </div>
          <div
            ref={caption2Ref}
            className="absolute font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-center bg-gradient-to-r from-violet-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent opacity-0 drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]"
          >
            Computer Vision
          </div>
          <div
            ref={caption3Ref}
            className="absolute font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-center bg-gradient-to-r from-cyan-400 via-blue-300 to-violet-300 bg-clip-text text-transparent opacity-0 drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]"
          >
            Production AI
          </div>
        </div>

        {/* Top Bar / Social Links */}
        <div className="relative z-20 w-full pt-20 px-6 sm:px-12 flex justify-end">
          <div
            ref={socialsRef}
            className="flex flex-col items-end gap-2.5 text-xs text-neutral-400 font-medium"
          >
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline underline-offset-4">LinkedIn</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <Github className="w-3.5 h-3.5 text-neutral-200 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline underline-offset-4">GitHub</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline underline-offset-4">{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Main Content (Title, Tagline, Scroll Indicator) */}
        <div
          ref={mainContentRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          {/* Bottom Left: Huge Title + Eyebrow */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              {profile.name}
            </div>
            <h1 className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-white select-none">
              <span ref={titlePart1Ref} className="block">
                AI
              </span>
              <span
                ref={titlePart2Ref}
                className="block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent"
              >
                Engineer
              </span>
            </h1>
          </div>

          {/* Bottom Right: Tagline + Scroll Indicator */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-md gap-6">
            <p
              ref={taglineRef}
              className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed"
            >
              {profile.tagline}
            </p>

            <div
              ref={indicatorRef}
              className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-400 font-medium"
            >
              <span className="hidden sm:inline">Scroll to explore</span>
              <div className="p-2 rounded-full border border-white/15 bg-white/5 animate-float-y">
                <ArrowDown className="w-4 h-4 text-cyan-400 hidden md:block" />
                <Mouse className="w-4 h-4 text-cyan-400 md:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
