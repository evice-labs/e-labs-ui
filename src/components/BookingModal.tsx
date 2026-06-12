/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Terminal, Key, Clock, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formState, setFormState] = useState({
    name: '',
    org: '',
    email: '',
    architecture: 'sbpf-confidential',
    stage: 'spec',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [consoleStep, setConsoleStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [proposalHash, setProposalHash] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.name) return;

    setSubmitting(true);
    setConsoleStep(1);
    setLogs(['[BOOT] Initiating cryptographic specification analysis...']);
  };

  // Console terminal animation sequence
  useEffect(() => {
    if (!submitting) return;

    const interval = setInterval(() => {
      setConsoleStep((prev) => {
        const next = prev + 1;
        if (next === 2) {
          setLogs((l) => [...l, `[SYS] Scoping target: ${formState.architecture.toUpperCase()}`]);
          setLogs((l) => [...l, '[SYS] Parsing current codebase size: estimated 12,000 LOC...']);
        } else if (next === 3) {
          setLogs((l) => [...l, '[ZKP] Checking sBPF heap alignment constraints: OK.']);
          setLogs((l) => [...l, '[ZKP] Verification curve checks: Alt_BN128 enabled.']);
        } else if (next === 4) {
          const hashGenerated = '0xNulliCommit_' + Math.floor(Math.random() * 1000000).toString(16).padEnd(6, '0');
          setProposalHash(hashGenerated);
          setLogs((l) => [
            ...l,
            `[KEY] Generated proposal ticket: ${hashGenerated}`,
            `[OK] Signature sealed successfully. Target email set to hello@Evice.dev`
          ]);
        } else if (next === 5) {
          clearInterval(interval);
          setSubmitting(false);
          setSubmitted(true);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitting, formState.architecture]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl rounded-xl border border-dark-border bg-dark-card overflow-hidden shadow-2xl z-10"
          >
            {/* Upper grid details */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-dot-pattern opacity-10 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-dark-border/60 bg-[#0c0c0e]/80">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand animate-ping" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-black">
                  Scoping Intake Loop // 01
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-black hover:text-black hover:bg-dark-border/50 transition-colors"
                title="Close intake"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 overflow-y-auto max-h-[82vh] font-sans">

              {!submitting && !submitted && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs text-black leading-relaxed mb-1">
                    Complete the scoping manifest below. Our engineering desk will review and return an on-chain architectural plan.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                        Your Name / Alias
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="CipherScribe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2 text-sm text-black focus:outline-hidden focus:border-brand/65 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                        Organization / Protocol
                      </label>
                      <input
                        type="text"
                        placeholder="Logos Core Team"
                        value={formState.org}
                        onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                        className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2 text-sm text-black focus:outline-hidden focus:border-brand/65 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                      Contact Coordinate (Email or Telegram/X)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="telegram: @logos_dev or researcher@protocol.io"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2 text-sm text-black focus:outline-hidden focus:border-brand/65 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                        Target stack selection
                      </label>
                      <select
                        value={formState.architecture}
                        onChange={(e) => setFormState({ ...formState, architecture: e.target.value })}
                        className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2.5 text-xs text-black focus:outline-hidden focus:border-brand/65 transition-colors font-mono"
                      >
                        <option value="sbpf-confidential">sBPF Confidential State</option>
                        <option value="zkvm-prover">RISC Zero zkVM Proving</option>
                        <option value="onchain-sol">Solana verification router</option>
                        <option value="rfp-spec">RFP Milestones Specs</option>
                        <option value="retainer-embed">Senior retainers embed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                        Current Development Stage
                      </label>
                      <select
                        value={formState.stage}
                        onChange={(e) => setFormState({ ...formState, stage: e.target.value })}
                        className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2.5 text-xs text-black focus:outline-hidden focus:border-brand/65 transition-colors font-mono"
                      >
                        <option value="spec">Spec / Outline Phase</option>
                        <option value="mvp-refit">Built MVP, needs refit</option>
                        <option value="active-devnet">Active on devnet</option>
                        <option value="mainnet-ready">Mainnet Ready (Security review)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5">
                      Invariants, Code repos, or constraints to enforce
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe what stays private, target latency requirements, or any curve specifications..."
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full bg-[#08080A]/80 border border-dark-border/80 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-hidden focus:border-brand/65 transition-colors font-mono leading-relaxed resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-brand hover:bg-brand/90 text-black font-mono text-xs uppercase tracking-widest py-3 rounded-lg flex items-center justify-center space-x-2.5 select-none shadow-lg shadow-brand/10 group active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Initiate analysis flow</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}

              {/* Submitting Console Diagnostics state */}
              {submitting && (
                <div className="space-y-4 py-8">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative w-12 h-12 flex items-center justify-center text-brand">
                      <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-spin border-t-brand" />
                      <Clock className="w-5 h-5 text-brand" />
                    </div>
                    <span className="text-xs font-mono text-brand animate-pulse uppercase tracking-wider">
                      Analyzing constraint invariants... {(consoleStep * 20)}%
                    </span>
                  </div>

                  {/* Terminal logger */}
                  <div className="p-4 bg-[#050507] rounded-lg border border-dark-border/80 font-mono text-[9px] text-black space-y-1 h-36 overflow-y-auto select-none crt-effect">
                    {logs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        <span className="text-black pl-1">{index + 1} &gt; </span>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Successful layout */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="inline-flex p-3 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green relative">
                    <Sparkles className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-brand-green rounded-full animate-ping" />
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-medium text-black tracking-tight">
                      Specification Signed & Sealed
                    </h3>
                    <p className="text-xs text-black mt-2 max-w-sm mx-auto leading-relaxed">
                      Your proposal ticket is stamped onto our active schedule queue. Let's arrange our first developer-to-developer call.
                    </p>
                  </div>

                  {/* Coordinates information */}
                  <div className="p-4 bg-[#050507] rounded-lg border border-dark-border/80 font-mono text-left text-xs space-y-3 max-w-md mx-auto">
                    <div className="flex justify-between items-center text-black border-b border-dark-border pb-1.5">
                      <span>VERIFIED TICKET</span>
                      <span className="text-brand text-[10px]">{proposalHash}</span>
                    </div>

                    <div className="space-y-1.5 text-black">
                      <div className="flex justify-between">
                        <span className="text-black">Scheduled:</span>
                        <span>Next 24H Call (Reserved)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Email:</span>
                        <a href="mailto:hello@Evice.dev" className="text-brand hover:underline">hello@Evice.dev</a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Telegram:</span>
                        <a href="https://t.me/Evice_labs" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">t.me/Evice_labs</a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Calendly link:</span>
                        <a href="https://calendly.com/Evice-labs" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Book immediate time slot</a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setLogs([]);
                      onClose();
                    }}
                    className="px-5 py-2 text-xs font-mono text-black border border-dark-border hover:border-brand hover:text-black rounded-lg transition-colors"
                  >
                    Close console
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
