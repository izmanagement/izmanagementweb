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