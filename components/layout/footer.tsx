"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Copyright, Mail, Twitter } from 'lucide-react';
import { smoothScrollTo } from '@/lib/smooth-scroll';

const navLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/#reveries', label: 'Reveries' },
    { href: '/join', label: 'Join Us' },
];

export function Footer() {
    const pathname = usePathname();

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            smoothScrollTo('hero', 80);
        }
    };

    const handleReveriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            smoothScrollTo('reveries', 80);
        }
    };

    return (
        <footer className="bg-background mt-16 border-y border-border">
            <div className="border-b mb-12 border-border bg-zinc-50/50 dark:bg-zinc-950/50">
                <div className="max-w-[1300px] mx-auto h-14 sm:h-17 flex items-stretch border-border">
                    <div className="flex items-center px-5 border-r border-border group transition-colors">
                        {/* Replace <img> with the actual <svg> tag from your file */}
                        <Link href="/" onClick={handleLogoClick} className="flex items-center group transition-colors">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                className="fill-foreground transition-colors"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.9537 24.6352V18.3938C12.9537 17.8417 12.1938 17.6914 11.9836 18.2019L6.26586 31.3002C6.04623 31.8335 6.74966 32.2579 7.11908 31.8149L12.8368 24.958C12.9123 24.8674 12.9537 24.7532 12.9537 24.6352Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M24.9186 12.5599L14.4527 23.5066C14.1386 23.8352 13.5844 23.6128 13.5844 23.1583V3.93387C13.5844 3.60636 13.8705 3.40137 14.1471 3.43177C14.3893 3.4584 14.5603 3.67398 14.7515 3.82515L24.6429 11.6484C24.8341 11.7996 25.0577 11.9664 25.0584 12.2101C25.0587 12.3362 25.012 12.4622 24.9186 12.5599Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M0.0798311 0.232672C0.258873 -0.0521997 0.670309 0.0400349 0.997309 0.119275L11.9579 2.77529C12.2849 2.85453 12.6949 2.84447 12.8756 3.12829C12.9253 3.20642 12.9542 3.29916 12.9542 3.39863V16.7246C12.9542 16.9815 12.7745 17.1677 12.5603 17.2168C12.2547 17.2869 12.026 16.978 11.8401 16.7255L0.454564 1.26473C0.268632 1.01225 -0.0250033 0.777299 0.00187348 0.464895C0.00895468 0.382586 0.0359345 0.302516 0.0798311 0.232672Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M26.8631 2.58534L26.1492 11.086C26.1012 11.3657 25.8501 11.5248 25.6053 11.5033C25.3556 11.4812 25.1777 11.2596 24.9802 11.1053L18.3564 5.93505C18.1589 5.78084 17.9257 5.60934 17.9306 5.35876C17.9347 5.14616 18.0728 4.94175 18.3049 4.87982L26.2363 2.013C26.5914 1.91822 26.9253 2.22311 26.8631 2.58534Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M27.1781 6.64015L27.4939 2.55609C27.5376 2.30726 27.7454 2.15071 27.9668 2.13941C28.2238 2.1263 28.4339 2.33071 28.6549 2.46259L31.4552 4.13396C31.6762 4.26584 31.9372 4.41225 31.9576 4.66876C31.9646 4.75641 31.9487 4.8449 31.9119 4.92449C31.7931 5.18159 31.4731 5.26132 31.2232 5.3946L28.1944 7.00999C27.9445 7.14326 27.6494 7.30578 27.409 7.15596C27.2439 7.05305 27.14 6.85711 27.1781 6.64015Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Desktop Navigation Section */}
                    <div className="hidden md:flex flex-1 h-full items-center border-r border-border px-8 space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={link.href === '/#reveries' ? handleReveriesClick : undefined}
                                className="font-mono text-lg font-medium text-foreground/70 hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-stretch">
                        <a
                            href="mailto:hello@bluethroat.ai"
                            className="flex items-center px-5 sm:px-5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <Mail className="w-8 h-8 text-foreground/70" />
                        </a>
                        <a
                            href="https://x.com/bluethroat_labs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-5 sm:px-5 border-l border-border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            {/* Using a custom X logo path to match your screenshot exactly */}
                            <svg className="w-8 h-8 fill-current text-foreground/70" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="h-64 sm:h-80 md:h-[400px] w-full relative overflow-hidden border-b border-border grayscale hover:grayscale-0 transition-all duration-700">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/footer-pattern.png)' }}
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                <div className="absolute inset-0 grid-lines opacity-20" />
            </div>

            <div className="p-4 border-t border-border flex items-center justify-center font-mono text-sm tracking-widest text-foreground">
                <p className="flex items-center gap-2 whitespace-nowrap">
                    <Copyright className="w-4 h-4" />
                    <span>{new Date().getFullYear()} Bluethroat Labs. All Rights Reserved.</span>
                </p>
            </div>
        </footer >
    );
}