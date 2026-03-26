import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultPage from './pages/ResultPage';

// Configuração do axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

function App() {
  const [stage, setStage] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      console.log('Carregando perguntas...');
      const response = await api.get('/questions');
      console.log('Perguntas carregadas:', response.data);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Erro detalhado:', error);
      setError('Não foi possível conectar ao servidor. Certifique-se que o backend está rodando na porta 5000');
    }
  };

  const startQuiz = () => {
    setStage('quiz');
    setAnswers({});
    setError('');
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submitAnswers = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Enviando respostas:', { answers, questions });
      
      const response = await api.post('/result', {
        answers,
        questions
      });
      
      console.log('Resposta recebida:', response.data);
      
      if (response.data.success) {
        setResult(response.data.analysis);
        setStage('result');
      } else {
        setError(response.data.error || 'Erro ao gerar diagnóstico');
      }
    } catch (error) {
      console.error('Erro detalhado:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setError('❌ Erro de conexão: Verifique se o backend está rodando na porta 5000');
      } else if (error.response) {
        setError(`❌ Erro do servidor: ${error.response.data.error || error.response.statusText}`);
      } else {
        setError(`❌ Erro: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStage('home');
    setAnswers({});
    setResult('');
    setError('');
  };

  if (error && stage === 'home') {
    return (
      <div className="error-container">
        <div className="error-card">
          <h2>🔌 Erro de Conexão</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar Novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {stage === 'home' && (
        <Home onStart={startQuiz} />
      )}
      
      {stage === 'quiz' && questions.length > 0 && (
        <QuestionnairePage
          questions={questions}
          answers={answers}
          onAnswer={handleAnswer}
          onSubmit={submitAnswers}
          loading={loading}
        />
      )}
      
      {stage === 'result' && (
        <ResultPage result={result} onRestart={restart} />
      )}
    </div>
  );
}

export default App;