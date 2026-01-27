'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DocsNavbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const isDark = mounted && resolvedTheme === 'dark';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="mx-auto h-16 flex items-center">
                {/* Logo Section */}
                <div className="h-full flex items-center px-4 md:px-4 border-r border-border min-w-[320px]">
                    <Link href="/" className="flex items-center gap-3 group">
                        <svg className='fill-foreground transition-colors' width="28" height="28" viewBox="0 0 32 32">
                            <path d="M12.9537 24.6352V18.3938C12.9537 17.8417 12.1938 17.6914 11.9836 18.2019L6.26586 31.3002C6.04623 31.8335 6.74966 32.2579 7.11908 31.8149L12.8368 24.958C12.9123 24.8674 12.9537 24.7532 12.9537 24.6352Z" />
                            <path d="M24.9186 12.5599L14.4527 23.5066C14.1386 23.8352 13.5844 23.6128 13.5844 23.1583V3.93387C13.5844 3.60636 13.8705 3.40137 14.1471 3.43177C14.3893 3.4584 14.5603 3.67398 14.7515 3.82515L24.6429 11.6484C24.8341 11.7996 25.0577 11.9664 25.0584 12.2101C25.0587 12.3362 25.012 12.4622 24.9186 12.5599Z" />
                            <path d="M0.0798311 0.232672C0.258873 -0.0521997 0.670309 0.0400349 0.997309 0.119275L11.9579 2.77529C12.2849 2.85453 12.6949 2.84447 12.8756 3.12829C12.9253 3.20642 12.9542 3.29916 12.9542 3.39863V16.7246C12.9542 16.9815 12.7745 17.1677 12.5603 17.2168C12.2547 17.2869 12.026 16.978 11.8401 16.7255L0.454564 1.26473C0.268632 1.01225 -0.0250033 0.777299 0.00187348 0.464895C0.00895468 0.382586 0.0359345 0.302516 0.0798311 0.232672Z" />
                            <path d="M26.8631 2.58534L26.1492 11.086C26.1012 11.3657 25.8501 11.5248 25.6053 11.5033C25.3556 11.4812 25.1777 11.2596 24.9802 11.1053L18.3564 5.93505C18.1589 5.78084 17.9257 5.60934 17.9306 5.35876C17.9347 5.14616 18.0728 4.94175 18.3049 4.87982L26.2363 2.013C26.5914 1.91822 26.9253 2.22311 26.8631 2.58534Z" />
                            <path d="M27.1781 6.64015L27.4939 2.55609C27.5376 2.30726 27.7454 2.15071 27.9668 2.13941C28.2238 2.1263 28.4339 2.33071 28.6549 2.46259L31.4552 4.13396C31.6762 4.26584 31.9372 4.41225 31.9576 4.66876C31.9646 4.75641 31.9487 4.8449 31.9119 4.92449C31.7931 5.18159 31.4731 5.26132 31.2232 5.3946L28.1944 7.00999C27.9445 7.14326 27.6494 7.30578 27.409 7.15596C27.2439 7.05305 27.14 6.85711 27.1781 6.64015Z" />
                        </svg>
                        {/* --- NEW LOGO SVG REPLACEMENT --- */}
                        <div className="flex items-center justify-center">
                            <img
                                className="h-5 w-auto fill-background dark:invert"
                                aria-label="SAG Logo"
                                src="/TEE Security Handbook.svg"
                            />
                        </div>
                    </Link>
                    <div className="ml-10 px-2 py-1 bg-muted text-[12px] font-semibold font-mono text-muted-foreground">
                        v2.6
                    </div>
                </div>

                {/* Navbar Links */}
                <div className="flex-1 h-full flex items-center px-8 gap-8">
                    <Link href="/" className="font-mono font-medium text-md hover:text-foreground/70 transition-colors">Website</Link>
                    <Link href="/reveries" className="font-mono font-medium text-md hover:text-foreground/70 transition-colors">Reveries</Link>
                    <Link href="/contact" className="font-mono font-medium text-md hover:text-foreground/70 transition-colors">Talk to Us</Link>
                </div>

                {/* Theme Toggle */}
                <div className="h-full border-l border-border">
                    <button
                        onClick={toggleTheme}
                        className="h-full px-4 transition-colors hover:bg-muted"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <Sun className="w-7 h-7" />
                        ) : (
                            <Moon className="w-7 h-7" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
