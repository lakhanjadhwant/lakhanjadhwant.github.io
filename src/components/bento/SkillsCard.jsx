import React from 'react';
import { Cpu } from 'lucide-react';
import { skills } from '../../data/portfolio';

export default function SkillsCard() {
  return (
    <div className="bento-card lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-blue-500/10 hover:border-white/20 transition-all duration-300">
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xl text-white">Technical Arsenal</h4>
            <p className="text-xs text-neutral-400">Core competencies & toolchains</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="text-neutral-400 font-semibold min-w-[140px] shrink-0 pt-1">
                {category}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-200 text-xs font-medium hover:border-cyan-400/50 hover:bg-white/10 hover:-translate-y-0.5 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
