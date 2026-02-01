"use client";

import React, { useCallback } from 'react';
import { GridBackground } from '../ui/grid-background';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import useEmblaCarousel from 'embla-carousel-react';

const team = [
    {
        name: 'Rahul Saxena',
        role: 'Founder . ex - ZKSync',
        image: '/team/pankaj.png',
        xUrl: 'https://x.com/pankaj',
        email: 'rahul@bluethroat.ai',
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
    {
        name: 'Abhimanyu Gupta',
        role: 'Research . Design',
        image: '/team/nishit.png',
        xUrl: 'https://x.com/nishit',
    },
    {
        name: 'Abhimanyu Gupta',
        role: 'Research . Design',
        image: '/team/nishit.png',
        xUrl: 'https://x.com/nishit',
    },
];

export function TeamSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Initialize Embla
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const stripImage = mounted
        ? (isDark ? '/dark-mode/dark-strip.png' : '/light-mode/light-strip.png')
        : null;

    return (
        <GridBackground className="py-17 bg-background border-b border-border" withNoise={true}>
            <div className="max-w-[1300px] mx-auto">
                {/* Architectural Header */}
                <div className="h-17 border-y border-border flex items-stretch">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-12 flex items-center bg-zinc-50 dark:bg-zinc-900 min-w-[180px] sm:min-w-[250px]">
                            <span className="font-mono font-semibold text-xl sm:text-2xl uppercase whitespace-nowrap">Our Team</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full relative overflow-hidden">
                        {stripImage && (
                            <Image
                                src={stripImage}
                                alt="Decorative strip"
                                fill
                                className="object-cover object-center"
                            />
                        )}
                    </div>
                </div>

                {/* Intro Text Row */}
                <div className="group px-6 sm:px-12 py-6 sm:py-8 border-b border-border bg-background transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <p className="max-w-6xl text-base sm:text-lg font-medium dark:group-hover:text-white transition-colors">
                        We are a small but dedicated team of researchers and builders, united by a passion for
                        security and a commitment to making TEE-backed systems safer.
                    </p>
                </div>

                {/* Team Members Carousel */}
                <div className="overflow-hidden border-b border-border" ref={emblaRef}>
                    <div className="flex">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 group p-4 border-r border-border"
                            >
                                <div className="relative aspect-12/11 border border-border overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="absolute bottom-0 right-0 flex">
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="group/mail w-16 h-16 bg-background border-l border-t border-border flex items-center justify-center hover:bg-foreground transition-colors"
                                            >
                                                <Mail className="w-8 h-8 text-foreground group-hover/mail:text-background transition-colors" />
                                            </a>
                                        )}
                                        <a
                                            href={member.xUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/social w-16 h-16 bg-background border-l border-t border-border flex items-center justify-center hover:bg-foreground transition-colors"
                                        >
                                            <svg
                                                className="w-8 h-8 fill-foreground group-hover/social:fill-background transition-colors"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                    </div>
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
                </div>

                {/* Carousel Navigation */}
                <div className="flex border-border border-b justify-end items-center">
                    <button
                        onClick={scrollPrev}
                        className="p-2 border-l border-border hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors"
                    >
                        <ChevronLeft className="w-14 h-14 opacity-70" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="p-2 border-l border-border hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors"
                    >
                        <ChevronRight className="w-14 h-14 opacity-70" />
                    </button>
                </div>
            </div>
        </GridBackground>
    );
}