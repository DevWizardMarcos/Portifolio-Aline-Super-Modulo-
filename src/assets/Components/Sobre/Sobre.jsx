import { useState } from "react";
import avatar from "../../Projetos/avatar.png";
import { projetos } from "../Projetos/dadosProjetos";
import useReveal from "../../../hooks/useReveal";
import useCountUp from "../../../hooks/useCountUp";

const abas = [
  {
    id: "quem",
    rotulo: "Quem sou",
    texto:
      "Sou apaixonada por tecnologia e desenvolvimento web. Atualmente foco em criar aplicações com React, JavaScript, HTML, CSS e boas práticas de código.",
  },
  {
    id: "formacao",
    rotulo: "Formação",
    texto:
      "Escreva aqui sua formação: curso, instituição e o que você já estudou até agora.",
  },
  {
    id: "objetivo",
    rotulo: "Objetivo",
    texto:
      "Escreva aqui o que você busca: tipo de vaga, área de atuação e onde quer chegar.",
  },
];

const estatisticas = [
  { alvo: 1, sufixo: "+", rotulo: "Anos de experiência", icone: "📅" },
  { alvo: 10, sufixo: "+", rotulo: "Projetos concluídos", icone: "</>" },
  { alvo: 8, sufixo: "", rotulo: "Tecnologias", icone: "🚀" },
];

function Estatistica({ alvo, sufixo, rotulo, icone, ativo }) {
  const valor = useCountUp(alvo, ativo);
  return (
    <div className="group rounded-xl border border-gray-800 bg-white/5 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:bg-blue-500/10">
      <span className="text-xl transition group-hover:scale-125 inline-block">
        {icone}
      </span>
      <p className="mt-1 text-2xl font-bold text-blue-400">
        {valor}
        {sufixo}
      </p>
      <p className="mt-1 text-xs text-gray-400">{rotulo}</p>
    </div>
  );
}

function Sobre() {
  const [abaAtiva, setAbaAtiva] = useState("quem");
  const [ref, visivel] = useReveal();
  const aba = abas.find((a) => a.id === abaAtiva);

  return (
    <section id="sobre" className="bg-gray-950 px-[6%] py-24 text-gray-200">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl transition duration-700 ${
          visivel ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-center text-3xl font-bold text-gray-50 md:text-4xl">
          Sobre{" "}
          <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            mim
          </span>
        </h2>

        <div className="mt-14 flex flex-col items-center gap-12 md:flex-row md:items-start">
          <div className="group relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 opacity-40 blur-xl transition duration-500 group-hover:opacity-80" />
            <img
              src={avatar}
              alt="Avatar da desenvolvedora"
              className="relative h-56 w-56 rounded-full object-cover object-top ring-4 ring-blue-500/40 transition duration-500 group-hover:scale-105 group-hover:-rotate-2 md:h-72 md:w-72"
            />
          </div>

          <div className="w-full text-center md:text-left">
            <div
              role="tablist"
              className="flex justify-center gap-2 md:justify-start"
            >
              {abas.map((a) => (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={a.id === abaAtiva}
                  onClick={() => setAbaAtiva(a.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    a.id === abaAtiva
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                      : "border border-gray-700 text-gray-400 hover:border-blue-400 hover:text-white"
                  }`}
                >
                  {a.rotulo}
                </button>
              ))}
            </div>

            <p
              key={aba.id}
              className="mt-5 min-h-24 leading-relaxed text-gray-300 animate-[fadeIn_0.4s_ease-out]"
            >
              {aba.texto}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {estatisticas.map((e) => (
                <Estatistica key={e.rotulo} {...e} ativo={visivel} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="mb-4 text-center text-sm uppercase tracking-widest text-gray-500 md:text-left">
            Trabalhos recentes
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {projetos.map((p) => (
              <a
                key={p.id}
                href="#projetos"
                title={`Ver ${p.titulo}`}
                className="group relative aspect-video overflow-hidden rounded-xl border border-gray-800"
              >
                <img
                  src={p.imagem}
                  alt={`Prévia do projeto ${p.titulo}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 to-transparent p-3 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {p.titulo} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
