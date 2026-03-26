import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
1. Identifique a carreira ideal em Tech baseado no perfil
2. Explique o motivo da recomendação
3. Liste habilidades identificadas
4. Sugira próximos passos concretos
5. Dê uma mensagem motivacional

Seja direto, prático e use markdown para formatar a resposta.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um mentor de carreira especializado em tecnologia. Seja claro, motivador e prático."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });
    
    return completion.choices[0].message.content;
    
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Falha na análise com IA');
  }
};