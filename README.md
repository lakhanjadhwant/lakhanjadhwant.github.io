# Lakhan Jadhwant - AI Engineer Portfolio

A production-ready portfolio website featuring a fullscreen scroll-driven generative neural-network Hero canvas, Bento Grid "About" section, scrubbed Experience timeline, Projects showcase, and contact form. Built for fast static deployment on **GitHub Pages**.

---

## 🚀 Features

- **Generative Neural Network Hero**: Fullscreen 300vh scroll-space driven by GSAP ScrollTrigger and native HTML5 Canvas. Fully procedural (zero video/media files required).
- **Bento Grid About**: 12-column responsive layout showcasing personal summary, interactive GSAP count-up metrics, infinite tech marquee, categorized skill chips, education, and credentials.
- **Scrubbed Experience Timeline**: Left-aligned glowing vertical timeline that draws dynamically as you scroll.
- **Interactive Projects Showcase**: Custom SVG flow diagrams representing RAG retrieval and Computer Vision inference pipelines.
- **Glassmorphism Aesthetic**: Deep obsidian `#050505` backdrop with subtle blue/violet/cyan glowing accents and film-grain dot grids.
- **Smooth Scrolling**: Lenis smooth scroll synchronized seamlessly with GSAP ScrollTrigger.
- **Static GitHub Pages Deployment**: Fully configured with GitHub Actions workflow and base relative routing.
- **Accessible & Responsive**: Optimized for 375px mobile through 4K displays, with reduced motion support.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3.4 + PostCSS
- **Animations**: GSAP 3 + ScrollTrigger, Framer Motion
- **Smooth Scroll**: Lenis (`lenis`)
- **Icons**: Lucide React & Devicon CDN

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development
```bash
npm run dev
```
The dev server will launch at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
The output static bundle will be generated in `dist/`.

---

## 📝 Customizing Personal Data & Assets

### Edit Personal Information
All personal details, experiences, projects, skills, education, and contacts are centralized in **one single file**:
```
src/data/portfolio.js
```
Edit this file to update any text or metrics across the site without touching component code.

### Replace Static Assets
All assets are located in the `public/` directory:
- `public/profile.webp` — Profile headshot (falls back gracefully to initials "LJ" if missing).
- `public/Lakhan_Jadhwant_Resume.pdf` — Resume downloaded via the "Resume" buttons.
- `public/favicon.svg` — Browser tab icon.
- `public/og-image.webp` — Open Graph social sharing preview.

---

## 📬 Contact Form Configuration (Web3Forms)

The contact form is powered by [Web3Forms](https://web3forms.com) (static form backend with zero server needed):

1. Get a free access key at [web3forms.com](https://web3forms.com).
2. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Add your key:
   ```env
   VITE_WEB3FORMS_KEY=your_actual_access_key_here
   ```
4. **Fallback Behavior**: If `VITE_WEB3FORMS_KEY` is not provided or empty, the contact form automatically falls back to opening the visitor's email client with prefilled recipient, subject, and message.

---

## 🌐 Deploying to GitHub Pages

### Method A: Automated GitHub Actions (Recommended)
This repository includes `.github/workflows/deploy.yml`.

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Build portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. (Optional) To receive Web3Forms submissions in production, add `VITE_WEB3FORMS_KEY` under **Settings > Secrets and variables > Actions**.
4. Any push to `main` will automatically build and publish your site!

### Method B: Manual Deploy via gh-pages
Run:
```bash
npm run deploy
```
This script will build the site and deploy the `dist/` folder to the `gh-pages` branch.

---

## 📄 License
MIT © 2026 Lakhan Jadhwant
