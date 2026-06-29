/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Terminal, ShieldCheck, Mail, ArrowUpRight, Cpu,
  GitCommit, ChevronRight, Menu, X, ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Sub-components
import NetworkBackground from './components/NetworkBackground';
import PortfolioGrid from './components/PortfolioGrid';
import TeamSection from './components/TeamSection';
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

/* Section eyebrow label */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-mono text-black uppercase tracking-widest font-medium block">
      {children}
    </span>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'capabilities', 'work', 'team'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on typical header height and desired trigger point
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="relative min-h-screen bg-dark-bg selection:bg-brand selection:text-black">
      {/* 1. Background Visual Overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      {/* 2. Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto w-full border-x border-b border-dark-border bg-black px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between select-none">

        {/* Logo brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group"
        >
          <img
            src={`${import.meta.env.BASE_URL}EviceLogo.png`}
            alt="Evice Labs Logo"
            className="h-6 w-auto invert transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Desktop link Navs */}
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs">
          {[
            { id: 'about', label: 'About' },
            { id: 'capabilities', label: 'Capabilities' },
            { id: 'work', label: 'Selected Work' },
            { id: 'team', label: 'Team' },
          ].map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => scrollToSection(link.id)}
              className={`group relative flex items-center space-x-1 transition-colors cursor-pointer pb-1 ${activeSection === link.id ? 'text-gray-400' : 'text-white hover:text-gray-400'
                } after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gray-400 after:transition-transform after:duration-200 after:origin-left after:scale-x-0 group-hover:after:scale-x-100`}
            >
              <ArrowUpRight className="w-3 h-3" />
              <span>{link.label}</span>
            </button>
          ))}
          <Link
            to="/founding-team"
            onClick={() => setMobMenuOpen(false)}
            className="group relative flex items-center space-x-1 transition-colors cursor-pointer pb-1 text-white hover:text-gray-400 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gray-400 after:transition-transform after:duration-200 after:origin-left after:scale-x-0 group-hover:after:scale-x-100"
          >
            <ArrowUpRight className="w-3 h-3" />
            <span>Join Foundation</span>
          </Link>
        </nav>

        {/* CTA Book Call Button (desktop) */}
        <div className="hidden md:block">
          <button
            id="cta-nav-book"
            onClick={() => setIsBookingOpen(true)}
            className="px-4 py-1.5 bg-white border border-transparent hover:bg-gray-200 text-[11px] font-mono font-medium text-black shadow-xs transition-all duration-200 active:scale-[0.98]"
          >
            Book a call
          </button>
        </div>

        {/* Toggle Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobMenuOpen(!mobMenuOpen)}
          className="p-1.5 border border-white/20 text-white hover:bg-white/10 md:hidden transition-colors rounded"
          title="Toggle Menu"
        >
          {mobMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile slide-down menu */}
        {mobMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 p-4 space-y-3 font-mono text-xs">
            {[
              { id: 'about', label: 'About' },
              { id: 'capabilities', label: 'Capabilities' },
              { id: 'work', label: 'Selected Work' },
              { id: 'team', label: 'Team' },
            ].map((link) => (
              <button
                key={link.id}
                id={`mob-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center space-x-2 w-full text-left py-2 border-b border-white/10 pb-1 ${activeSection === link.id ? 'text-gray-400' : 'text-white hover:text-gray-400'
                  }`}
              >
                <ArrowUpRight className="w-3 h-3" />
                <span>{link.label}</span>
              </button>
            ))}
            <Link
              to="/founding-team"
              onClick={() => setMobMenuOpen(false)}
              className="flex items-center space-x-2 w-full text-left py-2 text-white hover:text-gray-400 border-b border-white/10 pb-1"
            >
              <ArrowUpRight className="w-3 h-3" />
              <span>Join Foundation</span>
            </Link>
            <button
              id="mob-cta-book"
              onClick={() => {
                setMobMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full text-center mt-2 py-2.5 bg-white text-black hover:bg-gray-200 transition-colors font-mono font-medium rounded-sm"
            >
              Book a call
            </button>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="w-full border-b border-dark-border select-none bg-blue-100">
        <div className="relative min-h-[82vh] flex flex-col items-center justify-center overflow-hidden z-10 max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          {/* Scroll Down & Status Group */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
            {/* Arrow Scroller Down */}
            <div className="hidden lg:block animate-bounce text-black">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-brand-green"></span>
              </span>
              <span>Currently taking 1 new engagement</span>
            </div>
          </div>
          <NetworkBackground />
          <div className="relative z-10 w-full">

            {/* Eyebrow Label */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 -full text-[10px] uppercase font-mono tracking-widest shadow-xl shadow-brand/5">
              <Terminal className="w-3.5 h-3.5" />
              <span>// Logos-native engineering</span>
            </div>

            {/* Staggered word reveal container */}
            <h1 className="mt-6 text-4xl sm:text-6xl font-display font-black tracking-tight text-black max-w-3xl mx-auto leading-[1.05]">
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

            <p className="mt-6 text-base sm:text-lg text-black max-w-2xl mx-auto leading-relaxed">
              An open collective of builders shipping confidential compute, zkVM execution, and on-chain verification across the Logos stack - from RFP spec to testnet.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/founding-team"
                onClick={() => setMobMenuOpen(false)}
                className="w-full sm:w-auto px-7 py-3 bg-brand text-black font-mono text-xs uppercase tracking-wider shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Build with us
              </Link>
              <button
                id="hero-cta-secondary"
                onClick={() => scrollToSection('work')}
                className="w-full sm:w-auto px-7 py-3 -lg bg-white border border-black text-black font-mono text-xs uppercase tracking-wider shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                See our work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ecosystem Marquee Strip
      <section className="relative bg-[#F9F6EE]">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-2">
            <span className="text-[10px] font-mono uppercase text-black tracking-widest">
              // Building in and around
            </span>
          </div>
        </div>
        <InfiniteMarquee />
      </section> */}

      {/* 5. About + Stats Section */}
      <section id="about" className="w-full border-b border-dark-border bg-orange-100">
        <div className="max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* About Text */}
            <div className="lg:col-span-3 space-y-5">
              <Eyebrow>// Who are we</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black tracking-tight">
                We don't dabble in Logos. We live in it.
              </h2>
              <p className="text-sm sm:text-base text-black leading-relaxed font-sans mt-3">
                We're independent engineers who've spent our time deep in the Logos Execution Zone - confidential programs, zero-knowledge proving, and on-chain verification. We've shipped winning λPrize submissions and drafted RFP proposals end to end. Now we build as one team, so protocol teams get senior delivery without the agency overhead.
              </p>
            </div>

            {/* Stats Display Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {[
                { id: 'prize', val: 3, label: 'λPrize submissions delivered' },
                { id: 'rfp', val: 3, label: 'RFP proposals authored' },
                { id: 'logos', val: 100, suffix: '%', label: 'Logos-native focus' },
                { id: 'deployed', val: '~', label: 'programs to testnet' }
              ].map((stat) => (
                <div
                  key={stat.id}
                  className="p-5 -xl border border-dark-border bg-dark-card flex flex-col justify-between hover:border-gray-400 transition-colors duration-200"
                >
                  <span className="text-3xl sm:text-4xl font-display font-black text-brand tracking-tight">
                    <CountUp value={stat.val} />{stat.suffix || ''}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-black tracking-wider mt-2.5 leading-normal block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. Services (What we build) */}
      <section id="capabilities" className="w-full border-b border-dark-border bg-purple-100">
        <div className="max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-20 md:py-28">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>// Capabilities</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black mt-3 tracking-tight">
              End-to-end Logos development.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <div key={service.id} className="group p-6 border border-dark-border bg-dark-card hover:border-gray-400 transition-colors">
                <h3 className="text-xl font-display font-bold text-black tracking-tight mb-3 group-hover:text-brand transition-colors duration-250">
                  {service.title}
                </h3>
                <p className="text-sm text-black leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Portfolio Track Record (Work) */}
      <section id="work" className="w-full border-b border-dark-border bg-green-100">
        <div className="max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>// Selected work</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black mt-3 tracking-tight">
              Shipped, reviewed, merged.
            </h2>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      {/* 9. Comparison table (Why us)
      <section className="py-20 md:py-28 border-b border-dark-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black tracking-tight">
            Why teams pick a Logos-native studio.
          </h2>
        </div>

        <ComparisonTable />
      </section> */}

      {/* 10. The Founders Team */}
      <section id="team" className="w-full border-b border-dark-border bg-pink-100">
        <div className="max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-20 md:py-28">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>// The team</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-black mt-3 tracking-tight">
              Expert builders. One unified team.
            </h2>
          </div>
          <TeamSection />
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="relative w-full overflow-hidden text-center bg-yellow-100">
        <div className="relative z-10 max-w-7xl mx-auto border-x border-dark-border bg-[#F9F6EE] px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center">
          {/* Subtle dot backdrop constraint */}
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

          <div className="w-full max-w-3xl space-y-6">
            <h2 className="text-4xl sm:text-5xl font-display font-black text-black tracking-tight leading-none">
              Logos won't wait. Neither do we.
            </h2>
            <p className="text-sm sm:text-base text-black max-w-md mx-auto leading-relaxed">
              Tell us what you're building. We'll tell you how we'd ship it.
            </p>

            <div className="pt-4">
              <button
                id="cta-bottom-project"
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-3.5 -lg bg-brand font-mono text-xs uppercase tracking-widest text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Start a project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="w-full bg-yellow-100 text-black font-sans select-none ">
        <div className="max-w-7xl mx-auto border-x border-dark-border bg-black px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer group"
          >
            <img
              src={`${import.meta.env.BASE_URL}EviceLogo.png`}
              alt="Evice Labs Logo"
              className="h-6 w-auto invert transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Core coordinate anchors */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-gray-400">
            <a
              href="https://github.com/evice-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors flex items-center space-x-1"
            >
              <span>X / Twitter</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400 transition-colors flex items-center space-x-1"
            >
              <span>Email</span>
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copy statement */}
          <div className="text-xs font-mono text-white">
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
