import { REVERIES } from '@/lib/reveries-data';
import { notFound } from 'next/navigation';
import { BlogRenderer } from '@/components/reveries/blog-renderer';
import { Metadata } from 'next';
import { StickyNavbar } from '@/components/layout/sticky-navbar';
import { Footer } from '@/components/layout/footer';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = REVERIES.find(p => p.slug === slug);
    return {
        title: post ? `${post.title} | Bluethroat Labs` : 'Blog',
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = REVERIES.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <div className="max-w-[1300px] mx-auto bg-background border-x border-border min-h-screen relative">
                <StickyNavbar />
                <main className="pt-40">
                    {/* Banner Area */}
                    <div className="w-full">
                        <div className="aspect-video sm:aspect-30/9 w-full border-b border-border bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden transition-all duration-700">
                            <div
                                className="absolute inset-0 bg-cover bg-center grayscale scale-110 hover:scale-100 transition-transform duration-1000"
                                style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>

                    <article className="border-b border-border bg-background">
                        <BlogRenderer blocks={post.blocks} />
                    </article>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return REVERIES.map((post) => ({
        slug: post.slug,
    }));
}
