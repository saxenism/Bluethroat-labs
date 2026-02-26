export interface DocSubSection {
  id: string
  title: string
}

export interface DocPageData {
  slug: string // e.g., "executive-summary" or "platform-profiles/aws-nitro-system"
  title: string
  description?: string
  heroImage?: string
  content: string // Markdown or HTML string
  subSections: DocSubSection[]
  prev?: { title: string; slug: string }
  next?: { title: string; slug: string }
  keywords: string[]
}

export interface DocNavItem {
  title: string
  slug?: string
  items?: DocNavItem[]
}

export const DOCS_NAVIGATION: DocNavItem[] = [
  { title: 'Executive Summary', slug: 'executive-summary' },
  { title: 'What to expect out of the document', slug: 'expectations' },
  {
    title: 'Backdrop What are TEES and adjacent technologies?',
    slug: 'backdrop',
  },
  { title: 'TEES in Web3', slug: 'tees-in-web3' },
  {
    title: 'Platform Profiles and Architectures',
    items: [
      { title: 'AWS Nitro System', slug: 'platform-profiles/aws-nitro-system' },
      {
        title: 'AWS Nitro Enclaves',
        slug: 'platform-profiles/aws-nitro-enclaves',
        items: [
          {
            title: 'AWS Nitro Threat Vectors [PARANOID]',
            slug: 'platform-profiles/aws-nitro-enclaves/threat-vectors',
          },
        ],
      },
      {
        title: 'Dstack - Decentralized Cloud TEEs',
        slug: 'platform-profiles/dstack',
      },
    ],
  },
  { title: 'TEE attacks categorisation', slug: 'attacks' },
  { title: 'Dumb ways to get rekt w/ TEES', slug: 'rekt' },
  {
    title: 'Layers of security for protocols building with TEES',
    slug: 'security-layers',
  },
  { title: 'Future Directions', slug: 'future' },
  { title: 'Contributors', slug: 'contributors' },
]

