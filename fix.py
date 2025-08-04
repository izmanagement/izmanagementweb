import os
from pathlib import Path
import re

def fix_gtag_imports_in_file(file_path):
    """
    Lee un archivo, corrige las importaciones y usos de gtag, y lo reescribe.
    """
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content
        
        # Patrón para encontrar importaciones incorrectas de gtag
        # Busca líneas como: import { event } from '...lib/gtag' o import * as gtag from '...lib/gtag'
        incorrect_import_pattern = re.compile(r"import (?:\{\s*event\s*\}|\*\s+as\s+gtag)\s+from\s+(['\"])(.*?lib/gtag)\1")
        
        # Construye la línea de importación correcta
        # Usa una función para manejar diferentes rutas relativas (../, ../../)
        def build_correct_import(match):
            relative_path = match.group(2)
            return f"import {{ sendEvent }} from '{relative_path}'"

        content, num_imports_fixed = incorrect_import_pattern.subn(build_correct_import, content)

        # Reemplaza los usos incorrectos
        content, num_calls_fixed_1 = re.subn(r'gtag\.event\(', 'sendEvent(', content)
        # Este es más arriesgado, pero lo intentamos en base al error.
        # Solo reemplazará `event(` si no es una definición de parámetro como `(event) =>`
        content, num_calls_fixed_2 = re.subn(r'(?<!\()\b(event\()', 'sendEvent(', content)

        total_fixes = num_imports_fixed + num_calls_fixed_1 + num_calls_fixed_2

        if content != original_content:
            file_path.write_text(content, encoding='utf-8')
            print(f"✅ Archivo modificado: {file_path} ({total_fixes} correcciones)")
            return True

    except Exception as e:
        print(f"❌ No se pudo procesar el archivo {file_path}: {e}")
    
    return False

def main():
    """
    Función principal que escanea el proyecto y aplica las correcciones.
    """
    project_root = Path.cwd()
    src_dir = project_root / "src"
    files_modified = 0
    
    print(f"Buscando archivos para corregir en: {src_dir}")

    if not src_dir.is_dir():
        print(f"❌ Error: El directorio '{src_dir}' no fue encontrado.")
        print("Asegúrate de ejecutar este script desde la carpeta raíz de tu proyecto.")
        return

    # Busca en todos los archivos .js y .jsx dentro de src/
    for file_path in src_dir.rglob('*.js*'):
        if 'node_modules' in file_path.parts:
            continue
        if fix_gtag_imports_in_file(file_path):
            files_modified += 1
            
    print("\n--- ¡Proceso de corrección completado! ---")
    if files_modified > 0:
        print(f"Se modificaron {files_modified} archivo(s).")
        print("Ahora puedes intentar ejecutar 'npm run dev' de nuevo.")
    else:
        print("No se encontraron archivos que necesitaran corrección.")

if __name__ == "__main__":
    main()
