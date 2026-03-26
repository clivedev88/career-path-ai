const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

const createQuestion = [
  body('question').notEmpty().withMessage('Question is required'),
  body('type').notEmpty().withMessage('Type is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, type } = req.body;

    try {
      const newQuestion = await prisma.question.create({
        data: { question, type },
      });
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create question' });
    }
  },
];

module.exports = { getQuestions, createQuestion };