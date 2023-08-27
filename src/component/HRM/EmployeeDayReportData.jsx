import React, { useEffect, useState } from "react";
import { PreviousButton } from "../button";
import {
  CAValidationDayReportData,
  CalibrationDayReportsData,
  HVACDayReportData,
  PLCCSVValidationDayReport,
  SteamQualityValidationDayReportData,
  ThermalDayReportData,
} from "./dayReport/index";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AccessDeniedPage } from "../AccessRight";

const EmployeeDayReportData = (onDateChange) => {
  const {
    fetchDayReportTableData,
    host,
    loggedInEmployee,
    allowedDesignation,
        userDesignation,
  } = useStateContext();
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedCheckInType, setSelectedCheckInType] = useState("All");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const today = new Date().toISOString().split("T")[0];
  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  const handleCheckInTypeChange = (event) => {
    setSelectedCheckInType(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, selectedCheckInType]); // Combine both dependencies

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${host}/api/dayReportDetails/dayReportEmployeeData`,
        {
          "Employee.department": selectedOption,
          CheckInType: selectedCheckInType,
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const preprocessData = (data) => {
    return data.map((item) => ({
      ...item,
      Employee: {
        fName: item.Employee?.fName || "",
        lName: item.Employee?.lName || "",
      },
      Date: item.Date || "N/A",
      CheckInType: item.CheckInType || "N/A",
      SiteName: item.SiteName || "N/A",
      Activity: item.Activity || "N/A",
      Description: item.Description || "N/A",
    }));
  };

  const fetchedData = data; // Replace this with your fetched data
  const processedData = preprocessData(fetchedData);

  const filteredReports = processedData.filter((filterReport) => {
    const reportDate = filterReport.Date.substr(0, 10); // Extract YYYY-MM-DD
    return reportDate === selectedDate;
  });

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const formatTime = (time) => {
    return moment(time).format("HH:mm");
  };

  const renderPage = () => {
    return (
      <div>
        
        <div className=" bg-gray-100 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Day Report Table
            </h1>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                  <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Sr No
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Site Name
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td
                        className="py-4 px-4 text-sm text-gray-700 text-center"
                        colSpan="9"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report, index) => {
                      const fullName = `${report.Employee.fName}${' '}${report.Employee.lName}`
                      const dateFormate = formatDate(report.Date);
                      return (
                        <tr key={report._id} className="hover:bg-gray-50">
                          <td className="py-1 px-2 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="py-1 px-2 whitespace-nowrap">
                            {fullName}
                          </td>
                          <td className="py-1 px-2 whitespace-nowrap">
                            {report.CheckInType}
                          </td>
                          <td className="py-1 px-2 whitespace-nowrap">
                            {report.SiteName}
                          </td>
                          <td className="py-1 px-2 whitespace-nowrap">
                            {dateFormate}
                          </td>
                          <td className="py-1 px-2 whitespace-nowrap">
                            {report.Activity}
                          </td>
                          <td className="py-1 px-4 whitespace-pre-wrap w-2/5"> {/* Adjust the width as needed */}
                            <div className="h-20 overflow-y-scroll no-scrollbar">
                              {report.Description}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return loggedInEmployee.length > 0 ? (
    <>
    
    {allowedDesignation.includes(userDesignation) ? (
    <div>
      <PreviousButton />
      <div className="grid md:grid-flow-col sm:grid-flow-row gap-3 my-3">
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
          <h2 className="text-bold">Select an Activity</h2>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-full border border-gray-800/25 rounded-md p-2 shadow-sm"
          >
            <option value="All">--- All---</option>
            <option value="Admin">Admin</option>
                  <option value="Account">Account</option>
                  <option value="Calibration">Calibration</option>
                  <option value="HVAC Validation">HVAC Validation</option>
                  <option value="Thermal Validation">Thermal Validation</option>
                  <option value="CA Validation">CA Validation</option>
                  <option value="PLC & CSV Validation">PLC & CSV Validation</option>
                  <option value="Steam Quality Validation">
                    Steam Quality Validation
                  </option>
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
        <div>
          <h2 className="text-bold">Select CheckIn Type</h2>
          <select
            value={selectedCheckInType}
            onChange={handleCheckInTypeChange}
            className="w-full border border-gray-800/25 rounded-md p-2 shadow-sm"
          >
            <option value="All">--- All---</option>
            <option value="Site">Site</option>
            <option value="Office">Office</option>
          </select>
        </div>
      </div>
      {/* {renderPage()} */}
      {renderPage()}
    </div>
    ) : (
      <AccessDeniedPage />
    )}
    </>
  ) : (
    null
  )
}

export default EmployeeDayReportData;
