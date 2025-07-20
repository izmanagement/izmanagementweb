// src/components/Footer.js
import React from 'react';

const Footer = () => (
    <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400 tracking-wider">
            <p>&copy; {new Date().getFullYear()} IZMGMT. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
    </footer>
);

export default Footer;