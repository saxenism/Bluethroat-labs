'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DocsNavButtons } from '@/components/docs/docs-nav-buttons';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { BlogRenderer } from '@/components/reveries/blog-renderer';

export default function DocsPage() {
    const params = useParams();
    const slugArray = params.slug as string[];
    const currentSlug = slugArray?.join('/') || '';
    const [pageData, setPageData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
        const fetchDoc = async () => {
            const query = `*[_type == "doc" && slug.current == $slug][0] {
                title,
                heroImage,
                content
            }`;
            const data = await client.fetch(query, { slug: currentSlug });
            setPageData(data);
            setLoading(false);
        };
        fetchDoc();
    }, [currentSlug]);

    if (loading) {
        return <div className="min-h-screen animate-pulse bg-zinc-100/10" />;
    }

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
            {mounted && pageData.heroImage && (
                <div className="w-full aspect-21/6 bg-muted overflow-hidden relative">
                    <img
                        src={urlFor(pageData.heroImage).url()}
                        alt={pageData.title}
                        className="w-full h-full object-cover opacity-50 grayscale hover:opacity-70 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            <div className="max-w-5xl mx-auto w-full px-6 py-12 md:px-12 lg:px-20">
                <h1 className="font-mono text-3xl sm:text-4xl font-bold mb-8 tracking-tight">{pageData.title}</h1>

                <BlogRenderer sanityContent={pageData.content} />

                {/* Manual nav buttons would need logic for prev/next if implemented in Sanity */}
            </div>
        </article>
    );
}
