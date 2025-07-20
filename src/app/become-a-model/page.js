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
    const CLOUDINARY_CLOUD_NAME = "dnl6qgwds";
    const CLOUDINARY_UPLOAD_PRESET = "casting_uploads";

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
        return () => { document.body.removeChild(script); }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = {
        onCodeChange: (code) => setFormData(prev => ({ ...prev, phone: { ...prev.phone, code } })),
        onNumberChange: (e) => setFormData(prev => ({ ...prev, phone: { ...prev.phone, number: e.target.value } })),
    };
    
    const handleFileUpload = (fileType) => {
        if (!window.cloudinary) { console.error("El widget de Cloudinary no está listo."); return; }
        const date = new Date();
        const year = date.getFullYear();
        const month = date.toLocaleString('es-ES', { month: 'long' });
        const applicantName = formData.fullName.trim().replace(/\s+/g, '_') || 'sin_nombre';
        const dynamicFolder = `casting/${year}/${month}/${applicantName}`;
        const isVideo = fileType === 'video';
        const options = {
            cloudName: "dnl6qgwds",
            uploadPreset: "casting_uploads",
            folder: dynamicFolder,
            sources: ['local', 'url', 'camera', 'instagram'],
            multiple: false,
            maxFiles: 1,
            cropping: !isVideo,
            resourceType: isVideo ? 'video' : 'image',
            clientAllowedFormats: isVideo ? ['mp4', 'mov'] : ['jpg', 'jpeg', 'png', 'heic'],
            maxFileSize: isVideo ? 100000000 : 10000000,
        };
        const myWidget = window.cloudinary.createUploadWidget(options, (error, result) => { 
            if (error) { console.error("Error de Cloudinary:", error); return; }
            if (result && result.event === "success") { 
                setUploadedFiles(prev => ({ ...prev, [fileType]: result.info.secure_url }));
            }
        });
        myWidget.open();
    };

    // CAMBIO: La función handleSubmit ahora llama a nuestra API
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrors({});

        // Combinar todos los datos en un solo objeto
        const finalApplication = {
            ...formData,
            phone: `${formData.phone.code} ${formData.phone.number}`, // Unir el número de teléfono
            files: uploadedFiles,
            submittedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalApplication),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Aplicación guardada con ID:", result.applicationId);
                setStep(3); // Avanzar a la pantalla de confirmación
            } else {
                setErrors({ submit: 'Hubo un error al enviar tu aplicación. Inténtalo de nuevo.' });
            }
        } catch (error) {
            console.error("Error de red o al enviar:", error);
            setErrors({ submit: 'No se pudo conectar con el servidor. Revisa tu conexión.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(s => (s < 2 ? s + 1 : s));
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
                                {errors.submit && <p className="text-red-500 text-center mt-4">{errors.submit}</p>}
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