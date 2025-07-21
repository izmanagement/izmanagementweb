import os

# --- Contenido Actualizado del Archivo ---

# Step2.js (Con la corrección final para la visualización del video)
step2_code = """
// src/components/casting-form/Step2.js
import React from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, Video } from 'lucide-react';

// --- URLs de las Imágenes de Ejemplo ---
// ¡REEMPLAZA ESTAS URLS CON LAS TUYAS DE CLOUDINARY!
const exampleImages = {
  female: {
    facePhoto: 'https://placehold.co/400x600/f0f0f0/333?text=Ejemplo\\nRostro\\nFemenino',
    mediumPhoto: 'https://placehold.co/400x600/f0f0f0/333?text=Ejemplo\\nMedio\\nCuerpo',
    fullBodyPhoto: 'https://placehold.co/400x600/f0f0f0/333?text=Ejemplo\\nCuerpo\\nCompleto',
    video: 'https://res.cloudinary.com/dnl6qgwds/video/upload/v1753082179/C0243_mum1eu.mp4',
  },
  male: {
    facePhoto: 'https://placehold.co/400x600/e0e0e0/333?text=Ejemplo\\nRostro\\nMasculino',
    mediumPhoto: 'https://placehold.co/400x600/e0e0e0/333?text=Ejemplo\\nMedio\\nCuerpo',
    fullBodyPhoto: 'https://placehold.co/400x600/e0e0e0/333?text=Ejemplo\\nCuerpo\\nCompleto',
    video: 'https://res.cloudinary.com/dnl6qgwds/video/upload/v1753082179/C0243_mum1eu.mp4',
  }
};

const UploadField = ({ title, fileType, onUpload, uploadedFileUrl, exampleImageUrl }) => {
    const isUploaded = !!uploadedFileUrl;
    const isVideo = fileType === 'video';

    return (
        <div className="w-full text-center">
            <div className="relative w-full aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {isUploaded ? (
                    isVideo ? (
                        // CAMBIO FINAL: Se usa object-cover y se desactiva el botón de pantalla completa
                        <video key={uploadedFileUrl} controls controlsList="nodownload nofullscreen" className="w-full h-full object-cover">
                            <source src={uploadedFileUrl} type="video/mp4" />
                            Tu navegador no soporta el tag de video.
                        </video>
                    ) : (
                        <img src={uploadedFileUrl} alt={`Vista previa de ${title}`} className="w-full h-full object-cover" />
                    )
                ) : (
                  isVideo ? (
                    // CAMBIO FINAL: Se usa object-cover y se desactiva el botón de pantalla completa
                    <video key={exampleImageUrl} controls controlsList="nodownload nofullscreen" className="w-full h-full object-cover">
                        <source src={exampleImageUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={exampleImageUrl} alt={`Ejemplo de ${title}`} className="w-full h-full object-cover" />
                  )
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

const Step2 = ({ uploadedFiles, onUpload, error, gender }) => {
    const currentExamples = gender === 'Masculino' ? exampleImages.male : exampleImages.female;

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                <UploadField title="Foto de Rostro" fileType="facePhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.facePhoto} exampleImageUrl={currentExamples.facePhoto} />
                <UploadField title="Foto Medio Cuerpo" fileType="mediumPhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.mediumPhoto} exampleImageUrl={currentExamples.mediumPhoto} />
                <UploadField title="Foto Cuerpo Completo" fileType="fullBodyPhoto" onUpload={onUpload} uploadedFileUrl={uploadedFiles.fullBodyPhoto} exampleImageUrl={currentExamples.fullBodyPhoto} />
                <UploadField title="Video de Presentación" fileType="video" onUpload={onUpload} uploadedFileUrl={uploadedFiles.video} exampleImageUrl={currentExamples.video} />
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </div>
    );
};

export default Step2;
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
    """Función principal para añadir controles al video de ejemplo."""
    print("--- Ajustando la Visualización del Video de Ejemplo (Versión Final) ---")

    files_to_update = {
        "src/components/casting-form/Step2.js": step2_code,
    }

    for path, content in files_to_update.items():
        create_or_update_file(path, content)
        
    print("\\n--- ¡Ajuste Completado! ---")
    print("La vista previa del video ahora se ve perfecta y el botón de pantalla completa ha sido desactivado en el código.")
    
    # CAMBIO: Se añaden instrucciones de limpieza
    print("\\n--- PASOS CRÍTICOS PARA VER EL CAMBIO ---")
    print("1. Detén el servidor de desarrollo (Ctrl + C).")
    print("2. BORRA la carpeta '.next' de tu proyecto para limpiar la caché del servidor.")
    print("3. Reinicia el servidor ('npm run dev').")
    print("4. Abre la página en una VENTANA DE INCÓGNITO o borra la caché de tu navegador.")


if __name__ == "__main__":
    main()
