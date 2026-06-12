/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  status: 'Merged' | 'In review' | 'Live on devnet' | 'Live on mainnet' | 'Proposal submitted';
  link: string;
  attribution: string;
  tech: string[];
}

export interface ProcessStep {
  id: number;
  label: string;
  title: string;
  description: string;
  codeSnippet: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  twitter: string;
  avatarSeed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
