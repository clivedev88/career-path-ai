import { generateQuestions } from '../services/geminiService.js';

export const getQuestions = async (req, res) => {
  try {
    console.log('🤖 Gerando perguntas com IA...');
    const data = await generateQuestions();
    
    console.log('✅ Dados gerados:', data);
    
    if (!data || !data.questions) {
      throw new Error('Formato de dados inválido');
    }
    
    // Garantir que os IDs estão corretos
    const questions = data.questions.map((q, index) => ({
      ...q,
      id: index + 1
    }));
    
    console.log(`✅ ${questions.length} perguntas geradas com sucesso`);
    res.json({ questions });
    
  } catch (error) {
    console.error('❌ Erro:', error);
    res.status(500).json({ 
      error: 'Erro ao gerar perguntas',
      message: error.message 
    });
  }
};