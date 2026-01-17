import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { SectionHeader } from '../ui/section-header';
import { ContentCard } from '../ui/content-card';

export function WorkSection() {
    const workItems = [
        {
            title: 'The TEE Security Handbook',
            description:
                'Our open-source public good. A living handbook that documents TEE failure modes, vulnerable patterns, and practical guidance for safely designing and deploying TEE-heavy Web3 systems.',
            icon: (
                <div className="w-16 h-16 border border-foreground/20 flex items-center justify-center grid-lines">
                    <div className="w-8 h-8 border border-foreground/40" />
                </div>
            ),
            buttonText: 'Check out the Handbook',
            href: '/handbook',
        },
        {
            title: 'Confidential Bug Bounty Work',
            description:
                'We do ongoing, private vulnerability research across TEE-backed protocols. Details stay confidential by default, but the security lessons and patterns eventually flow back into the ecosystem through the Handbook.',
            icon: (
                <div className="w-16 h-16 border border-foreground/20 flex items-center justify-center grid-lines">
                    <div className="w-6 h-6 border-2 border-foreground/40 rounded-sm" />
                </div>
            ),
            buttonText: 'Talk to Us',
            href: '/contact',
        },
        {
            title: 'TEE Vulnerability Reasoning LLM',
            description:
                'We are building a specialized LLM agent designed to reason about vulnerabilities in Web3 protocols that leverage TEEs in different roles and architectures. The goal is to accelerate threat modeling, surface risky assumptions early, and help teams converge on safer designs faster.',
            icon: (
                <div className="w-16 h-16 border border-foreground/20 flex items-center justify-center grid-lines font-mono text-2xl font-bold">
                    TEE
                </div>
            ),
            buttonText: 'Coming Soon...',
            href: '#',
        },
    ];

    return (
        <GridBackground className="py-24 bg-muted/30 border-b border-border">
            <div className="max-w-[1300px] mx-auto">
                <SectionHeader title="OUR WORK" className="mb-8" />

                <p className="font-mono text-sm sm:text-base text-foreground/70 leading-relaxed mb-12 max-w-4xl">
                    We do three kinds of work. One is public, to raise the baseline for the entire ecosystem. The others are
                    private, where we help teams find and fix real issues before attackers do.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workItems.map((item, index) => (
                        <ContentCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            buttonText={item.buttonText}
                            href={item.href}
                        />
                    ))}
                </div>
            </div>
        </GridBackground>
    );
}
