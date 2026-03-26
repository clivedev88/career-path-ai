const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecommendation = async (answers) => {
  // Format answers for AI
  const answersText = answers.map(ans => `${ans.question.question}: ${ans.answer}`).join('\n');

  const prompt = `Based on the following answers to vocational questions, suggest a suitable professional area or career path:\n\n${answersText}\n\nProvide a concise recommendation.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('AI service error:', error);
    throw new Error('Failed to generate recommendation');
  }
};

module.exports = { generateRecommendation };