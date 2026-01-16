import React from 'react';
import Link from 'next/link';

interface ContentCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    href?: string;
    buttonText?: string;
    className?: string;
}

export function ContentCard({
    title,
    description,
    icon,
    href,
    buttonText,
    className = '',
}: ContentCardProps) {
    return (
        <div
            className={`group relative border border-border bg-card p-8 transition-all hover:border-foreground/20 ${className}`}
        >
            {/* Grid line decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 grid-lines opacity-30" />

            {icon && (
                <div className="mb-6 text-foreground/60">
                    {icon}
                </div>
            )}

            <h3 className="font-mono text-base sm:text-lg font-medium mb-4">
                {title}
            </h3>

            <p className="font-mono text-sm text-foreground/70 leading-relaxed mb-6">
                {description}
            </p>

            {href && buttonText && (
                <Link
                    href={href}
                    className="inline-flex items-center font-mono text-sm bg-foreground text-background px-6 py-3 hover:opacity-90 transition-opacity"
                >
                    {buttonText}
                </Link>
            )}
        </div>
    );
}
