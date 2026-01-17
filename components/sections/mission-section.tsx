import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function MissionSection() {
    return (
        <GridBackground className="py-14 -translate-y-18 bg-background z-2 border-b border-border" withNoise={false}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-12 md:px-12">
                <div className="max-w-6xl">
                    <p className="font-mono text-sm sm:text-2xl text-foreground/80 leading-relaxed">
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
