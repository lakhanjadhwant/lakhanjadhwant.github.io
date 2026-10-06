import React from 'react';
import { GraduationCap } from 'lucide-react';
import { education } from '../../data/portfolio';

export default function EducationCard() {
  return (
    <div className="bento-card lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-violet-500/10 hover:border-white/20 transition-all duration-300">
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xl text-white">Education</h4>
            <p className="text-xs text-neutral-400">Academic background</p>
          </div>
        </div>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-violet-500 before:to-transparent">
          {education.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#09090b] shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover:scale-125 transition-transform" />

              <div className="flex items-start justify-between gap-2">
                <h5 className="font-heading font-semibold text-sm sm:text-base text-white leading-snug">
                  {item.degree}
                </h5>
                <span className="shrink-0 text-xs px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-bold">
                  {item.score}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">{item.school}</p>
              <span className="text-xs text-neutral-400 font-mono block mt-0.5">{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
