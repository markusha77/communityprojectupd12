import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
  label?: string;
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    option => 
      !selectedValues.includes(option) && 
      option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange([...selectedValues, option]);
    setSearchTerm('');
  };

  const handleRemove = (option: string) => {
    onChange(selectedValues.filter(value => value !== option));
  };

  const handleAddCustom = () => {
    if (searchTerm.trim() && !options.includes(searchTerm) && !selectedValues.includes(searchTerm)) {
      onChange([...selectedValues, searchTerm.trim()]);
      setSearchTerm('');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white min-h-[42px]">
        {selectedValues.map(value => (
          <div 
            key={value} 
            className="flex items-center bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-sm"
          >
            <span>{value}</span>
            <button 
              type="button"
              onClick={() => handleRemove(value)}
              className="ml-1 text-indigo-500 hover:text-indigo-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            className="w-full border-none focus:outline-none focus:ring-0 p-1 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map(option => (
                <li 
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-gray-500">
              {searchTerm ? (
                <div>
                  <p>No matches found</p>
                  <button
                    type="button"
                    onClick={handleAddCustom}
                    className="mt-1 text-indigo-600 hover:text-indigo-800"
                  >
                    Add "{searchTerm}"
                  </button>
                </div>
              ) : (
                <p>No options available</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
