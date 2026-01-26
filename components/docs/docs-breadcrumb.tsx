'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbProps {
    paths: string[];
    onToggleContents?: () => void;
}

export function DocsBreadcrumb({ paths, onToggleContents }: BreadcrumbProps) {
    return (
        <div className="h-12 flex items-center justify-between w-full">
            {/* Path Links */}
            <div className=" pl-6 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase truncate">
                {paths.map((path, idx) => (
                    <React.Fragment key={idx}>
                        <span className={idx === paths.length - 1 ? 'text-foreground' : 'text-muted-foreground'}>{path}</span>
                        {idx < paths.length - 1 && <span className="text-muted-foreground">{'>'}</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Toggle Button - Pushed to the far right */}
            <button
                onClick={onToggleContents}
                className="p-1 left-0 bg-muted transition-colors flex items-center justify-center"
            >
                <ChevronLeft className="w-10 h-10 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
        </div>
    );
}