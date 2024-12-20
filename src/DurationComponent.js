import "./DurationComponent.css";

export default function DurationComponent({ onChange }) {
  // Function to generate dates for every Monday in 2025
  function generateStartDates() {
    const startDates = [];
    const currentDate = new Date();
    const startYear = 2025;

    // If current date is not in 2025, jump to January 1, 2025
    if (currentDate.getFullYear() < startYear) {
      currentDate.setFullYear(startYear, 0, 1); // Set to Jan 1, 2025
    }

    // Find the first Monday of 2025
    while (
      currentDate.getFullYear() === startYear &&
      currentDate.getDay() !== 1
    ) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Generate Mondays for the rest of 2025
    while (currentDate.getFullYear() === startYear) {
      startDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return startDates.map(
      (date) => date.toISOString().split("T")[0] // Format: YYYY-MM-DD
    );
  }

  // Generate options for durations (1 to 49 weeks)
  const durationOptions = Array.from({ length: 49 }, (_, i) => i + 1);

  // Generate start dates for 2025
  const startDateOptions = generateStartDates();

  return (
    <div className="durationcomponent-container">
      <div className="startdate">
        <label>Start Date</label>
        <select>
          <option value="" disable>
            Select option
          </option>
          {startDateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="duration">
        <label>Duration</label>
        <select onChange={onChange}>
          <option value="" disable>
            Select option
          </option>
          {durationOptions.map((week) => (
            <option key={week} value={week}>
              {week} week{week > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
