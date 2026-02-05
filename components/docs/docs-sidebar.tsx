import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { IS_DEV, MOCK_DOC_NAVIGATION, MOCK_DOCS } from '@/lib/mock-data';

export function DocsSidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [navigation, setNavigation] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
    const params = useParams();
    const pathname = usePathname();
    const currentSlug = (params.slug as string[])?.join('/') || '';

    useEffect(() => {
        const fetchNav = async () => {
            if (IS_DEV) {
                setNavigation(MOCK_DOC_NAVIGATION.items);
                return;
            }

            const query = `*[_type == "docNavigation"][0] {
                items[] {
                    title,
                    "slug": doc->slug.current,
                    items[] {
                        title,
                        "slug": doc->slug.current,
                        items[] {
                            title,
                            "slug": doc->slug.current
                        }
                    }
                }
            }`;
            const data = await client.fetch(query);
            if (data?.items) {
                setNavigation(data.items);
            }
        };
        fetchNav();
    }, []);

    // Content-based search using GROQ
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchQuery.trim()) {
                setSearchResults(null);
                return;
            }

            if (IS_DEV) {
                const results = Object.values(MOCK_DOCS).filter(doc =>
                    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(results);
                return;
            }

            // Search in titles AND content
            const query = `*[_type == "doc" && [title, pt::text(content)] match $searchQuery + "*"] {
                title,
                "slug": slug.current
            }[0...10]`;

            const results = await client.fetch(query, { searchQuery });
            setSearchResults(results);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Simple search filtering for the sidebar tree
    const filteredNavigation = useMemo(() => {
        if (!searchQuery || searchResults) return navigation; // If results exist, we'll show them separately or instead

        const filterItems = (items: any[]): any[] => {
            return items.reduce((acc: any[], item) => {
                const matches = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
                const subItems = item.items ? filterItems(item.items) : [];

                if (matches || subItems.length > 0) {
                    acc.push({ ...item, items: subItems.length > 0 ? subItems : undefined });
                }
                return acc;
            }, []);
        };

        return filterItems(navigation);
    }, [searchQuery, navigation, searchResults]);

    return (
        <aside className="w-[320px] pt-12 h-[calc(100vh-64px)] sticky top-16 border-r border-border bg-background overflow-y-auto hidden md:block z-30 shrink-0">
            {/* Search Section */}
            <div className="border-y border-border sticky top-0 bg-background z-10">
                <div className="relative py-2 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Docs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-12 pr-12 text-md font-mono focus:outline-none focus:border-foreground transition-colors"
                    />
                </div>
            </div>

            {/* Navigation Section */}
            <div>
                <nav>
                    {searchResults ? (
                        <div className="py-4">
                            <div className="px-6 mb-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Search Results</div>
                            {searchResults.length > 0 ? (
                                searchResults.map((result: any, idx: number) => (
                                    <Link key={idx} href={`/docs/${result.slug}`}>
                                        <div className="px-6 py-4 hover:bg-muted font-mono text-sm border-b border-border/50">
                                            {result.title}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-6 py-4 font-mono text-sm text-muted-foreground">No matches found</div>
                            )}
                        </div>
                    ) : (
                        filteredNavigation.map((item: any, idx: number) => (
                            <SidebarItem
                                key={idx}
                                item={item}
                                depth={0}
                                currentSlug={currentSlug}
                                pathname={pathname}
                            />
                        ))
                    )}
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
    item: any;
    depth: number;
    currentSlug: string;
    pathname: string;
}) {
    const isActive = item.slug ? currentSlug === item.slug : false;
    const isChildActive = useMemo(() => {
        const checkActive = (items?: any[]): boolean => {
            return items?.some(i => i.slug === currentSlug || checkActive(i.items)) || false;
        };
        return checkActive(item.items);
    }, [item.items, currentSlug]);

    const [isOpen, setIsOpen] = useState(isActive || isChildActive || depth === 0);
    const hasItems = item.items && item.items.length > 0;
    const paddingLeft = depth === 0 ? 'px-6' : depth === 1 ? 'pl-10 pr-6' : 'pl-14 pr-6';

    const content = (
        <div className={`group flex items-center justify-between py-5 text-sm font-mono transition-colors hover:bg-muted cursor-pointer ${paddingLeft} ${isActive ? 'bg-muted text-foreground border-y border-border' : 'text-muted-foreground hover:text-foreground'}`}>
            <span className="flex-1 text-sm">{item.title}</span>
            {hasItems && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className="p-1 hover:text-foreground transition-colors"
                >
                    {isOpen ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
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
                    {item.items?.map((subItem: any, idx: number) => (
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
