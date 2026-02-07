"use server";

import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Email non valida"),
});

export interface NewsletterResponse {
  success: boolean;
  error?: string;
}

export async function subscribeNewsletter(
  email: string,
  locale: string = "it"
): Promise<NewsletterResponse> {
  const result = newsletterSchema.safeParse({ email });

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const validEmail = result.data.email;
  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_NEWSLETTER_WEBHOOK_URL not configured");
    return { success: false, error: "Servizio temporaneamente non disponibile." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validEmail,
        locale,
        subscribedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error("n8n webhook error:", response.status);
      return { success: false, error: "Errore durante l'iscrizione. Riprova più tardi." };
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
