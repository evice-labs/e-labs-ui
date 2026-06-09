/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Code, CheckCircle, Terminal, FileCheck2, Cpu } from 'lucide-react';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    id: 1,
    label: '01 / SPECS',
    title: 'Scope',
    description: 'We read the spec and the source before we write anything. You get a clear plan with mathematically bounded invariants, not a hand-waving approximation.',
    codeSnippet: `# 1. Scoping Protocol Constraints
confidential_state:
  pda_owner: "0xEviceLabs"
  curve: "BN254"
  verification_gates:
    - groth16_verify
    - alt_bn128_addition
bounds:
  sbpf_heap_size_kb: 256
  max_recursion_depth: 4`
  },
  {
    id: 2,
    label: '02 / PATHS',
    title: 'Decide',
    description: 'One recommended path with the reasoning and tradeoffs laid bare, not five hedged options. We help you choose authority and permission structures.',
    codeSnippet: `// 2. Clear Architecture Selection
pub enum VerificationPath {
    RISCZeroZkVM {
        image_id: [u32; 8],
        proving_key: Vec<u8>
    },
    Groth16AltBn128 {
        pvk: PreparedVerifyingKey,
        proof: Proof
    }
}
// Selected: Groth16AltBn128 due to sBPF cycle execution limits.`
  },
  {
    id: 3,
    label: '03 / SOURCE',
    title: 'Build in the Open',
    description: 'Tests stay green at every commit. You see actual commits land in real-time, matching scoped milestone targets closely on your repository logs.',
    codeSnippet: `$ cargo test --package lambda-shield
   Compiling lambda-shield v0.1.0 (Evice-labs)
    Finished test [unoptimized + debuginfo] target(s)
     Running unittests src/lib.rs

test proof::test_private_pda_derivation ... ok
test verify::test_alt_bn128_addition ... ok
test result: ok. 14 passed; 0 failed; 0 ignored`
  },
  {
    id: 4,
    label: '04 / PROOFS',
    title: 'Verify',
    description: 'Everything is test-covered, audited for common edge cases, and structurally verified before we call it complete.',
    codeSnippet: `// 4. Verifying Program Constraints
fn check_correctness(ctx: Context<Verify>) -> Result<()> {
    let inputs = &ctx.accounts.proof_inputs;
    require!(inputs.is_within_solana_heap_limit(), ErrorCode::HeapOverflow);
    // Groth16 constraint matching:
    require!(groth16::verify_proof(&inputs), ErrorCode::InvalidZKProof);
    Ok(())
}`
  },
  {
    id: 5,
    label: '05 / MAINNET',
    title: 'Ship & Document',
    description: 'Deployed to mainnet, documented cleanly with full developer instructions, and handed over cleanly so it outlives us.',
    codeSnippet: `$ solana program deploy target/deploy/lambda_shield.so
Program Id: 3yUf98Xh...GdfSg
>> Deployed successfully to Mainnet Beta.
>> Writing mdBook specifications...
>> Exporting typescript client SDK & bindings...
[SUCCESS] Handover folder archived & delivered.`
  }
];

export default function ProcessStepper() {
  const [activeStep, setActiveStep] = useState(1);

  const getStepIcon = (id: number) => {
    switch (id) {
      case 1: return <HelpCircle className="w-4 h-4" />;
      case 2: return <Cpu className="w-4 h-4" />;
      case 3: return <Code className="w-4 h-4" />;
      case 4: return <FileCheck2 className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start font-sans">

      {/* Timeline Controls (Left 2 Columns) */}
      <div className="lg:col-span-2 space-y-3">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start space-x-4 select-none ${isActive
                  ? 'bg-brand/10 border-brand/50 shadow-md shadow-brand/5'
                  : 'bg-dark-card border-dark-border/80 text-gray-400 hover:border-dark-border hover:bg-dark-border/20'
                }`}
            >
              <div className={`p-2 rounded-lg border transition-colors ${isActive
                  ? 'bg-brand text-white border-brand'
                  : 'bg-dark-border text-gray-500 border-dark-border'
                }`}>
                {getStepIcon(step.id)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-brand' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                  )}
                </div>
                <h3 className="text-base font-display font-bold text-white mt-1">
                  {step.title}
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed font-sans ${isActive ? 'text-gray-300' : 'text-gray-500 line-clamp-1'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Shell Display (Right 3 Columns) */}
      <div className="lg:col-span-3">
        {steps.map((step) => {
          if (activeStep !== step.id) return null;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-dark-border bg-[#050507] overflow-hidden shadow-2xl shadow-brand/5 crt-effect"
            >
              {/* Shell Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0E0E11] border-b border-dark-border/80">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-brand-green/80 rounded-full" />
                  <span className="text-[10px] font-mono text-gray-500 pl-4">
                    Evice_studio://{step.title.toLowerCase()}.log
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Terminal className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">
                    TTY-01
                  </span>
                </div>
              </div>

              {/* Shell Content */}
              <div className="p-5 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed select-all">
                <code className="text-gray-300 block">{step.codeSnippet}</code>
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 border-t border-dark-border/40 bg-[#070709] flex items-center justify-between text-[9px] font-mono text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="text-brand-green">●</span>
                  <span>STATUS: SECURE_BENCHMARK_OK</span>
                </div>
                <div>
                  <span>SYS: 60fps_RESIZE_OK</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
