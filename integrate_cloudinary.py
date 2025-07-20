import os

# --- Contenido Actualizado de los Archivos ---

# 1. Step2.js (Con aviso de límite de tamaño para imágenes y video)
step2_code = """
// src/components/casting-form/Step2.js
import React from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, Video } from 'lucide-react';

const UploadField = ({ title, fileType, onUpload, uploadedFileUrl }) => {
    const isUploaded = !!uploadedFileUrl;
    const isVideo = fileType === 'video';

    return (
        <div className="w-full text-center">
            <div className="relative w-full aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {isUploaded ? (
                    isVideo ? (
                        <video key={uploadedFileUrl} controls className="w-full h-full object-cover">
                            <source src={uploadedFileUrl} type="video/mp4" />
                            Tu navegador no soporta el tag de video.
                        </video>
                    ) : (
                        <img src={uploadedFileUrl} alt={`Vista previa de ${title}`} className="w-full h-full object-cover" />
                    )
                ) : (
                    <div className="text-center text-gray-400">
                        {isVideo ? <Video size={48} /> : <ImageIcon size={48} />}
                        <p className="mt-2 text-sm">Ejemplo de {title}</p>
                    </div>
                )}
            </div>

            <div className="mt-4">
                 <button
                    type="button"
                    onClick={() => onUpload(fileType)}
                    className={`w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
                        isUploaded
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {isUploaded ? <CheckCircle size={16} className="mr-2" /> : <UploadCloud size={16} className="mr-2" />}
                    {isUploaded ? 'Cambiar Archivo' : 'Subir Archivo'}
                </button>
                <p className="mt-2 text-xs text-gray-500">
                    Tamaño máximo: {isVideo ? '100 MB' : '10 MB'}.
                </p>
            </div>
        </div>
    );
};

const Step2 = ({ uploadedFiles, onUpload, error }) => {
    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                <UploadField title="Foto de Rostro" fileType="facePhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.facePhoto} />
                <UploadField title="Foto Medio Cuerpo" fileType="mediumPhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.mediumPhoto} />
                <UploadField title="Foto Cuerpo Completo" fileType="fullBodyPhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.fullBodyPhoto} />
                <UploadField title="Video de Presentación" fileType="video" onUpload={onUpload} uploadedFileUrl={uploadedFiles.video} />
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </div>
    );
};

export default Step2;
"""

