import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCareerProfile = async (answers, questions) => {
  try {
    // Build summary of answers
    const summary = questions.map(q => {
      const answer = answers[q.id] || 'não respondida';
      return `${q.text}\nResposta: ${answer}`;
    }).join('\n\n');
    
    const prompt = `Você é um especialista em orientação de carreira na área de tecnologia. Analise as respostas abaixo e faça um diagnóstico profissional completo.

RESPOSTAS DO USUÁRIO:
${summary}

INSTRUÇÕES:
1. **Carreira Ideal**: Indique a área mais adequada em Tech
2. **Análise do Perfil**: Explique porque essa carreira combina com o perfil
3. **Habilidades Identificadas**: Liste 3-5 pontos fortes
4. **Próximos Passos**: Dê 3 ações concretas para começar
5. **Mensagem Motivacional**: Uma frase personalizada

Formate a resposta em markdown com títulos e listas. Seja direto, prático e motivador.`;

    // Usando Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
    
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('Falha na análise com Gemini');
  }
};