import React from 'react';
import { GridBackground } from '../ui/grid-background';
import { Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const team = [
    {
        name: 'Rahul Saxena',
        role: 'Founder . ex - ZKSync',
        image: '/team/pankaj.png',
        xUrl: 'https://x.com/pankaj',
    },
    {
        name: 'Tanmay Goel',
        role: 'Founding . Researcher',
        image: '/team/tanmay.png',
        xUrl: 'https://x.com/tanmay',
    },
    {
        name: 'Abhimanyu Gupta',
        role: 'Research . Design',
        image: '/team/nishit.png',
        xUrl: 'https://x.com/nishit',
    },
];

export function TeamSection() {
    return (
        <GridBackground className="py-16 bg-background border-b border-border" withNoise={true}>
            <div className="max-w-[1300px] mx-auto">
                {/* Architectural Header */}
                <div className="h-17 border-y border-border flex items-stretch">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-8 flex items-center bg- dark:bg-zinc-900 min-w-[200px]">
                            <span className="font-mono font-bold text-xl uppercase tracking-tighter">Our Team</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full bg-black/95 dark:bg-black/60 relative overflow-hidden">
                        <div className="absolute inset-0 grid-lines opacity-20 bg-zinc-900"></div>
                    </div>
                </div>
                {/* Intro Text Row */}
                <div className="group px-8 sm:px-16 py-6 sm:py-8 border-b border-border bg-background transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <p className="max-w-6xl text-base sm:text-lg leading-relaxed font-medium dark:group-hover:text-white transition-colors">
                        We are a small but dedicated team of researchers and builders, united by a passion for
                        security and a commitment to making TEE-backed systems safer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {team.map((member, index) => (
                        <div key={index} className="group p-4 border-r border-b border-border">
                            <div className="relative aspect-3/4 bg-zinc-100 dark:bg-zinc-900 border border-border overflow-hidden">
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
                            <div className='p-4'>
                                <div className="space-y-4 mt-4">
                                    <h3 className="font-mono text-2xl tracking-tight">
                                        {member.name}
                                    </h3>
                                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/50">
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Carousel Navigation Placeholder */}
                <div className="flex border-border border-b justify-end items-center">
                    <button className="p-4 border-l border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button className="p-4 border-l border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </div>
            </div>
        </GridBackground>
    );
}
