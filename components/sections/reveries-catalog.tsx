'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Grid, List, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { GridBackground } from '../ui/grid-background';

const CATEGORIES = ['All Categories', 'TEE Security', 'Dolor Sit', 'Lorem Ipsum', 'Signum Dolor'];

const ALL_REVERIES = [
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
    {
        title: 'Debunking the TeeDotFail Panic: Why TEEs Are Still Viable for Secure Computing',
        date: 'December 12, 2023',
        category: 'TEE Security',
        href: '#',
    },
];

export function ReveriesCatalog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredReveries = ALL_REVERIES.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredReveries.length / itemsPerPage);
    const paginatedReveries = filteredReveries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b border-border transition-all duration-700">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/dark-mode/dark-footer.png)',
                        filter: 'grayscale(100%) contrast(1.2) brightness(0.6)'
                    }}
                />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />

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
                <div className="max-w-[1300px] pt-8 border-t border-border mx-auto bg-background flex flex-wrap">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-6 font-mono text-base  border-r border-y border-border transition-all ${selectedCategory === cat
                                ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <button className="px-10 py-6 font-mono text-base border-r border-y border-border text-muted-foreground hover:text-foreground transition-colors md:block hidden">
                        + More
                    </button>
                </div>
            </div>

            {/* View Toggle */}
            <div className="max-w-[1300px] mx-auto border-x border-border flex justify-end mt-16 bg-background">
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
            <div className="max-w-[1300px] mx-auto border-x border-t border-border min-h-[600px] bg-background">
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
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }} />
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
                                <div className="flex items-start justify-end transition-colors">
                                    <div className="border-l border-b border-border">
                                        <ArrowUpRight className="w-18 h-18 stroke-[1.4px] group-hover:text-foreground group-hover:scale-110 transition-all" />
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
                                className="group border-b border-r border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/10 transition-colors p-8 sm:p-12 flex flex-col h-full"
                            >
                                <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-900 border border-border mb-8 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: 'url(/dark-mode/dark-footer.png)' }} />
                                </div>

                                {/* FIXED GRID ARROW: Title and Arrow share a row */}
                                <div className="flex items-start justify-between gap-4 mb-auto">
                                    <h3 className="font-mono text-lg sm:text-xl font-bold group-hover:text-foreground transition-colors">
                                        {blog.title}
                                    </h3>
                                    <div className="border border-border shrink-0 bg-background group-hover:border-foreground transition-colors">
                                        <ArrowUpRight className="w-14 h-14 stroke-[1.5px]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground pt-12">
                                    <span className="font-bold">{blog.category}</span>
                                    <span>{blog.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Section */}
            <div className="max-w-[1300px] mx-auto border-x border-border p-20 flex justify-center bg-zinc-50/30 dark:bg-zinc-950/30">
                <div className="flex border border-border bg-background shadow-sm">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-10 py-5 font-mono text-sm uppercase border-r border-border hover:bg-muted transition-colors disabled:opacity-20 flex items-center gap-3 font-bold"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-8 py-5 font-mono text-sm border-r border-border last:border-r-0 hover:bg-muted transition-colors font-bold ${currentPage === i + 1 ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'text-muted-foreground'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-10 py-5 font-mono text-sm uppercase hover:bg-muted transition-colors disabled:opacity-20 border-l border-border flex items-center gap-3 font-bold"
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
