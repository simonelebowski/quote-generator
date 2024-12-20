import { useState } from "react";
import "./Form.css";
import DropdownComponent from "./DropdownComponent";
import DurationComponent from "./DurationComponent";
import AcccommodationComponent from "./AccommodationComponent";
import TransfersComponent from "./TransfersComponent";
import InsuranceComponent from "./InsuranceComponent";

export default function Form() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseWeeks, setCourseWeeks] = useState(0);
  const [needsAccommodation, setNeedsAccommodation] = useState("");
  const [accommodationWeeks, setAccommodationWeeks] = useState(0);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [needsSpecialDiet, setNeedsSpecialDiet] = useState("");
  const [needsArrivalTransfer, setNeedsArrivalTransfer] = useState("");
  const [needsDepartureTransfer, setNeedsDepartureTransfer] = useState("");
  const [needsInsurance, setNeedsInsurance] = useState("");

  const destinations = [
    { value: "Worthing", label: "Worthing" },
    { value: "London", label: "London" },
    { value: "Oxford", label: "Oxford" },
    { value: "Leeds", label: "Leeds" },
    { value: "Edinburgh", label: "Edinburgh" },
  ];

  const courses = {
    Worthing: [
      {
        value: "SGE",
        label: "WO Standard General English",
        priceRules: [
          { minWeeks: 1, maxWeeks: 4, price: 245 },
          { minWeeks: 5, maxWeeks: 11, price: 235 },
          { minWeeks: 12, maxWeeks: 23, price: 225 },
          { minWeeks: 24, maxWeeks: 35, price: 220 },
          { minWeeks: 36, maxWeeks: 49, price: 210 },
        ],
      },
      { value: "IGE", label: "Intensive General English", price: 355 },
      { value: "ielts", label: "IELTS", price: 355 },
      { value: "CAM", label: "Cambridge", price: 585 },
    ],
    London: [
      { value: "SGE", label: "LO Standard General English", price: 275 },
      { value: "IGE", label: "Intensive General English", price: 390 },
      { value: "ielts", label: "IELTS", price: 390 },
      { value: "CAM", label: "Cambridge", price: 615 },
    ],
    Oxford: [
      { value: "SGE", label: "OX Standard General English", price: 275 },
      { value: "IGE", label: "Intensive General English", price: 390 },
      { value: "ielts", label: "IELTS", price: 390 },
      { value: "CAM", label: "Cambridge", price: 615 },
    ],
    Leeds: [
      { value: "SGE", label: "LE Standard General English", price: 255 },
      { value: "IGE", label: "Intensive General English", price: 375 },
      { value: "ielts", label: "IELTS", price: 375 },
      { value: "CAM", label: "Cambridge", price: 595 },
    ],
    Edinburgh: [
      { value: "SGE", label: "ED Standard General English", price: 275 },
      { value: "IGE", label: "Intensive General English", price: 390 },
      { value: "ielts", label: "IELTS", price: 390 },
      { value: "CAM", label: "Cambridge", price: 615 },
    ],
  };

  const accommodationOptions = {
    Worthing: [
      { value: "single", label: "Homestay single room half board", price: 240 },
      { value: "shared", label: "Homestay shared room half board", price: 215 },
    ],
    London: [
      { value: "single", label: "Homestay single room half board", price: 280 },
      { value: "shared", label: "Homestay shared room half board", price: 235 },
    ],
    Oxford: [
      { value: "single", label: "Homestay single room half board", price: 280 },
      { value: "shared", label: "Homestay shared room half board", price: 235 },
    ],
    Leeds: [
      { value: "single", label: "Homestay single room half board", price: 240 },
      { value: "shared", label: "Homestay shared room half board", price: 215 },
    ],
    Edinburgh: [
      { value: "single", label: "Homestay single room half board", price: 280 },
      { value: "shared", label: "Homestay shared room half board", price: 235 },
    ],
  };

  const arrivalTransfers = {
    Worthing: [
      { value: "LGW", label: "from Gatwick", price: 140 },
      { value: "LHR", label: "from Heathrow", price: 170 },
      { value: "STN", label: "from Stansted", price: 250 },
    ],
    London: [
      { value: "LGW", label: "from Gatwick", price: 145 },
      { value: "LHR", label: "from Heathrow", price: 145 },
      { value: "STN", label: "from Stansted", price: 200 },
    ],
    Oxford: [
      { value: "LGW", label: "from Gatwick", price: 205 },
      { value: "LHR", label: "from Heathrow", price: 165 },
      { value: "STN", label: "from Stansted", price: 215 },
    ],
    Leeds: [
      { value: "LGW", label: "from Gatwick", price: 0 },
      { value: "LHR", label: "from Heathrow", price: 0 },
      { value: "STN", label: "from Stansted", price: 0 },
    ],
    Edinburgh: [
      { value: "LGW", label: "from Gatwick", price: 0 },
      { value: "LHR", label: "from Heathrow", price: 0 },
      { value: "STN", label: "from Stansted", price: 0 },
    ],
  };

  const departureTransfers = {
    Worthing: [
      { value: "LGW", label: "to Gatwick", price: 140 },
      { value: "LHR", label: "to Heathrow", price: 170 },
      { value: "STN", label: "to Stansted", price: 250 },
    ],
    London: [
      { value: "LGW", label: "to Gatwick", price: 145 },
      { value: "LHR", label: "to Heathrow", price: 145 },
      { value: "STN", label: "to Stansted", price: 200 },
    ],
    Oxford: [
      { value: "LGW", label: "to Gatwick", price: 0 },
      { value: "LHR", label: "to Heathrow", price: 0 },
      { value: "STN", label: "to Stansted", price: 0 },
    ],
    Leeds: [
      { value: "LGW", label: "to Gatwick", price: 0 },
      { value: "LHR", label: "to Heathrow", price: 0 },
      { value: "STN", label: "to Stansted", price: 0 },
    ],
    Edinburgh: [
      { value: "LGW", label: "to Gatwick", price: 0 },
      { value: "LHR", label: "to Heathrow", price: 0 },
      { value: "STN", label: "to Stansted", price: 0 },
    ],
  };

  // Get filtered courses and transfers based on destination
  const filteredCourses = courses[selectedDestination];
  const filteredArrivalTransfers = arrivalTransfers[selectedDestination];
  const filteredDepartureTransfers = departureTransfers[selectedDestination];

  // Calculate total quote
  //   const accommodationPrice = selectedAccommodation
  //     ? selectedAccommodation.price * accommodationWeeks
  //     : 0;

  function calculateCoursePrice(course, weeks) {
    if (!course || !weeks) return 0;

    // Check if the course has price rules
    if (course.priceRules) {
      const rule = course.priceRules.find(
        (r) => weeks >= r.minWeeks && weeks <= r.maxWeeks
      );
      return rule ? rule.price : 0;
    }

    // Default price (if no price rules exist)
    return course.price || 0;
  }

  const coursePrice = selectedCourse
    ? calculateCoursePrice(selectedCourse, courseWeeks) * courseWeeks
    : 0;

  const totalQuote = coursePrice;

  return (
    <div className="form-container">
      <form className="form">
        <DropdownComponent
          label="Destination"
          options={destinations}
          value={selectedDestination}
          onChange={(e) => {
            setSelectedDestination(e.target.value);
          }}
        />
        {filteredCourses && (
          <DropdownComponent
            label="Course"
            options={filteredCourses}
            value={selectedCourse}
            onChange={(e) => {
              const course = filteredCourses.find(
                (course) => course.value === e.target.value
              );
              setSelectedCourse(course);
            }}
          />
        )}
        <div className="duration-container">
          <DurationComponent onChange={(e) => setCourseWeeks(e.target.value)} />
        </div>
        <AcccommodationComponent
          needsAccommodation={needsAccommodation}
          setNeedsAccommodation={setNeedsAccommodation}
          courseWeeks={courseWeeks}
          accommodationWeeks={accommodationWeeks}
          selectedAccommodation={selectedAccommodation}
          needsSpecialDiet={needsSpecialDiet}
        />
        <TransfersComponent
          label="arrival"
          needsTransfer={needsArrivalTransfer}
          options={filteredArrivalTransfers}
          onChangeNeeds={(e) => setNeedsArrivalTransfer(e.target.value)}
        />
        <TransfersComponent
          label="departure"
          needsTransfer={needsDepartureTransfer}
          options={filteredDepartureTransfers}
          onChangeNeeds={(e) => setNeedsDepartureTransfer(e.target.value)}
        />
        <InsuranceComponent
          value={needsInsurance}
          onChange={(e) => setNeedsInsurance(e.target.value)}
        />

        <div className="quote-summary">
          <h2>Total Quote: £{totalQuote}</h2>
        </div>
      </form>
    </div>
  );
}
