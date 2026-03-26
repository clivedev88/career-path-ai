import { analyzeCareerProfile } from '../services/geminiService.js';

export const generateResult = async (req, res) => {
  try {
    const { answers, questions } = req.body;
    
    console.log('📥 Recebida requisição de análise');
    console.log('Respostas:', answers);
    console.log('Perguntas:', questions.length);
    
    if (!answers || !questions) {
      console.log('❌ Dados incompletos');
      return res.status(400).json({ error: 'Answers and questions are required' });
    }
    
    console.log('🤖 Iniciando análise com Gemini...');
    const analysis = await analyzeCareerProfile(answers, questions);
    
    console.log('✅ Análise concluída com sucesso');
    res.json({ 
      success: true, 
      analysis 
    });
    
  } catch (error) {
    console.error('❌ Erro no controller:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro ao gerar diagnóstico. Tente novamente.',
      details: error.message 
    });
  }
};