// src/components/casting-form/PhoneField.js
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
    { name: 'Guatemala', code: '+502' }, { name: 'United States', code: '+1' },
    { name: 'Mexico', code: '+52' }, { name: 'Spain', code: '+34' },
    { name: 'Argentina', code: '+54' }, { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' }, { name: 'Belgium', code: '+32' },
    { name: 'Bolivia', code: '+591' }, { name: 'Brazil', code: '+55' },
    { name: 'Canada', code: '+1' }, { name: 'Chile', code: '+56' },
    { name: 'China', code: '+86' }, { name: 'Colombia', code: '+57' },
    { name: 'Costa Rica', code: '+506' }, { name: 'Cuba', code: '+53' },
    { name: 'Denmark', code: '+45' }, { name: 'Dominican Republic', code: '+1' },
    { name: 'Ecuador', code: '+593' }, { name: 'El Salvador', code: '+503' },
    { name: 'France', code: '+33' }, { name: 'Germany', code: '+49' },
    { name: 'Greece', code: '+30' }, { name: 'Honduras', code: '+504' },
    { name: 'India', code: '+91' }, { name: 'Italy', code: '+39' },
    { name: 'Japan', code: '+81' }, { name: 'Netherlands', code: '+31' },
    { name: 'Nicaragua', code: '+505' }, { name: 'Norway', code: '+47' },
    { name: 'Panama', code: '+507' }, { name: 'Paraguay', code: '+595' },
    { name: 'Peru', code: '+51' }, { name: 'Portugal', code: '+351' },
    { name: 'Puerto Rico', code: '+1' }, { name: 'Russia', code: '+7' },
    { name: 'South Africa', code: '+27' }, { name: 'South Korea', code: '+82' },
    { name: 'Sweden', code: '+46' }, { name: 'Switzerland', code: '+41' },
    { name: 'Turkey', code: '+90' }, { name: 'United Kingdom', code: '+44' },
    { name: 'Uruguay', code: '+598' }, { name: 'Venezuela', code: '+58' }
].sort((a, b) => a.name.localeCompare(b.name));

const PhoneField = ({ label, value, onCodeChange, onNumberChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">{label}</label>
            <div className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors">
                <div className="relative" ref={dropdownRef}>
                    <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center p-2">
                        <span className="font-medium">{value.code}</span>
                        <ChevronDown size={16} className={`ml-1 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="absolute bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                            <ul className="max-h-60 overflow-auto">
                                {countries.map(country => (
                                    <li key={country.name + country.code} onClick={() => { onCodeChange(country.code); setIsOpen(false); }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex justify-between">
                                        <span>{country.name}</span>
                                        <span className="text-gray-500">{country.code}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <input type="tel" value={value.number} onChange={onNumberChange} className="w-full p-2 bg-transparent focus:outline-none" autoComplete="off" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default PhoneField;