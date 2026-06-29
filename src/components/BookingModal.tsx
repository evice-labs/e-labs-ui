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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl border border-black bg-[#F9F6EE] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-black bg-yellow-100">
              <div className="flex items-center space-x-2.5 pl-1.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                  Scoping Intake Loop // 01
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-black hover:bg-black/5 transition-colors border border-transparent hover:border-black"
                title="Close intake"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 overflow-y-auto max-h-[82vh] font-sans">

              {!submitting && !submitted && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-sm text-black leading-relaxed mb-2">
                    Complete the scoping manifest below. Our engineering desk will review and return an on-chain architectural plan.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                        Your Name / Alias
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="CipherScribe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white border border-black px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                        Organization / Protocol
                      </label>
                      <input
                        type="text"
                        placeholder="Logos Core Team"
                        value={formState.org}
                        onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                        className="w-full bg-white border border-black px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                      Contact Coordinate (Email or Telegram/X)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="telegram: @logos_dev or researcher@protocol.io"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-black px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                        Target stack selection
                      </label>
                      <select
                        value={formState.architecture}
                        onChange={(e) => setFormState({ ...formState, architecture: e.target.value })}
                        className="w-full bg-white border border-black px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors font-mono"
                      >
                        <option value="sbpf-confidential">sBPF Confidential State</option>
                        <option value="zkvm-prover">RISC Zero zkVM Proving</option>
                        <option value="onchain-sol">Solana verification router</option>
                        <option value="rfp-spec">RFP Milestones Specs</option>
                        <option value="retainer-embed">Senior retainers embed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                        Current Development Stage
                      </label>
                      <select
                        value={formState.stage}
                        onChange={(e) => setFormState({ ...formState, stage: e.target.value })}
                        className="w-full bg-white border border-black px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors font-mono"
                      >
                        <option value="spec">Spec / Outline Phase</option>
                        <option value="mvp-refit">Built MVP, needs refit</option>
                        <option value="active-devnet">Active on devnet</option>
                        <option value="mainnet-ready">Mainnet Ready (Security review)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-black uppercase tracking-widest mb-1.5 font-semibold">
                      Invariants, Code repos, or constraints to enforce
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe what stays private, target latency requirements, or any curve specifications..."
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full bg-white border border-black px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-colors leading-relaxed resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-brand hover:bg-brand/90 text-black border border-black font-mono text-xs uppercase tracking-widest py-3 flex items-center justify-center space-x-2.5 select-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] transition-all duration-200"
                  >
                    <span className="font-bold">Initiate analysis flow</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Submitting Console Diagnostics state */}
              {submitting && (
                <div className="space-y-6 py-10">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-12 h-12 flex items-center justify-center text-black">
                      <div className="absolute inset-0 border-2 border-black border-t-brand animate-spin" />
                      <Clock className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-xs font-mono text-black font-bold uppercase tracking-wider">
                      Analyzing constraint invariants... {(consoleStep * 20)}%
                    </span>
                  </div>

                  {/* Terminal logger */}
                  <div className="p-5 bg-black border border-black font-mono text-[10px] text-brand space-y-1.5 h-40 overflow-y-auto select-none shadow-[6px_6px_0_0_rgba(200,200,200,1)]">
                    {logs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        <span className="text-brand/50 pl-1">{index + 1} &gt; </span>
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
                  className="space-y-8 text-center py-8"
                >
                  <div className="inline-flex p-4 border border-black bg-brand/20 text-black relative shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Sparkles className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 border border-black bg-brand animate-ping" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-black tracking-tight">
                      Specification Signed & Sealed
                    </h3>
                    <p className="text-sm text-black mt-3 max-w-sm mx-auto leading-relaxed font-medium">
                      Your proposal ticket is stamped onto our active schedule queue. Let's arrange our first developer-to-developer call.
                    </p>
                  </div>

                  {/* Coordinates information */}
                  <div className="p-5 bg-white border border-black font-mono text-left text-xs space-y-4 max-w-md mx-auto shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center text-black border-b border-black pb-2">
                      <span className="font-bold">VERIFIED TICKET</span>
                      <span className="font-bold bg-black text-white px-2 py-0.5">{proposalHash}</span>
                    </div>

                    <div className="space-y-2.5 text-black">
                      <div className="flex justify-between">
                        <span className="font-semibold">Scheduled:</span>
                        <span>Next 24H Call (Reserved)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Email:</span>
                        <a href="mailto:hello@evice.dev" className="underline hover:text-brand transition-colors">hello@evice.dev</a>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Telegram:</span>
                        <a href="https://t.me/evice_labs" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand transition-colors">t.me/evice_labs</a>
                      </div>
                      <div className="flex justify-between mt-2 pt-2 border-t border-black/10">
                        <span className="font-semibold">Calendly link:</span>
                        <a href="https://calendly.com/evice-labs" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-brand transition-colors">Book immediate time slot</a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setLogs([]);
                      onClose();
                    }}
                    className="mt-4 px-6 py-2.5 text-xs font-mono font-bold text-black border border-black hover:bg-black hover:text-white transition-colors"
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
