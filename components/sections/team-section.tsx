"use client";

import React, { useState } from 'react';
import { GridBackground } from '../ui/grid-background';
import { Twitter, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

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
];

export function TeamSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const stripImage = mounted
        ? (isDark ? '/dark-mode/dark-strip.png' : '/light-mode/light-strip.png')
        : null;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextMember = () => {
        setCurrentIndex((prev) => (prev + 1) % team.length);
    };

    const prevMember = () => {
        setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
    };

    return (
        <GridBackground className="py-16 bg-background border-b border-border" withNoise={true}>
            <div className="max-w-[1300px] mx-auto">
                {/* Architectural Header */}
                <div className="h-17 border-y border-border flex items-stretch">
                    <div className="flex h-full items-center">
                        <div className="h-full border-r border-border px-8 flex items-center bg-zinc-50 dark:bg-zinc-900 min-w-[200px] sm:min-w-[300px]">
                            <span className="font-mono font-bold text-xl sm:text-2xl uppercase tracking-tighter">Our Team</span>
                        </div>
                    </div>
                    <div className="flex-1 h-full relative overflow-hidden">
                        {stripImage && (
                            <Image
                                src={stripImage}
                                alt="Decorative strip"
                                fill
                                className="object-cover opacity-50 contrast-125"
                            />
                        )}
                    </div>
                </div>
                {/* Intro Text Row */}
                <div className="group px-8 sm:px-16 py-6 sm:py-8 border-b border-border bg-background transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <p className="max-w-6xl text-base sm:text-lg leading-relaxed font-medium dark:group-hover:text-white transition-colors">
                        We are a small but dedicated team of researchers and builders, united by a passion for
                        security and a commitment to making TEE-backed systems safer.
                    </p>
                </div>

                {/* Team Members Grid/Carousel */}
                <div className="relative">
                    {/* Mobile View (Carousel) */}
                    <div className="md:hidden">
                        <div className="group p-4 border-b border-border">
                            <div className="relative aspect-12/11 border border-border overflow-hidden">
                                <Image
                                    src={team[currentIndex].image}
                                    alt={team[currentIndex].name}
                                    fill
                                    className="object-cover transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Social Buttons Container */}
                                <div className="absolute bottom-0 right-0 flex">
                                    {team[currentIndex].email && (
                                        <a
                                            href={`mailto:${team[currentIndex].email}`}
                                            className="group/mail w-16 h-16 bg-background border-l border-t border-border flex items-center justify-center hover:bg-foreground transition-colors"
                                        >
                                            <Mail className="w-8 h-8 text-foreground group-hover/mail:text-background transition-colors" />
                                        </a>
                                    )}
                                    <a
                                        href={team[currentIndex].xUrl}
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
                                        {team[currentIndex].name}
                                    </h3>
                                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/50">
                                        {team[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View (Grid) */}
                    <div className="hidden md:grid md:grid-cols-3">
                        {team.map((member, index) => (
                            <div key={index} className="group p-4 border-r border-b border-border">
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
                        onClick={prevMember}
                        className="p-4 border-l border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={nextMember}
                        className="p-4 border-l border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>
                </div>
            </div>
        </GridBackground>
    );
}
