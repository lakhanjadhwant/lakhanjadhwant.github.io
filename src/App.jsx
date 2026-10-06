import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';

import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/bento/BentoGrid';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger after all webfonts are fully loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Secondary delayed refresh to account for any lazy styles or layout recalculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-white relative">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Persistent Glass Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Section 1: Hero (300vh scroll-space, interactive neural background, scrubbed scaling) */}
        <Hero />

        {/* Section 2: Bento Grid (About Lakhan, Stats, Marquee, Skills, Education, Certs) */}
        <BentoGrid />

        {/* Section 3: Experience (Vertical Timeline with Scrubbed Animated Line) */}
        <Experience />

        {/* Section 4: Projects (Interactive Showcase with SVG Flow Diagrams) */}
        <Projects />

        {/* Section 5: Contact (Direct Channels + Web3Forms / Mailto Form) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
