import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;