export const DOCS_DATA: Record<string, DocPageData> = {
  'executive-summary': {
    slug: 'executive-summary',
    title: 'Executive Summary',
    heroImage:
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000',
    content: `
            <p>This document is a practical security guide for teams building Web3 protocols with Trusted Execution Environments (TEEs). Throughout the document, we use the terms TEEs and enclaves interchangeably, even though, strictly speaking, cloud "enclaves" (like AWS Nitro) are not full TEEs in the academic sense. This distinction matters, but for real-world engineering, the threat models and failure modes overlap enough to treat them together.</p>
            <p>This is NOT an academic resource. It is intentionally biased toward practical, operational, and implementation-level security, which are exactly the things that actually break in production. This guide is written for TEE security engineers, not TEE cryptography researchers. The focus is on the Web3 ecosystem specifically; there may be many TEE resources out in the world, but this document does not attempt to survey or replicate them. Our only goal is to analyze how TEEs fail in Web3, and how protocols can build secure, verifiable, and economically robust systems despite those failures.</p>
            <p>Some of the things we will touch upon:</p>
            <ul>
                <li>deep dive into the architecture of the most famous TEE infra offering in web3</li>
                <li>how the threat landscape changes when TEEs move into cloud environments,</li>
                <li>the most common and most dangerous TEE failure modes in Web3, and</li>
                <li>a layered blueprint for building secure architectures (TEE + Attestation + Constant-time crypto + MPC + ZK + Governance).</li>
            </ul>
        `,
    subSections: [
      { id: 'audience', title: 'Intended Audience' },
      { id: 'hardware-security', title: 'A note about hardware security' },
      { id: 'impact', title: 'Intended Impact' },
      { id: 'not-covered', title: 'What this document is NOT' },
      { id: 'industry', title: 'Industry Context' },
      { id: 'legal', title: 'Legal Disclaimer' },
    ],
    next: { title: 'What to expect out of the document', slug: 'expectations' },
    keywords: ['summary', 'overview', 'tee', 'enclave', 'web3', 'security'],
  },
  expectations: {
    slug: 'expectations',
    title: 'What to expect out of the document',
    content: `
            <h2 id="audience">Intended Audience</h2>
            <p>This document is intended for use in the web3 industry by protocols that leverage TEEs and depend on TEEs for (critical) functions in their protocols. This document is not intended to be a general TEE security document, but specifically for TEE security for web3 protocols.</p>
            <h2 id="hardware-security">A note about hardware security</h2>
            <p>This document deliberately does not dive deep into hardware-level attacks on TEEs. Those attacks are fascinating, academically rigorous, and they tend to grab headlines. Every few years, a new paper breaks out (WireTap, BatteringRAM, TeeDotFail) showing a sophisticated hardware exploit that bypasses confidentiality, integrity, or attestation guarantees.</p>
            <p>These issues appear mundane, but they are the real reason TEE-based Web3 protocols suffer catastrophic losses. Hardware attacks are glamorous but software, architecture, and usage errors are what consistently break real protocols.</p>
            <h2 id="impact">Intended Impact</h2>
            <p>The primary goal is to provide engineering-grade security guidance for protocol designers and developers. We want to move away from "security by hope" and toward verifiable, architecturally-sound implementations.</p>
        `,
    subSections: [
      { id: 'audience', title: 'Intended Audience' },
      { id: 'hardware-security', title: 'A note about hardware security' },
      { id: 'impact', title: 'Intended Impact' },
    ],
    prev: { title: 'Executive Summary', slug: 'executive-summary' },
    next: {
      title: 'Backdrop What are TEES and adjacent technologies?',
      slug: 'backdrop',
    },
    keywords: ['expectations', 'audience', 'hardware', 'security'],
  },
  backdrop: {
    slug: 'backdrop',
    title: 'Backdrop What are TEES and adjacent technologies?',
    content: `
            <p>To understand TEEs, we must first look at the landscape of confidential computing. TEEs are not magic boxes; they are hardware-enforced isolation mechanisms.</p>
            <h2 id="tees">What are TEEs?</h2>
            <p>Trusted Execution Environments provide hardware-level isolation from the rest of the host system. Even the OS kernel cannot peak into the memory of a running TEE if implemented correctly.</p>
            <h2 id="adjacent">Adjacent Technologies</h2>
            <p>Technologies like ZK-SNARKs and MPC are often compared to TEEs. While they solve similar problems (privacy and verifiability), they have vastly different trade-offs in terms of performance and trust assumptions.</p>
        `,
    subSections: [
      { id: 'tees', title: 'What are TEEs?' },
      { id: 'adjacent', title: 'Adjacent Technologies' },
    ],
    prev: { title: 'What to expect out of the document', slug: 'expectations' },
    next: { title: 'TEES in Web3', slug: 'tees-in-web3' },
    keywords: ['backdrop', 'technologies', 'confidential-computing'],
  },
  'platform-profiles/aws-nitro-system': {
    slug: 'platform-profiles/aws-nitro-system',
    title: 'AWS Nitro System',
    content: `
            <p>The AWS Nitro System is the underlying platform for the next generation of EC2 instances. It offloads virtualization functions to dedicated hardware and software.</p>
            <h2 id="architecture">Nitro Architecture</h2>
            <p>Nitro consists of the Nitro Cards, the Nitro Security Chip, and the Nitro Hypervisor. Together, they provide a secure and high-performance foundation.</p>
        `,
    subSections: [{ id: 'architecture', title: 'Nitro Architecture' }],
    prev: { title: 'TEES in Web3', slug: 'tees-in-web3' },
    next: {
      title: 'AWS Nitro Enclaves',
      slug: 'platform-profiles/aws-nitro-enclaves',
    },
    keywords: ['aws', 'nitro', 'system', 'architecture'],
  },
  // ... more data can be added here
}
