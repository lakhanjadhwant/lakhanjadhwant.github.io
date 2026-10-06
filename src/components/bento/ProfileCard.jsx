import React, { useState } from 'react';
import { profile } from '../../data/portfolio';

export default function ProfileCard() {
  const [imageError, setImageError] = useState(false);
  const photoUrl = `${import.meta.env.BASE_URL}profile.webp`;

  return (
    <div className="bento-card lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative min-h-[340px] sm:min-h-[400px] flex items-end group shadow-lg hover:shadow-violet-500/10 hover:border-white/20 transition-all duration-300">
      {!imageError ? (
        <img
          src={photoUrl}
          alt={profile.name}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-[25%] contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />
      ) : (
        /* Fallback: gradient card with initials "LJ" */
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-violet-900/40 to-cyan-900/40 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-violet-600 flex items-center justify-center text-4xl font-heading font-extrabold text-white shadow-xl shadow-blue-500/30 mb-4 border border-white/20">
            LJ
          </div>
          <span className="text-xl font-heading font-bold text-white">{profile.name}</span>
          <span className="text-sm text-cyan-400 font-medium">{profile.role}</span>
        </div>
      )}

      {/* Dark overlay & vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 group-hover:opacity-20 transition-opacity pointer-events-none" />

      {/* Hover reveals an extra colored accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Bottom Content Tag */}
      <div className="relative z-10 p-6 sm:p-8 w-full flex items-center justify-between">
        <div>
          <h4 className="font-heading font-bold text-xl text-white">{profile.name}</h4>
          <p className="text-xs text-neutral-300 font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {profile.location} &bull; {profile.role}
          </p>
        </div>
      </div>
    </div>
  );
}
