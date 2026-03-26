import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultPage({ result, onRestart }) {
  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-badge">✦ Seu diagnóstico personalizado</div>
        
        <div className="result-content">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 style={{color: '#fbbf24'}} {...props} />,
              h2: ({node, ...props}) => <h2 style={{color: '#fbbf24', marginTop: '24px'}} {...props} />,
              strong: ({node, ...props}) => <strong style={{color: '#fbbf24'}} {...props} />
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
        
        <div className="result-actions">
          <button className="btn-restart" onClick={onRestart}>
            ↺ Refazer questionário
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;