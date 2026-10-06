import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { certificates } from '../../data/portfolio';

export default function CertificatesCard() {
  return (
    <div className="bento-card lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-lg text-white">Certifications</h4>
          <p className="text-xs text-neutral-400">Verified credentials</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
              {cert}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
