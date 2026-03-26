import React from 'react';

function Question({ question, value, onChange }) {
  if (question.type === 'choice') {
    return (
      <div className="question-container">
        <h2 className="question-text">{question.text}</h2>
        
        <div className="options-grid">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${value === option.value ? 'selected' : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  if (question.type === 'text') {
    return (
      <div className="question-container">
        <h2 className="question-text">{question.text}</h2>
        
        <textarea
          className="text-input"
          placeholder={question.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
        />
      </div>
    );
  }
  
  return null;
}

export default Question;