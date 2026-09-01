import re

filepath = 'docs/ARCHITECTURE.md'
with open(filepath, 'r') as f:
    content = f.read()

new_section = """## 5. ⚡ Estrategia de Build y Ejecución

- **Turborepo**: Paraleliza la compilación de TypeScript (`tsc`) y el empaquetado de assets con Vite en todos los workspaces.
- **Orquestación con ESBuild (`build.mjs`)**: El script en la raíz unifica la compilación:
  1. Ejecuta Turborepo para construir los empaquetados del cliente en `apps/landing/dist` (incluye las rutas del CRM de `apps/dashboard`).
  2. Copia este bundle unificado de Vite a la carpeta `/dist` de la raíz.
  3. Ejecuta **ESBuild** para empaquetar todo el servidor backend Express (`apps/api/src/index.ts`) hacia `dist/server.cjs`, marcando como externos paquetes nativos (`express`, `pg`, etc.).
- **Rollup Manual Chunks**: En `apps/landing/vite.config.ts`, las dependencias pesadas (`vendor-react`, `vendor-maps`, `vendor-charts`, `vendor-pdf`, `vendor-ai`) se dividen en fragmentos optimizados para reducir el tiempo de carga inicial.
- **Service Worker (`public/sw.js`)**: Gestiona la recepción de notificaciones Web Push incluso cuando la pestaña del navegador está en segundo plano.

---
"""

content = re.sub(r"## 5\. ⚡ Estrategia de Build y Ejecución.*", new_section, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
