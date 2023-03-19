import React, { useState, useEffect, useRef } from "react";
import "../assets/Multiselect.css";

interface MultiselectProps {
  options: string[];
  onChange?: (value: string[]) => void;
}

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Multiselect: React.FC<MultiselectProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, setIsOpen);

  const handleTagClose = (option: string): void => {
    setSelectedOptions((prevSelectedOptions: string[]) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const handleOptionClick = (option: string): void => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prevSelectedOptions: string[]) => [...prevSelectedOptions, option]);
      onChange && onChange([...selectedOptions, option]);
    }
    setIsOpen(!isOpen);
  };

  const handleInputClick = (): void => {
    setIsOpen(true);
  };

  return (
    <div className="multiselect">
      <div className="multiselect-input-container" onClick={handleInputClick}>
        
        {selectedOptions.length > 0 &&
          selectedOptions.map((option: string, idx:number) => (
            <div className="multiselect-tag" key={idx}>
              {option}
              <button
                className="multiselect-tag-close"
                type="button"
                onClick={() => handleTagClose(option)}
              >
                x
              </button>
            </div>
          ))}
      </div>
      {isOpen && (
        <div className="multiselect-dropdown" ref={wrapperRef}>
          {options.map((option: string, idx:number) => (
            <div
              key={option}
              className="multiselect-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Multiselect;
