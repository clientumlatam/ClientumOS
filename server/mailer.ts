import nodemailer from "nodemailer";
import { loadSmtpCredentials } from "../src/lib/smtp.js";

export function createMailTransport() {
  const creds = loadSmtpCredentials();
  if (!creds.user || !creds.pass) return null;

  return nodemailer.createTransport({
    host: creds.host,
    port: creds.port,
    secure: creds.secure,
    auth: {
      user: creds.user,
      pass: creds.pass,
    },
  });
}

export async function sendPasswordResetEmail(toEmail: string, token: string): Promise<boolean> {
  const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || "https://clientum.com.ar";
  const resetUrl = `${baseUrl}?reset_token=${token}`;

  const transport = createMailTransport();
  const creds = loadSmtpCredentials();

  if (!transport) {
    console.warn(`[Auth] SMTP_USER/SMTP_PASS no configurados. Enlace de restablecimiento generado para ${toEmail}: ${resetUrl}`);
    return false;
  }

  try {
    await transport.sendMail({
      from: `"ClientumOS" <${creds.user}>`,
      to: toEmail,
      subject: "Restablecer contraseña — ClientumOS",
      html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B131D;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B131D;padding:48px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#111C28;border:1px solid #1A2733;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <div style="display:inline-block;width:48px;height:48px;background:linear-gradient(135deg,#059669,#10B981);border-radius:12px;line-height:48px;color:#ffffff;font-weight:900;font-size:24px;">C</div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">ClientumOS</p>
            <p style="margin:0 0 28px;font-size:12px;color:#4B5563;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">Restablecer contraseña</p>
            <p style="margin:0 0 20px;font-size:15px;color:#9CA3AF;line-height:1.6;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta.<br>
              Hacé clic en el siguiente botón para continuar:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:16px 0 28px;">
                  <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#10B981;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:10px;box-shadow:0 4px 14px rgba(16,185,129,0.35);">
                    Restablecer mi contraseña
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-size:12px;color:#6B7280;">Si no funciona el botón, copiá y pegá este enlace en tu navegador:</p>
            <p style="margin:0;font-size:12px;word-break:break-all;"><a href="${resetUrl}" style="color:#10B981;">${resetUrl}</a></p>
            <hr style="border:none;border-top:1px solid #1A2733;margin:28px 0 20px;">
            <p style="margin:0;font-size:12px;color:#4B5563;">Este enlace expira en 1 hora. Si no solicitaste este cambio, podés ignorar este correo de forma segura.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;background:#0B131D;">
            <p style="margin:0;font-size:11px;color:#374151;text-align:center;">
              ClientumOS · Patagonia, Argentina · <a href="https://clientum.com.ar" style="color:#4B5563;">clientum.com.ar</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `Restablecer contraseña — ClientumOS\n\nHacé clic en el siguiente enlace para crear una nueva contraseña (válido por 1 hora):\n\n${resetUrl}\n\nSi no solicitaste este cambio, podés ignorar este correo.`,
    });
    console.log(`[Auth] Correo de restablecimiento enviado exitosamente a ${toEmail}`);
    return true;
  } catch (mailError: any) {
    console.error(`[Auth] Error enviando correo SMTP a ${toEmail}:`, mailError?.message || mailError);
    return false;
  }
}
