import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const FancyDropdown = ({
  label,
  value,
  options,
  onChange,
  color = "blue"
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const colorClasses = {
    blue: "focus:ring-blue-100 border-blue-200",
    purple: "focus:ring-purple-100 border-purple-200",
    emerald: "focus:ring-emerald-100 border-emerald-200"
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value)?.label ||
    options[0].label;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
        {label}
      </label>

      <button
        onClick={() => setOpen(!open)}
        className={`w-full bg-slate-50 border rounded-2xl px-5 py-4 flex justify-between items-center shadow-sm hover:shadow-md transition ${colorClasses[color]}`}
      >
        <span className="font-medium text-slate-800">
          {selectedOption}
        </span>

        <FaChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
  <button
    key={option.value}
    onClick={() => {
      onChange(option.value);
      setOpen(false);
    }}
    className={`w-full text-left px-5 py-4 transition-all duration-200 ${
      value === option.value
        ? "bg-blue-600 text-white font-semibold"
        : "text-slate-700 hover:bg-blue-600 hover:text-white"
    }`}
  >
    {option.label}
  </button>
))}
        
        </div>
      )}
    </div>
  );
};

export default FancyDropdown;