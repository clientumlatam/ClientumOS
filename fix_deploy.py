import re

filepath = 'docs/DEPLOYMENT.md'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the Docker Runner stage
runner_pattern = r"# Etapa 2: Runner\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nENV PORT=3000\nCOPY --from=builder /app/package\*\.json \./\nCOPY --from=builder /app/apps/landing/dist \./dist\nRUN npm install -g serve\nEXPOSE 3000\nCMD \[\"serve\", \"-s\", \"dist\", \"-l\", \"3000\"\]"

new_runner = """# Etapa 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install express pg dotenv bcryptjs cors express-session connect-pg-simple nodemailer web-push @google/genai
EXPOSE 3000
CMD ["node", "dist/server.cjs"]"""

if re.search(runner_pattern, content):
    content = re.sub(runner_pattern, new_runner, content)
else:
    # Let's do a more robust replace
    content = re.sub(r"COPY --from=builder /app/apps/landing/dist \./dist.*?CMD \[\"serve\".*?\]", r"COPY --from=builder /app/dist ./dist\nRUN npm install express pg dotenv bcryptjs cors express-session connect-pg-simple nodemailer web-push @google/genai\nEXPOSE 3000\nCMD [\"node\", \"dist/server.cjs\"]", content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
