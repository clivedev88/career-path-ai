import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultPage from './pages/ResultPage';
import LoadingSpinner from './components/LoadingSpinner';

const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
  baseURL: 'https://career-path-ai-1.onrender.com',
  timeout: 60000 // 60 segundos para IA
});


function App() {
  const [stage, setStage] = useState('loading'); // Começa carregando
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuestionsFromAI();
  }, []);

  const loadQuestionsFromAI = async () => {
    try {
      console.log('🎯 Solicitando perguntas à IA...');
      const response = await api.get('/questions');
      console.log('✅ Perguntas geradas pela IA:', response.data);
      setQuestions(response.data.questions);
      setStage('home');
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao carregar perguntas da IA. Verifique o backend.');
      setStage('home');
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
      console.log('🤖 Enviando respostas para análise da IA...');
      const response = await api.post('/result', {
        answers,
        questions
      });
      
      if (response.data.success) {
        setResult(response.data.analysis);
        setStage('result');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao gerar diagnóstico. Tente novamente.');
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

  if (stage === 'loading') {
    return <LoadingSpinner text="Gerando perguntas personalizadas com IA..." />;
  }

  return (
    <div className="app">
      {stage === 'home' && (
        <Home onStart={startQuiz} error={error} />
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