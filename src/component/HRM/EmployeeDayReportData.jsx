import React, { useEffect, useState } from 'react'
import { PreviousButton } from '../button';
import {CAValidationDayReportData, CalibrationDayReportsData, HVACDayReportData, PLCCSVValidationDayReport, SteamQualityValidationDayReportData, ThermalDayReportData} from './dayReport/index';
import { useStateContext } from '../../contexts/ContextProvider';

const EmployeeDayReportData = (onDateChange) => {
  const {fetchDayReportTableData} = useStateContext()
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const today = new Date().toISOString().split('T')[0]
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const renderPage = () => {
    if (selectedOption === 'all') {
      return (
        <div>
          <CalibrationDayReportsData selectedDate={selectedDate} />
          <HVACDayReportData selectedDate={selectedDate} />
          <ThermalDayReportData selectedDate={selectedDate} />
          <PLCCSVValidationDayReport selectedDate={selectedDate} />
          <CAValidationDayReportData selectedDate={selectedDate} />
          <SteamQualityValidationDayReportData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    } else if (selectedOption === 'calibration') {
      return (
        <div>
          <CalibrationDayReportsData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    } else if (selectedOption === 'hvac') {
      return (
        <div>
          <HVACDayReportData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    } else if (selectedOption === 'thermalValidation') {
      return (
        <div>
          <ThermalDayReportData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    } else if (selectedOption === 'plcCsv') {
      return (
        <div>
          <PLCCSVValidationDayReport selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    }
    else if (selectedOption === 'caValidation') {
      return (
        <div>
          <CAValidationDayReportData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    } else if (selectedOption === 'steamQuality') {
      return (
        <div>
          <SteamQualityValidationDayReportData selectedDate={selectedDate} />
          {/* Render the content for Option 1 page */}
        </div>
      );
    }  
    // Render default message if no option is selected
    return <p>Please select an option.</p>;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    setSelectedDate(selectedDate)
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
            {/* <div>
                <h2 className='text-bold'>Employee Name</h2>
                <input
                    type="text"
                    placeholder="Enter employee name"
                    className=""
                />
            </div> */}
        </div>
        {renderPage()}
    </div>
  )
}

export default EmployeeDayReportData