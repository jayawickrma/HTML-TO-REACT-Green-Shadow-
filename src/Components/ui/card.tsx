// Card.tsx
import React from 'react';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`text-xl font-semibold mb-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};
