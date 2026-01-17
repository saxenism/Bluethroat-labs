import React from 'react';
import { GridBackground } from '../ui/grid-background';

export function PhilosophySection() {
    return (
        <GridBackground className="py-32 bg-background border-b border-border">
            <div className="max-w-4xl mx-auto px-12 sm:px-24">
                <div className="space-y-12">
                    <div>
                        <p className="font-instrumental text-2xl sm:text-3xl md:text-5xl leading-relaxed mb-6">
                            As TEEs move deeper into Web3, clarity becomes critical.
                            Assumptions about hardware trust do not survive adversarial settings.
                        </p>

                        <p className="font-mono text-foreground/70 leading-relaxed uppercase tracking-widest text-xs">
                            The <span className="italic underline underline-offset-4">TEE Security Handbook ↗</span> exists to document real
                            guarantees, real failure modes, and practical integration patterns.
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
