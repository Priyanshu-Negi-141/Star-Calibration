import React from 'react'
import { useStateContext } from '../../../../contexts/ContextProvider';

const AttendanceTable = ({ attendance, selectedMonth, selectedYear }) => {
    const {currentColor} = useStateContext()
    const getMonthName = (month) => {
      const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
      return monthNames[month - 1] || '';
    };
  
    const filteredAttendance = attendance.filter(({ date }) => {
      const attendanceDate = new Date(date);
      if (selectedMonth && selectedYear) {
        return attendanceDate.getMonth() + 1 === selectedMonth && attendanceDate.getFullYear() === selectedYear;
      } else if (selectedMonth) {
        return attendanceDate.getMonth() + 1 === selectedMonth;
      } else if (selectedYear) {
        return attendanceDate.getFullYear() === selectedYear;
      }
      return true;
    });
  
    const employeeNames = [...new Set(filteredAttendance.map(({ employeeName }) => employeeName))];
  
    const uniqueDates = [...new Set(filteredAttendance.map(({ date }) => date))];
    uniqueDates.sort((a, b) => new Date(a) - new Date(b)); // Sort the dates in ascending order
  
    return (
      <div className="attendance-table-container border mb-10" style={{borderColor: currentColor}}>
        <h2 className='p-2 border text-center text-bold bg-gray-300 dark:bg-gray-800' style={{border: '2px solid',borderColor: currentColor,color: currentColor}}>{selectedMonth && selectedYear ? `${getMonthName(selectedMonth)} ${selectedYear} Attendance` : 'All Attendance'}</h2>
        <div className="table-wrapper border" style={{borderColor: currentColor}}>
          <table className='grid grid-flow-row overflow-x-auto'>
            <thead className='w-max'>
              <tr className='border border-red-600 h-12' style={{color:currentColor}}>
                <th className="w-44 sticky border left-0 bg-white dark:bg-gray-800" style={{border: '2px solid' ,borderColor: currentColor}}>Employee Name</th>
                {uniqueDates.map((date) => (
                  <th className='w-32 border bg-white dark:bg-gray-800' style={{border: '2px solid' ,borderColor: currentColor}} key={date}>{date}</th>
                ))}
              </tr>
            </thead>
            <tbody className='w-max'>
              {employeeNames.map((employeeName) => {
                const employeeAttendance = filteredAttendance.filter(({ employeeName: name }) => name === employeeName);
                return (
                  <tr className='border h-10' style={{borderColor: currentColor}} key={employeeName}>
                    <th className="w-44 border sticky left-0 bg-white dark:bg-gray-800" style={{color: currentColor, borderColor: currentColor}}>{employeeName}</th>
                    {uniqueDates.map((date) => {
                      const attendance = employeeAttendance.find((entry) => entry.date === date);
                      return (
                        <td className='border w-32 text-center dark:text-white' style={{borderColor: currentColor}} key={date}>{attendance ? attendance.status : '-'}</td>
                      );
                    })}
                  </tr>
                );
              })}
              {employeeNames.length === 0 && (
                <div className='p-2'>
                    <div className='text-white'>
                        <div className='' colSpan={uniqueDates.length + 1}>No attendance data found.</div>
                    </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default AttendanceTable