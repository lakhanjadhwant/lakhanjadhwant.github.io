import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Layers, ScanFace, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolio';

// Decorative Abstract Graphic for RAG Pipeline
function RagVisual() {
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950/40 via-surface-subtle to-violet-950/40 border border-white/10 flex items-center justify-center p-4 group-hover:border-blue-500/30 transition-all duration-500">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />
      <svg className="w-full h-full max-h-36" viewBox="0 0 400 160" fill="none">
        <defs>
          <linearGradient id="ragLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Document Nodes */}
        <rect x="30" y="35" width="60" height="85" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="45" y1="55" x2="75" y2="55" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="45" y1="70" x2="70" y2="70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="45" y1="85" x2="65" y2="85" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <text x="60" y="105" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">DOCS</text>

        {/* Vector DB Node */}
        <circle cx="200" cy="77" r="38" fill="#130e2a" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="200" cy="77" r="24" fill="#1e153e" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
        <text x="200" y="80" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold" fontFamily="monospace">PINECONE</text>

        {/* LLM Synthesis Output Node */}
        <rect x="310" y="35" width="60" height="85" rx="8" fill="#082f49" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="340" cy="65" r="14" fill="#0e7490" />
        <path d="M336 65l3 3 6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="340" y="105" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">GROQ LLM</text>

        {/* Connecting Synapse Lines */}
        <path d="M90 77 C 130 77, 140 77, 162 77" stroke="url(#ragLineGrad)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        <path d="M238 77 C 270 77, 280 77, 310 77" stroke="url(#ragLineGrad)" strokeWidth="2" />
      </svg>
    </div>
  );
}

// Decorative Abstract Graphic for Face Recognition Attendance
function FaceVisionVisual() {
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-950/40 via-surface-subtle to-cyan-950/40 border border-white/10 flex items-center justify-center p-4 group-hover:border-violet-500/30 transition-all duration-500">
      <div className="absolute inset-0 bg-dot-grid opacity-15" />
      <svg className="w-full h-full max-h-36" viewBox="0 0 400 160" fill="none">
        <defs>
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {/* Face Detection Reticle Frame */}
        <rect x="50" y="30" width="90" height="100" rx="12" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="95" cy="70" r="22" stroke="#a78bfa" strokeWidth="1.5" />
        <path d="M85 96 C 88 106, 102 106, 105 96" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        <text x="95" y="122" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">RetinaFace</text>

        {/* 512D Feature Vector Box */}
        <rect x="180" y="52" width="75" height="56" rx="6" fill="#1e1035" stroke="#ec4899" strokeWidth="1.2" />
        <text x="217" y="74" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold" fontFamily="monospace">FaceNet512</text>
        <text x="217" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Embeddings</text>

        {/* Realtime Attendance Sheet Sync */}
        <rect x="295" y="38" width="65" height="84" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
        <path d="M312 62h30M312 74h30M312 86h20" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" />
        <text x="327" y="108" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontFamily="monospace">GCP Sheets</text>

        {/* Flow Connectors */}
        <path d="M140 80 L 180 80" stroke="url(#faceGrad)" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M255 80 L 295 80" stroke="url(#faceGrad)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto"
      aria-label="Featured Projects"
    >
      {/* Section Header */}
      <div className="mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>03 &bull; Showcase</span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Featured Projects
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md">
          Production-grade systems incorporating modern vector search, high-throughput LLM serving, and deep neural vision.
        </p>
      </div>

      {/* 2 Side-by-side Large Glass Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
          >
            <div>
              {/* Abstract Visual per card */}
              <div className="mb-6">
                {idx === 0 ? <RagVisual /> : <FaceVisionVisual />}
              </div>

              {/* Title & Summary */}
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                {proj.title}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                {proj.summary}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mb-6">
                {proj.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Tech Tag Chips */}
              <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-white/5">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Only show button if URL is non-empty */}
              <div className="flex flex-wrap items-center gap-3">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all active:scale-95"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}

                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-md shadow-blue-500/25 transition-all active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
