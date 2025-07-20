// src/components/casting-form/SelectField.js
import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ name, label, value, onChange, error, children }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition-colors appearance-none"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default SelectField;