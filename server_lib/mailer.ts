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

function getBaseUrl(): string {
  return process.env.APP_URL?.replace(/\/$/, "") || "https://www.clientum.com.ar";
}

function buildClientumEmailHtml({
  badgeText,
  title,
  subtitle,
  bodyHtml,
  ctaText,
  ctaUrl,
  footnoteHtml,
}: {
  badgeText: string;
  title: string;
  subtitle?: string;
  bodyHtml: string;
  ctaText?: string;
  ctaUrl?: string;
  footnoteHtml?: string;
}): string {
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/favicon.svg`;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — ClientumOS</title>
</head>
<body style="margin:0;padding:0;background-color:#070C12;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#070C12;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#0F1722;border:1px solid #1E2D3D;border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="padding:36px 40px 24px;text-align:center;background:linear-gradient(180deg, #132030 0%, #0F1722 100%);border-bottom:1px solid #1A2838;">
              <table align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <div style="width:44px;height:44px;background-color:#0A2558;border:1px solid #1E3A70;border-radius:12px;text-align:center;line-height:44px;display:inline-block;">
                      <img src="${logoUrl}" width="28" height="28" alt="Clientum Logo" style="vertical-align:middle;display:inline-block;border:0;">
                    </div>
                  </td>
                  <td style="vertical-align:middle;text-align:left;">
                    <span style="font-size:20px;font-weight:900;color:#FFFFFF;letter-spacing:-0.5px;display:block;line-height:1.1;">
                      CLIENTUM <span style="font-size:10px;font-weight:800;color:#10B981;background-color:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);padding:2px 6px;border-radius:4px;margin-left:4px;vertical-align:middle;text-transform:uppercase;letter-spacing:1px;">OS</span>
                    </span>
                    <span style="font-size:10px;font-weight:700;color:#64748B;letter-spacing:1.5px;text-transform:uppercase;display:block;margin-top:3px;">
                      CRM, CHATBOTS & TECNOLOGÍA PYME
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN CONTENT BODY -->
          <tr>
            <td style="padding:36px 40px 32px;">
              <!-- Category Badge -->
              <div style="margin-bottom:16px;">
                <span style="display:inline-block;padding:4px 12px;background-color:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);border-radius:20px;font-size:11px;font-weight:700;color:#34D399;letter-spacing:1px;text-transform:uppercase;">
                  ${badgeText}
                </span>
              </div>

              <!-- Title & Subtitle -->
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;line-height:1.3;">
                ${title}
              </h1>
              ${subtitle ? `<p style="margin:0 0 24px;font-size:14px;color:#94A3B8;line-height:1.5;">${subtitle}</p>` : '<div style="height:16px;"></div>'}

              <!-- Message Body -->
              <div style="font-size:14px;color:#CBD5E1;line-height:1.6;">
                ${bodyHtml}
              </div>

              <!-- CTA Button -->
              ${ctaText && ctaUrl ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" target="_blank" style="display:inline-block;padding:14px 36px;background-color:#10B981;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;border-radius:12px;box-shadow:0 6px 20px rgba(16,185,129,0.35);letter-spacing:0.3px;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${footnoteHtml ? `
              <div style="margin-top:24px;padding-top:20px;border-top:1px solid #1E2D3D;font-size:12px;color:#64748B;line-height:1.5;">
                ${footnoteHtml}
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 40px;background-color:#0A1017;border-top:1px solid #16222F;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#64748B;">
                ClientumOS — Plataforma All-in-One para PyMEs
              </p>
              <p style="margin:0;font-size:11px;color:#475569;">
                Patagonia, Argentina · <a href="${baseUrl}" style="color:#10B981;text-decoration:none;">clientum.com.ar</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ── 1. SOLICITUD DE RESTABLECIMIENTO DE CONTRASEÑA ──────────────────────────
export async function sendPasswordResetEmail(toEmail: string, token: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const resetUrl = `${baseUrl}?reset_token=${token}`;

  const transport = createMailTransport();
  const creds = loadSmtpCredentials();

  if (!transport) {
    console.warn(`[Auth] SMTP no configurado. Enlace de restablecimiento generado para ${toEmail}: ${resetUrl}`);
    return false;
  }

  const html = buildClientumEmailHtml({
    badgeText: "Seguridad de la Cuenta",
    title: "Restablecer tu Contraseña",
    subtitle: "Recibimos una solicitud para restablecer la contraseña de tu cuenta de ClientumOS.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Hacé clic en el siguiente botón para crear una nueva contraseña segura:</p>
    `,
    ctaText: "Restablecer mi contraseña",
    ctaUrl: resetUrl,
    footnoteHtml: `
      <p style="margin:0 0 8px;">Si el botón no funciona, copiá y pegá este enlace en tu navegador:</p>
      <p style="margin:0;word-break:break-all;"><a href="${resetUrl}" style="color:#34D399;text-decoration:underline;">${resetUrl}</a></p>
      <p style="margin:16px 0 0;color:#64748B;font-size:11px;">Este enlace expira en 1 hora. Si no solicitaste este cambio, podés ignorar este correo de forma segura.</p>
    `,
  });

  try {
    await transport.sendMail({
      from: `"ClientumOS" <${creds.user}>`,
      to: toEmail,
      subject: "Restablecer contraseña — ClientumOS",
      html,
      text: `Restablecer contraseña — ClientumOS\n\nHacé clic en el siguiente enlace para crear una nueva contraseña (válido por 1 hora):\n\n${resetUrl}\n\nSi no solicitaste este cambio, podés ignorar este correo.`,
    });
    console.log(`[Auth Mailer] Correo de restablecimiento enviado exitosamente a ${toEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[Auth Mailer] Error enviando correo de restablecimiento a ${toEmail}:`, err?.message || err);
    return false;
  }
}

// ── 2. CONFIRMACIÓN DE CONTRASEÑA RESTABLECIDA ──────────────────────────────
export async function sendPasswordResetSuccessEmail(toEmail: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const transport = createMailTransport();
  const creds = loadSmtpCredentials();

  if (!transport) return false;

  const html = buildClientumEmailHtml({
    badgeText: "Seguridad de la Cuenta",
    title: "Contraseña Actualizada con Éxito",
    subtitle: "Tu contraseña de ClientumOS ha sido modificada correctamente.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Se ha registrado un cambio de contraseña en tu cuenta. Ya podés ingresar a tu consola con la nueva clave.</p>
      <div style="background-color:#132030;border:1px solid #1E2D3D;border-radius:12px;padding:16px;margin-top:16px;">
        <p style="margin:0;font-size:12px;color:#94A3B8;">Si vos no realizaste esta acción, comunicate de inmediato con nuestro equipo de soporte técnico a <a href="mailto:soporte@clientum.com.ar" style="color:#10B981;">soporte@clientum.com.ar</a>.</p>
      </div>
    `,
    ctaText: "Ingresar a ClientumOS",
    ctaUrl: `${baseUrl}?login=1`,
  });

  try {
    await transport.sendMail({
      from: `"ClientumOS" <${creds.user}>`,
      to: toEmail,
      subject: "Tu contraseña ha sido actualizada — ClientumOS",
      html,
      text: `Tu contraseña de ClientumOS ha sido modificada correctamente. Si no realizaste este cambio, contactá a soporte@clientum.com.ar.`,
    });
    console.log(`[Auth Mailer] Correo de confirmación de contraseña enviado a ${toEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[Auth Mailer] Error enviando confirmación a ${toEmail}:`, err?.message || err);
    return false;
  }
}

// ── 3. BIENVENIDA / REGISTRO DE CUENTA ───────────────────────────────────────
export async function sendWelcomeEmail(toEmail: string, name?: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const transport = createMailTransport();
  const creds = loadSmtpCredentials();

  if (!transport) return false;

  const displayName = name ? name.trim() : toEmail.split("@")[0];

  const html = buildClientumEmailHtml({
    badgeText: "Bienvenido a ClientumOS",
    title: `¡Hola, ${displayName}! Bienvenido a bordo`,
    subtitle: "Tu cuenta ha sido creada exitosamente. Ya tenés acceso completo a la plataforma.",
    bodyHtml: `
      <p style="margin:0 0 16px;">Estamos entusiasmados de acompañarte a impulsar la gestión, automatizaciones y crecimiento de tu empresa.</p>
      <div style="background-color:#132030;border:1px solid #1E2D3D;border-radius:12px;padding:20px;margin:20px 0;">
        <h4 style="margin:0 0 10px;font-size:14px;color:#FFFFFF;">Lo que podés hacer en tu consola:</h4>
        <ul style="margin:0;padding-left:20px;color:#CBD5E1;font-size:13px;line-height:1.7;">
          <li>Gestionar tu CRM y pipeline de ventas en tiempo real</li>
          <li>Configurar tus Chatbots de WhatsApp con IA</li>
          <li>Acceder a herramientas de Marketing Digital y prospección</li>
        </ul>
      </div>
    `,
    ctaText: "Acceder a mi Consola",
    ctaUrl: `${baseUrl}`,
  });

  try {
    await transport.sendMail({
      from: `"ClientumOS" <${creds.user}>`,
      to: toEmail,
      subject: "¡Bienvenido a ClientumOS!",
      html,
      text: `¡Bienvenido a ClientumOS, ${displayName}!\n\nTu cuenta ha sido creada exitosamente. Accedé a tu consola en ${baseUrl}`,
    });
    console.log(`[Auth Mailer] Correo de bienvenida enviado a ${toEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[Auth Mailer] Error enviando bienvenida a ${toEmail}:`, err?.message || err);
    return false;
  }
}

// ── 4. NOTIFICACIÓN DE INICIO DE SESIÓN ──────────────────────────────────────
export async function sendLoginNotificationEmail(toEmail: string, ip?: string, userAgent?: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const transport = createMailTransport();
  const creds = loadSmtpCredentials();

  if (!transport) return false;

  const now = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });

  const html = buildClientumEmailHtml({
    badgeText: "Aviso de Seguridad",
    title: "Nuevo Inicio de Sesión Detectado",
    subtitle: "Se ha iniciado sesión en tu cuenta de ClientumOS.",
    bodyHtml: `
      <div style="background-color:#132030;border:1px solid #1E2D3D;border-radius:12px;padding:16px;margin:16px 0;">
        <table width="100%" cellpadding="4" cellspacing="0" style="font-size:13px;color:#CBD5E1;">
          <tr>
            <td style="color:#94A3B8;width:110px;">Fecha y hora:</td>
            <td style="font-weight:600;color:#FFFFFF;">${now} (Hs Argentina)</td>
          </tr>
          ${ip ? `
          <tr>
            <td style="color:#94A3B8;">Dirección IP:</td>
            <td style="font-family:monospace;color:#34D399;">${ip}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      <p style="margin:16px 0 0;font-size:12px;color:#94A3B8;">Si fuiste vos, podés ignorar este mensaje. Si no reconocés esta actividad, te sugerimos cambiar tu contraseña de inmediato.</p>
    `,
    ctaText: "Ir a mi Cuenta",
    ctaUrl: `${baseUrl}`,
  });

  try {
    await transport.sendMail({
      from: `"ClientumOS" <${creds.user}>`,
      to: toEmail,
      subject: "Nuevo inicio de sesión — ClientumOS",
      html,
      text: `Nuevo inicio de sesión detectado en tu cuenta de ClientumOS el ${now}. Si no fuiste vos, cambiá tu contraseña de inmediato.`,
    });
    console.log(`[Auth Mailer] Notificación de login enviada a ${toEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[Auth Mailer] Error enviando notificación de login a ${toEmail}:`, err?.message || err);
    return false;
  }
}

// ── 5. FORMULARIO DE CONTACTO ──────────────────────────────────────────────
export async function sendContactFormEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const transport = createMailTransport();
  const creds = loadSmtpCredentials();
  if (!transport || !creds.user) return false;

  const html = buildClientumEmailHtml({
    badgeText: "Formulario de Contacto",
    title: "Nueva consulta en ClientumOS",
    subtitle: `De: ${name} (${email})`,
    bodyHtml: `
      <p style="margin:0 0 16px;"><strong>Asunto:</strong> ${subject}</p>
      <div style="background-color:#132030;padding:16px;border-radius:8px;">
        <p style="margin:0;color:#CBD5E1;">${message}</p>
      </div>
    `,
  });

  try {
    await transport.sendMail({
      from: `"Clientum Contacto" <${creds.user}>`,
      to: creds.user, // Send to the admin/configured email
      subject: `Nueva consulta: ${subject}`,
      html,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
    });
    return true;
  } catch (err) {
    console.error("Error sending contact email:", err);
    return false;
  }
}
