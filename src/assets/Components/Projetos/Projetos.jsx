import { useEffect, useState } from "react";
import { projetos } from "./dadosProjetos";
import useReveal from "../../../hooks/useReveal";

const tecnologias = [
  "Todos",
  ...new Set(projetos.flatMap((p) => p.tecnologias)),
];

function Modal({ projeto, aoFechar }) {
  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && aoFechar();
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [aoFechar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto ${projeto.titulo}`}
      onClick={aoFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl"
      >
        <img
          src={projeto.imagem}
          alt={`Imagem do projeto ${projeto.titulo}`}
          className="aspect-video w-full object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold text-white">{projeto.titulo}</h3>
            <button
              onClick={aoFechar}
              aria-label="Fechar"
              className="rounded-full border border-gray-700 px-3 py-1 text-gray-400 transition hover:border-blue-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 text-gray-300">{projeto.descricao}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {projeto.tecnologias.map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={projeto.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-lg bg-linear-to-r from-blue-700 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5"
          >
            Ver projeto ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function Projetos() {
  const [filtro, setFiltro] = useState("Todos");
  const [selecionado, setSelecionado] = useState(null);
  const [ref, visivel] = useReveal(0.1);

  const lista =
    filtro === "Todos"
      ? projetos
      : projetos.filter((p) => p.tecnologias.includes(filtro));

  return (
    <section id="projetos" className="bg-gray-950 px-[6%] py-24 text-gray-200">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-50 md:text-4xl">
          Meus{" "}
          <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Projetos
          </span>
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tecnologias.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              aria-pressed={t === filtro}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                t === filtro
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "border border-gray-700 text-gray-400 hover:border-blue-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lista.map((p, i) => (
            <article
              key={p.id}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 transition duration-500 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-900/30 ${
                visivel ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <button
                onClick={() => setSelecionado(p)}
                aria-label={`Abrir detalhes de ${p.titulo}`}
                className="relative aspect-video overflow-hidden"
              >
                <img
                  src={p.imagem}
                  alt={`Imagem do projeto ${p.titulo}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  🔍 Ver detalhes
                </span>
              </button>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-bold text-white">{p.titulo}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {p.descricao}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tecnologias.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFiltro(t)}
                      title={`Filtrar por ${t}`}
                      className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-300 transition hover:bg-blue-500/30"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Ver projeto <span className="inline-block transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selecionado && (
        <Modal projeto={selecionado} aoFechar={() => setSelecionado(null)} />
      )}
    </section>
  );
}

export default Projetos;
