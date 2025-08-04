'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full px-4 sm:px-8 py-5 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="https://izmanagementglobal.com/" className="h-16 w-auto"> 
                    <Image src="/Dark Logo-iz-agency.svg" alt="IZ Management Logo" width={128} height={64} className="h-full w-auto" />
                </Link>
                
                {/* Menú de Escritorio con enlaces actualizados */}
                <nav className="hidden sm:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase">
                    <Link href="https://izmanagementglobal.com/" className="text-gray-500 hover:text-black transition-colors">Inicio</Link>
                    <Link href="https://izmanagementglobal.com/Men.html" className="text-gray-500 hover:text-black transition-colors">Men</Link>
                    <Link href="https://izmanagementglobal.com/Women.html" className="text-gray-500 hover:text-black transition-colors">Women</Link>
                    <Link href="https://casting.izmanagementglobal.com/" className="text-black">Become a Model</Link>
                </nav>

                <div className="sm:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black z-50 relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={isMenuOpen ? "M18 6L6 18" : "M4 6h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d={isMenuOpen ? "M6 6l12 12" : "M4 12h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d={!isMenuOpen ? "M4 18h16" : ""} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Panel de Menú Móvil con enlaces actualizados */}
            <div className={`fixed inset-0 bg-white z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold tracking-wider uppercase">
                    <Link href="https://izmanagementglobal.com/" onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-black transition-colors">Inicio</Link>
                    <Link href="https://izmanagementglobal.com/Men.html" onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-black transition-colors">Men</Link>
                    <Link href="https://izmanagementglobal.com/Women.html" onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-black transition-colors">Women</Link>
                    <Link href="https://casting.izmanagementglobal.com/" onClick={() => setIsMenuOpen(false)} className="text-black">Become a Model</Link>
                </nav>
            </div>
        </header>
    );
}
