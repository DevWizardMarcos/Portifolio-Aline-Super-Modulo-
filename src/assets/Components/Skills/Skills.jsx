import { useState } from "react";
import useReveal from "../../../hooks/useReveal";

// "nivel" é só um exemplo visual (0-100): ajuste para a sua realidade.
const listaDeSkills = [
  { nome: "HTML5", categoria: "Front-end", nivel: 90, icone: "https://cdn.simpleicons.org/html5" },
  { nome: "CSS3", categoria: "Front-end", nivel: 85, icone: "https://cdn.simpleicons.org/css" },
  { nome: "JavaScript", categoria: "Front-end", nivel: 75, icone: "https://cdn.simpleicons.org/javascript" },
  { nome: "React", categoria: "Front-end", nivel: 70, icone: "https://cdn.simpleicons.org/react" },
  { nome: "Tailwind CSS", categoria: "Front-end", nivel: 70, icone: "https://cdn.simpleicons.org/tailwindcss" },
  { nome: "Git", categoria: "Ferramentas", nivel: 65, icone: "https://cdn.simpleicons.org/git" },
  { nome: "GitHub", categoria: "Ferramentas", nivel: 65, icone: "https://cdn.simpleicons.org/github/white" },
  { nome: "Figma", categoria: "Design", nivel: 60, icone: "https://cdn.simpleicons.org/figma" },
];

const categorias = ["Todas", ...new Set(listaDeSkills.map((s) => s.categoria))];

function Skills() {
  const [filtro, setFiltro] = useState("Todas");
  const [ref, visivel] = useReveal();

  const skills =
    filtro === "Todas"
      ? listaDeSkills
      : listaDeSkills.filter((s) => s.categoria === filtro);

  return (
    <section id="skills" className="px-[6%] py-24 text-gray-200">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-gray-50 md:text-4xl">
          Minhas{" "}
          <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              aria-pressed={c === filtro}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                c === filtro
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "border border-gray-700 text-gray-400 hover:border-blue-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {skills.map((s, i) => (
            <article
              key={s.nome}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`group rounded-2xl border border-gray-800 bg-white/5 p-5 text-center transition duration-500 hover:-translate-y-2 hover:border-blue-500/60 hover:bg-blue-500/10 hover:shadow-xl hover:shadow-blue-900/30 ${
                visivel ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <img
                src={s.icone}
                alt={`Logo de ${s.nome}`}
                className="mx-auto h-12 w-12 transition duration-300 group-hover:scale-125 group-hover:rotate-6"
              />
              <p className="mt-3 font-semibold text-gray-100">{s.nome}</p>
              <p className="text-xs text-gray-500">{s.categoria}</p>

              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-800"
                role="progressbar"
                aria-valuenow={s.nivel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Nível em ${s.nome}`}
              >
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-400 transition-all duration-1000 ease-out"
                  style={{ width: visivel ? `${s.nivel}%` : "0%" }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
