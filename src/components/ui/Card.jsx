import React from 'react';

const Card = ({ children, className = '', onClick }) => {
  const baseClasses = "bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-card";
  const finalClasses = `${baseClasses} ${className}`;

  if (onClick) {
    return (
      <button 
        className={`${finalClasses} w-full text-left transition-all duration-200 hover:bg-white/20`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={finalClasses}>
      {children}
    </div>
  );
};

export default Card;