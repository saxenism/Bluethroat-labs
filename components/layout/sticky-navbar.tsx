'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';

export function StickyNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    const navLinks = [
        { href: '/docs', label: 'Docs' },
        { href: '/reveries', label: 'Reveries' },
        { href: '/join', label: 'Join Us' },
    ];

    return (
        <nav
            className={`fixed max-w-[1300px] mx-auto top-0 left-0 right-0 z-50 transition-all border-t border-b border-border ${isScrolled
                ? 'mt-0 bg-background'
                : 'mt-[50px] bg-background'
                }`}
        >
            <div className="max-w-[1300px] mx-auto h-16 flex items-center border-x border-border">
                {/* Logo Section */}
                <div className="h-full flex items-center px-4 sm:px-6 border-r border-border min-w-0 sm:min-w-[240px]">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <svg
                            className="w-6 h-6 transition-transform group-hover:scale-110"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                        </svg>
                        <span className="font-mono text-base font-medium tracking-tight hidden sm:block">
                            Bluethroat Labs
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation Section */}
                <div className="hidden md:flex flex-1 h-full items-center border-r border-border px-8 space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-mono text-lg font-medium text-foreground/70 hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Talk to Us Section - Hidden on Mobile */}
                <div className="hidden md:flex h-full items-center border-r border-border px-8">
                    <Link
                        href="/contact"
                        className="font-mono text-xl font-semibold tracking-widest hover:text-foreground/70 transition-colors"
                    >
                        Talk to Us
                    </Link>
                </div>

                {/* Right Side Section: Theme Toggle & Hamburger */}
                <div className="flex h-full items-center ml-auto md:ml-0 overflow-hidden">
                    <div className="h-full flex items-center border-l border-border md:border-l-0">
                        <button
                            onClick={toggleTheme}
                            className="p-5 transition-colors hover:bg-muted"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-7 h-7" />
                            ) : (
                                <Moon className="w-7 h-7" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button - Segmented */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden h-full flex items-center px-6 border-l border-border hover:bg-muted transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-border py-4 px-6 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-mono text-sm text-foreground/70 hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="inline-flex py-2 font-mono text-sm text-foreground/70 hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Talk to Us
                    </Link>
                </div>
            )}
        </nav>
    );
}
