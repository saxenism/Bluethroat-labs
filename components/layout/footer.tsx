import React from 'react';
import Link from 'next/link';
import { Mail, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background border-t border-border">
            {/* Large Decorative Header Image */}
            <div className="h-64 sm:h-80 md:h-[400px] w-full relative overflow-hidden border-b border-border grayscale hover:grayscale-0 transition-all duration-700">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/footer-pattern.png)' }}
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                <div className="absolute inset-0 grid-lines opacity-20" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                            </svg>
                            <span className="font-mono text-xl font-medium tracking-tighter">
                                Bluethroat Labs
                            </span>
                        </Link>

                        <p className="font-mono text-xs sm:text-sm text-foreground/50 max-w-sm leading-relaxed uppercase tracking-widest">
                            Security research collective focused on making TEE-heavy Web3 protocols secure, robust, and reliable.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">Navigation</h4>
                            <nav className="flex flex-col space-y-2">
                                <Link href="/docs" className="font-mono text-xs uppercase tracking-widest hover:text-foreground/70 transition-colors">Docs</Link>
                                <Link href="/reveries" className="font-mono text-xs uppercase tracking-widest hover:text-foreground/70 transition-colors">Reveries</Link>
                                <Link href="/join" className="font-mono text-xs uppercase tracking-widest hover:text-foreground/70 transition-colors">Join Us</Link>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">Contact</h4>
                            <div className="flex space-x-4">
                                <a href="https://x.com/bluethroat_labs" target="_blank" rel="noopener noreferrer" className="p-3 border border-border hover:bg-foreground hover:text-background transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="mailto:hello@bluethroat.ai" className="p-3 border border-border hover:bg-foreground hover:text-background transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
                    <p>© 2024 Bluethroat Labs. All Rights Reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
