import React from 'react';

function Home({ onStart }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="badge">IA + Carreira Tech</div>
        
        <h1 className="home-title">
          Descubra sua<br />
          <span className="accent">carreira ideal</span>
        </h1>
        
        <p className="home-description">
          Responda 6 perguntas rápidas e nossa inteligência artificial vai 
          analisar seu perfil e recomendar o melhor caminho profissional na tecnologia.
        </p>
        
        <div className="features">
          <div className="feature">🎯 6 perguntas simples</div>
          <div className="feature">🤖 IA especializada</div>
          <div className="feature">📊 Diagnóstico completo</div>
        </div>
        
        <button className="btn-start" onClick={onStart}>
          Começar agora →
        </button>
      </div>
    </div>
  );
}

export default Home;