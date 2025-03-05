import React from "react";

const RenderInput = ({
  id,
  label,
  type = "text",
  onChange,
  value,
  invalidError,
  icon,
  element = "input",
  min,
  step,
  name,
  readOnly = false,
}) => {
  const inputClasses = `w-full px-4 py-2.5 rounded-lg border ${
    invalidError && (!value || value <= 0)
      ? "border-red-500"
      : "border-[var(--input-border)]"
  } bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all duration-200 hover:border-[var(--btn-primary-bg)] placeholder-[var(--text-muted)]`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]"
      >
        {icon && <i className={`${icon} text-lg`}></i>}
        {label}
      </label>
      <div className="relative">
        {element === "input" ? (
          <input
            type={type}
            id={id}
            name={name || id}
            value={value}
            onChange={(e) => onChange(name || id, e.target.value)}
            placeholder={`Enter ${label}`}
            className={inputClasses}
            min={type === "number" ? min : undefined}
            step={type === "number" ? step : undefined}
            readOnly={readOnly}
          />
        ) : (
          <textarea
            id={id}
            name={name || id}
            rows="4"
            value={value}
            onChange={(e) => onChange(name || id, e.target.value)}
            className={inputClasses}
            placeholder={`Enter ${label}`}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
};

export default RenderInput;
