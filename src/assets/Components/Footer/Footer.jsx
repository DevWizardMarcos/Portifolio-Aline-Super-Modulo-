import { useEffect, useState } from "react";

function Footer() {
  const [mostrarTopo, setMostrarTopo] = useState(false);

  useEffect(() => {
    const aoRolar = () => setMostrarTopo(window.scrollY > 500);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <>
      <footer className="flex flex-col items-center justify-between gap-2 border-t border-gray-800 px-[6%] py-8 text-sm text-gray-500 md:flex-row">
        <p>© 2026 DevPortfolio. Todos os direitos reservados.</p>
        <p>
          Feito com 💙 e <span className="text-blue-400">React</span> +{" "}
          <span className="text-blue-400">Tailwind</span>
        </p>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-blue-600 text-xl text-white shadow-lg shadow-blue-900/50 transition duration-300 hover:-translate-y-1 hover:bg-blue-500 ${
          mostrarTopo
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        ↑
      </button>
    </>
  );
}

export default Footer;
