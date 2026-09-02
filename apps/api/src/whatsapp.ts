import dotenv from "dotenv";

dotenv.config();

export interface WhatsAppSendResponse {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}

/**
 * Envia un mensaje de texto a traves de Meta WhatsApp Cloud API
 *
 * @param recipientPhone Numero de telefono del destinatario en formato E.164 (ej: 5491123456789)
 * @param messageText Texto del mensaje a enviar
 */
export const sendWhatsAppMessage = async (
  recipientPhone: string,
  messageText: string
): Promise<WhatsAppSendResponse> => {
  const phoneNumberId = process.env.META_WA_PHONE_NUMBER_ID;
  const accessToken = process.env.META_WA_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error(
      "Configuracion de Meta WhatsApp API incompleta. Verifica META_WA_PHONE_NUMBER_ID y META_WA_ACCESS_TOKEN en las variables de entorno."
    );
  }

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhone,
    type: "text",
    text: {
      preview_url: false,
      body: messageText,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data.error || {};
      const errorCode = error.code;
      const errorSubcode = error.error_subcode;
      const errorMessage = error.message || "Error desconocido";

      console.error(`[WhatsApp API Error] Status: ${response.status}, Code: ${errorCode}, Subcode: ${errorSubcode}, Message: ${errorMessage}`);

      if (errorCode === 190 || errorCode === 102) {
        throw new Error(`Token de acceso de Meta expirado o inválido (Error ${errorCode}). Por favor, renová el META_WA_ACCESS_TOKEN.`);
      } else if (errorCode === 131030) {
        throw new Error("El número de destino no es válido o no está registrado en WhatsApp.");
      } else if (errorCode === 131026) {
        throw new Error("El mensaje no pudo enviarse. Asegurate de que la ventana de 24 horas esté abierta o usá un template.");
      } else if (errorCode === 33) {
        throw new Error("Número de teléfono de envío no habilitado o ID incorrecto.");
      }

      throw new Error(`Meta WhatsApp API Error: ${errorMessage} (Code: ${errorCode})`);
    }

    console.log(`[WhatsApp] Mensaje enviado exitosamente a (${recipientPhone}):`, data.messages?.[0]?.id);
    return data as WhatsAppSendResponse;
  } catch (error: any) {
    console.error("Fallo la peticion a la API de WhatsApp:", error.message);
    throw error;
  }
};
