import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultPage({ result, onRestart }) {
  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <div className="result-badge">✨ Diagnóstico Personalizado por IA</div>
          <div className="ai-tag">🤖 Gerado com Gemini AI</div>
        </div>
        
        <div className="result-content">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 style={{color: '#fbbf24', fontSize: '28px'}} {...props} />,
              h2: ({node, ...props}) => <h2 style={{color: '#fbbf24', marginTop: '32px'}} {...props} />,
              h3: ({node, ...props}) => <h3 style={{color: '#fbbf24', marginTop: '24px'}} {...props} />,
              strong: ({node, ...props}) => <strong style={{color: '#fbbf24'}} {...props} />
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
        
        <div className="result-actions">
          <button className="btn-restart" onClick={onRestart}>
            ↺ Fazer novo diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;