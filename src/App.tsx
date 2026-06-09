/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Terminal, ShieldCheck, Mail, ArrowUpRight, Cpu,
  GitCommit, ChevronRight, Menu, X, ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Sub-components
import NetworkBackground from './components/NetworkBackground';
import InfiniteMarquee from './components/InfiniteMarquee';
import ServiceCard from './components/ServiceCard';
import PortfolioGrid from './components/PortfolioGrid';
import ProcessStepper from './components/ProcessStepper';
import ComparisonTable from './components/ComparisonTable';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import BookingModal from './components/BookingModal';

// Animated CountUp metric observer
function CountUp({ value, duration = 1.0 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (end === 0) return;
    const increment = Math.ceil(end / 25);
    const stepTime = 30; // ms

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split string word-by-word for hero animate-in
  const heroHeading = "We ship production-grade programs for Logos.";
  const heroWords = heroHeading.split(" ");

  const servicesData = [
    {
      id: 'confidential',
      title: 'Confidential compute & private state',
      description: 'Confidential sBPF programs and private-PDA primitives. We design state that stays private on-chain without breaking composability.'
    },
    {
      id: 'zkvm',
      title: 'zkVM execution & proving',
      description: 'RISC Zero zkVM execution, Groth16 proving pipelines, and proving-service infrastructure. We handle the encoding invariants (BN254 G1, image-id layout) that quietly break everyone else.'
    },
    {
      id: 'onchain',
      title: 'On-chain verification',
      description: 'Solana program development, verifier routers, and proof verification on-chain. Audit-minded, test-covered, mainnet-ready.'
    },
    {
      id: 'rfp',
      title: 'RFP & grant delivery',
      description: 'We take RFPs from spec to shipped: scoped milestones, clear rationale, code-backed execution, and documentation that survives review.'
    },
    {
      id: 'retainer',
      title: 'Protocol engineering on retainer',
      description: 'Embedded senior engineering for protocol teams - Rust, Anchor, sBPF - as if we were in-house, without the headcount.'
    },
    {
      id: 'architecture',
      title: 'Architecture & review',
      description: 'Design reviews, authority/permission models, and correctness audits before you commit to a path.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-dark-bg selection:bg-brand selection:text-white">
      {/* 1. Background Visual Overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      {/* 2. Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/85 backdrop-blur-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="p-1 rounded-sm bg-brand/10 border border-brand/20 group-hover:border-brand/40 group-hover:bg-brand/20 transition-all duration-300">
              <ShieldCheck className="w-5 h-5 text-brand" />
            </div>
            <span className="font-display font-bold text-white tracking-tight text-lg group-hover:text-brand transition-colors">
              Evice<span className="text-brand font-mono font-normal">Labs</span>
            </span>
          </div>

          {/* Desktop link Navs */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs text-gray-400">
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              // About
            </button>
            <button
              id="nav-link-capabilities"
              onClick={() => scrollToSection('capabilities')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              // Capabilities
            </button>
            <button
              id="nav-link-work"
              onClick={() => scrollToSection('work')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              // Selected Work
            </button>
            <button
              id="nav-link-process"
              onClick={() => scrollToSection('process')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              // Process
            </button>
            <button
              id="nav-link-team"
              onClick={() => scrollToSection('team')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              // Team
            </button>
            <Link
              to="/founding-team"
              onClick={() => setMobMenuOpen(false)}
              className="block w-full text-left py-2 text-brand hover:text-white border-b border-dark-border/40 pb-1"
            >
  // Join Foundation
            </Link>
          </nav>

          {/* CTA Book Call Button (desktop) */}
          <div className="hidden md:block">
            <button
              id="cta-nav-book"
              onClick={() => setIsBookingOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-brand/50 hover:bg-brand/5 text-[11px] font-mono font-medium text-white shadow-xs transition-all duration-350 active:scale-[0.98]"
            >
              Book a call
            </button>
          </div>

          {/* Toggle Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobMenuOpen(!mobMenuOpen)}
            className="p-1.5 rounded-md border border-dark-border/80 text-gray-400 hover:text-white hover:bg-dark-border md:hidden"
            title="Toggle Menu"
          >
            {mobMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile slide-down menu */}
        {mobMenuOpen && (
          <div className="md:hidden border-t border-dark-border bg-dark-bg/95 p-4 space-y-3 font-mono text-xs text-gray-400">
            <button
              id="mob-link-about"
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 hover:text-white border-b border-dark-border/40 pb-1"
            >
              // About
            </button>
            <button
              id="mob-link-capabilities"
              onClick={() => scrollToSection('capabilities')}
              className="block w-full text-left py-2 hover:text-white border-b border-dark-border/40 pb-1"
            >
              // Capabilities
            </button>
            <button
              id="mob-link-work"
              onClick={() => scrollToSection('work')}
              className="block w-full text-left py-2 hover:text-white border-b border-dark-border/40 pb-1"
            >
              // Selected Work
            </button>
            <button
              id="mob-link-process"
              onClick={() => scrollToSection('process')}
              className="block w-full text-left py-2 hover:text-white border-b border-dark-border/40 pb-1"
            >
              // Process
            </button>
            <button
              id="mob-link-team"
              onClick={() => scrollToSection('team')}
              className="block w-full text-left py-2 hover:text-white border-b border-dark-border/40 pb-1"
            >
              // Team
            </button>
            <button
              id="mob-cta-book"
              onClick={() => {
                setMobMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full text-center mt-2 py-2.5 rounded-lg bg-brand text-white font-mono font-medium"
            >
              Book a call
            </button>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Word-by-word reveal, interactive dynamic background) */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden py-16 md:py-24 border-b border-dark-border select-none">
        <NetworkBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-2 bg-brand/5 border border-brand/20 px-3 py-1 rounded-full text-brand text-[10px] uppercase font-mono tracking-widest shadow-xl shadow-brand/5">
            <Terminal className="w-3.5 h-3.5" />
            <span>// Logos-native engineering</span>
          </div>

          {/* Staggered word reveal container */}
          <h1 className="mt-6 text-4xl sm:text-6xl font-display font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.05]">
            {heroWords.map((word, i) => (
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                key={i}
                className="inline-block mr-2 md:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A two-person studio building confidential compute, zkVM execution, and on-chain verification across the Logos stac - from RFP spec to testnet, no handoffs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-cta-primary"
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-brand hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Build with us
            </button>
            <button
              id="hero-cta-secondary"
              onClick={() => scrollToSection('work')}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-dark-bg border border-dark-border hover:border-brand/40 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              See our work
            </button>
          </div>

          {/* Status Indicator */}
          <div className="mt-8 inline-flex items-center space-x-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span>Currently taking 1 new engagement</span>
          </div>

          {/* Arrow Scroller Down */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:block animate-bounce text-gray-600">
            <ArrowDown className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </section>

      {/* 4. Ecosystem Marquee Strip */}
      <section className="relative bg-[#08080A]">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-2">
            <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest">
              // Building in and around
            </span>
          </div>
        </div>
        <InfiniteMarquee />
      </section>

      {/* 5. About + Stats Section */}
      <section id="about" className="py-20 md:py-28 border-b border-dark-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* About Text */}
          <div className="lg:col-span-3 space-y-5">
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest block font-medium">
              // Who we are
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              We don't dabble in Logos. We live in it.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans mt-3">
              We're independent engineers who've spent our time deep in the Logos Execution Zone - confidential programs, zero-knowledge proving, and on-chain verification. We've shipped winning λPrize submissions and drafted RFP proposals end to end. Now we build as one team, so protocol teams get senior delivery without the agency overhead.
            </p>
          </div>

          {/* Stats Display Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { id: 'prize', val: 3, label: 'λPrize submissions delivered' },
              { id: 'rfp', val: 5, label: 'RFP proposals authored' },
              { id: 'logos', val: 100, suffix: '%', label: 'Logos-native focus' },
              { id: 'deployed', val: 14, label: 'programs to testnet' }
            ].map((stat) => (
              <div
                key={stat.id}
                className="p-5 rounded-xl border border-dark-border bg-dark-card flex flex-col justify-between hover:border-brand/40 transition-colors duration-300"
              >
                <span className="text-3xl sm:text-4xl font-display font-black text-brand tracking-tight">
                  <CountUp value={stat.val} />{stat.suffix || ''}
                </span>
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider mt-2.5 leading-normal block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Services (What we build) */}
      <section id="capabilities" className="py-20 md:py-28 border-b border-dark-border bg-[#08080A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest font-medium">
              // Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
              End-to-end Logos development.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Portfolio Track Record (Work) */}
      <section id="work" className="py-20 md:py-28 border-b border-dark-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono text-brand uppercase tracking-widest font-medium">
            // Selected work
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
            Shipped, reviewed, merged.
          </h2>
        </div>

        <PortfolioGrid />
      </section>

      {/* 8. Process (How we work timeline) */}
      <section id="process" className="py-20 md:py-28 border-b border-dark-border bg-[#08080A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest font-medium">
              // Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
              Decisions with rationale. Execution backed by code.
            </h2>
          </div>

          <ProcessStepper />

        </div>
      </section>

      {/* 9. Comparison table (Why us) */}
      <section className="py-20 md:py-28 border-b border-dark-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Why teams pick a Logos-native studio.
          </h2>
        </div>

        <ComparisonTable />
      </section>

      {/* 10. The Founders Team */}
      <section id="team" className="py-20 md:py-28 border-b border-dark-border bg-[#08080A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest font-medium">
              // The team
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
              Two builders. One team.
            </h2>
          </div>

          <TeamSection />

        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="py-20 md:py-28 border-b border-dark-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <FAQSection />
      </section>

      {/* 12. Final CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-dark-border text-center">
        {/* Subtle dot backdrop constraint */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
            Logos won't wait. Neither do we.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
            Tell us what you're building. We'll tell you how we'd ship it.
          </p>

          <div className="pt-4">
            <button
              id="cta-bottom-project"
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-3.5 rounded-lg bg-brand hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 font-mono text-xs uppercase tracking-widest text-white shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Start a project
            </button>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-[#050507] text-gray-500 font-sans select-none border-t border-dark-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo brand */}
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-sm bg-brand/10 border border-brand/20">
              <ShieldCheck className="w-4 h-4 text-brand" />
            </div>
            <span className="font-display font-bold text-white text-base tracking-tight">
              Evice<span className="text-brand font-mono font-normal">Labs</span>
            </span>
          </div>

          {/* Core coordinate anchors */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-gray-400">
            <a
              href="https://github.com/Evice-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-gray-500" />
            </a>
            <a
              href="https://x.com/Evice_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>X / Twitter</span>
              <ArrowUpRight className="w-3 h-3 text-gray-500" />
            </a>
            <a
              href="mailto:hello@Evice.dev"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>Email</span>
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copy statement */}
          <div className="text-xs font-mono text-gray-600">
            © 2026 Evice Labs &middot; SECURE SYSTEM L1S
          </div>

        </div>
      </footer>

      {/* 14. Interactive Dynamic Booking Console */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
