import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatCard({ value, label }) {
  const cardRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.textContent = value;
      return;
    }

    // Parse prefix, number, and suffix (e.g. "~90%", "8.76", "3")
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimals = isDecimal ? match[2].split('.')[1].length : 0;

    const obj = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetNum,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              const formatted = isDecimal
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toString();
              el.textContent = `${prefix}${formatted}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [value]);

  return (
    <div
      ref={cardRef}
      className="bento-card col-span-1 sm:col-span-1 lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-baseline gap-1">
        <span
          ref={numRef}
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-blue-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent tracking-tight"
        >
          {value}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-3 leading-snug">
        {label}
      </p>
    </div>
  );
}
