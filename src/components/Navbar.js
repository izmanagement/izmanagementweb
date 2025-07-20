// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importamos el componente de Imagen de Next.js

const Navbar = () => (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
                <div className="flex-shrink-0">
                    {/* CAMBIO: Se reemplaza el texto por el logo SVG */}
                    <a href="https://izmanagementglobal.com/">
                        <Image
                            src="/Dark Logo-iz-agency.svg" // La ruta al logo en la carpeta 'public'
                            alt="IZMGMT Logo"
                            width={160} // Ajusta el ancho según sea necesario
                            height={50}  // Ajusta la altura según sea necesario
                            className="h-14 w-auto" // Controla el tamaño visual
                        />
                    </a>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="https://izmanagementglobal.com/Men.html" className="text-base tracking-tight text-gray-500 hover:text-black transition-colors">
                        MEN
                    </a>
                    <a href="https://izmanagementglobal.com/Women.html" className="text-base tracking-tight text-gray-500 hover:text-black transition-colors">
                        WOMEN
                    </a>
                    <Link href="/become-a-model" className="text-base tracking-tight text-black">
                        BECOME A MODEL
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

export default Navbar;