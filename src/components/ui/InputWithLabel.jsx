import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const InputWithLabel = forwardRef(({ 
  label,
  error,
  helperText,
  required = false,
  className = '',
  containerClassName = '',
  type = 'text',
  ...props 
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-textPrimary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            placeholder:text-textSecondary
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-colors duration-150
            ${error 
              ? 'border-error focus:border-error focus:ring-error/20' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-error" />
          </div>
        )}
      </div>

      {error && (
        <p 
          id={`${inputId}-error`}
          className="text-sm text-error flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}

      {helperText && !error && (
        <p 
          id={`${inputId}-helper`}
          className="text-sm text-textSecondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

InputWithLabel.displayName = 'InputWithLabel';

export default InputWithLabel;
