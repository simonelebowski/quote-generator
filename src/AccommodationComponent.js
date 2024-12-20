import "./AccommodationComponent.css";

export default function AccommodationComponent({
  needsAccommodation,
  setNeedsAccommodation,
  courseWeeks,
  accommodationWeeks,
  selectedAccommodation,
  needsSpecialDiet,
}) {
  if (courseWeeks <= 0) {
    return null;
  }

  return (
    <div className="accommodationcomponent-container">
      <div className="accommodation-container">
        <label>Does the student need accommodation?</label>
        <select
          value={needsAccommodation}
          onChange={(e) => setNeedsAccommodation(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {needsAccommodation === "yes" && (
        <div className="needsaccommodation-container">
          <div className="accommodationweeks-container">
            <label>Number of weeks</label>
            <select value={accommodationWeeks}>
              <option value="" disabled>
                Select an option
              </option>
              {courseWeeks > 0 &&
                Array.from({ length: courseWeeks }, (_, i) => i + 1).map(
                  (week) => (
                    <option key={week} value={week}>
                      {week} week{week > 1 ? "s" : ""}
                    </option>
                  )
                )}
            </select>
          </div>
          <div>
            <label>Does the student need a special diet?</label>
            <select value={needsSpecialDiet}>
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
