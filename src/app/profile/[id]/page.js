// src/app/profile/[id]/page.js
import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

async function getApplicationData(id) {
  try {
    const data = await kv.get(id);
    if (!data) return null;
    return data;
  } catch (error) {
    console.error("Error fetching data from Vercel KV:", error);
    return null;
  }
}

export default async function ProfilePage({ params }) {
  const data = await getApplicationData(params.id);

  if (!data) {
    notFound();
  }

  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-black">{value || 'No especificado'}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <h1 className="text-4xl font-bold tracking-tighter">{data.fullName}</h1>
            <p className="text-lg text-gray-600 mt-2">@{data.instagram}</p>
            
            <div className="mt-8 space-y-4 border-t pt-6">
              <DetailItem label="Email" value={data.email} />
              <DetailItem label="País" value={data.country} />
              <DetailItem label="Teléfono" value={data.phone} />
              <DetailItem label="Estatura" value={`${data.height} cm`} />
              <DetailItem label="Género" value={data.gender} />
            </div>

            {/* CAMBIO: El botón de descarga ha sido eliminado */}
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {data.files?.facePhoto && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Foto de Rostro</h2>
                  <img src={data.files.facePhoto} alt="Foto de Rostro" className="w-full h-auto object-cover border" />
                </div>
              )}
              {data.files?.mediumPhoto && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Foto de Medio Cuerpo</h2>
                  <img src={data.files.mediumPhoto} alt="Foto de Medio Cuerpo" className="w-full h-auto object-cover border" />
                </div>
              )}
              {data.files?.fullBodyPhoto && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Foto de Cuerpo Completo</h2>
                  <img src={data.files.fullBodyPhoto} alt="Foto de Cuerpo Completo" className="w-full h-auto object-cover border" />
                </div>
              )}
              {data.files?.video && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Video de Presentación</h2>
                  <video src={data.files.video} controls className="w-full h-auto border"></video>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}