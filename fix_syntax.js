const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

// Find the problematic line
const problemStr = '</div>value="ERP-CRM">{isPortuguese ? "ERP & CRM Integrado" : "ERP & CRM Integrado"}</option>';
if (code.includes(problemStr)) {
  code = code.replace(problemStr, '<option value="ERP-CRM">{isPortuguese ? "ERP & CRM Integrado" : "ERP & CRM Integrado"}</option>');
  
  // Wait, if I just replace that, the earlier form close is still there, meaning the select is closed!
  // Let me look at what I am actually replacing.
  // The correct structure is:
  // <option value="Servicios B2B / Profesional">...</option>
  // <option value="ERP-CRM">...</option>
  // <option value="Consultoria">...</option>
  // <option value="Ciberseguridad">...</option>
  // </select>
  // </div></div><button>...</button></form></div>
}
