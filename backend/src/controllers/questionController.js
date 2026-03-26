const questions = [
  {
    id: 1,
    text: "Como você prefere resolver um problema complexo?",
    type: "choice",
    options: [
      { label: "Analisando dados e métricas", value: "analítico" },
      { label: "Criando soluções visuais", value: "criativo" },
      { label: "Conversando com pessoas", value: "comunicativo" },
      { label: "Escrevendo código ou automatizando", value: "técnico" }
    ]
  },
  {
    id: 2,
    text: "Em qual ambiente você se sente mais produtivo?",
    type: "choice",
    options: [
      { label: "Trabalhando sozinho com foco total", value: "independente" },
      { label: "Em equipe colaborativa", value: "colaborativo" },
      { label: "Liderando um grupo", value: "liderança" },
      { label: "Com liberdade criativa total", value: "autônomo" }
    ]
  },
  {
    id: 3,
    text: "Qual dessas atividades mais desperta seu interesse?",
    type: "choice",
    options: [
      { label: "Programação e desenvolvimento", value: "programação" },
      { label: "Design e estética", value: "design" },
      { label: "Análise de dados e estatísticas", value: "dados" },
      { label: "Gestão de projetos e pessoas", value: "gestão" }
    ]
  },
  {
    id: 4,
    text: "Como você se descreveria melhor?",
    type: "choice",
    options: [
      { label: "Curioso e pesquisador", value: "pesquisador" },
      { label: "Organizado e metódico", value: "organizado" },
      { label: "Inovador e disruptivo", value: "inovador" },
      { label: "Empático e orientado a pessoas", value: "empático" }
    ]
  },
  {
    id: 5,
    text: "O que mais te motiva em um trabalho?",
    type: "choice",
    options: [
      { label: "Impacto social e propósito", value: "propósito" },
      { label: "Desafios técnicos complexos", value: "desafio técnico" },
      { label: "Expressão artística e criatividade", value: "arte" },
      { label: "Crescimento e resultados financeiros", value: "crescimento" }
    ]
  },
  {
    id: 6,
    text: "Descreva brevemente o que você mais gosta de fazer no seu tempo livre:",
    type: "text",
    placeholder: "Ex: criar coisas, resolver puzzles, ajudar amigos..."
  }
];

export const getQuestions = (req, res) => {
  res.json({ questions });
};