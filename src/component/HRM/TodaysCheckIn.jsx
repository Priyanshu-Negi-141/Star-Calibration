import React, { useEffect, useState } from 'react'
import { PreviousButton } from '../button'
import {CAValidation, CalibrationCheckIN, HVACValidationCheckIN, PLC_CSV_ValidationCheckIn, SteamQualityTest, ThermalValidationCheckIN} from './todaysCheckIn/index';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AccessDeniedPage } from '../AccessRight';


const TodaysCheckIn = (onDateChange) => {
    const {host, loggedInEmployee, allowedDepartments, userDepartment} = useStateContext()
    const [selectedOption, setSelectedOption] = useState('All')
    const [selectedCheckInType, setSelectedCheckInType] = useState('All')
    const [selectedDate, setSelectedDate] = useState(
      new Date().toISOString().split('T')[0]
    )

    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, [selectedOption, selectedCheckInType]); // Combine both dependencies
    

    const fetchData = async () => {
      try {
        const response = await axios.post(`${host}/api/checkInDetails/checkInEmployeeData`, {
          "Employee.department": selectedOption,
          "checkInType": selectedCheckInType
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    const preprocessData = (data) => {
      return data.map(item => ({
        ...item,
        Employee: {
          fName: item.Employee?.fName || '',
          lName: item.Employee?.lName || ''
        },
        login_address: item.login_address || 'N/A',
        logout_address: item.logout_address || 'N/A',
        site_name: item.site_name || 'N/A',
        logout_location: item.logout_location || { time: 'N/A' }
      }));
    };

    const fetchedData = data; // Replace this with your fetched data
    const processedData = preprocessData(fetchedData);

    const filteredReports = processedData.filter((filterReport) => {
      const reportDate = filterReport.date.substr(0, 10); // Extract YYYY-MM-DD
      return reportDate === selectedDate;
    });



    console.log(filteredReports)

  
    const today = new Date().toISOString().split('T')[0]
    const handleOptionChange = (event) => {
      const newOption = event.target.value;
      setSelectedOption(newOption);
    };

    const handleCheckInTypeChange = (event) => {
      setSelectedCheckInType(event.target.value);
    };
    

  

    const handleDateChange = (e) => {
      const selectedDate = e.target.value
      setSelectedDate(selectedDate)
    }


    const formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
    };

    const formatTime = (time) => {
      return moment(time).format('HH:mm');
    };
 
      const renderPage1 = () => {
        return(
          <div>
      <h2>Check-in Data Table</h2>
      <div className="overflow-x-auto">
  <table className="min-w-full bg-white border">
 
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sr. Num</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Employee Name</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Login Time</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Login Address</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Logout Time</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Logout Address</th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Site Name</th>
        <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">View</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
    {filteredReports.length === 0 ? (
    <tr>
     <td className="py-4 px-4 text-sm text-gray-700 text-center" colSpan="9">
      No data available
    </td>

    </tr>
  ) : (
      filteredReports.map((item, index) => {

      const fullName = `${item.Employee.fName}${' '}${item.Employee.lName}`
      return(
        <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
          <td className="py-4 px-4 text-sm text-gray-700">{index + 1}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{`${fullName}`}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{formatDate(item.date)}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{formatTime(item.date)}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{item.login_address}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{formatTime(item.logout_location.time)}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{item.logout_address}</td>
          <td className="py-4 px-4 text-sm text-gray-700">{item.site_name}</td>
          <td className="py-4 px-4 text-center">
                <Link to={`/view-map/${fullName}/${item._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
                    View Map
                  </button>
                </Link>
          </td>
        </tr>
      )}))}
    </tbody>
  </table>
</div>





    </div>
        )
      }
  return loggedInEmployee.length > 0 ? (
    <>
    
    {allowedDepartments.includes(userDepartment) ? (
    <div>

        <PreviousButton />
        
        <div className='grid md:grid-cols-3 gap-3 my-3'>
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
                    <option value="All">--- All---</option>
                    <option value="Calibration Validation">Calibration</option>
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
            <div>
            <h2 className='text-bold'>Select CheckIn Type</h2>
                <select value={selectedCheckInType} onChange={handleCheckInTypeChange} className="w-full border border-gray-800/25 rounded-md p-2 shadow-sm">
                    <option value="All">--- All---</option>
                    <option value="Site">Site</option>
                    <option value="Office">Office</option>
                </select>
            </div>
        </div>
        {renderPage1()}

    </div>
    ) : (
      <AccessDeniedPage />
    )}
    </>
  ) : (
    null
  )
}

export default TodaysCheckIn