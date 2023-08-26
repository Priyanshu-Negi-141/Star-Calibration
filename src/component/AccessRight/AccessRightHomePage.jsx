import React, { useState } from 'react'
import {AccessDeniedPage, CalibrationDepartment, HVACDepartment, ThermalDepartment} from './index'
import { useStateContext } from '../../contexts/ContextProvider';

const AccessRightHomePage = () => {
  const {loggedInEmployee, allowedDesignation,
    userDesignation} = useStateContext()
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



  return loggedInEmployee.length > 0 ? (
    <>
    {allowedDesignation.includes(userDesignation) ? (
    <>
      <div
        className="text-bold text-white p-3 border-b-2"
        style={{ backgroundColor: currentColor }}
      >
        <h1 className="text-2xl">Access Role</h1>
      </div>
      <div
        className="grid gap-3 text-white grid-flow-col"
        style={{ backgroundColor: currentColor }}
      >
        <button
          className={`p-2  ${
            activeButton === "calibration" ? " border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("calibration")}
        >
          Calibration
        </button>
        <button
          className={`p-2 ${
            activeButton === "hvac" ? "border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("hvac")}
        >
          HVAC
        </button>
        <button
          className={`p-2 ${
            activeButton === "thermal" ? "border-b-4 border-b-gray-950 bg-black/20 text-bold" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick("thermal")}
        >
          Thermal
        </button>
      </div>
      {isCalibrationDropDownOpen && <CalibrationDepartment />}
      {isHvacDropDownOpen && <HVACDepartment />}
      {isThermalDropDownOpen && <ThermalDepartment />}
    </>
    ) : (
      <AccessDeniedPage />
    )}
    </>
  ) : (
    null
  )
}

export default AccessRightHomePage