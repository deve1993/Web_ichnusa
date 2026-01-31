"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const newsletterSchema = z.object({
  email: z.string().email("Email non valida"),
});

export interface NewsletterResponse {
  success: boolean;
  error?: string;
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

export async function subscribeNewsletter(
  email: string
): Promise<NewsletterResponse> {
  const result = newsletterSchema.safeParse({ email });

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const validEmail = result.data.email;

  const emailContent = `
Nuova iscrizione newsletter - Ichnusa Botega & Bistro

Email: ${validEmail}
Data: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Prague" })}

---
Iscrizione ricevuta dal sito web.
  `.trim();

  try {
    if (process.env.SMTP_HOST) {
      const transporter = getTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "Ichnusa <reservations@ichnusa.restaurant>",
        to: process.env.CONTACT_EMAIL || "reservations@ichnusa.restaurant",
        subject: `[Ichnusa Newsletter] Nuova iscrizione: ${validEmail}`,
        text: emailContent,
      });

      console.log("Newsletter subscription sent via SMTP:", validEmail);
    } else {
      console.log("SMTP_HOST not configured. Newsletter subscription:", validEmail);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      error: "Errore durante l'iscrizione. Riprova più tardi.",
    };
  }
}
