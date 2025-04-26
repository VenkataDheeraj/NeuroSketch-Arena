// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold tracking-wide">
        NeuroSketch Arena
        </h1>
        <span className="text-sm text-gray-300">
          Georgia State University
        </span>
      </div>
    </header>
  );
};

export default Header;