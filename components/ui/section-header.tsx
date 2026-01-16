import React from 'react';

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export function SectionHeader({ title, className = '' }: SectionHeaderProps) {
    return (
        <div className={`relative ${className}`}>
            <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest font-medium">
                {title}
            </h2>
            <div className="absolute -right-full top-1/2 w-screen h-px bg-border opacity-50" />
        </div>
    );
}
