import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { Twitter, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const team = [
    {
        name: 'Pankaj Sissodia',
        role: 'Founder / Researcher',
        image: '/team/pankaj.png',
        xUrl: 'https://x.com/pankaj',
    },
    {
        name: 'Tanmay Goel',
        role: 'Founding / Researcher',
        image: '/team/tanmay.png',
        xUrl: 'https://x.com/tanmay',
    },
    {
        name: 'Nishitayush Gupta',
        role: 'Research / Design',
        image: '/team/nishit.png',
        xUrl: 'https://x.com/nishit',
    },
];

export function TeamSection() {
    return (
        <GridBackground className="py-24 bg-background border-b border-border" withNoise={true}>
            <div className="max-w-[1300px] mx-auto">
                {/* Architectural Header */}
                <div className="h-20 border-y border-border flex items-stretch bg-zinc-50 dark:bg-zinc-950 mb-12">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-8 sm:px-12 flex items-center bg-zinc-100 dark:bg-zinc-900 min-w-0 sm:min-w-[300px]">
                            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.4em] whitespace-nowrap">Our Team</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full bg-black/95 dark:bg-black/60 relative overflow-hidden">
                        <div className="absolute inset-0 grid-lines opacity-20 bg-zinc-900"></div>
                    </div>
                    <div className="w-12 sm:w-16 h-full border-r border-border bg-background"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {team.map((member, index) => (
                        <div key={index} className="group">
                            <div className="relative aspect-4/5 bg-zinc-100 dark:bg-zinc-900 border border-border overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* X/Twitter Link Box */}
                                <a
                                    href={member.xUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>
                            <div className="mt-6 space-y-1">
                                <h3 className="font-instrumental text-2xl tracking-tight">
                                    {member.name}
                                </h3>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Navigation Placeholder */}
                <div className="flex justify-end space-x-4">
                    <button className="p-4 border border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="p-4 border border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </GridBackground>
    );
}
