"use client";

import React from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import { ContentBlock } from '@/lib/reveries-data';

export function BlogRenderer({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
            {blocks.map((block, index) => (
                <div key={index}>
                    <BlockSelector block={block} />
                </div>
            ))}
        </div>
    );
}

function BlockSelector({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case 'tag':
            return (
                <div className="font-mono text-base tracking-tight text-foreground/50 flex gap-2">
                    <span>{block.metadata?.category}</span>
                    <span>•</span>
                    <span>{block.metadata?.date}</span>
                </div>
            );
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
                            {formatText(item)}
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
                            {formatText(item)}
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
            return <CodeBlock block={block} />;
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
                    {block.caption && (
                        <p className="font-mono text-sm text-center text-muted-foreground italic">
                            {block.caption}
                        </p>
                    )}
                </div>
            );
        default:
            return null;
    }
}

function CodeBlock({ block }: { block: ContentBlock }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(block.content || '');
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
                <code>{block.content}</code>
            </pre>
        </div>
    );
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
