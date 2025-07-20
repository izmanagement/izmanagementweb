// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* CAMBIO: Aumentamos la altura para más espacio */}
            <div className="flex items-center justify-between h-24">
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900">
                        IZMGMT
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#" className="text-base tracking-tight text-gray-500 hover:text-black transition-colors">
                        STUDIO
                    </Link>
                    <Link href="#" className="text-base tracking-tight text-gray-500 hover:text-black transition-colors">
                        MODELOS
                    </Link>
                    <Link href="/become-a-model" className="text-base tracking-tight text-black">
                        CASTING
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

export default Navbar;