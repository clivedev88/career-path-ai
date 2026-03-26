const express = require('express');
const { getQuestions, createQuestion } = require('../controllers/questionController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getQuestions);
router.post('/', authenticateToken, authorizeAdmin, createQuestion);

module.exports = router;