import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#0C0B09] text-white min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[#C9A96E] mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Pagina non trovata
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#C9A96E] text-[#0C0B09] px-8 py-3 rounded-full font-semibold hover:bg-[#D4B87A] transition-colors"
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
