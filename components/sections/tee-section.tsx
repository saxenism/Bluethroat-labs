import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function TeeSection() {
    return (
        <GridBackground className="py-32 bg-background border-t border-b border-border">
            <div className="max-w-5xl mx-auto px-12 sm:px-24">
                <div className="space-y-12">
                    <div>
                        <p className="font-mono text-lg sm:text-xl md:text-2xl leading-relaxed mb-6">
                            Trusted Execution Environments are a proven security primitive. They have been used for years in phones, payments, and other security-critical systems.
                        </p>
                        <p className="font-mono text-foreground/70 leading-relaxed uppercase tracking-widest text-xs">
                            In Web3, TEEs are held to a different bar. Hardware trust sits uneasily with decentralisation and transparency.
                        </p>
                    </div>

                    <div className="border-l border-foreground/20 pl-8 sm:pl-12 space-y-6">
                        <p className="font-mono text-sm sm:text-base text-foreground/80 leading-relaxed">
                            Trusted Execution Environments are a proven security primitive. They have been used for years in phones,
                            payments, and other security-critical systems.
                        </p>

                        <p className="font-mono text-sm sm:text-base text-foreground/80 leading-relaxed">
                            In Web3, TEEs are held to a different bar. Hardware trust sits uneasily with decentralisation and transparency.
                        </p>

                        <div className="pt-6">
                            <p className="font-instrumental text-xl sm:text-3xl leading-relaxed italic">
                                That Tension Cannot Be Ignored.
                                <br />
                                If It Is Not Modelled Honestly, It Fails In Production.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GridBackground>
    );
}
