import React from 'react';

function LoadingSpinner({ text = "Carregando..." }) {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="spinner"></div>
        <h3 className="loading-text">{text}</h3>
        <p className="loading-subtext">Isso pode levar alguns segundos...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;