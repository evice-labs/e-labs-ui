/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Check, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface RowProp {
  id: string;
  category: string;
  us: string;
  others: string;
  index: number;
}

const rows: RowProp[] = [
  {
    id: 'focus',
    category: 'Focus',
    us: '100% Logos / LEZ-native',
    others: 'Broad, generic blockchain',
    index: 0
  },
  {
    id: 'depth',
    category: 'Depth',
    us: 'zkVM + confidential compute specialists',
    others: 'Surface-level integrations',
    index: 1
  },
  {
    id: 'delivery',
    category: 'Delivery',
    us: 'Spec → mainnet, no handoffs',
    others: 'Fragmented, multiple handoffs',
    index: 2
  },
  {
    id: 'process',
    category: 'Process',
    us: 'Code-backed, tests green at every step',
    others: 'Demo-driven, thin coverage',
    index: 3
  },
  {
    id: 'track-record',
    category: 'Track record',
    us: 'Shipped λPrize + RFP work',
    others: 'One-off projects',
    index: 4
  },
  {
    id: 'communication',
    category: 'Communication',
    us: 'Builder-to-builder, in the open',
    others: 'Account managers, status decks',
    index: 5
  }
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto w-full rounded-xl border border-dark-border bg-dark-card backdrop-blur-md font-sans">
      <table className="w-full text-left border-collapse min-w-[620px]">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-dark-border bg-[#101012]/90 text-xs font-mono text-black">
            <th className="p-4 pl-6 font-medium">Metric</th>
            <th className="p-4 font-semibold text-brand bg-brand/5 border-x border-dark-border flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand animate-pulse" />
              <span>Evice Labs</span>
            </th>
            <th className="p-4 font-medium text-black">Generalists & Agencies</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {rows.map((row) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: row.index * 0.05 }}
              className="border-b border-dark-border/40 hover:bg-white/[0.01] transition-all duration-200"
            >
              {/* Feature label */}
              <td className="p-4 pl-6 text-sm font-semibold text-black">
                {row.category}
              </td>

              {/* Evice column (Highlighted) */}
              <td className="p-4 text-sm text-black font-medium bg-brand/5 border-x border-dark-border/60">
                <div className="flex items-center space-x-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 border border-brand/35 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand" />
                  </div>
                  <span>{row.us}</span>
                </div>
              </td>

              {/* Others column */}
              <td className="p-4 text-sm text-black">
                <div className="flex items-center space-x-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-yellow-500/60" />
                  </div>
                  <span>{row.others}</span>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
