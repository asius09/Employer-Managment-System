import { useState, useRef, useEffect } from "react";

const FilterDropDown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg shadow-sm hover:bg-[var(--btn-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="ri-filter-line mr-2"></i>
        {selectedOption
          ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
          : "Filter"}
        <i className={`ri-arrow-${isOpen ? "up" : "down"}-s-line ml-2`}></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[var(--container-bg)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  selectedOption === option
                    ? "bg-[var(--btn-primary-bg)] text-white"
                    : "text-[var(--text-primary)] hover:bg-[var(--btn-secondary-hover)]"
                } cursor-pointer`}
                role="menuitem"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
