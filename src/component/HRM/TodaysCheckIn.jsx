import React, { useState } from 'react'
import { PreviousButton } from '../button'
import {CAValidation, CalibrationCheckIN, HVACValidationCheckIN, PLC_CSV_ValidationCheckIn, SteamQualityTest, ThermalValidationCheckIN} from './todaysCheckIn/index';
import { useStateContext } from '../../contexts/ContextProvider';


const TodaysCheckIn = (onDateChange) => {

    const [selectedOption, setSelectedOption] = useState('')
    const [selectedDate, setSelectedDate] = useState(
      new Date().toISOString().split('T')[0]
    )
  
    const today = new Date().toISOString().split('T')[0]
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }
    const handleDateChange = (e) => {
      const selectedDate = e.target.value
      setSelectedDate(selectedDate)
    }

    const renderPage = () => {
        if (selectedOption === 'calibration') {
          return (
            <div>
              <h2>Option 1 Page</h2>
              <CalibrationCheckIN selectedDate={selectedDate} />
              {/* Render the content for Option 1 page */}
            </div>
          );
        } else if (selectedOption === 'hvac') {
          return (
            <div>
              <h2>Option 2 Page</h2>
              <HVACValidationCheckIN selectedDate={selectedDate}/>
              {/* Render the content for Option 2 page */}
            </div>
          );
        } else if (selectedOption === 'thermalValidation') {
          return (
            <div>
              <h2>Option 3 Page</h2>
              <ThermalValidationCheckIN selectedDate={selectedDate}/>
              {/* Render the content for Option 3 page */}
            </div>
          );
        } else if (selectedOption === 'plcCsv') {
            return (
              <div>
                <h2>Option 4 Page</h2>
                <PLC_CSV_ValidationCheckIn selectedDate={selectedDate}/>
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'caValidation') {
            return (
              <div>
                <h2>Option 5 Page</h2>
                <CAValidation selectedDate={selectedDate}/>
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'steamQuality') {
            return (
              <div>
                <h2>Option 6 Page</h2>
                <SteamQualityTest selectedDate={selectedDate}/>
                {/* Render the content for Option 3 page */}
              </div>
            );
        } else if (selectedOption === 'all') {
            return (
              <div>
                <h2>Option 6 Page</h2>
                <CalibrationCheckIN selectedDate={selectedDate}/>
                <HVACValidationCheckIN selectedDate={selectedDate}/>
                <ThermalValidationCheckIN selectedDate={selectedDate}/>
                <PLC_CSV_ValidationCheckIn selectedDate={selectedDate}/>
                <CAValidation selectedDate={selectedDate}/>
                <SteamQualityTest selectedDate={selectedDate}/>
                {/* Render the content for Option 3 page */}
              </div>
            );
        }
    
        // Render default message if no option is selected
        return <p>Please select an option.</p>;
      };
  return (
    <div>

        <PreviousButton />
        
        <div className='grid grid-flow-col gap-3 my-3'>
            <div>
                <label htmlFor="dateInput">Select a date:</label>
                <input
                    type="date"
                    id="dateInput"
                    defaultValue={today}
                    onChange={handleDateChange}
                    max={today}
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