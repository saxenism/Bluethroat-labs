'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DocsNavbar } from '@/components/docs/docs-navbar';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb';
import { DocsFooter } from '@/components/docs/docs-footer';
import { DOCS_DATA } from '@/lib/docs-data';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const slugArray = (params.slug as string[]) || [];
    const currentSlug = slugArray.join('/') || '';
    const pageData = DOCS_DATA[currentSlug];

    const [isContentsOpen, setIsContentsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find((entry) => entry.isIntersecting);
                if (visibleSection) {
                    setActiveSection(visibleSection.target.id);
                }
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        const sections = pageData?.subSections
            ?.map((s) => document.getElementById(s.id))
            .filter(Boolean);

        sections?.forEach((section) => observer.observe(section!));
        return () => sections?.forEach((section) => observer.unobserve(section!));
    }, [pageData]);

    const breadcrumbPaths = ['HOME', ...slugArray.map(s => s.replace(/-/g, ' ').toUpperCase())];

    return (
        <div className="flex flex-col h-screen bg-background text-foreground selection:bg-foreground selection:text-background leading-relaxed overflow-hidden">
            {/* Navbar */}
            <DocsNavbar />

            <div className="flex flex-1 pt-16 overflow-hidden">
                {/* 1. Left Sidebar */}
                <DocsSidebar />

                {/* 2. Middle Column */}
                <div className="flex-1 flex mr-15 flex-col min-w-0 bg-background border-r border-border">

                    {/* FIXED BREADCRUMB SECTION */}
                    <div className="flex-none w-full bg-background border-b border-border">
                        <DocsBreadcrumb
                            paths={breadcrumbPaths}
                            isOpen={isContentsOpen}
                            onToggleContents={() => setIsContentsOpen(!isContentsOpen)}
                        />
                    </div>

                    {/* SCROLLABLE BODY SECTION */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="w-full">
                            {children}
                        </div>
                        <DocsFooter />
                    </main>
                </div>

                {/* 3. Right Column - Contents Sidebar */}
                {isContentsOpen && (
                    <aside className="w-54 hidden lg:block bg-background overflow-y-auto py-8 -translate-x-8 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-8 group cursor-default">
                            <div className="w-1.5 h-6 bg-border group-hover:bg-foreground transition-colors" />
                            <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">Contents</h3>
                        </div>
                        <nav className="space-y-4">
                            <ul className="space-y-6 relative border-l border-border/50 ml-0.5 pl-0">
                                {pageData?.subSections.map((section) => {
                                    const isActive = activeSection === section.id;
                                    return (
                                        <li key={section.id} className="relative pl-5">
                                            {isActive && (
                                                <div className="absolute left-[-2px] top-0 bottom-0 w-[3px] bg-foreground rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
                                            )}
                                            <a
                                                href={`#${section.id}`}
                                                className={`block text-[13px] font-mono leading-snug transition-all duration-300 hover:text-foreground ${isActive ? 'text-foreground font-bold italic translate-x-1' : 'text-muted-foreground'
                                                    }`}
                                            >
                                                {section.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>
                )}
            </div>
        </div>
    );
}