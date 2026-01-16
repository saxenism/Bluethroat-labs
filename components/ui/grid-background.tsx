import React from 'react';

interface GridBackgroundProps {
    children: React.ReactNode;
    className?: string;
    withNoise?: boolean;
    backgroundImage?: string;
    withCross?: boolean;
}

export function GridBackground({
    children,
    className = '',
    withNoise = true,
    backgroundImage,
    withCross = false
}: GridBackgroundProps) {
    return (
        <div
            className={`grid-lines ${withNoise ? 'grid-noise' : ''} ${withCross ? 'grid-cross' : ''} ${className}`}
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
            } : {}}
        >
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
