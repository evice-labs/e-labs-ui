/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, GitBranch, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  {
    id: 'anoma-verifier',
    name: 'Anoma-Verifier',
    description: 'sBPF proof verification router for privacy-centric sovereign transactions.',
    status: 'Merged',
    link: 'https://github.com/Evice-labs/anoma-verifier',
    attribution: 'Led by Elena',
    tech: ['Rust', 'sBPF', 'Groth16', 'Logos LEZ']
  },
  {
    id: 'priv-pda',
    name: 'PrivPDA Primitive',
    description: 'Private Program-Derived Address primitive to anchor secure state without public leaks.',
    status: 'Live on devnet',
    link: 'https://github.com/Evice-labs/priv-pda',
    attribution: 'Led by Alex',
    tech: ['Solana', 'Anchor', 'sBPF', 'Private PDA']
  },
  {
    id: 'sbpf-groth16',
    name: 'sBPF-Groth16 Prover',
    description: 'Fast, test-covered on-chain Groth16 verification of BN254 cryptographic proofs.',
    status: 'In review',
    link: 'https://github.com/Evice-labs/sbpf-groth16',
    attribution: 'Evice Joint Work',
    tech: ['Rust', 'RISC Zero', 'BN254', 'sBPF']
  },
  {
    id: 'lambda-shield',
    name: 'λ-Shield Protocol',
    description: 'Zero-knowledge core shielded transaction layer on the Logos Execution Zone.',
    status: 'Live on mainnet',
    link: 'https://github.com/Evice-labs/lambda-shield',
    attribution: 'Evice Joint Work',
    tech: ['Rust', 'sBPF', 'LEZ', 'zkVM', 'λPrize Winner']
  }
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<'all' | 'joint' | 'alex' | 'elena'>('all');

  const filteredItems = portfolioItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'joint') return item.attribution.includes('Joint');
    if (filter === 'alex') return item.attribution.includes('Alex');
    if (filter === 'elena') return item.attribution.includes('Elena');
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Live on mainnet':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Live on devnet':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Merged':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-black border-black/20';
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              key={item.id}
              className="group relative flex flex-col justify-between border border-dark-border bg-dark-card p-6 transition-all duration-300 hover:border-gray-400/40 overflow-hidden"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-4 h-4 text-brand animate-pulse" />
                    <span className="text-[10px] font-mono text-black uppercase tracking-wider">
                      {item.attribution}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-mono border ${getStatusStyle(item.status)}`}>
                    ● {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-black mt-4 tracking-tight group-hover:text-brand transition-colors duration-200">
                  {item.name}
                </h3>

                <p className="text-sm text-black mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="bg-dark-border px-2 py-0.5 text-[10px] font-mono text-black border border-dark-border/40">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Redirect Trigger */}
                <div className="flex items-center justify-between border-t border-dark-border/60 pt-4 mt-2">
                  <span className="text-[10px] font-mono text-black">
                    REPOSITORY VERIFIED OK
                  </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-brand hover:text-black font-mono hover:underline group-hover:translate-x-0.5 transition-all duration-200"
                  >
                    <span>View commit logs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
