import os

# --- Contenido Actualizado de los Archivos ---

# 1. layout.js (Para cambiar la tipografía a Inter Tight)
layout_code = """
// src/app/layout.js
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "IZMGMT Casting",
  description: "Formulario de casting para modelos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={interTight.className}>{children}</body>
    </html>
  );
}
"""

# 2. Componentes del Formulario (Con el nuevo estilo simétrico)

form_field_code = """
// src/components/casting-form/FormField.js
import React from 'react';

const FormField = ({ name, type = 'text', label, value, onChange, error }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
            autoComplete="off"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default FormField;
"""

phone_field_code = """
// src/components/casting-form/PhoneField.js
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
    { name: 'Guatemala', code: '+502' }, { name: 'United States', code: '+1' },
    { name: 'Mexico', code: '+52' }, { name: 'Spain', code: '+34' },
    { name: 'Argentina', code: '+54' }, { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' }, { name: 'Belgium', code: '+32' },
    { name: 'Bolivia', code: '+591' }, { name: 'Brazil', code: '+55' },
    { name: 'Canada', code: '+1' }, { name: 'Chile', code: '+56' },
    { name: 'China', code: '+86' }, { name: 'Colombia', code: '+57' },
    { name: 'Costa Rica', code: '+506' }, { name: 'Cuba', code: '+53' },
    { name: 'Denmark', code: '+45' }, { name: 'Dominican Republic', code: '+1' },
    { name: 'Ecuador', code: '+593' }, { name: 'El Salvador', code: '+503' },
    { name: 'France', code: '+33' }, { name: 'Germany', code: '+49' },
    { name: 'Greece', code: '+30' }, { name: 'Honduras', code: '+504' },
    { name: 'India', code: '+91' }, { name: 'Italy', code: '+39' },
    { name: 'Japan', code: '+81' }, { name: 'Netherlands', code: '+31' },
    { name: 'Nicaragua', code: '+505' }, { name: 'Norway', code: '+47' },
    { name: 'Panama', code: '+507' }, { name: 'Paraguay', code: '+595' },
    { name: 'Peru', code: '+51' }, { name: 'Portugal', code: '+351' },
    { name: 'Puerto Rico', code: '+1' }, { name: 'Russia', code: '+7' },
    { name: 'South Africa', code: '+27' }, { name: 'South Korea', code: '+82' },
    { name: 'Sweden', code: '+46' }, { name: 'Switzerland', code: '+41' },
    { name: 'Turkey', code: '+90' }, { name: 'United Kingdom', code: '+44' },
    { name: 'Uruguay', code: '+598' }, { name: 'Venezuela', code: '+58' }
].sort((a, b) => a.name.localeCompare(b.name));

const PhoneField = ({ label, value, onCodeChange, onNumberChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">{label}</label>
            <div className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors">
                <div className="relative" ref={dropdownRef}>
                    <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center p-2">
                        <span className="font-medium">{value.code}</span>
                        <ChevronDown size={16} className={`ml-1 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="absolute bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                            <ul className="max-h-60 overflow-auto">
                                {countries.map(country => (
                                    <li key={country.name + country.code} onClick={() => { onCodeChange(country.code); setIsOpen(false); }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex justify-between">
                                        <span>{country.name}</span>
                                        <span className="text-gray-500">{country.code}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <input type="tel" value={value.number} onChange={onNumberChange} className="w-full p-2 bg-transparent focus:outline-none" autoComplete="off" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default PhoneField;
"""

select_field_code = """
// src/components/casting-form/SelectField.js
import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ name, label, value, onChange, error, children }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition-colors appearance-none"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default SelectField;
"""

step1_code = """
// src/components/casting-form/Step1.js
import React from 'react';
import FormField from './FormField';
import PhoneField from './PhoneField';
import SelectField from './SelectField';

const Step1 = ({ formData, handleInputChange, handlePhoneChange, errors }) => {
    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <FormField name="fullName" label="Nombre Completo" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} />
                <FormField name="country" label="País" value={formData.country} onChange={handleInputChange} error={errors.country} />
                <FormField name="email" type="email" label="Email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                <PhoneField label="Teléfono" value={formData.phone} onCodeChange={handlePhoneChange.onCodeChange} onNumberChange={handlePhoneChange.onNumberChange} error={errors.phone} />
                <FormField name="height" type="number" label="Estatura (cm)" value={formData.height} onChange={handleInputChange} error={errors.height} />
                <FormField name="instagram" label="Usuario de Instagram (@)" value={formData.instagram} onChange={handleInputChange} error={errors.instagram} />
                <div className="md:col-span-2">
                    <SelectField name="gender" label="Género" value={formData.gender} onChange={handleInputChange} error={errors.gender}>
                        <option value="" disabled>Seleccionar...</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Otro">Otro</option>
                    </SelectField>
                </div>
            </div>
        </div>
    );
};

export default Step1;
"""

# 3. Página Principal del Formulario
become_a_model_page_code = """
// src/app/become-a-model/page.js
"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Step1 from '../../components/casting-form/Step1';
import Step2 from '../../components/casting-form/Step2';
import Step3 from '../../components/casting-form/Step3';

export default function BecomeAModelPage() {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = {
        onCodeChange: (code) => setFormData(prev => ({ ...prev, phone: { ...prev.phone, code } })),
        // CORRECCIÓN: Se extrae e.target.value para actualizar el estado correctamente.
        onNumberChange: (e) => {
            setFormData(prev => ({ ...prev, phone: { ...prev.phone, number: e.target.value } }));
        },
    };
    
    const handleFileUpload = (fileType) => {
        console.log(`Subiendo ${fileType}...`);
        setUploadedFiles(prev => ({...prev, [fileType]: 'https://placehold.co/400x600/f0f0f0/333?text=Subido'}));
    };

    const nextStep = () => setStep(s => (s < 3 ? s + 1 : s));
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
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">
                                Become a Model
                            </h1>
                            <p className="mt-4 text-gray-600 text-lg">
                                Completa los siguientes pasos para ser parte de nuestro proceso de selección. Buscamos talento único y auténtico.
                            </p>
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
                                    {step < 3 && (
                                        <button onClick={nextStep} className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-white bg-black hover:bg-gray-800 focus:outline-none transition-colors">
                                            Siguiente <ArrowRight size={16} className="ml-2" />
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
    """Función principal para ejecutar la actualización al diseño final."""
    print("--- Iniciando actualización a Diseño Editorial Simétrico ---")

    files_to_update = {
        "src/app/layout.js": layout_code,
        "src/components/casting-form/FormField.js": form_field_code,
        "src/components/casting-form/PhoneField.js": phone_field_code,
        "src/components/casting-form/SelectField.js": select_field_code,
        "src/components/casting-form/Step1.js": step1_code,
        "src/app/become-a-model/page.js": become_a_model_page_code,
    }

    for path, content in files_to_update.items():
        create_or_update_file(path, content)
        
    print("\n--- ¡Actualización completada exitosamente! ---")
    print("Ahora puedes borrar este script si lo deseas.")
    print("Ejecuta 'npm run dev' para ver el nuevo diseño.")


if __name__ == "__main__":
    main()
