"use client";

import React from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import { ContentBlock } from '@/lib/reveries-data';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';

interface BlogRendererProps {
    blocks?: ContentBlock[];
    sanityContent?: any;
    metadata?: {
        category?: string;
        date?: string;
    };
}

const components = {
    block: {
        h1: ({ children, value }: any) => (
            <h1 id={value._key} className="font-mono text-3xl sm:text-4xl font-medium leading-tight text-foreground mt-4 mb-8">
                {children}
            </h1>
        ),
        h2: ({ children, value }: any) => (
            <h2 id={value._key} className="font-mono text-3xl font-bold tracking-tighter text-foreground mt-12 mb-6">
                {children}
            </h2>
        ),
        h3: ({ children, value }: any) => (
            <h3 id={value._key} className="font-mono text-2xl font-bold tracking-tighter text-foreground mt-10 mb-4">
                {children}
            </h3>
        ),
        normal: ({ children }: any) => (
            <p className="font-mono text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap mb-6">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-foreground/20 bg-muted/30 p-8 my-10 rounded-sm">
                <p className="font-mono text-lg leading-relaxed text-foreground/70 italic">
                    {children}
                </p>
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 my-8">{children}</ul>,
        number: ({ children }: any) => <ol className="space-y-4 my-8 list-none">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex font-mono text-lg text-foreground/80 leading-relaxed">
                <span className="mr-4 text-foreground/40 mt-1">■</span>
                {children}
            </li>
        ),
        number: ({ children, value, index }: any) => (
            <li className="flex font-mono text-lg text-foreground/80 leading-relaxed">
                <span className="mr-4 text-foreground/40">{index + 1}.</span>
                {children}
            </li>
        ),
    },
    types: {
        image: ({ value }: any) => (
            <div className="my-12 space-y-4">
                <div className="relative w-full aspect-video border border-border bg-muted overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog image'}
                        fill
                        className="object-cover"
                    />
                </div>
                {value.caption && (
                    <p className="font-mono text-sm text-center text-muted-foreground italic">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
        code: ({ value }: any) => <SanityCodeBlock value={value} />,
        divider: () => <hr className="border-border my-12" />,
    },
    marks: {
        code: ({ children }: any) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">
                {children}
            </code>
        ),
        underline: ({ children }: any) => <u>{children}</u>,
        strikeThrough: ({ children }: any) => <del>{children}</del>,
    },
};

function SanityCodeBlock({ value }: any) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value.code || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-10 border border-border rounded-sm overflow-hidden bg-[#1E1E1E]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors group"
                    title="Copy code"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                        <Copy className="w-4 h-4 text-white/50 group-hover:text-white" />
                    )}
                </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm sm:text-base font-mono leading-relaxed text-zinc-300">
                <code>{value.code}</code>
            </pre>
            {value.filename && (
                <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-xs font-mono text-white/40">
                    {value.filename}
                </div>
            )}
        </div>
    );
}

export function BlogRenderer({ blocks, sanityContent, metadata }: BlogRendererProps) {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
            {metadata && (
                <div className="font-mono text-base tracking-tight text-foreground/50 flex gap-2">
                    <span>{metadata.category}</span>
                    <span>•</span>
                    <span>{metadata.date}</span>
                </div>
            )}
            {sanityContent ? (
                <PortableText value={sanityContent} components={components} />
            ) : blocks ? (
                blocks.map((block, index) => (
                    <div key={index}>
                        <BlockSelector block={block} />
                    </div>
                ))
            ) : null}
        </div>
    );
}

function BlockSelector({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case 'h1':
            return (
                <h1 className="font-mono text-3xl sm:text-4xl font-medium leading-tight text-foreground mt-4 mb-8">
                    {block.content}
                </h1>
            );
        case 'h2':
            return (
                <h2 className="font-mono text-3xl font-bold tracking-tighter text-foreground mt-12 mb-6">
                    {block.content}
                </h2>
            );
        case 'h3':
            return (
                <h3 className="font-mono text-2xl font-bold tracking-tighter text-foreground mt-10 mb-4">
                    {block.content}
                </h3>
            );
        case 'text':
            return (
                <p className="font-mono text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                    {formatText(block.content || '')}
                </p>
            );
        case 'divider':
            return <hr className="border-border my-12" />;
        case 'bullet-list':
            return (
                <ul className="space-y-4 my-8">
                    {block.items?.map((item, idx) => (
                        <li key={idx} className="flex font-mono text-lg text-foreground/80 leading-relaxed">
                            <span className="mr-4 text-foreground/40 mt-1">■</span>
                            {formatText(item || '')}
                        </li>
                    ))}
                </ul>
            );
        case 'ordered-list':
            return (
                <ol className="space-y-4 my-8 list-none">
                    {block.items?.map((item, idx) => (
                        <li key={idx} className="flex font-mono text-lg text-foreground/80 leading-relaxed">
                            <span className="mr-4 text-foreground/40">{idx + 1}.</span>
                            {formatText(item || '')}
                        </li>
                    ))}
                </ol>
            );
        case 'blockquote':
            return (
                <blockquote className="border-l-4 border-foreground/20 bg-muted/30 p-8 my-10 rounded-sm">
                    <p className="font-mono text-lg leading-relaxed text-foreground/70 italic">
                        {formatText(block.content || '')}
                    </p>
                </blockquote>
            );
        case 'code-block':
            return (
                <div className="my-10 border border-border rounded-sm overflow-hidden bg-[#1E1E1E]">
                    <pre className="p-6 overflow-x-auto text-sm sm:text-base font-mono leading-relaxed text-zinc-300">
                        <code>{block.content}</code>
                    </pre>
                </div>
            )
        case 'image':
            return (
                <div className="my-12 space-y-4">
                    <div className="relative w-full aspect-video border border-border bg-muted overflow-hidden">
                        <Image
                            src={block.src || ''}
                            alt={block.caption || 'Blog image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            );
        default:
            return null;
    }
}

/**
 * Basic text formatter for inline markdown-like styles:
 * `code`, _underline_, ~~strikethrough~~
 */
function formatText(text: string) {
    const parts = text.split(/(`[^`]+`|_[^_]+_|~~[^~]+~~)/g);

    return parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">
                    {part.slice(1, -1)}
                </code>
            );
        }
        if (part.startsWith('_') && part.endsWith('_')) {
            return <u key={i}>{part.slice(1, -1)}</u>;
        }
        if (part.startsWith('~~') && part.endsWith('~~')) {
            return <del key={i}>{part.slice(2, -2)}</del>;
        }
        return part;
    });
}
