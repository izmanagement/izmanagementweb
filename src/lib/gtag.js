// src/lib/gtag.js

// Función para enviar eventos a Google Analytics
export const event = ({ action, category, label, value }) => {
  // Asegurarse de que gtag esté disponible en el objeto window
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.log("gtag no está disponible. Asegúrate de que el script de Google Analytics esté cargado.");
  }
};