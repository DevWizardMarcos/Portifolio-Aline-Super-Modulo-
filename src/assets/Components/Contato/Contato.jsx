import { useState } from "react";
import useReveal from "../../../hooks/useReveal";

const EMAIL = "seuemail@email.com"; // troque pelo seu e-mail

const redes = [
  { nome: "GitHub", url: "https://github.com/", icone: "https://cdn.simpleicons.org/github/white" },
  { nome: "Instagram", url: "https://instagram.com/", icone: "https://cdn.simpleicons.org/instagram/white" },
  // O Simple Icons removeu o logo do LinkedIn (404), então usamos SVG embutido.
  { nome: "LinkedIn", url: "https://linkedin.com/", icone: null },
];

function IconeLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [erros, setErros] = useState({});
  const [copiado, setCopiado] = useState(false);
  const [ref, visivel] = useReveal();

  const atualizar = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
    if (erros[campo]) setErros({ ...erros, [campo]: undefined });
  };

  const validar = () => {
    const novos = {};
    if (!form.nome.trim()) novos.nome = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) novos.email = "E-mail inválido.";
    if (form.mensagem.trim().length < 10)
      novos.mensagem = "Escreva pelo menos 10 caracteres.";
    return novos;
  };

  const enviar = (e) => {
    e.preventDefault();
    const novos = validar();
    setErros(novos);
    if (Object.keys(novos).length) return;

    const assunto = encodeURIComponent(`Contato de ${form.nome}`);
    const corpo = encodeURIComponent(`${form.mensagem}\n\n${form.nome} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${assunto}&body=${corpo}`;
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const campo =
    "w-full rounded-lg border bg-gray-900/70 px-4 py-3 text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

  return (
    <section id="contato" className="px-[6%] py-24 text-gray-200">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl rounded-3xl border border-gray-800 bg-linear-to-br from-gray-900 to-gray-950 p-8 transition duration-700 md:p-12 ${
          visivel ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="text-4xl">📨</span>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Vamos trabalhar juntos?
            </h2>
            <p className="mt-3 text-gray-400">
              Estou disponível para novos projetos e oportunidades.
            </p>

            <button
              onClick={copiar}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm transition hover:border-blue-400 hover:text-white"
            >
              {copiado ? "✅ Copiado!" : `📋 ${EMAIL}`}
            </button>

            <div className="mt-8 flex gap-3">
              {redes.map((r) => (
                <a
                  key={r.nome}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={r.nome}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-500/10"
                >
                  {r.icone ? (
                    <img src={r.icone} alt="" className="h-5 w-5" />
                  ) : (
                    <IconeLinkedIn />
                  )}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
            {[
              { id: "nome", rotulo: "Nome", tipo: "text", ph: "Seu nome" },
              { id: "email", rotulo: "E-mail", tipo: "email", ph: "voce@email.com" },
            ].map((c) => (
              <div key={c.id}>
                <label htmlFor={c.id} className="mb-1 block text-sm text-gray-400">
                  {c.rotulo}
                </label>
                <input
                  id={c.id}
                  type={c.tipo}
                  placeholder={c.ph}
                  value={form[c.id]}
                  onChange={atualizar(c.id)}
                  aria-invalid={!!erros[c.id]}
                  className={`${campo} ${erros[c.id] ? "border-red-500" : "border-gray-700"}`}
                />
                {erros[c.id] && (
                  <p className="mt-1 text-xs text-red-400">{erros[c.id]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="mensagem" className="mb-1 block text-sm text-gray-400">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={4}
                placeholder="Conte sobre o seu projeto..."
                value={form.mensagem}
                onChange={atualizar("mensagem")}
                aria-invalid={!!erros.mensagem}
                className={`${campo} resize-none ${erros.mensagem ? "border-red-500" : "border-gray-700"}`}
              />
              {erros.mensagem && (
                <p className="mt-1 text-xs text-red-400">{erros.mensagem}</p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-lg bg-linear-to-r from-blue-700 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5 hover:shadow-blue-700/50"
            >
              Enviar mensagem 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contato;
