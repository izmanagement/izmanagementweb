import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full px-4 sm:px-8 py-10 mt-16">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center items-center space-x-6 mb-6">
                    <a href="mailto:info@izmanagementglobal.com" className="text-gray-400 hover:text-black transition-colors" aria-label="Email">
                        <Image src="/logos_gmail.svg" alt="Email Icon" width={36} height={36} />
                    </a>
                    <a href="https://instagram.com/izmanagementglobal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="Instagram">
                        <Image src="/logos_instagram.svg" alt="Instagram Icon" width={36} height={36} />
                    </a>
                    <a href="https://tiktok.com/@izmanagementglobal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label="TikTok">
                         <Image src="/logos_tiktok.svg" alt="TikTok Icon" width={36} height={36} />
                    </a>
                </div>
                <p className="text-xs text-gray-400">&copy; 2025 IZMGMT. TODOS LOS DERECHOS RESERVADOS.</p>
            </div>
        </footer>
    );
}
