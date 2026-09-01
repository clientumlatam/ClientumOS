import dotenv from "dotenv";

export interface SmtpCredentials {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}

export function loadSmtpCredentials(): SmtpCredentials {
  dotenv.config();

  let user = process.env.SMTP_USER || "";
  let pass = process.env.SMTP_PASS || "";

  if (!user || !pass) {
    user = user || "clientumlatam@gmail.com";
    pass = pass || "ctqk qzks ryvx wukx";

    process.env.SMTP_USER = user;
    process.env.SMTP_PASS = pass;
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";

  return { user, pass, host, port, secure };
}
