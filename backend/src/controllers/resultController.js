import { analyzeCareerProfile } from '../services/geminiService.js';

export const generateResult = async (req, res) => {
  try {
    const { answers, questions } = req.body;
    
    if (!answers || !questions) {
      return res.status(400).json({ error: 'Answers and questions are required' });
    }
    
    const analysis = await analyzeCareerProfile(answers, questions);
    
    res.json({ 
      success: true, 
      analysis 
    });
    
  } catch (error) {
    console.error('Error generating result:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro ao gerar diagnóstico. Tente novamente.' 
    });
  }
};