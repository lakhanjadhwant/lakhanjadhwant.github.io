import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Copy, Check, Send, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionMode, setSubmissionMode] = useState('web3forms'); // 'web3forms' | 'mailto'
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');
  const [submitError, setSubmitError] = useState('');

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    // Fallback to mailto if API key is not configured yet
    if (!accessKey || accessKey.trim() === '' || accessKey === 'your_web3forms_access_key_here') {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `${formData.message}\n\nSender: ${formData.name}\nEmail: ${formData.email}`
      );
      const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setLastMailtoUrl(mailtoUrl);
      setSubmissionMode('mailto');
      setIsSubmitting(false);
      setIsSuccess(true);
      window.location.href = mailtoUrl;
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionMode('web3forms');
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError(data.message || 'Unable to submit through Web3Forms.');
      }
    } catch (err) {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(formData.message);
      const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setLastMailtoUrl(mailtoUrl);
      setSubmissionMode('mailto');
      setIsSuccess(true);
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto"
      aria-label="Contact Section"
    >
      {/* Section Header */}
      <div className="mb-16 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-blue-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>04 &bull; Connection</span>
        </div>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight max-w-3xl leading-tight">
          Let&apos;s build something <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">intelligent</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Email Row with Copy Button */}
            <div className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 min-w-0"
              >
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-neutral-400 block font-medium">Email</span>
                  <span className="text-sm sm:text-base font-medium text-white truncate block group-hover:text-cyan-300 transition-colors">
                    {profile.email}
                  </span>
                </div>
              </a>

              <button
                onClick={copyEmail}
                type="button"
                className="ml-2 p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white transition-all shrink-0 active:scale-90"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Copied!</span>
                  </div>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Row */}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="group flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Phone</span>
                <span className="text-sm sm:text-base font-medium text-white group-hover:text-violet-300 transition-colors">
                  {profile.phone}
                </span>
              </div>
            </a>

            {/* Location Row */}
            <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Location</span>
                <span className="text-sm sm:text-base font-medium text-white">
                  {profile.location}
                </span>
              </div>
            </div>

            {/* LinkedIn Row */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-medium">LinkedIn</span>
                <span className="text-sm sm:text-base font-medium text-white group-hover:text-blue-300 transition-colors">
                  lakhanjadhwant
                </span>
              </div>
            </a>

            {/* GitHub Row */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-neutral-300/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="p-2.5 rounded-xl bg-neutral-600/10 border border-neutral-600/20 text-neutral-200 shrink-0 group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block font-medium">GitHub</span>
                <span className="text-sm sm:text-base font-medium text-white group-hover:text-neutral-200 transition-colors">
                  lakhanjadhwant
                </span>
              </div>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 font-light leading-relaxed">
            Actively looking for AI Engineer & Machine Learning opportunities. Fast response via email and LinkedIn.
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="py-10 flex flex-col items-center text-center space-y-4"
              >
                {submissionMode === 'web3forms' ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-white">Message Dispatched!</h3>
                    <p className="text-sm text-neutral-300 max-w-md">
                      Thank you for reaching out. Your message has been sent directly to my inbox and I will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
                    >
                      Send another message
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Mail className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-white">Email Draft Created</h3>
                    <p className="text-sm text-neutral-300 max-w-md leading-relaxed">
                      Your message was pre-filled in your device&apos;s default email app. Please ensure you click <strong className="text-white font-semibold">Send</strong> in your mail app, or send directly to <a href={`mailto:${profile.email}`} className="text-cyan-400 underline">{profile.email}</a>.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      {lastMailtoUrl && (
                        <a
                          href={lastMailtoUrl}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-md shadow-blue-500/25 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open Mail App Again</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
                      >
                        Edit Message
                      </button>
                    </div>
                    <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400 max-w-md text-left">
                      <span className="text-amber-300 font-medium block mb-1">💡 For automatic delivery to your inbox:</span>
                      Add your free Web3Forms Access Key to your <code className="text-neutral-200 bg-white/10 px-1 py-0.5 rounded">.env</code> file (<code className="text-cyan-300">VITE_WEB3FORMS_KEY</code>) to receive messages directly without needing an email app.
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                noValidate
              >
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  Send a Direct Message
                </h3>

                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {submitError}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-blue-400 focus:bg-white/[0.07] text-white text-sm outline-none transition-all placeholder:text-neutral-500"
                  />
                  {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-blue-400 focus:bg-white/[0.07] text-white text-sm outline-none transition-all placeholder:text-neutral-500"
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-blue-400 focus:bg-white/[0.07] text-white text-sm outline-none transition-all placeholder:text-neutral-500 resize-none"
                  />
                  {errors.message && <p className="text-rose-400 text-xs mt-1.5">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
