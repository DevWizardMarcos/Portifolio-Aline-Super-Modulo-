<div align="center">

<img src="src/assets/Components/Avatar.png" alt="Banner do projeto: personagem Aline em estilo dark azul" width="100%" />

# 💙 Portfólio Alice: uma SPA em React feita para ensinar

**Projeto que construí como instrutor do Super Módulo da Infinity School para mostrar aos alunos, na prática, como sai um portfólio de nível profissional:** componentizado, animado sem bibliotecas extras e pensado em acessibilidade desde o início.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

[O projeto](#-o-projeto) •
[O que ele demonstra](#-o-que-este-projeto-demonstra) •
[Decisões técnicas](#-decisões-técnicas) •
[Desafios](#-desafios-que-resolvi) •
[Como rodar](#-como-rodar) •
[Sobre mim](#-sobre-mim)

</div>

---

## 🎯 O projeto

Sou instrutor de front-end na **Infinity School** e, no Super Módulo, os alunos precisam montar o próprio portfólio. Em vez de mostrar só slides, eu criei a **Aline**, uma desenvolvedora fictícia, e construí o portfólio dela do zero, em aula, junto com a turma.

O objetivo era provar um ponto: **dá para fazer um site com cara de produto real usando só React, Tailwind e hooks bem escritos**, sem empilhar dependências. Cada seção ensina um conceito diferente, e o resultado virou um template que os alunos adaptam com os próprios dados.

> 🎨 **Identidade visual:** dark mode em azul profundo com detalhes em vermelho fênix. A personagem tem duas versões (séria e sorrindo) que se alternam no hover do Hero.

## 💼 O que este projeto demonstra

| Competência | Onde aparece no código |
|---|---|
| **Componentização em React** | 7 seções isoladas, cada uma com sua responsabilidade (`Hero`, `Sobre`, `Skills`, `Projetos`, `Contato`...) |
| **Hooks customizados** | `useReveal` e `useCountUp`, reutilizados em várias seções |
| **Gerenciamento de estado** | Abas, filtros, modal e formulário controlados com `useState` |
| **Ciclo de vida e cleanup** | Listeners, observers e `requestAnimationFrame` sempre desmontados no `useEffect` |
| **Arquitetura orientada a dados** | Projetos, skills e abas renderizados a partir de arrays: zero JSX duplicado |
| **Acessibilidade (a11y)** | ARIA em modal, abas, filtros, barras de progresso e formulário |
| **CSS moderno** | Tailwind 4 + CSS próprio, gradientes, crossfade de imagens e layout responsivo |
| **Qualidade de código** | ESLint configurado com regras de React Hooks |

## ✨ Funcionalidades

- 🦸 **Hero** com crossfade entre duas ilustrações da personagem no hover e animação de entrada
- 👩‍💻 **Sobre mim** com abas (Quem sou · Formação · Objetivo) e contadores que sobem ao aparecer na tela
- 🛠️ **Skills** com filtro por categoria e barras de nível que se preenchem com animação
- 📂 **Projetos** com filtro por tecnologia e modal de detalhes (fecha com `Esc` ou clique fora)
- 📨 **Contato** com validação em tempo real, envio via `mailto` e botão de copiar e-mail
- ⬆️ **Botão "voltar ao topo"** que só aparece depois de rolar a página

## 🧠 Decisões técnicas

**1. Animações sem biblioteca.**
Framer Motion resolveria, mas eu queria que os alunos entendessem o que acontece por baixo. Criei dois hooks pequenos:

```js
// useReveal: dispara uma única vez quando o elemento entra na tela
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    setVisivel(true);
    observer.disconnect(); // não fica observando à toa
  }
}, { threshold });
```

O `useCountUp` usa `requestAnimationFrame` com curva *ease-out cubic* (`1 - (1 - t)³`), para o número desacelerar no final como em dashboards de verdade.

**2. Uma única fonte de dados.**
Todos os projetos vivem em `dadosProjetos.js`, consumido pela galeria do "Sobre" e pela seção "Projetos". Os botões de filtro são gerados com `new Set(projetos.flatMap(p => p.tecnologias))`: cadastrou um projeto com tecnologia nova, o filtro aparece sozinho.

**3. Acessibilidade como requisito, não como extra.**
- Modal com `role="dialog"`, `aria-modal`, fechamento por `Esc` e bloqueio do scroll do `body`
- Abas com `role="tablist"`, `role="tab"` e `aria-selected`; filtros com `aria-pressed`
- Barras de skill com `role="progressbar"` e `aria-valuenow`
- Formulário com `label` associado a cada campo e `aria-invalid` nos erros
- `prefers-reduced-motion` respeitado no Hero e na rolagem suave

## 🧩 Desafios que resolvi

| Problema | Solução |
|---|---|
| **Trocar a imagem no hover sem flicker** | As duas imagens ficam empilhadas desde o início e só a `opacity` da segunda muda. Resultado: crossfade suave de 0.6s, sem flicker. |
| **Classes `p-*` e `m-*` do Tailwind paravam de funcionar** | Um reset `* { margin: 0; padding: 0 }` fora de `@layer` vencia o Tailwind 4. Removi e deixei o *preflight* do Tailwind cuidar do reset. |
| **Ícone do LinkedIn quebrou (404)** | O Simple Icons removeu o logo. Troquei por um SVG inline, sem depender de CDN para esse ícone. |
| **Texto ilegível sobre a ilustração** | Gradiente escuro da esquerda para a direita no Hero: o texto fica legível e a personagem continua visível. |
| **Animar contadores sem deixar frames rodando** | `cancelAnimationFrame` no cleanup do efeito e disparo só quando a seção fica visível. |

## 🗂️ Estrutura

```
src/
├── App.jsx                  # Composição das seções
├── hooks/
│   ├── useReveal.js         # IntersectionObserver
│   └── useCountUp.js        # requestAnimationFrame + easing
└── assets/
    ├── Components/
    │   ├── NavBar/   Hero/   Sobre/   Skills/
    │   ├── Projetos/          # Grid, filtro, modal e dadosProjetos.js
    │   └── Contato/  Footer/
    └── Projetos/              # Imagens dos projetos
```

## 🚀 Como rodar

```bash
git clone https://github.com/DevWizardMarcos/Portifolio-Aline-Super-Modulo-.git
cd Portifolio-Aline-Super-Modulo-
npm install
npm run dev        # http://localhost:5173
```

`npm run build` gera a versão de produção · `npm run lint` roda o ESLint

<details>
<summary><b>🎓 Aluno? Veja como adaptar para o seu portfólio</b></summary>

| O que trocar | Arquivo |
|---|---|
| Nome, título e botões | `Hero/Hero.jsx` |
| Textos das abas e números | `Sobre/Sobre.jsx` |
| Skills e níveis | `Skills/Skills.jsx` (array `listaDeSkills`) |
| Seus projetos | `Projetos/dadosProjetos.js` |
| E-mail e redes | `Contato/Contato.jsx` (`EMAIL` e `redes`) |
| Imagens da personagem | `assets/Components/Avatar.png` e `AvatarSorrindo.png` |

</details>

## 🗺️ Próximos passos

- [ ] Deploy na Vercel com link público
- [ ] Menu mobile (hambúrguer)
- [ ] Envio real do formulário (EmailJS ou Formspree)
- [ ] Meta tags de SEO e Open Graph
- [ ] Migração para TypeScript

---

## 👋 Sobre mim

<table>
  <tr>
    <td width="130" align="center">
      <img src="https://github.com/DevWizardMarcos.png" width="110" alt="Marcos Simões"/>
    </td>
    <td>
      <b>Marcos Simões (DW)</b>, desenvolvedor front-end com base full-stack, em Belo Horizonte.<br/><br/>
      Na <b>Infinity School</b> fui de aluno a monitor, de monitor a instrutor e hoje lidero instrutores de front-end e full-stack. Ensinar me obriga a entender cada linha que escrevo, e é isso que tento mostrar em projetos como este.<br/><br/>
      Também sou cofundador e dev front-end da <b>CNX</b> (marketing e automação inteligente) e estudo Análise e Desenvolvimento de Sistemas.<br/><br/>
      💡 <b>Aberto a oportunidades como desenvolvedor front-end.</b>
    </td>
  </tr>
</table>

<div align="center">

[![Portfólio](https://img.shields.io/badge/Meu_Portfólio-1E40AF?style=for-the-badge&logo=vercel&logoColor=white)](https://portifolinodev.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DevWizardMarcos)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/darkwolf787)

<sub>Se este projeto te ajudou a montar o seu portfólio, deixa uma ⭐</sub>

</div>
