import ECommerce from "../../Projetos/ECommerce.png";
import ECommerceProject from "../../Projetos/ECommerceProject.png";
import TaskManager from "../../Projetos/TaskManager.png";
import TaskManagerProject from "../../Projetos/TaskManagerProject.png";
import WeatherApp from "../../Projetos/WeatherApp.png";
import WeatherAppProject from "../../Projetos/WeatherAppProject.png";

// Fonte única de dados: usada no "Sobre mim" (galeria) e em "Projetos".
// Em "link" está a mesma imagem do modelo original; troque pela URL real
// do projeto (GitHub ou deploy) quando tiver.
export const projetos = [
  {
    id: "ecommerce",
    titulo: "E-Commerce",
    descricao: "Loja virtual completa com carrinho, produtos e checkout.",
    tecnologias: ["React", "Context API", "Tailwind CSS"],
    imagem: ECommerce,
    link: ECommerceProject,
  },
  {
    id: "task-manager",
    titulo: "Task Manager",
    descricao: "Gerenciador de tarefas com criação, filtros e categorias.",
    tecnologias: ["React", "LocalStorage"],
    imagem: TaskManager,
    link: TaskManagerProject,
  },
  {
    id: "weather-app",
    titulo: "Weather App",
    descricao:
      "Aplicação do clima consumindo API externa com busca de cidade.",
    tecnologias: ["React", "API", "Styled Components"],
    imagem: WeatherApp,
    link: WeatherAppProject,
  },
];
