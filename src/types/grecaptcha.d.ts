interface ReCaptchaV3 {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

interface Window {
  grecaptcha: ReCaptchaV3;
  gtag: (...args: unknown[]) => void;
  fbq: (...args: unknown[]) => void;
  dataLayer: Record<string, unknown>[];
}
