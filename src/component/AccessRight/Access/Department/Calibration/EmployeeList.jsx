import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../../contexts/ContextProvider';

const EmployeeList = ({ employeeData, onEmployeeSelect }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Function to handle button click and update selectedEmployeeId
  const handleButtonClick = (id, fName, lName) => {
    setSelectedEmployeeId(id);
    onEmployeeSelect(id, fName, lName);
  };

  return (
    <div className='h-screen p-2'>
      <div className='font-bold text-lg p-2 bg-gray-500 text-white sticky'>
        <h1>Employee List</h1>
      </div>
      <div className='h-screen'>
        <div className='overflow-y-auto h-5/6'>
          {employeeData.map((emp) => (
            <div className='' key={emp._id}>
              <button
                className={`border-y border-black p-2 w-full mb-0.5 ${
                  selectedEmployeeId === emp._id ? 'bg-blue-700/40' : 'bg-white'
                }`}
                onClick={() => handleButtonClick(emp._id, emp.employeeData[0].fName, emp.employeeData[0].lName)}
              >
                {emp.employeeData[0].fName} {emp.employeeData[0].lName}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
