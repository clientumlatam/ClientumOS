const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/Asegúrate de colocar coordenadas de latitud \("lat"\) y longitud \("lng"\) válidas/g, 'ES OBLIGATORIO extraer y rellenar el TELÉFONO REAL ("phone") y SITIO WEB REAL ("website") de Google. Si la empresa no tiene web, pon "". Asegúrate de colocar coordenadas de latitud ("lat") y longitud ("lng") reales');

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Prompt fixed");
