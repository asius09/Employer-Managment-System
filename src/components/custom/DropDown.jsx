import React, { useRef, useState, useEffect } from "react";

const DropDown = ({ options, selectedOption, onSelect, invalid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "Enter":
      case " ":
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        } else {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        e.preventDefault();
        break;
      case "ArrowDown":
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev + 1 > options.length - 1 ? 0 : prev + 1
          );
        } else {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        e.preventDefault();
        break;
      case "ArrowUp":
        if (isOpen) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        e.preventDefault;
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full px-4 py-2.5 rounded-lg border ${
          invalid ? "border-red-500" : "border-[var(--input-border)]"
        } bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer transition-all duration-200 hover:border-[var(--btn-primary-bg)] text-left`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selectedOption ? "" : "text-[var(--text-muted)]"}>
          {selectedOption || "Select an option"}
        </span>
        <i
          className={`ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform text-[var(--text-secondary)] ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-[var(--container-bg)] rounded-lg shadow-lg border border-[var(--input-border)] max-h-60 overflow-y-auto"
        >
          {options.map((option, index) => (
            <li
              role="option"
              key={index}
              className={`px-4 py-2.5 text-[var(--text-primary)] hover:bg-[var(--nested-container-bg)] cursor-pointer transition-colors duration-200 ${
                focusedIndex === index ? "bg-[var(--nested-container-bg)]" : ""
              }`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                console.log(e.key);
                if (e.key === "Enter" || e.key === " ") {
                  console.log(option, "Click");
                  handleSelect(option);
                }
              }}
              aria-selected={selectedOption === option}
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
