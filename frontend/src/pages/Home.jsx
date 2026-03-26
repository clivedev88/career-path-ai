import React from 'react';

function Home({ onStart, error }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="badge">🤖 IA + Carreira Tech</div>
        
        <h1 className="home-title">
          Descubra sua<br />
          <span className="accent">carreira ideal</span>
          <span className="ai-badge">com IA</span>
        </h1>
        
        <p className="home-description">
          🎯 <strong>100% gerado por IA</strong> - As perguntas e o diagnóstico são 
          personalizados pela inteligência artificial baseado no seu perfil único.
        </p>
        
        <div className="features">
          <div className="feature">🤖 Perguntas geradas por IA</div>
          <div className="feature">📊 Análise inteligente</div>
          <div className="feature">🎯 Resultado personalizado</div>
          <div className="feature">⚡ Roadmap prático</div>
        </div>
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        
        <button className="btn-start" onClick={onStart}>
          Começar diagnóstico com IA →
        </button>
        
        <p className="footer-note">
          * Perguntas dinâmicas geradas por Gemini AI
        </p>
      </div>
    </div>
  );
}

export default Home;