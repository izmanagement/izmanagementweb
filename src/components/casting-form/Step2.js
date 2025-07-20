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