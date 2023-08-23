import React, { useState } from "react";
import { CalibrationHomePage, HVACHomePage, ThermalHomePage, Location } from "./index";
import { useStateContext } from "../../contexts/ContextProvider";
import { MainLoginPage } from "../EmployeeLogin";
// import CalibrationHomePage from './CalibrationDepartment/CalibrationHomePage'

const HomePage = () => {
  const [isCalibrationDropDownOpen, setIsCalibrationDropDownOpen] =
    useState(false);
  const [isHvacDropDownOpen, setIsHvacDropDownOpen] = useState(false);
  const [isThermalDropDownOpen, setIsThermalDropDownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const calibrationToggleDropdown = () => {
    setIsCalibrationDropDownOpen(!isCalibrationDropDownOpen);
  };
  const hvacToggleDropdown = () => {
    setIsHvacDropDownOpen(!isHvacDropDownOpen);
  };
  const thermalToggleDropdown = () => {
    setIsThermalDropDownOpen(!isThermalDropDownOpen);
  };
  const { currentColor } = useStateContext();
  const handleButtonClick = (buttonName) => {
    // Close previously opened dropdown
    if (activeButton === "calibration") {
      calibrationToggleDropdown();
    } else if (activeButton === "hvac") {
      hvacToggleDropdown();
    } else if (activeButton === "thermal") {
      thermalToggleDropdown();
    }
  
    // Set the active button
    setActiveButton(buttonName);
  
    // Open the corresponding dropdown
    if (buttonName === "calibration") {
      calibrationToggleDropdown();
    } else if (buttonName === "hvac") {
      hvacToggleDropdown();
    } else if (buttonName === "thermal") {
      thermalToggleDropdown();
    }
  };
  

  return (
    <>
      <div
        className="text-bold text-white p-5 border-b-2"
        style={{ backgroundColor: currentColor }}
      >
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <div
        className="grid gap-3 text-white grid-flow-col"
        style={{ backgroundColor: currentColor }}
      >
        <button
          className={`p-3  ${
            activeButton === "calibration" ? " border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("calibration")}
        >
          Calibration
        </button>
        <button
          className={`p-3 ${
            activeButton === "hvac" ? "border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("hvac")}
        >
          HVAC
        </button>
        <button
          className={`p-3 ${
            activeButton === "thermal" ? "border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("thermal")}
        >
          Thermal
        </button>
      </div>
      {isCalibrationDropDownOpen && <CalibrationHomePage />}
      {isHvacDropDownOpen && <HVACHomePage />}
      {isThermalDropDownOpen && <ThermalHomePage />}
    </>
  );
};

export default HomePage;
