import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { notFound } from 'next/navigation';
import { BlogRenderer } from '@/components/reveries/blog-renderer';
import { Metadata } from 'next';
import { StickyNavbar } from '@/components/layout/sticky-navbar';
import { Footer } from '@/components/layout/footer';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
        title,
        bannerImage,
        content,
        category,
        publishedAt
    }`;
    return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    return {
        title: post ? `${post.title} | Bluethroat Labs` : 'Blog',
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

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
                            {post.bannerImage ? (
                                <div
                                    className="absolute inset-0 bg-cover bg-center grayscale scale-110 hover:scale-100 transition-transform duration-1000"
                                    style={{ backgroundImage: `url(${urlFor(post.bannerImage).url()})` }}
                                />
                            ) : (
                                <div
                                    className="absolute inset-0 bg-cover bg-center grayscale scale-110 hover:scale-100 transition-transform duration-1000"
                                    style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }}
                                />
                            )}
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>

                    <article className="border-b border-border bg-background">
                        <BlogRenderer
                            blocks={[]} // Pass empty array if content is handled via PortableText in BlogRenderer
                            sanityContent={post.content}
                            metadata={{
                                category: post.category,
                                date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: '2-digit',
                                    year: 'numeric'
                                }) : undefined
                            }}
                        />
                    </article>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const query = `*[_type == "blog"] { "slug": slug.current }`;
    const posts = await client.fetch(query);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}
