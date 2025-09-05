import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  size = 'default',
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
  animated = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    small: 'h-2',
    default: 'h-3',
    large: 'h-4'
  };

  const variants = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-yellow-500',
    error: 'bg-error',
    accent: 'bg-accent'
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-textPrimary">
            {label || 'Progress'}
          </span>
          {showLabel && (
            <span className="text-sm text-textSecondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={`
          w-full bg-gray-200 rounded-full overflow-hidden
          ${sizes[size]}
        `}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-300 ease-out
            ${variants[variant]}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular progress variant
export const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 64,
  strokeWidth = 4,
  variant = 'primary',
  showLabel = false,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-yellow-500',
    error: 'stroke-error',
    accent: 'stroke-accent'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-300 ease-out ${variants[variant]}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-textPrimary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Indeterminate progress for loading states
export const IndeterminateProgress = ({ 
  size = 'default',
  variant = 'primary',
  className = ''
}) => {
  const sizes = {
    small: 'h-2',
    default: 'h-3',
    large: 'h-4'
  };

  const variants = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-yellow-500',
    error: 'bg-error',
    accent: 'bg-accent'
  };

  return (
    <div 
      className={`
        w-full bg-gray-200 rounded-full overflow-hidden
        ${sizes[size]} ${className}
      `}
      role="progressbar"
      aria-label="Loading"
    >
      <div
        className={`
          h-full rounded-full animate-pulse
          ${variants[variant]}
        `}
        style={{
          background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
          animation: 'indeterminate 1.5s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
