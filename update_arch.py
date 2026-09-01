import re

filepath = 'docs/ARCHITECTURE.md'
with open(filepath, 'r') as f:
    content = f.read()

# Add to the section about Turborepo or create a section about build
new_build_info = """
### 4. Orquestación de Build (ESBuild + Turborepo)
El pipeline de construcción está orquestado por el script `build.mjs` que unifica los procesos:
1. Compila los paquetes y aplicaciones frontend usando **Turborepo**.
2. Copia el resultado compilado del frontend (que aloja todo el sistema en una SPA) al directorio `/dist`.
3. Empaqueta el servidor de la API (`apps/api/src/index.ts`) a un único archivo optimizado `/dist/server.cjs` utilizando **ESBuild**.
4. Permite iniciar el servidor unificado en producción ejecutando `node dist/server.cjs`.
"""

if "### 4. Orquestación de Build" not in content:
    content = content.replace("## 3. Topología de Datos", new_build_info + "\n## 3. Topología de Datos")

with open(filepath, 'w') as f:
    f.write(content)
