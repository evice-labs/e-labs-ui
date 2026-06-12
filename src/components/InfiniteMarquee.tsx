/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hexagon, Terminal, Radio, Cpu, Network, ShieldCheck, Zap } from 'lucide-react';

interface Partner {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partners: Partner[] = [
  { name: 'Logos Network', category: 'Base layer', icon: Network },
  { name: 'LEZ (Logos Execution)', category: 'Execution environment', icon: Radio },
  { name: 'λPrize Submission', category: 'R&D', icon: Zap },
  { name: 'RISC Zero', category: 'zkVM prover', icon: Cpu },
  { name: 'Groth16 / BN254', category: 'SNARK scheme', icon: ShieldCheck },
  { name: 'Solana sBPF', category: 'Target architecture', icon: Terminal },
  { name: 'Anchor Framework', category: 'Solana SDK', icon: Hexagon },
  { name: 'Witness Verification', category: 'On-chain proof router', icon: ShieldCheck }
];

export default function InfiniteMarquee() {
  // Duplicate array three times to create an infinite scroll illusion
  const doubledPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-1 border-y border-dark-border bg-[#0C0C0E]/50 backdrop-blur-xs select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-full items-center">
        {/* Double-wrapper to make continuous scroll perfectly smooth */}
        <div className="flex animate-marquee whitespace-nowrap gap-12 py-3 items-center">
          {doubledPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                {/* Visual state bullet in brand color */}
                <div className="p-1 rounded-sm bg-dark-bg border border-dark-border group-hover:border-brand/40 group-hover:bg-brand/5 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-brand group-hover:text-brand-green transition-colors duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-sans tracking-tight text-black/95 font-medium">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-black tracking-widest leading-none">
                    {partner.category}
                  </span>
                </div>
                <span className="text-dark-border pl-4 select-none">&middot;</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
