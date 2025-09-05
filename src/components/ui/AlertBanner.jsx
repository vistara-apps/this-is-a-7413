import React from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

const AlertBanner = ({ 
  variant = 'info', 
  title, 
  message, 
  onClose, 
  className = '',
  children 
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    danger: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
      iconColor: 'text-red-600'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    }
  };

  const config = variants[variant];
  const IconComponent = config.icon;

  return (
    <div className={`
      border rounded-lg p-4 flex items-start gap-3 animate-fade-in
      ${config.container} ${className}
    `}>
      <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
        )}
        {message && (
          <p className="text-sm">{message}</p>
        )}
        {children && (
          <div className="mt-2">{children}</div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={`
            flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors
            ${config.iconColor}
          `}
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
