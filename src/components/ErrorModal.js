// src/components/ErrorModal.js
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ErrorModal = ({ errors, onClose }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in-fast">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Por favor, corrige los errores</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 text-right rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Entendido
          </button>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in-fast { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ErrorModal;