const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { generateRecommendation } = require('../services/aiService');

const prisma = new PrismaClient();

const generateResult = [
  body('answers').isArray().withMessage('Answers must be an array'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { answers } = req.body; // answers: [{ questionId, answer }]
    const userId = req.user.id;

    try {
      // Save answers
      const answerPromises = answers.map(ans =>
        prisma.answer.create({
          data: {
            userId,
            questionId: ans.questionId,
            answer: ans.answer,
          },
        })
      );
      await Promise.all(answerPromises);

      // Get all answers for the user
      const userAnswers = await prisma.answer.findMany({
        where: { userId },
        include: { question: true },
      });

      // Generate recommendation using AI
      const recommendation = await generateRecommendation(userAnswers);

      // Save result
      const result = await prisma.result.create({
        data: {
          userId,
          recommendation,
        },
      });

      res.json({ recommendation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate result' });
    }
  },
];

module.exports = { generateResult };