import React from 'react';

const techItems = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/white' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Streamlit', icon: 'https://cdn.simpleicons.org/streamlit/white' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Pinecone', icon: 'https://cdn.simpleicons.org/pinecone/white' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
];

export default function TechMarquee() {
  return (
    <div className="bento-card lg:col-span-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 overflow-hidden relative shadow-lg hover:border-white/20 transition-all duration-300">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0d] to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-4 py-1">
          {/* Double or triple list for seamless loop */}
          {[...techItems, ...techItems, ...techItems].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all shrink-0 cursor-default"
            >
              <img
                src={item.icon}
                alt=""
                className={`w-4 h-4 object-contain ${item.invert ? 'brightness-200 contrast-200' : ''}`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                loading="lazy"
              />
              <span className="text-xs sm:text-sm font-medium text-neutral-200 tracking-wide">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
