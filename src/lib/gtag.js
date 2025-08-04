/**
 * @file src/lib/gtag.js
 * Este archivo centraliza la lógica para enviar eventos a Google Analytics.
 * Así evitamos repetir código y lo mantenemos organizado.
 */

// ¡MUY IMPORTANTE! Reemplaza esto con tu propio ID de Medición de Google Analytics 4.
export const GA_TRACKING_ID = "G-T9FHD55TVL"; // Ya tienes tu ID aquí, ¡perfecto!

/**
 * Envía un evento personalizado a Google Analytics.
 * Esta versión es más robusta: maneja tanto el formato nuevo como el antiguo.
 * @param {string | object} actionOrParams - El nombre del evento (string) o un objeto de parámetros del formato antiguo.
 * @param {object} [eventParams={}] - Parámetros adicionales del evento.
 */
export const sendEvent = (actionOrParams, eventParams = {}) => {
  let eventName;
  let params;

  // --- LÓGICA DE CORRECCIÓN AUTOMÁTICA ---
  // Si el primer argumento es un objeto (formato antiguo)
  if (typeof actionOrParams === 'object' && actionOrParams !== null && actionOrParams.action) {
    eventName = actionOrParams.action; // Usamos la propiedad 'action' como el nombre del evento
    params = actionOrParams; // Usamos el objeto completo como los parámetros
  } 
  // Si el primer argumento es un string (formato nuevo y correcto)
  else if (typeof actionOrParams === 'string') {
    eventName = actionOrParams;
    params = eventParams;
  } 
  // Si no es ninguno de los dos, no hacemos nada para evitar errores.
  else {
    console.error("sendEvent fue llamado con argumentos inválidos.", actionOrParams);
    return;
  }
  // --- FIN DE LA LÓGICA DE CORRECCIÓN ---

  if (typeof window.gtag === 'function') {
    console.log(`Sending GA4 event: Name='${eventName}'`, params);
    window.gtag('event', eventName, params);
  } else {
    console.warn(`Google Analytics no está cargado. No se envió el evento: ${eventName}`);
  }
};
