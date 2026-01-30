"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="email"
        placeholder="La tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 bg-transparent border border-[var(--color-border)] border-r-0 px-6 py-4 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
      />
      <button
        type="submit"
        aria-label="Iscriviti alla newsletter"
        className="bg-[var(--color-primary)] px-8 py-4 text-[var(--color-background)] hover:bg-[var(--color-primary-dark)] transition-colors flex items-center gap-2"
      >
        <span className="hidden sm:inline uppercase tracking-wider text-sm font-medium">
          Iscriviti
        </span>
        <Send size={18} />
      </button>
    </form>
  );
}
