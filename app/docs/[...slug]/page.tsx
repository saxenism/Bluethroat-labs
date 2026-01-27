'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DocsNavButtons } from '@/components/docs/docs-nav-buttons';
import { DOCS_DATA } from '@/lib/docs-data';

export default function DocsPage() {
    const params = useParams();
    const slugArray = params.slug as string[];
    const currentSlug = slugArray?.join('/') || '';
    const pageData = DOCS_DATA[currentSlug];

    if (!pageData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[78vh] font-mono">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground">Document not found.</p>
            </div>
        );
    }

    return (
        <article className="prose prose-invert max-w-none">
            {/* Header / Banner Image */}
            {pageData.heroImage && (
                <div className="w-full aspect-21/6 bg-muted overflow-hidden relative">
                    <img
                        src={pageData.heroImage}
                        alt={pageData.title}
                        className="w-full h-full object-cover opacity-50 grayscale hover:opacity-70 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
                </div>
            )}

            <div className="max-w-5xl mx-auto w-full px-6 py-12 md:px-12 lg:px-20">
                <h1 className="font-mono text-3xl sm:text-4xl font-bold mb-8 tracking-tight">{pageData.title}</h1>

                {/* Render dynamic HTML content */}
                <div
                    className="space-y-6 text-muted-foreground font-mono text-base leading-relaxed docs-content"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />

                <DocsNavButtons
                    prev={pageData.prev ? { title: pageData.prev.title, href: `/docs/${pageData.prev.slug}` } : undefined}
                    next={pageData.next ? { title: pageData.next.title, href: `/docs/${pageData.next.slug}` } : undefined}
                />
            </div>
        </article>
    );
}
