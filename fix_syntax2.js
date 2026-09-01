const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

const badBlock = `                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          {isPortuguese ? "Solicitar Diagnóstico Gratuito" : "Solicitar Diagnóstico Gratuito"}
                        </button>
                      </form>
                    </div>value="ERP-CRM"`;

if (code.includes(badBlock)) {
  code = code.replace(badBlock, '                              <option value="ERP-CRM"');
  fs.writeFileSync('apps/landing/src/components/PublicWebsite.tsx', code);
  console.log("Fixed syntax error.");
} else {
  // Try with regex ignoring whitespace
  const regex = /<\/select>\s*<\/div>\s*<\/div>\s*<button[^>]*>\s*\{[^\}]+\}\s*<\/button>\s*<\/form>\s*<\/div>value="ERP-CRM"/m;
  if (regex.test(code)) {
    code = code.replace(regex, '<option value="ERP-CRM"');
    fs.writeFileSync('apps/landing/src/components/PublicWebsite.tsx', code);
    console.log("Fixed syntax error using regex.");
  } else {
    console.log("Could not find bad block!");
  }
}
