import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useStateContext } from "../../../../../contexts/ContextProvider";
const Trail = () => {
    const {host} = useStateContext()
  const [calibratedByOptions, setCalibratedByOptions] = useState([]);
  const [branchHeadOptions, setBranchHeadOptions] = useState([]);
  const [selectedCalibratedBy, setSelectedCalibratedBy] = useState(null);
  const [selectedBranchHead, setSelectedBranchHead] = useState(null);

  // Fetch the list of employees for "Calibrated By" and "Branch Head" roles
  useEffect(() => {
    fetchEmployeesByRole('calibrationEngineer');
    fetchEmployeesByRole('branchHead');
  }, []);

  const fetchEmployeesByRole = async (role) => {
    try {
      const response = await axios.post(`${host}/api/certificate/fetchEmployeesByRole`, {
        roles: [role]
      });

      const formattedOptions = response.data.employees.map((employee) => ({
        value: employee._id,
        label: `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`
      }));

      if (role === 'calibrationEngineer') {
        setCalibratedByOptions(formattedOptions);
      } else if (role === 'branchHead') {
        setBranchHeadOptions(formattedOptions);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCalibratedByChange = (selectedOption) => {
    setSelectedCalibratedBy(selectedOption);
  };

  const handleBranchHeadChange = (selectedOption) => {
    setSelectedBranchHead(selectedOption);
  };

  return (
    <div>
      <h1>Employee List</h1>
    {host}
      <div>
        <label htmlFor="">Calibrated By:</label>
        <Select
          value={selectedCalibratedBy}
          onChange={handleCalibratedByChange}
          options={calibratedByOptions}
          isSearchable={true}
          placeholder="Calibrated By"
        />
      </div>

      <div>
        <label htmlFor="">Branch Head:</label>
        <Select
          value={selectedBranchHead}
          onChange={handleBranchHeadChange}
          options={branchHeadOptions}
          isSearchable={true}
          placeholder="Branch Head"
        />
      </div>
    </div>
  );
};

export default Trail;
