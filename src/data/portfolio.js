export const profile = {
  name: "Lakhan Jadhwant",
  role: "AI Engineer",
  heroTitle: "AI Engineer",
  tagline: "Building LLM, RAG & computer vision systems that work in the real world.",
  email: "lakhanjadhwant@gmail.com",
  phone: "+91 7566966302",
  location: "India",
  linkedin: "https://www.linkedin.com/in/lakhanjadhwant",   // assumption - editable
  github: "https://github.com/lakhanjadhwant",               // assumption - editable
  resumeUrl: "Lakhan_Jadhwant_Resume.pdf",                   // file in /public
  summary: "AI Engineer with hands-on experience building AI/ML and Generative AI applications using Python, LLMs, RAG, LangChain, and FastAPI. Experienced in developing AI-powered solutions for document processing, automation, and real-world applications. Strong foundation in machine learning, software development, and AI automation."
};

export const stats = [
  { value: "8.76", label: "CGPA (Dual Degree)" },
  { value: "3", label: "AI/ML Internships" },
  { value: "~90%", label: "Attendance processing time cut" },
  { value: "~80%", label: "Faster healthcare chatbot responses" }
];

export const experience = [
  {
    company: "Novametrics AI",
    role: "AI Engineer Intern",
    period: "Jan 2026 - Jul 2026",
    points: [
      "Developed a drone-based computer vision segmentation pipeline using SAM 3 to detect 6+ object classes from aerial video footage.",
      "Developed an RF-DETR-based road defect detection system to identify potholes, cracks, patches, and scaling from road imagery, automating defect identification for infrastructure inspection.",
      "Experimented with 3D Gaussian Splatting to reconstruct 3D scenes from Insta360 video footage of interiors, roads, buildings, and buses."
    ],
    tags: ["SAM 3", "RF-DETR", "Computer Vision", "3D Gaussian Splatting"]
  },
  {
    company: "Cornerstone Solutions",
    role: "Data Scientist Intern",
    period: "Nov 2025 - Dec 2025",
    points: [
      "Optimized an ANPR pipeline by integrating RF-DETR for license-plate detection with PaddleOCR for text recognition, improving automated plate-reading reliability.",
      "Worked on developing a windmill inspection system using computer vision for automated fault detection and structural assessment."
    ],
    tags: ["RF-DETR", "PaddleOCR", "ANPR", "Computer Vision"]
  },
  {
    company: "Novel Group",
    role: "AI/ML Intern",
    period: "Jun 2025 - Aug 2025",
    points: [
      "Engineered and trained a RASA chatbot that resolved a majority of healthcare queries, cutting manual workload and improving response speed by ~80%.",
      "Built an AI-powered resume evaluation tool (Streamlit, FastAPI, LangChain, MongoDB) that analyzed resumes, delivered compatibility scores, and provided AI-driven feedback.",
      "Designed and executed an outbound sales pipeline, boosting qualified lead generation by ~70%."
    ],
    tags: ["Rasa", "LangChain", "FastAPI", "Streamlit", "MongoDB"]
  }
];

export const projects = [
  {
    title: "Multi Document RAG Chatbot",
    summary: "Full-stack chatbot that lets users query multiple uploaded documents through context-aware AI responses.",
    points: [
      "Built with FastAPI (backend) and Streamlit (frontend).",
      "LangChain retrieval pipeline with Gemini embeddings and Pinecone vector search to fetch the most relevant document context.",
      "Integrated the Groq LLM API for low-latency, context-aware answers in real-time document Q&A."
    ],
    tags: ["FastAPI", "Streamlit", "LangChain", "Gemini Embeddings", "Pinecone", "Groq"],
    github: "https://github.com/lakhanjadhwant",
    demo: ""   // placeholders, editable
  },
  {
    title: "Face Recognition Attendance System",
    summary: "Streamlit web app that automates classroom attendance using deep learning and GCP.",
    points: [
      "DeepFace with RetinaFace for detection and FaceNet512 embeddings for recognition.",
      "scikit-learn cosine similarity between embeddings for accurate matching.",
      "gspread integration updates Google Sheets in real time for instant attendance reports.",
      "Eliminated manual entry and reduced processing time by ~90%, scalable to large classes."
    ],
    tags: ["DeepFace", "RetinaFace", "FaceNet512", "scikit-learn", "gspread", "GCP", "Streamlit"],
    github: "https://github.com/lakhanjadhwant",
    demo: ""
  }
];

export const skills = {
  "Programming": ["Python", "C++"],
  "Databases": ["MySQL", "MongoDB", "Pinecone", "ChromaDB", "FAISS"],
  "Libraries": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "NLTK", "spaCy", "Scikit-learn", "PyTorch", "TensorFlow"],
  "AI / ML & GenAI": ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "RAG", "LLMs", "Prompt Engineering"],
  "Frameworks & Platforms": ["LangChain", "LangGraph", "FastAPI", "Streamlit", "Rasa", "Dialogflow", "Roboflow", "AI Agents"],
  "Cloud & DevOps": ["Google Cloud", "Docker"],
  "Version Control": ["Git", "GitHub", "Bitbucket"]
};

export const education = [
  {
    degree: "B.Tech + M.Tech (Dual Degree) in AI and Data Science",
    school: "Devi Ahilya Vishwavidyalaya",
    period: "2021 - 2026",
    score: "8.76 CGPA"
  },
  {
    degree: "Higher Secondary",
    school: "School for Excellence",
    period: "2020 - 2021",
    score: "93.8%"
  }
];

export const certificates = [
  "PW - Data Science Master's",
  "Coursera - Data Analytics",
  "Oracle Cloud Infrastructure"
];
