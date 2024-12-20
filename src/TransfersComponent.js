export default function TransfersComponent({
  label,
  needsTransfer,
  options,
  onChangeNeeds,
}) {
  return (
    <div className="transfers-container">
      <div>
        <label>Does the student need an {label} transfer?</label>
        <select value={needsTransfer} onChange={onChangeNeeds}>
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {needsTransfer === "yes" && (
        <div>
          <label>Please select the airport</label>
          <select>
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
      )}
    </div>
  );
}
