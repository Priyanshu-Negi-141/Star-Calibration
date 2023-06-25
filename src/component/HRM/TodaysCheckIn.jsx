import React, { useState } from 'react'

import { PreviousButton } from '../button'
import {CAValidation, CalibrationCheckIN, HVACValidationCheckIN, PLC_CSV_ValidationCheckIn, SteamQualityTest, ThermalValidationCheckIN} from './todaysCheckIn/index';


const TodaysCheckIn = () => {
    const defaultDate = getTodayDate();
    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const renderPage = () => {
        if (selectedOption === 'calibration') {
          return (
            <div>
              <h2>Option 1 Page</h2>
              <CalibrationCheckIN />
              {/* Render the content for Option 1 page */}
            </div>
          );
        } else if (selectedOption === 'hvac') {
          return (
            <div>
              <h2>Option 2 Page</h2>
              <HVACValidationCheckIN />
              {/* Render the content for Option 2 page */}
            </div>
          );
        } else if (selectedOption === 'thermalValidation') {
          return (
            <div>
              <h2>Option 3 Page</h2>
              <ThermalValidationCheckIN />
              {/* Render the content for Option 3 page */}
            </div>
          );
        } else if (selectedOption === 'plcCsv') {
            return (
              <div>
                <h2>Option 4 Page</h2>
                <PLC_CSV_ValidationCheckIn />
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'caValidation') {
            return (
              <div>
                <h2>Option 5 Page</h2>
                <CAValidation />
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'steamQuality') {
            return (
              <div>
                <h2>Option 6 Page</h2>
                <SteamQualityTest />
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'all') {
            return (
              <div>
                <h2>Option 6 Page</h2>
                <CalibrationCheckIN />
                <HVACValidationCheckIN />
                <ThermalValidationCheckIN />
                <PLC_CSV_ValidationCheckIn />
                <CAValidation />
                <SteamQualityTest />
                {/* Render the content for Option 3 page */}
              </div>
            );
        }
    
        // Render default message if no option is selected
        return <p>Please select an option.</p>;
      };




  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }
  return (
    <div>

        <PreviousButton />
        
        <div className='grid grid-flow-col gap-3 my-3'>
            <div>
                <label htmlFor="dateInput">Select a date:</label>
                <input
                    type="date"
                    id="dateInput"
                    defaultValue={defaultDate}
                    max={defaultDate}
                    required
                />
            </div>
            <div>
                <h2 className='text-bold'>Select an Activity</h2>
                <select value={selectedOption} onChange={handleOptionChange} className="w-full border border-gray-800/25 rounded-md p-2 shadow-sm">
                    <option value="all">--- All---</option>
                    <option value="calibration">Calibration</option>
                    <option value="hvac">HVAC</option>
                    <option value="thermalValidation">Thermal Validation</option>
                    <option value="plcCsv">PLC & CSV</option>
                    <option value="caValidation">CA Validation</option>
                    <option value="steamQuality">Steam Quality</option>
                </select>
            </div>
            <div>
                <h2 className='text-bold'>Employee Name</h2>
                <input
                    type="text"
                    placeholder="Enter employee name"
                    className=""
                />
            </div>
        </div>
        {renderPage()}

    </div>
  )
}

export default TodaysCheckIn