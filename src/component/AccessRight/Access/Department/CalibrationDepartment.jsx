import React, { useEffect, useState } from "react";
import EmployeeList from "./Calibration/EmployeeList";
import EmployeeRole from "./Calibration/EmployeeRole";
import { useStateContext } from "../../../../contexts/ContextProvider";
import axios from "axios";

const CalibrationDepartment = () => {
  const { host } = useStateContext();
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchAllEmployeeData();
  }, []);

  const fetchAllEmployeeData = async () => {
    try {
      const response = await axios.get(`${host}/api/employee/fetchAllEmployeeList`);
      setEmployeeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching employee data', error);
    }
  };

  const handleEmployeeSelection = (employeeId, employeeName, employeeLastName) => {
    // You can do any processing with the selected employee data here
    setSelectedEmployee({ id: employeeId, name: employeeName, lastName: employeeLastName });
  };
  return (
    <div>
      <div className="grid grid-cols-7">
        <div className="col-span-2">
          <EmployeeList employeeData={employeeData} onEmployeeSelect={handleEmployeeSelection} />
        </div>
        <div className="col-span-5">
          <EmployeeRole selectedEmployee={selectedEmployee} employeeData={employeeData} />
        </div>
      </div>
    </div>
  );
};

export default CalibrationDepartment;
