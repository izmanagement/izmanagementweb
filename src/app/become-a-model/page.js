"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { sendEvent } from '../../lib/gtag'; // Se importa el archivo de ayuda

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Step1 from '../../components/casting-form/Step1';
import Step2 from '../../components/casting-form/Step2';
import Step3 from '../../components/casting-form/Step3';
import ErrorModal from '../../components/ErrorModal';

export default function BecomeAModelPage() {
    const CLOUDINARY_CLOUD_NAME = "dajgnzim5";
    const CLOUDINARY_UPLOAD_PRESET = "casting_uploads";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', country: '', email: '',
        phone: { code: '+502', number: '' },
        height: '', instagram: '', gender: 'Femenino',
    });
    const [uploadedFiles, setUploadedFiles] = useState({
        facePhoto: null, mediumPhoto: null,
        fullBodyPhoto: null, video: null,
    });
    const [errors, setErrors] = useState({});
    const [modalErrors, setModalErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- SEGUIMIENTO DE EVENTOS ---

    // Evento: submit_application (CORRECTO)
    // Se dispara cuando se llega al paso 3 (confirmación).
    useEffect(() => {
        if (step === 3) {
            sendEvent({
                action: 'submit_application',
                category: 'Casting Funnel',
                label: 'Formulario enviado exitosamente',
            });
        }
    }, [step]);

    // Evento: upload_photos_complete (AÑADIDO)
    // Se dispara una sola vez cuando las 3 fotos obligatorias están listas.
    useEffect(() => {
        const { facePhoto, mediumPhoto, fullBodyPhoto } = uploadedFiles;
        if (facePhoto && mediumPhoto && fullBodyPhoto) {
            // Usamos un flag para asegurarnos de que solo se envíe una vez.
            if (!window.photosUploadedEventSent) {
                sendEvent('upload_photos_complete');
                window.photosUploadedEventSent = true; // Marcamos que ya se envió
            }
        }
    }, [uploadedFiles]);


    // --- FIN DE SEGUIMIENTO DE EVENTOS ---

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === 'fullName' || name === 'country') {
            finalValue = value.replace(/[^a-zA-Z\s]/g, '');
        }
        if (name === 'height') {
            finalValue = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
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
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            folder: dynamicFolder,
            sources: ['local'],
            cropping: false, 
            styles: {
                palette: {
                    window: "#FFFFFF", windowBorder: "#E5E7EB", tabIcon: "#000000",
                    menuIcons: "#555A5F", textDark: "#000000", textLight: "#FFFFFF",
                    link: "#000000", action: "#FFFFFF", inactiveTabIcon: "#555A5F",
                    error: "#F44235", inProgress: "#0078FF", complete: "#20B832",
                    sourceBg: "#F9FAFB"
                },
                fonts: {
                    default: null,
                    "'Inter Tight', sans-serif": {
                        url: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap",
                        active: true
                    }
                }
            },
            text: {
                "en": {
                    "sources": { "local": { "title": "Mis Archivos", "browse": "Buscar en mi dispositivo", "dd_title_single": "Arrastra y suelta un archivo aquí" } },
                    "queue": { "title": "Cola de Subida", "title_uploading_with_counter": "Subiendo {{num}} Archivos", "done": "Listo", "upload_more": "Subir más" },
                    "uploader": { "upload_or": "o" },
                    "actions": { "upload": "Subir" },
                    "buttons": { "upload": "Subir", "close": "Cerrar", "back": "Atrás" }
                }
            },
            multiple: false,
            maxFiles: 1,
            resourceType: isVideo ? 'video' : 'image',
            clientAllowedFormats: isVideo ? ['mp4', 'mov'] : ['jpg', 'jpeg', 'png', 'heic'],
            maxFileSize: isVideo ? 100000000 : 10000000,
        };

        const myWidget = window.cloudinary.createUploadWidget(options, (error, result) => { 
            if (error) { console.error("Error de Cloudinary:", error); return; }
            if (result && result.event === "success") { 
                setUploadedFiles(prev => ({ ...prev, [fileType]: result.info.secure_url }));
                
                // Evento: upload_video (AÑADIDO)
                // Se dispara si el archivo subido es un video.
                if (isVideo) {
                    sendEvent('upload_video');
                }
            }
        });
        myWidget.open();
    };

    const validateStep1 = () => {
        const newErrors = {};
        const errorMessages = [];
        if (!formData.fullName.trim()) { newErrors.fullName = "El nombre es requerido."; errorMessages.push("El nombre completo es requerido."); }
        if (!formData.country.trim()) { newErrors.country = "El país es requerido."; errorMessages.push("El país es requerido."); }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = "El email no es válido."; errorMessages.push("Por favor, introduce un email válido."); }
        if (!formData.phone.number.trim()) { newErrors.phone = "El teléfono es requerido."; errorMessages.push("El número de teléfono es requerido."); }
        if (!formData.height.trim()) { newErrors.height = "La estatura es requerida."; errorMessages.push("La estatura es requerida (en cm)."); }
        if (!formData.gender) { newErrors.gender = "El género es requerido."; errorMessages.push("Debes seleccionar un género."); }
        
        setErrors(newErrors);
        if (errorMessages.length > 0) {
            setModalErrors(errorMessages);
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        const errorMessages = [];
        if (!uploadedFiles.facePhoto) errorMessages.push("La foto de rostro es obligatoria.");
        if (!uploadedFiles.mediumPhoto) errorMessages.push("La foto de medio cuerpo es obligatoria.");
        if (!uploadedFiles.fullBodyPhoto) errorMessages.push("La foto de cuerpo completo es obligatoria.");
        
        if (errorMessages.length > 0) {
            setModalErrors(errorMessages);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        // Evento: attempt_submission (AÑADIDO)
        // Se dispara siempre que el usuario intenta finalizar la aplicación.
        sendEvent('attempt_submission');

        if (!validateStep2()) {
            return;
        }
        setIsSubmitting(true);
        const finalApplication = {
            ...formData,
            phone: `${formData.phone.code} ${formData.phone.number}`,
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
                setStep(3);
            } else {
                setModalErrors(['Hubo un error al enviar tu aplicación.']);
            }
        } catch (error) {
            setModalErrors(['No se pudo conectar con el servidor.']);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (validateStep1()) {
                // Evento: complete_step1 (CORREGIDO)
                // Se dispara al pasar exitosamente del paso 1 al 2.
                sendEvent('complete_step1');
                setStep(2);
            }
        }
    };
    const prevStep = () => setStep(s => (s > 1 ? s - 1 : s));

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <Step1 formData={formData} handleInputChange={handleInputChange} handlePhoneChange={handlePhoneChange} errors={errors} />;
            case 2:
                return <Step2 uploadedFiles={uploadedFiles} onUpload={handleFileUpload} gender={formData.gender} />;
            case 3:
                return <Step3 />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <ErrorModal errors={modalErrors} onClose={() => setModalErrors([])} />
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
                                {step < 3 && (
                                    <div className="flex items-center justify-between mt-12">
                                        <button onClick={prevStep} className={`inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-gray-500 hover:text-black focus:outline-none transition-all duration-300 ${step > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
