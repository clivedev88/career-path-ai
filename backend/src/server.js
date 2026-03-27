import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questionRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://career-path-ai-liart.vercel.app/'],
//   credentials: true
// }));

app.use(cors({
//   origin: ['http://localhost:3000', 'https://career-path-ai-liart.vercel.app'],
  origin: ['http://localhost:3000', 'https://career-path-ai-git-main-clivekif-6951s-projects.vercel.app/'],
  
  credentials: true,
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/result', resultRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}/api`);
  console.log(`🤖 Gemini AI está pronto para gerar perguntas e análises!`);
  console.log(`\n📋 Endpoints disponíveis:`);
  console.log(`   GET  /api/questions - Gerar perguntas`);
  console.log(`   POST /api/result    - Analisar respostas`);
  console.log(`   GET  /health        - Status do servidor\n`);
});