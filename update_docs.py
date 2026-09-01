import os
import re

def update_file(filepath, replacements):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content, flags=re.MULTILINE)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

readme_replacements = [
    (r"`npm run dev` \| Inicia el servidor de desarrollo.*\|", r"`npm run dev` | Inicia el servidor de desarrollo Full-Stack (Vite + Express) en `http://localhost:3000`. |"),
    (r"`npm run build` \| Compila todos los paquetes.*\|", r"`npm run build` | Orquesta la compilación de Turborepo y empaqueta el backend y frontend en un directorio `dist/` unificado mediante ESBuild. |"),
    (r"npm run dev:landing", r"npm run start"),
    (r"Ejecuta exclusivamente la aplicación frontend `landing`.", r"Inicia el servidor de producción compilado (`dist/server.cjs`).")
]

deployment_replacements = [
    (r"COPY --from=builder /app/apps/landing/dist ./dist\nRUN npm install -g serve\nEXPOSE 3000\nCMD \[\"serve\", \"-s\", \"dist\", \"-l\", \"3000\"\]", 
     r"COPY --from=builder /app/dist ./dist\nRUN npm install express pg dotenv bcryptjs cors express-session connect-pg-simple nodemailer web-push @google/genai\nEXPOSE 3000\nCMD [\"node\", \"dist/server.cjs\"]"),
    (r"proxy_pass http://127.0.0.1:3000;", r"proxy_pass http://127.0.0.1:3000; # Apunta al servidor Express (server.cjs)")
]

development_replacements = [
    (r"npm run build", r"npm run build\n# Compila el frontend y empaqueta el backend en ./dist/server.cjs")
]

update_file('README.md', readme_replacements)
update_file('docs/README.md', readme_replacements)
update_file('docs/DEPLOYMENT.md', deployment_replacements)
update_file('docs/DEVELOPMENT.md', development_replacements)
