import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { SectionHeader } from '../ui/section-header';

export function MissionSection() {
    return (
        <GridBackground className="py-24 bg-background border-b border-border" withNoise={false}>
            <div className="max-w-7xl mx-auto px-12 sm:px-24">
                <div className="max-w-4xl">
                    <p className="font-mono text-sm sm:text-base text-foreground/80 leading-relaxed">
                        At Bluethroat Labs, our mission is to accelerate the security maturity of
                        Trusted Execution Environments (TEEs) in Web3. The smart contract ecosystem only
                        became meaningfully safer once vulnerable patterns and hard-earned lessons were
                        openly documented and best practices were widely internalized. Before that,
                        security knowledge stayed trapped in isolated &quot;security islands,&quot; slowing
                        progress while attackers only needed to be right once.
                    </p>
                </div>
            </div>
        </GridBackground>
    );
}