# 2. become-a-model/page.js (Con carpetas dinámicas y lógica de finalización)
become_a_model_page_code = """
// src/app/become-a-model/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Step1 from '../../components/casting-form/Step1';
import Step2 from '../../components/casting-form/Step2';
import Step3 from '../../components/casting-form/Step3';

export default function BecomeAModelPage() {
    // --- Credenciales de Cloudinary (¡REEMPLAZAR!) ---
    const CLOUDINARY_CLOUD_NAME = "TU_CLOUD_NAME";
    const CLOUDINARY_UPLOAD_PRESET = "TU_UPLOAD_PRESET";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', country: '', email: '',
        phone: { code: '+502', number: '' },
        height: '', instagram: '', gender: '',
    });
    const [uploadedFiles, setUploadedFiles] = useState({
        facePhoto: null, mediumPhoto: null,
        fullBodyPhoto: null, video: null,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = {
        onCodeChange: (code) => setFormData(prev => ({ ...prev, phone: { ...prev.phone, code } })),
        onNumberChange: (e) => {
            setFormData(prev => ({ ...prev, phone: { ...prev.phone, number: e.target.value } }));
        },
    };
    
    const handleFileUpload = (fileType) => {
        if (!window.cloudinary) {
            console.error("El widget de Cloudinary no está listo.");
            return;
        }

        // Se crea la ruta de la carpeta dinámica
        const date = new Date();
        const year = date.getFullYear();
        const month = date.toLocaleString('es-ES', { month: 'long' });
        const applicantName = formData.fullName.trim().replace(/\\s+/g, '_') || 'sin_nombre';
        const dynamicFolder = `casting/${year}/${month}/${applicantName}`;

        const isVideo = fileType === 'video';

        const options = {
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            folder: dynamicFolder, // <-- AQUÍ SE USA LA CARPETA DINÁMICA
            sources: ['local', 'url', 'camera', 'instagram'],
            multiple: false,
            maxFiles: 1,
            cropping: !isVideo,
            resourceType: isVideo ? 'video' : 'image',
            clientAllowedFormats: isVideo ? ['mp4', 'mov', 'avi'] : ['jpg', 'jpeg', 'png', 'heic'],
            maxFileSize: isVideo ? 100000000 : 10000000,
        };

        const myWidget = window.cloudinary.createUploadWidget(options, (error, result) => { 
            if (error) {
                console.error("Error de Cloudinary:", error);
                setErrors(prev => ({...prev, files: 'Hubo un error al subir el archivo.'}));
                return;
            }
            if (result && result.event === "success") { 
                console.log('¡Subida exitosa! Info: ', result.info);
                setUploadedFiles(prev => ({ ...prev, [fileType]: result.info.secure_url }));
                setErrors(prev => ({...prev, files: null}));
            }
        });
        myWidget.open();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log("Enviando datos al backend...");
        // Aquí irá la lógica para enviar a Vercel KV
        // Por ahora, simulamos un envío y avanzamos al paso final
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(3); // Avanzar a la pantalla de confirmación
        }, 1500);
    };

    const nextStep = () => setStep(s => (s < 2 ? s + 1 : s)); // Solo hasta el paso 2
    const prevStep = () => setStep(s => (s > 1 ? s - 1 : s));

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <Step1 formData={formData} handleInputChange={handleInputChange} handlePhoneChange={handlePhoneChange} errors={errors} />;
            case 2:
                return <Step2 uploadedFiles={uploadedFiles} onUpload={handleFileUpload} error={errors.files} />;
            case 3:
                return <Step3 />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-24 items-start">
                        <div className="lg:col-span-4 mb-12 lg:mb-0">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">Become a Model</h1>
                            <p className="mt-4 text-gray-600 text-lg">Completa los siguientes pasos para ser parte de nuestro proceso de selección.</p>
                            <div className="mt-12 space-y-6">
                                <div className={`flex items-center gap-4 ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 1 ? 'border-black bg-black text-white' : 'border-gray-300'}`}>1</div>
                                    <span className="font-medium">Datos Personales</span>
                                </div>
                                <div className={`flex items-center gap-4 ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 2 ? 'border-black bg-black text-white' : 'border-gray-300'}`}>2</div>
                                    <span className="font-medium">Material Fotográfico</span>
                                </div>
                                <div className={`flex items-center gap-4 ${step >= 3 ? 'text-black' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 3 ? 'border-black bg-black text-white' : 'border-gray-300'}`}>3</div>
                                    <span className="font-medium">Confirmación</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div>
                                {renderStepContent()}
                                <div className="flex items-center justify-between mt-12">
                                    <button onClick={prevStep} className={`inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-gray-500 hover:text-black focus:outline-none transition-all duration-300 ${step > 1 ? 'opacity-100' : 'opacity-0'}`}>
                                        <ArrowLeft size={16} className="mr-2" /> Anterior
                                    </button>
                                    {step === 1 && (
                                        <button onClick={nextStep} className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors">
                                            Siguiente <ArrowRight size={16} className="ml-2" />
                                        </button>
                                    )}
                                    {step === 2 && (
                                        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors disabled:bg-gray-400">
                                            {isSubmitting ? 'Enviando...' : 'Finalizar Aplicación'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
"""

# --- Lógica del Script ---

def create_or_update_file(path, content):
    """Crea o actualiza un archivo con el contenido especificado."""
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content.strip())
        print(f"✅ Archivo actualizado: {path}")
    except Exception as e:
        print(f"❌ Error al actualizar el archivo {path}: {e}")

def main():
    """Función principal para integrar Cloudinary."""
    print("--- Iniciando la integración de Cloudinary con carpetas dinámicas ---")

    files_to_update = {
        "src/components/casting-form/Step2.js": step2_code,
        "src/app/become-a-model/page.js": become_a_model_page_code,
    }

    for path, content in files_to_update.items():
        create_or_update_file(path, content)
        
    print("\\n--- ¡Integración completada exitosamente! ---")
    print("IMPORTANTE: No olvides reemplazar 'TU_CLOUD_NAME' y 'TU_UPLOAD_PRESET' en 'src/app/become-a-model/page.js'.")
    print("Ejecuta 'npm run dev' para ver los cambios.")


if __name__ == "__main__":
    main()
