import React from 'react';

const Prompt = ({ word }) => {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-semibold">Draw:</h2>
      <p className="text-3xl font-bold text-blue-600 mt-2">{word}</p>
    </div>
  );
};

export default Prompt;