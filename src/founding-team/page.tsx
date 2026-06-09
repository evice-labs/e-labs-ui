/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    ShieldCheck, ArrowUpRight, ArrowLeft, ArrowDown, Check,
    PieChart, Scale, Landmark, Vote, KeyRound, Users, Cpu, Mail,
    ChevronDown
} from 'lucide-react';

import NetworkBackground from '../components/NetworkBackground';


function Reveal({
    children,
    delay = 0,
    className = ''
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* Section eyebrow label (// mono style used across the site) */
function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <span className="text-[10px] font-mono text-brand uppercase tracking-widest font-medium block">
            {children}
        </span>
    );
}

export default function FoundingTeam() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const heroHeading = 'Build Evice Labs with us - as an equal partner.';
    const heroWords = heroHeading.split(' ');

    // The four terms, stated plainly and up front.
    const ownership = [
        {
            icon: PieChart,
            title: 'Equal ownership',
            body: 'Every founding member holds an equal share of Evice Labs. No tiers, no founder-vs-everyone split. The people who build it own it together.'
        },
        {
            icon: Scale,
            title: 'Equal responsibility',
            body: 'Each member is equally responsible for the studio - its work, its reputation, its direction. You are an owner, so you act like one.'
        },
        {
            icon: Landmark,
            title: 'Treasury authority',
            body: 'Founding members are authorised to manage the company treasury, including fund regulation and the distribution of revenue, grants, and prize earnings.'
        },
        {
            icon: Vote,
            title: 'A real voice',
            body: 'Direction, the projects we take, how we grow, and who we bring in next are decided by the founding team as equals.'
        }
    ];

    const expectations = [
        'Ship real work - studio engagements, RFPs, and ecosystem builds, not just ideas.',
        'Share the load - engineering, business development, treasury and governance decisions.',
        'Show up for the team - reviews, decisions, and the hard calls happen together.',
        'Represent Evice - you are a face of the studio in the Logos ecosystem.'
    ];

    const lookingFor = [
        'A track record in Logos / the LEZ - merged LP work, delivered RFP proposals, or shipped contributions.',
        'Depth in the stack - Rust, Anchor, sBPF, zkVM (RISC Zero), Groth16/BN254, on-chain verification.',
        'Self-direction - founders don\u2019t wait to be told what to do.',
        'Ecosystem-first instincts - you care about Logos getting built well, not just shipping for a payout.'
    ];

    const faqs = [
        {
            q: 'Is this a job or a partnership?',
            a: 'A partnership. Founding members join as full co-owners of the company - equal shares, equal say. It is not a contractor role.'
        },
        {
            q: 'How is the treasury managed?',
            a: 'The treasury holds the studio\u2019s revenue, grants, and prize earnings. Funds move through a multisig requiring multiple founding signers, so spending and distribution reflect a real group decision rather than any one person acting alone.'
        },
        {
            q: 'How many founding seats are there?',
            a: 'The founding team is intentionally small. We would rather build with a few of the right people than a crowd of available ones.'
        },
        {
            q: 'What stage is Evice at?',
            a: 'Early - we are setting the foundation now, which is exactly why we want strong people in while the structure is still being shaped. Treat it as upside you help build, not guaranteed income on day one.'
        },
        {
            q: 'Do I keep my own identity and track record?',
            a: 'Yes. You stay an independent builder with your own profile and wins. Evice is a vehicle you build through, and portfolio work is credited to whoever led it.'
        }
    ];

    return (
        <div className="relative min-h-screen bg-dark-bg selection:bg-brand selection:text-white">
            {/* Background overlays - same as home */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

            {/* Sticky nav */}
            <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/85 backdrop-blur-md select-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
                        <div className="p-1 rounded-sm bg-brand/10 border border-brand/20 group-hover:border-brand/40 group-hover:bg-brand/20 transition-all duration-300">
                            <ShieldCheck className="w-5 h-5 text-brand" />
                        </div>
                        <span className="font-display font-bold text-white tracking-tight text-lg group-hover:text-brand transition-colors">
                            Evice<span className="text-brand font-mono font-normal">Labs</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-mono text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to site
                        </Link>
                        <a
                            href="#apply"
                            className="px-4 py-1.5 rounded-lg bg-brand hover:bg-brand/90 text-[11px] font-mono font-medium text-white shadow-xs transition-all duration-300 active:scale-[0.98]"
                        >
                            Apply to join
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden py-16 md:py-24 border-b border-dark-border select-none">
                <NetworkBackground />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-brand/5 border border-brand/20 px-3 py-1 rounded-full text-brand text-[10px] uppercase font-mono tracking-widest shadow-xl shadow-brand/5">
                        <Users className="w-3.5 h-3.5" />
                        <span>// We're assembling the core team</span>
                    </div>

                    <h1 className="mt-6 text-4xl sm:text-6xl font-display font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.05]">
                        {heroWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
                                className="inline-block mr-2 md:mr-3"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Evice Labs is a developer studio native to the Logos ecosystem. We're inviting the
                        first generation of Logos builders to join as founding members - equal owners, equal
                        responsibility, and a real seat in how the company is run.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#apply"
                            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-brand hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            Apply to join
                        </a>
                        <a
                            href="#terms"
                            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-dark-bg border border-dark-border hover:border-brand/40 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                            Read the terms
                        </a>
                    </div>

                    <div className="mt-8 inline-flex items-center space-x-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
                        </span>
                        <span>Founding seats open</span>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:block animate-bounce text-gray-600">
                        <ArrowDown className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </section>

            {/* The premise */}
            <section className="relative bg-[#08080A]/40 border-b border-dark-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <Reveal>
                        <Eyebrow>// Why now</Eyebrow>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
                            The first-gen window won't stay open.
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-5">
                            Logos is still in its testnet phase. The set of developers who've actually shipped
                            merged LEZ work is small, and the teams entering over the next stretch will need
                            people who already know the stack - confidential compute, zkVM execution, token and
                            authority models, on-chain verification.
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-4">
                            We're not building Evice to be a freelancer pool. We're building it to be the
                            engineering studio of the Logos ecosystem - and the people who help set its
                            foundation now are the ones who own it. That's the invitation.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* What being a founding member means - the four terms */}
            <section id="terms" className="border-b border-dark-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Reveal>
                            <Eyebrow>// What you get</Eyebrow>
                            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
                                A co-owner, not a hire.
                            </h2>
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-4">
                                This is not a contractor role and not a "contribute when you can" arrangement.
                                Founding members join as full partners in the company.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ownership.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={item.title} delay={i * 0.08}>
                                    <div className="group h-full p-6 rounded-xl border border-dark-border bg-dark-card hover:border-brand/40 transition-colors duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                                                <Icon className="w-5 h-5 text-brand" />
                                            </div>
                                            <h3 className="font-display font-bold text-white text-lg tracking-tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal delay={0.1}>
                        <p className="text-center text-sm text-gray-500 font-mono mt-10 max-w-2xl mx-auto leading-relaxed">
                            We're explicit about this because the people we want are sharp enough to ask - and
                            they should have the answer up front.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* What we expect */}
            <section className="bg-[#08080A]/40 border-b border-dark-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Reveal>
                            <Eyebrow>// What we expect</Eyebrow>
                            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
                                Equal ownership, equal commitment.
                            </h2>
                            <p className="text-sm text-gray-400 leading-relaxed mt-4 max-w-md">
                                Owners do the unglamorous parts too. Here's what carrying a founding seat looks
                                like in practice.
                            </p>
                        </Reveal>

                        <div className="space-y-3">
                            {expectations.map((line, i) => (
                                <Reveal key={i} delay={i * 0.06}>
                                    <div className="flex items-start gap-3 p-4 rounded-xl border border-dark-border bg-dark-card hover:border-brand/40 transition-colors">
                                        <Check className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                                        <span className="text-sm text-gray-300 leading-relaxed">{line}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who we're looking for */}
            <section className="border-b border-dark-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <Reveal>
                            <Eyebrow>// Who we're looking for</Eyebrow>
                            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
                                Someone we'd trust to co-own a company.
                            </h2>
                            <p className="text-sm text-gray-400 leading-relaxed mt-4">
                                You don't need every item on this list. You need to be someone the rest of the team
                                would build with.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lookingFor.map((line, i) => (
                            <Reveal key={i} delay={i * 0.07}>
                                <div className="flex items-start gap-3 p-5 rounded-xl border border-dark-border bg-dark-card hover:border-brand/40 transition-colors h-full">
                                    <Cpu className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                                    <span className="text-sm text-gray-300 leading-relaxed">{line}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works - governance */}
            <section className="bg-[#08080A]/40 border-b border-dark-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <Reveal>
                        <Eyebrow>// How it works</Eyebrow>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
                            Run like builders, not on trust alone.
                        </h2>
                    </Reveal>

                    <div className="mt-8 space-y-4">
                        <Reveal delay={0.05}>
                            <div className="flex items-start gap-4 p-5 rounded-xl border border-dark-border bg-dark-card">
                                <div className="p-2 rounded-lg bg-brand/10 border border-brand/20">
                                    <PieChart className="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white tracking-tight">Ownership</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mt-1">
                                        Split equally across founding members. The founding team is kept intentionally
                                        small so equal shares stay meaningful.
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="flex items-start gap-4 p-5 rounded-xl border border-dark-border bg-dark-card">
                                <div className="p-2 rounded-lg bg-brand/10 border border-brand/20">
                                    <KeyRound className="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white tracking-tight">Treasury</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mt-1">
                                        Holds the studio's revenue, grants, and prize earnings. Funds move through a
                                        multisig requiring multiple founding signers - distribution and spending reflect
                                        a real group decision, not any one person acting alone.
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div className="flex items-start gap-4 p-5 rounded-xl border border-dark-border bg-dark-card">
                                <div className="p-2 rounded-lg bg-brand/10 border border-brand/20">
                                    <Vote className="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-white tracking-tight">Decisions</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mt-1">
                                        Anything affecting ownership, the treasury, or the company's direction is made
                                        by the founding team together. We align on the specifics before anyone signs on.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-b border-dark-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center mb-12">
                        <Reveal>
                            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </Reveal>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-brand/5 transition-colors"
                                    >
                                        <span className="font-display font-semibold text-white text-sm sm:text-base">
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-brand shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: openFaq === i ? 'auto' : 0,
                                            opacity: openFaq === i ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply CTA */}
            <section id="apply" className="relative py-24 md:py-32 overflow-hidden border-b border-dark-border text-center">
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <Reveal>
                        <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
                            Help write the foundation.
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto leading-relaxed mt-5">
                            If you're building in Logos early and this resonates, reach out. We'd rather build with
                            a small group of the right people than a large group of the available ones.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://docs.google.com/forms/d/1zSbk1g_B9DpN9oN6ca5Ib_48_aEHtFKKWxFOoOvaFq4/viewform?edit_requested=true"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 font-mono text-xs uppercase tracking-widest text-white shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Apply to join
                            </a>
                            <a
                                href="https://github.com/Evice-labs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-dark-bg border border-dark-border hover:border-brand/40 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-widest active:scale-[0.98] transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                GitHub
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Footer - same as home */}
            <footer className="bg-[#050507] text-gray-500 font-sans select-none border-t border-dark-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="p-1 rounded-sm bg-brand/10 border border-brand/20">
                            <ShieldCheck className="w-4 h-4 text-brand" />
                        </div>
                        <span className="font-display font-bold text-white text-base tracking-tight">
                            Evice<span className="text-brand font-mono font-normal">Labs</span>
                        </span>
                    </Link>

                    <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-gray-400">
                        <a href="https://github.com/Evice-labs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        </a>
                        <a href="https://x.com/Evice_labs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                            <span>X / Twitter</span>
                            <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        </a>
                        <a href="mailto:hello@evice.dev" className="hover:text-white transition-colors flex items-center space-x-1">
                            <span>Email</span>
                            <Mail className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="text-xs font-mono text-gray-600">
                        © 2026 Evice Labs &middot; SECURE SYSTEM L1S
                    </div>
                </div>
            </footer>
        </div>
    );
}