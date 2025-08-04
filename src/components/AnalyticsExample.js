
'use client'; // Necesario para usar hooks como useState y onClick

import { useState } from 'react';
import { sendEvent } from '../lib/gtag'; // ¡Importamos nuestra función mágica!

/**
 * Este es un componente de EJEMPLO.
 * NO lo uses directamente en producción.
 * Su propósito es mostrarte CÓMO llamar a `sendEvent` en cada acción.
 * Debes copiar esta lógica a TUS PROPIOS componentes.
 */
export default function AnalyticsExample() {
  const [step, setStep] = useState(1);
  const [photoCount, setPhotoCount] = useState(0);

  // --- Evento: start_application ---
  const handleStartApplication = () => {
    sendEvent('start_application');
    alert("Evento 'start_application' enviado. Normalmente, aquí navegarías al formulario.");
  };

  // --- Evento: complete_step1 ---
  const handleGoToStep2 = () => {
    sendEvent('complete_step1');
    setStep(2);
  };

  // --- Evento: upload_photos_complete ---
  const handlePhotoUpload = () => {
    const newCount = photoCount + 1;
    setPhotoCount(newCount);
    if (newCount === 3) {
      sendEvent('upload_photos_complete');
      alert("Evento 'upload_photos_complete' enviado (3 fotos subidas).");
    }
  };
  
  // --- Evento: upload_video ---
  const handleVideoUpload = () => {
    sendEvent('upload_video');
    alert("Evento 'upload_video' enviado.");
  };

  // --- Eventos: attempt_submission y submit_application ---
  const handleFinalSubmit = (event) => {
    event.preventDefault();
    sendEvent('attempt_submission');
    // Simula una llamada a tu backend que tiene éxito
    const isSuccess = true; 
    if (isSuccess) {
      sendEvent('submit_application');
      alert("Eventos 'attempt_submission' y 'submit_application' enviados.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Ejemplo de Tracking de Eventos</h1>
      
      <div className="space-y-6">
        {/* 1. Botón de Inicio (para la página principal) */}
        <div className="p-4 border border-gray-700 rounded-md bg-gray-800">
          <p className="font-semibold mb-2">1. En tu página de inicio:</p>
          <button onClick={handleStartApplication} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Aplicar Ahora (start_application)</button>
        </div>

        {/* 2. Formulario Multi-paso */}
        <div className="p-4 border border-gray-700 rounded-md bg-gray-800">
          <p className="font-semibold mb-2">2. En el Paso 1 del formulario:</p>
          <button onClick={handleGoToStep2} disabled={step !== 1} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-600">Completar Paso 1 (complete_step1)</button>
        </div>

        {/* 3. Subida de Archivos */}
        <div className="p-4 border border-gray-700 rounded-md bg-gray-800">
          <p className="font-semibold mb-2">3. En la sección de subida de archivos:</p>
          <div className="flex space-x-4">
            <button onClick={handlePhotoUpload} disabled={photoCount >= 3} className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-600">Subir Foto (upload_photos_complete al 3ro)</button>
            <button onClick={handleVideoUpload} className="flex-1 bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition-colors">Subir Video (upload_video)</button>
          </div>
          <p className="text-center mt-2 text-sm text-gray-400">Fotos subidas: {photoCount}</p>
        </div>

        {/* 4. Envío Final */}
        <div className="p-4 border border-gray-700 rounded-md bg-gray-800">
          <p className="font-semibold mb-2">4. Al final del formulario:</p>
          <form onSubmit={handleFinalSubmit} className="flex flex-col">
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">Finalizar Aplicación (attempt & submit)</button>
          </form>
        </div>
      </div>
    </div>
  );
}
