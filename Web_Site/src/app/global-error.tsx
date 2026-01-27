"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body className="bg-[#0C0B09] text-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-[#C9A96E] mb-4">Oops!</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Qualcosa è andato storto
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Si è verificato un errore imprevisto. Riprova più tardi.
          </p>
          <button
            onClick={() => reset()}
            className="inline-block bg-[#C9A96E] text-[#0C0B09] px-8 py-3 rounded-full font-semibold hover:bg-[#D4B87A] transition-colors"
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}
