import React, { useState } from 'react'
import { PreviousButton } from '../../button'
import { attendanceData } from '../../../data/userManagement/attandanceData/attendanceData';
import { useStateContext } from '../../../contexts/ContextProvider';
import AttendanceTable from './attendance/AttendanceTable';




const ViewAttendance = () => {

  const {currentColor} = useStateContext()

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value, 10));
  };

  const filteredAttendance = attendanceData
  .filter((record) => {
    const recordDay = parseInt(record.date.split('-')[2]);
    const recordMonth = parseInt(record.date.split('-')[1]);
    const recordYear = parseInt(record.date.split('-')[0]);
    const isDayMatch = day ? recordDay === parseInt(day) : true;
    const isMonthMatch = month ? recordMonth === month : true;
    const isYearMatch = year ? recordYear === year : true;
    return isDayMatch && isMonthMatch && isYearMatch;
  })
  .sort((a, b) => new Date(a.date) - new Date(b.date));

const days = Array.from({ length: 31 }, (_, i) => i + 1);

// Count the number of absent and present records
const absentCount = filteredAttendance.filter((record) => record.status === 'absent').length;
const presentCount = filteredAttendance.filter((record) => record.status === 'present').length;

  return (
    <div className=''>
      <div className=' border text-center dark:text-white p-2 bg-gray-300 dark:bg-gray-800' style={{borderColor: currentColor}}>
        <h1>View Attendance</h1>
      </div>
      <div className='grid grid-cols-3 m-5 border' style={{borderColor: currentColor}} >
        <div className='grid grid-flow-row '>
        <label className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Day:</label>
          <select 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={day} 
          onChange={handleDayChange}>
            <option value="">Select Day</option>
            {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
          </select>
        </div>
        <div className='grid grid-flow-row'>
        <label className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Month:</label>
          <select 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={month} 
          onChange={handleMonthChange}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        
        </div>
        <div className='grid grid-flow-row'>
        <label className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Year:</label>
          <select 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={year} 
          onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-2 m-5 border' style={{ borderColor: currentColor }}>
        <div className='p-2'>
          <h2>Absent Count: {absentCount}</h2>
        </div>
        <div className='p-2'>
          <h2>Present Count: {presentCount}</h2>
        </div>
      </div>
      <AttendanceTable attendance={attendanceData} selectedMonth={month} selectedYear={year} />
    </div>
  )
}

export default ViewAttendance