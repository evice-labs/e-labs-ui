/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, Twitter, Cpu, Terminal, Key, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../types';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const founders: TeamMember[] = [
  {
    id: 'Mladen',
    name: 'Mladen Milankovic',
    role: 'Basecamp core module (universal interface), QML UI module',
    bio: '19 years of professional software development experience, with recent focus on Logos ecosystem infrastructure and cryptographic protocol engineering.',
    github: 'https://github.com/mmlado',
    twitter: 'https://x.com/mmlado_eth',
    avatarSeed: `${import.meta.env.BASE_URL}MladenProfile.jpeg`,
  },
  {
    id: 'Syafiq',
    name: 'Syafiq Nabil Assirhindi',
    role: 'Protocol Architect & Cryptographer',
    bio: 'Hands-on experience building privacy-preserving cryptographic systems natively on the Logos Execution Zone. Recent completion of LP-0016 demonstrates end-to-end capability across the full Logos stack.',
    github: 'https://github.com/syafiqeil',
    twitter: 'https://x.com/syafiqeil',
    avatarSeed: `${import.meta.env.BASE_URL}SyafiqProfile.png`,
  },
  {
    id: 'Bristin',
    name: 'Bristin Borah',
    role: 'Protocol Architect & Cryptographer',
    bio: 'Hands-on experience building core LEZ infrastructure primitives. Winner of LP-0012 and deliverer of LP-0013, covering the exact event system and token authority model that this RFP depends on.',
    github: 'https://github.com/bristinWild',
    twitter: 'https://x.com/borah_bristin',
    avatarSeed: `${import.meta.env.BASE_URL}BristinProfile.jpeg`,
  }
];

export default function TeamSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
      {founders.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative flex flex-col justify-between border border-dark-border bg-dark-card p-6 hover:border-gray-400 transition-all duration-300"
        >
          {/* Decorative Corner Signal */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center space-x-4">
              {/* Synth Avatar */}
              <div className="relative flex-shrink-0 w-14 h-14 bg-[#0e0e11] border border-dark-border group-hover:border-gray-400 transition-colors duration-300 flex items-center justify-center font-display font-medium text-black shadow-inner overflow-hidden">
                {member.avatarSeed.startsWith('/') ? (
                  <img src={member.avatarSeed} alt={member.name} className="relative z-10 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-dot-pattern opacity-40" />
                    <span className="relative z-10 text-lg font-bold tracking-tight text-brand">
                      {member.avatarSeed}
                    </span>
                  </>
                )}
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-black group-hover:text-brand transition-colors duration-250">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-black uppercase tracking-widest mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Bio info */}
            <p className="text-sm text-black mt-3 leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Footer handles linkups */}
            <div className="flex items-center justify-between border-t border-dark-border/60 pt-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-black">
                <Key className="w-3.5 h-3.5 text-brand" />
                <span>SIGNATURE VERIFIED OK</span>
              </div>

              <div className="flex items-center space-x-3 text-black">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors duration-200"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors duration-200"
                  title="Twitter / X handle"
                >
                  <XIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
