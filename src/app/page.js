// src/app/page.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">Bienvenido al Casting de IZ MANAGEMENT</h1>
            <p className="mt-4 text-lg text-gray-600">Estamos buscando el próximo gran talento. ¿Eres tú?</p>
            <div className="mt-8">
                <Link href="/become-a-model" className="inline-block px-8 py-3 text-sm font-bold tracking-wider uppercase rounded-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors">
                    Aplicar ahora
                </Link>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}