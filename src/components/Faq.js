// src/components/Faq.js
"use client";

import React, { useState } from 'react';

const faqData = {
  "Requisitos para aplicar": [
    { question: "¿Quién puede aplicar?", answer: "Cualquier persona que viva en Guatemala o en Centroamérica." },
    { question: "¿Se necesita experiencia?", answer: "No. No es necesaria." },
    { question: "¿Puedo tener brackets, tatuajes o piercings?", answer: "Sí. No hay problema." },
    { question: "¿Hay límite de edad o estatura?", answer: "No. Todas las edades y estaturas pueden aplicar." }
  ],
  "Fotos y video": [
    { question: "¿Qué fotos debo enviar?", answer: "Una de rostro, una de medio cuerpo y una de cuerpo completo." },
    { question: "¿Qué debe tener el video?", answer: "Tu nombre, edad, país y tus perfiles (frente, lados y espalda)." },
    { question: "¿Qué ropa debo usar?", answer: "Hombres: Playera negra y jeans. Mujeres: Tank top negro, jeans y tacones." },
    { question: "¿Qué fondo debo usar?", answer: "Pared lisa, de color claro, sin objetos detrás." },
    { question: "¿La luz importa?", answer: "Sí, la luz es fundamental. Debes estar bien iluminado para que tus facciones se vean claramente." },
    { question: "¿Puedo usar maquillaje o accesorios?", answer: "Maquillaje natural. No uses gorras, lentes o accesorios grandes." }
  ],
  "Otras dudas": [
    { question: "¿Hasta cuándo puedo aplicar?", answer: "Hasta el 11 de agosto." },
    { question: "¿Cómo sabré si fui seleccionado?", answer: "Te contactan por correo o teléfono." },
    { question: "¿Debo vivir en Guatemala?", answer: "No es necesario vivir en Guatemala; puedes residir en cualquier país de Centroamérica." },
    { question: "¿Puedo aplicar si viajo mucho?", answer: "Sí. Siempre que cumplas los requisitos." },
    { question: "¿Puedo aplicar si tengo una discapacidad?", answer: "Sí. El casting es inclusivo." },
    { question: "¿Necesito cámara profesional?", answer: "No. No necesitas cámara profesional. Puedes usar tu celular sin problema. Lo importante es que las fotos y el video se vean claros, bien iluminados y con fondo limpio." }
  ]
};

const PlusMinusIcon = ({ isOpen }) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <span className="absolute h-px w-4 bg-black"></span>
    <span className={`absolute h-4 w-px bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'scale-y-0' : 'scale-y-100'}`}></span>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div 
    className={`border-b border-gray-200/80 transition-opacity duration-300 ${!isOpen ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
  >
    <button 
      onClick={onClick} 
      className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
    >
      <span className="font-medium text-lg tracking-tight text-gray-900">{question}</span>
      <PlusMinusIcon isOpen={isOpen} />
    </button>
    <div 
      className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="text-gray-600 pb-6 text-base pr-8">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  </div>
);

const Faq = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(faqData)[0]);
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleTabClick = (category) => {
    setActiveTab(category);
    setOpenQuestion(null);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center border-b border-gray-200/80 mb-8 overflow-x-auto">
          {Object.keys(faqData).map(category => (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`px-4 sm:px-6 py-3 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap focus:outline-none ${
                activeTab === category
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((faq, index) => (
            <FaqItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
              isOpen={openQuestion === index}
              onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
        
export default Faq;