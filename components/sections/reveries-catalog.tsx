'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Grid, List, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { GridBackground } from '../ui/grid-background';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { IS_DEV, MOCK_BLOGS } from '@/lib/mock-data';

const CATEGORIES = ['All Categories', 'TEE Security', 'Dolor Sit', 'Lorem Ipsum', 'Signum Dolor'];

const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    bannerImage,
    category,
    publishedAt
}`;

export function ReveriesCatalog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All Categories']);
    const [customFilters, setCustomFilters] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [allItems, setAllItems] = useState<any[]>([]);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchBlogs = async () => {
            if (IS_DEV) {
                setAllItems(MOCK_BLOGS.map(post => ({
                    title: post.title,
                    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long', day: '2-digit', year: 'numeric'
                    }) : 'Coming soon',
                    category: post.category,
                    href: `/reveries/${post.slug}`,
                    src: post.src
                })));
                return;
            }

            try {
                const blogs = await client.fetch(BLOGS_QUERY);
                setAllItems(blogs.map((post: any) => ({
                    title: post.title,
                    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                    }) : 'Coming soon',
                    category: post.category || 'General',
                    href: `/reveries/${post.slug}`,
                    src: post.bannerImage ? urlFor(post.bannerImage).url() : null
                })));
            } catch (err) {
                console.error("Failed to fetch Sanity blogs", err);
            }
        };
        fetchBlogs();
    }, []);

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev => {
            if (cat === 'All Categories') return ['All Categories'];

            const filtering = prev.filter(c => c !== 'All Categories');
            if (filtering.includes(cat)) {
                const next = filtering.filter(c => c !== cat);
                return next.length === 0 ? ['All Categories'] : next;
            } else {
                return [...filtering, cat];
            }
        });
    };

    const filteredReveries = allItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.includes('All Categories') ||
            selectedCategories.some(cat => item.category.toLowerCase() === cat.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    // Reset to page 1 if filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategories]);

    const totalPages = Math.ceil(filteredReveries.length / itemsPerPage);
    const paginatedReveries = filteredReveries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b border-border">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/Reveries-Catalog.png)',
                    }}
                />

                {/* Simulated Glitch Overlay - Adjusted */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
                        backgroundSize: '100% 2px'
                    }}
                />

                <div className="absolute inset-0 flex items-baseline-last justify-start max-w-[1300px] mt-auto px-6 py-4">
                    <h1 className="font-instrumental text-6xl sm:text-8xl text-zinc-100 drop-shadow-2xl">Reveries</h1>
                </div>
            </div>

            {/* Filter Section */}
            <div>
                {/* Search Bar */}
                <div className="max-w-[1300px] mx-auto flex items-center px-8 h-20 bg-background">
                    <Search className="w-6 h-6 text-muted-foreground mr-6" />
                    <input
                        type="text"
                        placeholder="Search Blogs..."
                        className="flex-1 bg-transparent border-none outline-none font-mono text-xl text-foreground placeholder:text-muted-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="max-w-[1300px] border-t border-border mx-auto bg-background flex flex-wrap">
                    {[...CATEGORIES, ...customFilters].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-8 py-6 font-mono text-base border-r border-b border-border transition-all ${selectedCategories.includes(cat)
                                ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <div className="flex-1 min-w-[200px] border-b border-border flex items-center px-8 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <input
                            type="text"
                            placeholder="+ Add Filter"
                            className="w-full bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = e.currentTarget.value.trim();
                                    if (val) {
                                        if (!CATEGORIES.includes(val) && !customFilters.includes(val)) {
                                            setCustomFilters(prev => [...prev, val]);
                                        }
                                        toggleCategory(val);
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="max-w-[1300px] mx-auto flex justify-end mt-16 bg-background">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-4 border-x border-t border-border transition-all ${viewMode === 'grid' ? 'bg-zinc-100 dark:bg-zinc-900 text-foreground' : 'text-muted-foreground hover:bg-zinc-50'}`}
                >
                    <Grid className="w-10 h-10" />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-4 border-t border-border transition-all ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-zinc-900 text-foreground' : 'text-muted-foreground hover:bg-zinc-50'}`}
                >
                    <List className="w-10 h-10" />
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-[1300px] mx-auto border-t border-border min-h-[600px] bg-background">
                {viewMode === 'list' ? (
                    <div className="flex flex-col">
                        {paginatedReveries.map((blog, index) => (
                            <Link
                                key={index}
                                href={blog.href}
                                className="group flex items-stretch border-b border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/10 transition-colors"
                            >
                                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center p-8 sm:p-14">
                                    <div className="w-full sm:w-64 aspect-video bg-zinc-100 dark:bg-zinc-900 border border-border mb-6 sm:mb-0 sm:mr-12 overflow-hidden shrink-0 relative">
                                        {blog.src ? (
                                            <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: `url(${blog.src})` }} />
                                        ) : (
                                            <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-mono text-lg sm:text-2xl font-bold leading-tight mb-4 max-w-4xl group-hover:text-foreground transition-colors">
                                            {blog.title}
                                        </h3>
                                        <div className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            <span className="font-bold">{blog.category}</span>
                                            <span className="mx-3 text-border">•</span>
                                            <span>{blog.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start justify-end">
                                    <div className="border-l border-b border-border">
                                        <ArrowUpRight className="w-18 h-18 stroke-[1.4px] group-hover:text-foreground" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {paginatedReveries.map((blog, index) => (
                            <Link
                                key={index}
                                href={blog.href}
                                className="group border-b border-r border-border p-8 sm:p-12 flex flex-col h-full"
                            >
                                <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-900 border border-border mb-8 overflow-hidden relative">
                                    {blog.src ? (
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: `url(${blog.src})` }} />
                                    ) : (
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }} />
                                    )}
                                </div>

                                {/* FIXED GRID ARROW: Title and Arrow share a row */}
                                <div className="flex items-start justify-between gap-4 mb-auto">
                                    <h3 className="font-mono text-lg sm:text-xl font-bold group-hover:text-foreground transition-colors">
                                        {blog.title}
                                    </h3>
                                    <div className="border border-border shrink-0 bg-background group-hover:bg-foreground">
                                        <ArrowUpRight className="w-14 h-14 stroke-[1.5px] group-hover:text-background" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground pt-12">
                                    <span className="font-bold">{blog.category}</span>
                                    <span>{blog.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Section */}
            <div className="max-w-[1300px] mx-auto p-12 flex justify-center bg-zinc-50/30 dark:bg-zinc-950/30">
                <div className="flex border border-border bg-background shadow-sm">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-10 py-5 font-mono text-sm border-y border-border hover:bg-muted transition-colors disabled:opacity-20 flex items-center gap-3 font-bold"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-8 py-5 font-mono text-base border-y border-border last:border-r-0 font-semibold ${currentPage === i + 1 ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'text-muted-foreground'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-10 py-5 font-mono text-base hover:bg-muted transition-colors disabled:opacity-20 border-l border-border flex items-center gap-3 font-semibold"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
