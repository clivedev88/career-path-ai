import React from 'react';
import ReactMarkdown from 'react-markdown';

function Results({ result }) {
  return (
    <div className="results">
      <ReactMarkdown>{result}</ReactMarkdown>
    </div>
  );
}

export default Results;