import "./DropdownComponent.css";

export default function DropdownComponent({ label, options, value, onChange }) {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
