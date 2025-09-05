import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';

const SelectDropdown = ({ 
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  containerClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        }
        break;
    }
  };

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-textPrimary mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-colors duration-150 flex items-center justify-between
          ${error 
            ? 'border-error focus:border-error focus:ring-error/20' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${className}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${selectId}-error` : 
          helperText ? `${selectId}-helper` : undefined
        }
      >
        <span className={selectedOption ? 'text-textPrimary' : 'text-textSecondary'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <div className="flex items-center gap-2">
          {error && <AlertCircle className="h-4 w-4 text-error" />}
          <ChevronDown 
            className={`h-4 w-4 text-textSecondary transition-transform duration-150 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul
            ref={listRef}
            role="listbox"
            aria-labelledby={selectId}
            className="py-1"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                className={`
                  px-3 py-2 cursor-pointer flex items-center justify-between
                  transition-colors duration-150
                  ${index === focusedIndex ? 'bg-primary/10' : 'hover:bg-gray-50'}
                  ${option.value === value ? 'bg-primary/5 text-primary' : 'text-textPrimary'}
                `}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-2 text-sm text-error flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}

      {helperText && !error && (
        <p 
          id={`${selectId}-helper`}
          className="mt-2 text-sm text-textSecondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default SelectDropdown;
