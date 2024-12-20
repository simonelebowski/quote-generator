export default function InsuranceComponent({ value, onChange }) {
  return (
    <div className="insurance-container">
      <label>Does the student need insurance?</label>
      <select value={value} onChange={onChange}>
        <option value="" disabled>
          Select an option
        </option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
}
