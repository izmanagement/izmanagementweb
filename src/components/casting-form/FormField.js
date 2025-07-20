// src/components/casting-form/FormField.js
import React from 'react';

const FormField = ({ name, type = 'text', label, value, onChange, error }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
            autoComplete="off"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default FormField;