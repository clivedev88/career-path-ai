import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultPage from './pages/ResultPage';

function App() {
  const [stage, setStage] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await axios.get('/api/questions');
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const startQuiz = () => {
    setStage('quiz');
    setAnswers({});
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/result', {
        answers,
        questions
      });
      
      if (response.data.success) {
        setResult(response.data.analysis);
        setStage('result');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Erro ao gerar diagnóstico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStage('home');
    setAnswers({});
    setResult('');
  };

  return (
    <div className="app">
      {stage === 'home' && (
        <Home onStart={startQuiz} />
      )}
      
      {stage === 'quiz' && (
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