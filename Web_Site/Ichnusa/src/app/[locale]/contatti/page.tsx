"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useInViewport, getReferralDataForSubmission } from "@/hooks";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Indirizzo",
    content: "Plaská 623/5\n150 00 Malá Strana, Praha",
    link: "https://maps.google.com/?q=Plaská+623/5,+150+00+Praha,+Czech+Republic",
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "+420 605 375 012",
    link: "tel:+420605375012",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@ichnusa.restaurant\nreservations@ichnusa.restaurant",
    link: "mailto:info@ichnusa.restaurant",
  },
  {
    icon: Clock,
    title: "Orari",
    content: "Lun - Sab: 11:30 - 15:00 & 16:00 - 22:00\nDom: 11:00 - 15:00",
    link: null,
  },
];

export default function ContattiPage() {
  const [formRef, formInView] = useInViewport({ threshold: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const referralData = getReferralDataForSubmission();
    const fullData = { ...formState, ...referralData };

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", fullData);
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Contattaci"
          subtitle="Siamo qui per rispondere alle tue domande e accoglierti nel nostro ristorante"
          backgroundImage="/images/backgrounds/reservation-bg.jpg"
          breadcrumbs={[{ label: "Contatti", href: "/contatti" }]}
        />

        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={fadeInUp}
                  className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <info.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-lg text-white mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[var(--color-text-muted)] text-sm whitespace-pre-line hover:text-[var(--color-primary)] transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-[var(--color-text-muted)] text-sm whitespace-pre-line">
                      {info.content}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                ref={formRef}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.span variants={fadeInUp} className="subtitle-decorator mb-4">
                  Scrivici
                </motion.span>
                <motion.h2 variants={fadeInUp} className="font-[var(--font-display)] text-4xl text-white mb-6">
                  Invia un <span className="text-[var(--color-primary)]">Messaggio</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-[var(--color-text-muted)] mb-8">
                  Hai domande sul nostro menu, vuoi organizzare un evento privato o semplicemente 
                  vuoi saperne di più? Compila il form e ti risponderemo al più presto.
                </motion.p>

                <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="tua@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm text-[var(--color-text-muted)] mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="+420 ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm text-[var(--color-text-muted)] mb-2">
                        Oggetto *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                      >
                        <option value="">Seleziona...</option>
                        <option value="info">Informazioni generali</option>
                        <option value="reservation">Prenotazione</option>
                        <option value="event">Evento privato</option>
                        <option value="products">Prodotti bottega</option>
                        <option value="other">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-[var(--color-text-muted)] mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 text-white focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                      placeholder="Scrivi il tuo messaggio..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Invia Messaggio
                        </>
                      )}
                    </button>

                    {submitStatus === "success" && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-500 text-sm"
                      >
                        Messaggio inviato con successo!
                      </motion.span>
                    )}
                  </div>
                </motion.form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-[var(--color-border)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.3847395445163!2d14.40348731571859!3d50.08370197942542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f1f6b5c1a7%3A0x8b7a3b6b7f8b7a3b!2sPlas%C3%A1%20623%2F5%2C%20150%2000%20Praha%205-Mal%C3%A1%20Strana!5e0!3m2!1sit!2scz!4v1620000000000!5m2!1sit!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>

                <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-4">
                    Prenotazione Rapida
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm mb-4">
                    Per prenotare un tavolo, usa il nostro sistema di prenotazione online 
                    o chiamaci direttamente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-center"
                    >
                      Prenota Online
                    </a>
                    <a
                      href="tel:+420605375012"
                      className="px-6 py-3 border border-[var(--color-border)] text-white text-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      Chiama Ora
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <h3 className="font-[var(--font-display)] text-xl text-white mb-4">
                    Seguici
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm mb-4">
                    Resta aggiornato su eventi, piatti del giorno e novità.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/ichnusarestaurant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/ichnusa_official_prague/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
