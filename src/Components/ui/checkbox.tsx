// Checkbox.tsx
import React from 'react';

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
};
