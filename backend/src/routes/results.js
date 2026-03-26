const express = require('express');
const { generateResult } = require('../controllers/resultController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', authenticateToken, generateResult);

module.exports = router;