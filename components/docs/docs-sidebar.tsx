'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { DOCS_NAVIGATION, DocNavItem } from '@/lib/docs-data';

export function DocsSidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const params = useParams();
    const pathname = usePathname();
    const currentSlug = (params.slug as string[])?.join('/') || '';

    // Simple search filtering
    const filteredNavigation = useMemo(() => {
        if (!searchQuery) return DOCS_NAVIGATION;

        const filterItems = (items: DocNavItem[]): DocNavItem[] => {
            return items.reduce((acc: DocNavItem[], item) => {
                const matches = item.title.toLowerCase().includes(searchQuery.toLowerCase());
                const subItems = item.items ? filterItems(item.items) : [];

                if (matches || subItems.length > 0) {
                    acc.push({ ...item, items: subItems.length > 0 ? subItems : undefined });
                }
                return acc;
            }, []);
        };

        return filterItems(DOCS_NAVIGATION);
    }, [searchQuery]);

    return (
        <aside className="w-[320px] pt-12 h-[calc(100vh-64px)] sticky top-16 border-r border-border bg-background overflow-y-auto hidden md:block z-30 shrink-0">
            {/* Search Section */}
            <div className="border-y border-border sticky top-0 bg-background z-10">
                <div className="relative py-2 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Quick Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-12 pr-12 text-md font-mono focus:outline-none focus:border-foreground transition-colors"
                    />
                    <div className="absolute right-0 top-0 px-2 py-1 bg-muted text-[12px] font-semibold font-mono text-muted-foreground">
                        <span className='mr-2'>⌘</span>
                        <span>K</span>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="py-4">
                <nav className="space-y-1">
                    {filteredNavigation.map((item, idx) => (
                        <SidebarItem
                            key={idx}
                            item={item}
                            depth={0}
                            currentSlug={currentSlug}
                            pathname={pathname}
                        />
                    ))}
                </nav>
            </div>
        </aside>
    );
}

function SidebarItem({
    item,
    depth,
    currentSlug,
    pathname
}: {
    item: DocNavItem;
    depth: number;
    currentSlug: string;
    pathname: string;
}) {
    const isActive = item.slug ? currentSlug === item.slug : false;
    const isChildActive = useMemo(() => {
        const checkActive = (items?: DocNavItem[]): boolean => {
            return items?.some(i => i.slug === currentSlug || checkActive(i.items)) || false;
        };
        return checkActive(item.items);
    }, [item.items, currentSlug]);

    const [isOpen, setIsOpen] = useState(isActive || isChildActive || depth === 0);
    const hasItems = item.items && item.items.length > 0;
    const paddingLeft = depth === 0 ? 'px-6' : depth === 1 ? 'pl-10 pr-6' : 'pl-14 pr-6';

    const content = (
        <div className={`group flex items-center justify-between py-2.5 text-sm font-mono transition-colors hover:bg-muted cursor-pointer ${paddingLeft} ${isActive ? 'bg-muted text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
            <span className="flex-1 text-[13px]">{item.title}</span>
            {hasItems && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className="p-1 hover:text-foreground transition-colors"
                >
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
            )}
        </div>
    );

    return (
        <div>
            {item.slug ? (
                <Link href={`/docs/${item.slug}`}>{content}</Link>
            ) : (
                <div onClick={() => setIsOpen(!isOpen)}>{content}</div>
            )}

            {hasItems && isOpen && (
                <div className="mt-0.5">
                    {item.items?.map((subItem, idx) => (
                        <SidebarItem
                            key={idx}
                            item={subItem}
                            depth={depth + 1}
                            currentSlug={currentSlug}
                            pathname={pathname}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
