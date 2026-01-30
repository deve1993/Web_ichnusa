"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Nome richiesto"),
  email: z.string().email("Email non valida"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Oggetto richiesto"),
  message: z.string().min(10, "Messaggio troppo corto"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactResponse {
  success: boolean;
  error?: string;
}

interface ReCaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string): Promise<{ valid: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return { valid: true, score: 1.0 };
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secretKey}&response=${token}`,
  });

  const result: ReCaptchaVerifyResponse = await response.json();
  return { valid: result.success && (result.score ?? 0) >= 0.5, score: result.score ?? 0 };
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function submitContactForm(
  data: Record<string, string>
): Promise<ContactResponse> {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const messages = result.error.issues.map((issue) => issue.message);
    return {
      success: false,
      error: messages.join(", "),
    };
  }

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const token = data.recaptchaToken;
    if (!token) {
      return { success: false, error: "Verifica reCAPTCHA mancante. Ricarica la pagina e riprova." };
    }

    const { valid, score } = await verifyRecaptcha(token);
    if (!valid) {
      console.warn(`reCAPTCHA rejected: score=${score}, email=${data.email}`);
      return { success: false, error: "Verifica anti-spam fallita. Riprova." };
    }
  }

  const validatedData = result.data;

  const subjectLabels: Record<string, string> = {
    info: "Informazioni generali",
    reservation: "Prenotazione",
    event: "Evento privato",
    products: "Prodotti bottega",
    other: "Altro",
  };

  const emailContent = `
Nuovo messaggio dal sito web Ichnusa

Nome: ${validatedData.name}
Email: ${validatedData.email}
Telefono: ${validatedData.phone || "Non fornito"}
Oggetto: ${subjectLabels[validatedData.subject] || validatedData.subject}

Messaggio:
${validatedData.message}

---
Referral data: ${data.referrer || "Direct"}
UTM Source: ${data.utm_source || "N/A"}
  `.trim();

  try {
    if (process.env.SMTP_HOST) {
      const transporter = getTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "Ichnusa <reservations@ichnusa.restaurant>",
        to: process.env.CONTACT_EMAIL || "reservations@ichnusa.restaurant",
        replyTo: validatedData.email,
        subject: `[Ichnusa Web] ${subjectLabels[validatedData.subject] || validatedData.subject} - ${validatedData.name}`,
        text: emailContent,
      });

      console.log("Email sent via SMTP");
    } else {
      console.log("SMTP_HOST not configured. Would send email:");
      console.log(emailContent);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error: "Si è verificato un errore. Riprova più tardi.",
    };
  }
}
