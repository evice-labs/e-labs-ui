/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, Twitter, Cpu, Terminal, Key, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../types';

const founders: TeamMember[] = [
  {
    id: 'alex',
    name: 'Alex "Cipher" Vance',
    role: 'Confidential Compute & zkVM Lead',
    bio: 'Former zk-compiler researcher focused on private-PDA structures and sBPF invariants. Author of 3 λPrize compiler optimizations.',
    specialty: 'Rust · sBPF · RISC Zero · Private State Layers',
    github: 'https://github.com/vance-cipher',
    twitter: 'https://x.com/cipher_vance',
    avatarSeed: 'AV',
    terminalOutput: `vance@Evice:~$ ./pda_keygen --seed "elez"
[GEN] keypair generated in 18ms
>> PUBLIC_ADDRESS: Nulli5bXz1V...9R0F_Live
[OK] private metadata encrypted.`
  },
  {
    id: 'elena',
    name: 'Dr. Elena Rostova',
    role: 'Protocol Architect & Cryptographer',
    bio: 'Completed PhD in elliptic curve pairings (BN254). Shipped 4 production verifiers and authored specifications for modern sBPF routers.',
    specialty: 'Groth16 · BN254 Curve Pairing · Audit Verifiers',
    github: 'https://github.com/elena-rostova',
    twitter: 'https://x.com/elena_zkp',
    avatarSeed: 'ER',
    terminalOutput: `elena@Evice:~$ zkp_verifier_check --curve bn254
[LOAD] evaluating alt_bn128 constraints...
>> MULTIPLICATIONS: 12,940 ops verified 
[OK] Groth16 verify_proof matching: 100% Correct`
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
          className="group relative flex flex-col justify-between rounded-xl border border-dark-border bg-dark-card p-6 hover:border-brand/40 transition-all duration-300"
        >
          {/* Decorative Corner Signal */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/5 to-transparent rounded-tr-xl pointer-events-none" />

          <div>
            <div className="flex items-center space-x-4">
              {/* Synth Avatar */}
              <div className="relative flex-shrink-0 w-14 h-14 rounded-lg bg-[#0e0e11] border border-dark-border group-hover:border-brand/40 transition-colors duration-300 flex items-center justify-center font-display font-medium text-white shadow-inner">
                <div className="absolute inset-0 bg-dot-pattern opacity-40 rounded-lg" />
                <span className="relative z-10 text-lg font-bold tracking-tight text-brand">
                  {member.avatarSeed}
                </span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-green rounded-full border border-dark-bg animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-brand transition-colors duration-250">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Specialty tag */}
            <div className="mt-4 inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-brand/5 border border-brand/20 text-[10px] font-mono text-brand font-medium">
              <Cpu className="w-3 h-3 text-brand" />
              <span>{member.specialty}</span>
            </div>

            {/* Bio info */}
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Live Cryptographic Log Box */}
            <div className="p-3.5 bg-[#050507] rounded-lg border border-dark-border/80 font-mono text-[9px] space-y-1.5 text-gray-400 leading-normal relative select-none overflow-hidden crt-effect">
              <div className="flex justify-between items-center text-gray-600 border-b border-dark-border/40 pb-1">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-3 h-3 text-brand" />
                  <span>SESSION::{member.id.toUpperCase()}_CONSOLE</span>
                </span>
                <span className="text-[8px] animate-pulse text-brand-green">● LOGGED-IN</span>
              </div>
              <pre className="text-gray-300 overflow-x-auto select-all leading-relaxed whitespace-pre">
                <code>{member.terminalOutput}</code>
              </pre>
            </div>

            {/* Footer handles linkups */}
            <div className="flex items-center justify-between border-t border-dark-border/60 pt-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500">
                <Key className="w-3.5 h-3.5 text-brand" />
                <span>SIGNATURE VERIFIED OK</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-400">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
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
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
