import React, { useState, useEffect } from 'react';
import Question from '../components/Question';

function QuestionnairePage({ questions, answers, onAnswer, onSubmit, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion?.id] || '';
  
  useEffect(() => {
    if (questions.length > 0) {
      setProgress(((currentIndex + 1) / questions.length) * 100);
    }
  }, [currentIndex, questions]);
  
  const handleNext = () => {
    if (isLast) {
      onSubmit();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  if (!currentQuestion) {
    return <div className="loading">Carregando perguntas...</div>;
  }
  
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        
        <div className="question-counter">
          Pergunta {currentIndex + 1} de {questions.length}
        </div>
        
        <Question
          question={currentQuestion}
          value={currentAnswer}
          onChange={(value) => onAnswer(currentQuestion.id, value)}
        />
        
        <div className="quiz-actions">
          {currentIndex > 0 && (
            <button className="btn-back" onClick={handleBack}>
              ← Voltar
            </button>
          )}
          
          <button 
            className="btn-next"
            onClick={handleNext}
            disabled={!currentAnswer || loading}
          >
            {loading ? 'Analisando...' : (isLast ? 'Ver resultado →' : 'Próxima →')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionnairePage;