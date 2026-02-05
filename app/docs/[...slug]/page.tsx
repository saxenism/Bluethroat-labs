'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DocsNavButtons } from '@/components/docs/docs-nav-buttons';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { BlogRenderer } from '@/components/reveries/blog-renderer';
import { IS_DEV, MOCK_DOCS } from '@/lib/mock-data';

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
            if (IS_DEV && MOCK_DOCS[currentSlug as keyof typeof MOCK_DOCS]) {
                const data = MOCK_DOCS[currentSlug as keyof typeof MOCK_DOCS];
                console.log('DocsPage Mock Data:', { slug: currentSlug, data });
                setPageData(data);
                setLoading(false);
                return;
            }

            const query = `*[_type == "doc" && slug.current == $slug][0] {
                title,
                heroImage,
                content,
                relatedBlogs[]-> {
                    title,
                    "slug": slug.current,
                    category,
                    publishedAt
                }
            }`;
            const data = await client.fetch(query, { slug: currentSlug });
            console.log('DocsPage Fetch:', { slug: currentSlug, data });
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
                    <div className="absolute inset-0" />
                </div>
            )}

            <div className="max-w-5xl mx-auto w-full px-6 py-12 md:px-12 lg:px-20">
                <h1 className="font-mono text-3xl sm:text-4xl font-bold mb-8 tracking-tight">{pageData.title}</h1>

                <BlogRenderer sanityContent={pageData.content} />

                {/* Blog Highlights Section */}
                {pageData.relatedBlogs && pageData.relatedBlogs.length > 0 && (
                    <div className="mt-16 pt-16 border-t border-border">
                        <h2 className="font-mono text-xl mb-8 uppercase tracking-widest text-muted-foreground">Featured Reveries</h2>
                        <div className="grid gap-6">
                            {pageData.relatedBlogs.map((blog: any) => (
                                <Link
                                    key={blog.slug}
                                    href={`/reveries/${blog.slug}`}
                                    className="group flex items-center justify-between p-6 border border-border hover:bg-muted transition-all duration-300"
                                >
                                    <div className="space-y-2">
                                        <div className="font-mono text-xs text-muted-foreground uppercase">{blog.category}</div>
                                        <h3 className="font-mono text-lg font-bold group-hover:translate-x-1 transition-transform">{blog.title}</h3>
                                    </div>
                                    <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:bg-foreground group-hover:text-background transition-all">
                                        →
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
