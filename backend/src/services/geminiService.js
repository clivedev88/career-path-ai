import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuestions = async () => {
  try {
    const prompt = `Você é um especialista em recrutamento e orientação de carreira em tecnologia.
    
Crie 6 perguntas personalizadas para descobrir a carreira ideal de um profissional de tecnologia.

REQUISITOS:
- 5 perguntas de múltipla escolha com 4 opções cada
- 1 pergunta dissertativa (texto livre)
- Perguntas devem cobrir: habilidades técnicas, perfil comportamental, interesses, estilo de trabalho, motivações
- Foco em carreiras Tech: Desenvolvimento, Dados, UX/UI, DevOps, Produto, etc

IMPORTANTE: Retorne APENAS um JSON válido, sem texto antes ou depois. Use exatamente este formato:

{
  "questions": [
    {
      "id": 1,
      "text": "Qual área da tecnologia mais te interessa?",
      "type": "choice",
      "options": [
        {"label": "Desenvolvimento de Software", "value": "dev"},
        {"label": "Dados e IA", "value": "dados"},
        {"label": "Design e UX", "value": "design"},
        {"label": "Infraestrutura e Cloud", "value": "infra"}
      ]
    },
    {
      "id": 2,
      "text": "Como você prefere trabalhar?",
      "type": "choice",
      "options": [
        {"label": "Sozinho, com foco total", "value": "solo"},
        {"label": "Em equipe colaborativa", "value": "team"},
        {"label": "Liderando projetos", "value": "lead"},
        {"label": "Híbrido, variando conforme necessidade", "value": "hybrid"}
      ]
    },
    {
      "id": 3,
      "text": "O que mais te motiva no trabalho?",
      "type": "choice",
      "options": [
        {"label": "Resolver problemas complexos", "value": "problems"},
        {"label": "Criar soluções inovadoras", "value": "create"},
        {"label": "Impactar pessoas", "value": "impact"},
        {"label": "Aprender constantemente", "value": "learn"}
      ]
    },
    {
      "id": 4,
      "text": "Qual seu nível de experiência com tecnologia?",
      "type": "choice",
      "options": [
        {"label": "Iniciante (menos de 1 ano)", "value": "beginner"},
        {"label": "Intermediário (1-3 anos)", "value": "intermediate"},
        {"label": "Avançado (3-5 anos)", "value": "advanced"},
        {"label": "Especialista (mais de 5 anos)", "value": "expert"}
      ]
    },
    {
      "id": 5,
      "text": "Qual estilo de aprendizado funciona melhor pra você?",
      "type": "choice",
      "options": [
        {"label": "Cursos estruturados", "value": "structured"},
        {"label": "Projetos práticos", "value": "practical"},
        {"label": "Mentoria e pair programming", "value": "mentorship"},
        {"label": "Documentação e pesquisa", "value": "research"}
      ]
    },
    {
      "id": 6,
      "text": "Descreva um projeto ou ideia que você adoraria desenvolver na sua carreira:",
      "type": "text",
      "placeholder": "Ex: criar um app que ajuda pessoas, sistema de IA para saúde, etc..."
    }
  ]
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Resposta do Gemini (raw):', text);
    
    // Limpar o texto para extrair JSON
    let cleanText = text.trim();
    
    // Remover markdown code blocks se existirem
    cleanText = cleanText.replace(/```json\n?/g, '');
    cleanText = cleanText.replace(/```\n?/g, '');
    
    // Encontrar o primeiro { e último }
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }
    
    console.log('JSON limpo:', cleanText);
    
    const parsed = JSON.parse(cleanText);
    
    // Garantir que os IDs estão corretos
    const questions = parsed.questions.map((q, index) => ({
      ...q,
      id: index + 1
    }));
    
    return { questions };
    
  } catch (error) {
    console.error('Erro ao gerar perguntas:', error);
    // Fallback questions
    return {
      questions: [
        {
          id: 1,
          text: "Qual área da tecnologia mais te interessa?",
          type: "choice",
          options: [
            { label: "Desenvolvimento de Software", value: "dev" },
            { label: "Dados e IA", value: "dados" },
            { label: "Design e UX", value: "design" },
            { label: "Infraestrutura e Cloud", value: "infra" }
          ]
        },
        {
          id: 2,
          text: "Como você prefere trabalhar?",
          type: "choice",
          options: [
            { label: "Sozinho, com foco total", value: "solo" },
            { label: "Em equipe colaborativa", value: "team" },
            { label: "Liderando projetos", value: "lead" },
            { label: "Híbrido, variando conforme necessidade", value: "hybrid" }
          ]
        },
        {
          id: 3,
          text: "O que mais te motiva no trabalho?",
          type: "choice",
          options: [
            { label: "Resolver problemas complexos", value: "problems" },
            { label: "Criar soluções inovadoras", value: "create" },
            { label: "Impactar pessoas", value: "impact" },
            { label: "Aprender constantemente", value: "learn" }
          ]
        },
        {
          id: 4,
          text: "Qual seu nível de experiência com tecnologia?",
          type: "choice",
          options: [
            { label: "Iniciante (menos de 1 ano)", value: "beginner" },
            { label: "Intermediário (1-3 anos)", value: "intermediate" },
            { label: "Avançado (3-5 anos)", value: "advanced" },
            { label: "Especialista (mais de 5 anos)", value: "expert" }
          ]
        },
        {
          id: 5,
          text: "Qual estilo de aprendizado funciona melhor pra você?",
          type: "choice",
          options: [
            { label: "Cursos estruturados", value: "structured" },
            { label: "Projetos práticos", value: "practical" },
            { label: "Mentoria e pair programming", value: "mentorship" },
            { label: "Documentação e pesquisa", value: "research" }
          ]
        },
        {
          id: 6,
          text: "Descreva um projeto ou ideia que você adoraria desenvolver na sua carreira:",
          type: "text",
          placeholder: "Ex: criar um app que ajuda pessoas, sistema de IA para saúde, etc..."
        }
      ]
    };
  }
};

export const analyzeCareerProfile = async (answers, questions) => {
  try {
    // Build summary of answers
    const summary = questions.map(q => {
      const answer = answers[q.id] || 'não respondida';
      return `${q.text}\nResposta: ${answer}`;
    }).join('\n\n');
    
    const prompt = `Você é um mentor de carreira especialista em tecnologia. Analise profundamente o perfil abaixo e crie um diagnóstico completo.

RESPOSTAS DO USUÁRIO:
${summary}

FORNECÇA UM DIAGNÓSTICO COMPLETO COM:

1. **🎯 Carreira Ideal**: Nome da carreira em Tech + justificativa (2-3 frases)
2. **📊 Análise do Perfil**: 2-3 parágrafos sobre características identificadas
3. **💪 Pontos Fortes**: Liste 5 habilidades que se destacam
4. **🚀 Áreas de Desenvolvimento**: 3 pontos para melhorar
5. **📚 Roadmap de Aprendizado**:
   - Mês 1: Fundamentos essenciais (3 itens)
   - Mês 2: Habilidades práticas (3 itens)
   - Mês 3: Projetos e networking (3 itens)
6. **🔧 Ferramentas e Tecnologias**: Liste 5 ferramentas para aprender
7. **💼 Oportunidades de Mercado**: 3 cargos/áreas para buscar
8. **✨ Mensagem Final**: Uma frase motivacional personalizada

FORMATO: Use markdown com emojis, títulos e listas. Seja prático, específico e motivador.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Análise gerada com sucesso');
    return text;
    
  } catch (error) {
    console.error('Erro na análise:', error);
    
    // Fallback response em caso de erro
    return `## 🎯 Diagnóstico Personalizado

Com base nas suas respostas, identificamos algumas áreas promissoras para sua carreira em tecnologia.

### 💪 Seus Pontos Fortes
- Interesse genuíno por tecnologia
- Disposição para aprender
- Perfil alinhado com inovação

### 📚 Próximos Passos Recomendados
1. Explore cursos gratuitos na área que mais te interessou
2. Participe de comunidades tech (Discord, Slack)
3. Comece um projeto pessoal simples

### ✨ Mensagem Final
Continue explorando suas paixões na tecnologia! Cada passo é um aprendizado valioso.`;
  }
};