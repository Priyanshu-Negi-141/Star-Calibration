import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const EmployeeRole = ({ selectedEmployee, employeeData }) => {
  const [calibrationEngineer, setCalibrationEngineer] = useState(null);
  const [branchHead, setBranchHead] = useState(null);
  const { host } = useStateContext();
  const [refreshData, setRefreshData] = useState(false);
  const [prevCalibrationEngineer, setPrevCalibrationEngineer] = useState(null);
  const [prevBranchHead, setPrevBranchHead] = useState(null);

  // State to store the fetched unique ID data
  const [uniqueIdData, setUniqueIdData] = useState(null);

  // Function to fetch the unique ID data from the server
  const fetchUniqueId = async (id) => {
    try {
      const response = await axios.get(
        `${host}/api/employee/fetchUniqueID/${id}`
      );
      setUniqueIdData(response.data);
    } catch (error) {
      console.error("Error in fetching Unique Id:", error);
    }
  };

  // useEffect hook to handle automatic data refresh and initial data fetch
  useEffect(() => {
    // Perform the initial data fetch when the component mounts
    if (selectedEmployee) {
      fetchUniqueId(selectedEmployee.id);
    }
  }, [selectedEmployee]);

  // useEffect hook to handle automatic data refresh when refreshData is true
  useEffect(() => {
    // Perform the data refresh here
    const fetchData = async () => {
      if (refreshData && selectedEmployee) {
        await fetchUniqueId(selectedEmployee.id);
        // Reset the refresh trigger to false after data has been refreshed
        setRefreshData(false);
      }
      // Store the current values in the previous state
      setPrevCalibrationEngineer(calibrationEngineer);
      setPrevBranchHead(branchHead);
    };
    fetchData();
  }, [refreshData, selectedEmployee, calibrationEngineer, branchHead]);

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    // Prepare the data object to be sent in the PUT request
    const data = {};

    // Check if the calibrationEngineer has been changed and update the data object accordingly
    if (
      calibrationEngineer &&
      calibrationEngineer !== prevCalibrationEngineer
    ) {
      data.calibrationEngineer = calibrationEngineer.value;
    } else {
      data.calibrationEngineer = prevCalibrationEngineer?.value;
    }

    // Check if the branchHead has been changed and update the data object accordingly
    if (branchHead && branchHead !== prevBranchHead) {
      data.branchHead = branchHead.value;
    } else {
      data.branchHead = prevBranchHead?.value;
    }
    try {
      const response = await axios.put(
        `${host}/api/employee/updateEmployeeRole/${selectedEmployee.id}`,
        data
      );
      setRefreshData(true);
      console.log(response.data); // Log the response message if needed
    } catch (error) {
      console.error(error.response.data);
    }
  };

  if (!selectedEmployee) {
    return <div>No Employee yet Selected... </div>;
  }

  if (!uniqueIdData) {
    return <div>Trying to fetch data...</div>;
  }

  return (
    <div className="p-2">
      <div className="p-2 sticky text-center font-bold text-lg bg-gray-500 text-white mb-3">
        <h1>Employee Role</h1>
      </div>
      <div className="border border-black rounded-sm p-2 text-center font-bold text-lg">
        <p>
          {selectedEmployee.name} {selectedEmployee.lastName}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {selectedEmployee && (
          <div className="mt-2 col-span-2">
            {/* <p>ID: {selectedEmployee.id}</p> */}

            <form onSubmit={handleUpdateRole}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="grid gap-2">
                  <label>Calibration Engineer:</label>
                  <Select
                    value={calibrationEngineer}
                    options={[
                      { value: true, label: "True" },
                      { value: false, label: "False" },
                    ]}
                    onChange={(selectedOption) =>
                      setCalibrationEngineer(selectedOption)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <label>Branch Head:</label>
                  <Select
                    value={branchHead}
                    options={[
                      { value: true, label: "True" },
                      { value: false, label: "False" },
                    ]}
                    onChange={(selectedOption) => setBranchHead(selectedOption)}
                  />
                </div>
              </div>
              <div className="grid place-items-end mt-3">
                <button
                  type="submit"
                  className="border border-black rounded-md p-2 bg-yellow-300 text-gray-600 font-bold"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="p-2 flex-1 gap-2">
          <div className="flex gap-2 capitalize">
            <p className="font-bold">Calibration Engineer:</p>
            <p>{uniqueIdData.employeeData[0].employeeRole[0].calibrationEngineer}</p>
          </div>
          <div className="flex gap-2 capitalize">
            <p className="font-bold">Authorized :</p>
            <p>{uniqueIdData.employeeData[0].employeeRole[0].branchHead}</p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default EmployeeRole;
