import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { CornerUpRight } from 'lucide-react';

export function PhilosophySection() {
    return (
        <GridBackground className="py-32 bg-background border-b border-border">
            {/* 1. Removed 'mx-auto' and added 'ml-0' to pin to the left */}
            <div className="max-w-4xl px-6 sm:px-12 md:px-24 ml-0">
                <div className="space-y-12">
                    <div className='mt-48'>
                        <p className="font-instrumental max-w-xl text-2xl sm:text-3xl md:text-3xl leading-relaxed mb-6">
                            As TEEs move deeper into Web3, clarity becomes critical.
                            Assumptions about hardware trust do not survive adversarial settings.
                        </p>

                        <p className="font-instrumental max-w-2xl text-foreground leading-relaxed text-3xl">
                            The <span className="italic text-foreground/50 underline-offset-4">TEE Security Handbook<CornerUpRight className="inline-block ml-2 stroke-1" /></span> exists to document real
                            guarantees, real failure modes, and practical integration patterns.
                        </p>
                    </div>
                </div>
            </div>
        </GridBackground>
    );
}