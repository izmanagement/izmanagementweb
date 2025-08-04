'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendEvent } from '../lib/gtag';

// 1. Importa los componentes en lugar de redefinirlos
import Navbar from '../components/Navbar'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/Footer'; // Asegúrate de que la ruta sea correcta

// Datos para las fotos de ejemplo con tus URLs finales de Cloudinary.
const examplePhotos = {
    men: [
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081613/M1_rrftdi.webp",
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081613/M2_aubtsd.webp",
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081613/M3_bzqzl1.webp"
    ],
    women: [
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081636/W1_nsl51m.webp",
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081637/W2_mqpolw.webp",
        "https://res.cloudinary.com/dnl6qgwds/image/upload/v1753081636/W3_cqdttk.webp"
    ]
};

// Datos para las preguntas frecuentes
const faqs = {
    application: [
        { q: "¿Necesito experiencia previa?", a: "No, no es necesaria. Buscamos talento nuevo con potencial, sin importar si has trabajado como modelo antes." },
        { q: "¿Tiene algún costo aplicar?", a: "No, el proceso de aplicación es completamente gratuito. Nunca te pediremos dinero para ser considerado." },
        { q: "¿Qué sucede después de enviar mi aplicación?", a: "Nuestro equipo de scouting revisará cada aplicación. Debido al alto volumen, solo contactaremos a los perfiles preseleccionados en un plazo de 2 a 4 semanas." },
        { q: "¿Qué pasa si no me eligen?", a: "No te desanimes. El mundo del modelaje es muy específico. Siempre habrá más oportunidades y castings en el futuro." },
        { q: "¿Puedo aplicar si tengo una discapacidad?", a: "Sí, por supuesto. Nuestro casting es inclusivo y abierto a todo tipo de perfiles. Lo más importante es el potencial y la actitud." }
    ],
    photos: [
        { q: "¿Las fotos deben ser profesionales?", a: "No es necesario. Lo más importante es que sean recientes, con buena luz natural y sin filtros. Un fondo simple y ropa neutra funcionan mejor." },
        { q: "¿Qué ropa debo usar?", a: "Hombres: Playera negra y jeans. Mujeres: Tank top negro, jeans y tacones. Lo importante es que la ropa sea ajustada para poder ver bien tu complexión." },
        { q: "¿Qué fondo debo usar?", a: "Una pared lisa y de color claro (blanco, gris claro, beige) es ideal. Asegúrate de que no haya desorden o distracciones detrás de ti." },
        { q: "¿Puedo usar maquillaje o accesorios?", a: "El maquillaje debe ser lo más natural posible. Evita usar gorras, lentes de sol o accesorios grandes que puedan ocultar tus rasgos." },
        { q: "¿Puedo tener brackets, tatuajes o piercings?", a: "Sí, absolutamente. Buscamos perfiles auténticos y únicos. No es necesario que ocultes tus tatuajes, piercings o brackets." }
    ]
};

// Componente para un item individual del FAQ (Acordeón)
function FaqItem({ faq, isOpen, onClick }) {
    return (
        <div className="border-b border-gray-200 py-6 cursor-pointer text-left" onClick={onClick}>
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-black">{faq.q}</h3>
                <div className={`plus-icon text-black transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pt-3' : 'max-h-0'}`}>
                <p className="text-gray-600 pr-8">{faq.a}</p>
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---
export default function HomePage() {
    const [activeTab, setActiveTab] = useState('application');
    const [openFaq, setOpenFaq] = useState(null);

    const handleApplyClick = () => {
        sendEvent({
            action: 'start_application',
            category: 'Casting Funnel',
            label: 'Click en Aplicar Ahora'
        });
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;900&display=swap');
                body {
                    font-family: 'Inter Tight', sans-serif;
                }
            `}</style>
            <div className="min-h-screen bg-white text-gray-900">
                {/* 2. Ahora estás usando los componentes importados */}
                <Navbar />
                
                <main className="w-full px-4 py-16 sm:py-24">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-black">
                            Bienvenido al Casting de IZ MANAGEMENT
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Estamos buscando el próximo gran talento. ¿Eres tú?
                        </p>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mt-16 mb-16">
                            {examplePhotos.men.map((src, index) => (
                                <img key={`men-${index}`} src={src} alt="Ejemplo foto masculina" className="w-full h-auto object-cover aspect-[3/4]" />
                            ))}
                            {examplePhotos.women.map((src, index) => (
                                <img key={`women-${index}`} src={src} alt="Ejemplo foto femenina" className="w-full h-auto object-cover aspect-[3/4]" />
                            ))}
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-bold text-xl text-black">Para aplicar, asegúrate de tener a mano:</h2>
                            <ul className="mt-4 text-gray-600 text-lg space-y-2 md:space-y-0 md:flex md:justify-center md:space-x-8">
                                <li>Una foto de rostro</li>
                                <li>Una foto de medio cuerpo</li>
                                <li>Una foto de cuerpo completo</li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <Link href="/become-a-model" onClick={handleApplyClick} className="inline-block bg-black text-white font-bold tracking-wider uppercase px-12 py-4 text-sm hover:bg-gray-800 transition-colors shadow-lg">
                                Aplicar Ahora
                            </Link>
                        </div>
                    </div>

                    <section className="mt-24 sm:mt-32 max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-center text-black">Preguntas Frecuentes</h2>
                        
                        <div className="mt-8 flex justify-center p-1 bg-gray-100 rounded-lg max-w-md mx-auto">
                            <button 
                                onClick={() => setActiveTab('application')} 
                                className={`w-full font-medium py-2 px-1 transition-colors rounded-md ${activeTab === 'application' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                Sobre la Aplicación
                            </button>
                            <button 
                                onClick={() => setActiveTab('photos')} 
                                className={`w-full font-medium py-2 px-1 transition-colors rounded-md ${activeTab === 'photos' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                Sobre las Fotos
                            </button>
                        </div>

                        <div className="mt-8">
                            {faqs[activeTab].map((faq, index) => (
                               <FaqItem 
                                    key={index}
                                    faq={faq}
                                    isOpen={openFaq === index}
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                               />
                            ))}
                        </div>
                    </section>
                </main>

                {/* 3. Y aquí también usas el componente importado */}
                <Footer />
            </div>
        </>
    );
}
