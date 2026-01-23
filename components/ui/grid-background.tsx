import React from 'react';

interface GridBackgroundProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    withNoise?: boolean;
    backgroundImage?: string;
    withCross?: boolean;
}

export function GridBackground({
    children,
    id,
    className = '',
    backgroundImage,
}: GridBackgroundProps) {
    return (
        <div
            id={id}
            className={`relative ${className}`}
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            } : {}}
        >
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
