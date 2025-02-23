// Input.tsx
import React from 'react';

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    className?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text', className }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className={`border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 transition-all ${className}`}
        />
    );
};
