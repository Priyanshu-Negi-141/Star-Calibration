import React, { useEffect, useState } from "react";
import {
  DigitalVernierCaliperTable,
  PressureTransmitterTable,
  RPMIndicatorTable,
  TimerTable,
} from "./index";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import Trial from "./Trial";
import { toast } from "react-toastify";

const MainTablePage = (props) => {
  const { host } = useStateContext();
  const { instrumentName, id, fsValue } = props;
  const [isSelected, setIsSelected] = useState();
  const tableSelectedChange = (e) => {
    setIsSelected(e.target.value);
  };

  const [calibratedByOptions, setCalibratedByOptions] = useState([]);
  const [branchHeadOptions, setBranchHeadOptions] = useState([]);
  const [selectedCalibratedBy, setSelectedCalibratedBy] = useState(null);
  const [selectedBranchHead, setSelectedBranchHead] = useState(null);

  // Fetch the list of employees for "Calibrated By" and "Branch Head" roles
  useEffect(() => {
    fetchEmployeesByRole("calibrationEngineer");
    fetchEmployeesByRole("branchHead");
  }, []);

  const fetchEmployeesByRole = async (role) => {
    try {
      const response = await axios.post(
        `${host}/api/certificate/fetchEmployeesByRole`,
        {
          roles: [role],
        }
      );

      const formattedOptions = response.data.employees.map((employee) => ({
        value: `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`,
        label: `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`,
      }));

      if (role === "calibrationEngineer") {
        setCalibratedByOptions(formattedOptions);
      } else if (role === "branchHead") {
        setBranchHeadOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCalibratedByChange = (selectedOption) => {
    setSelectedCalibratedBy(selectedOption);
  };

  const handleBranchHeadChange = (selectedOption) => {
    setSelectedBranchHead(selectedOption);
  };

  const handleSubmit = () => {
    // Ensure both options are selected before sending the data
    if (selectedCalibratedBy && selectedBranchHead) {
        // Create the data object to be sent to the backend
        const data = {
          calibratedBy: selectedCalibratedBy.value,
          authorizedBy: selectedBranchHead.value,
        };

    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend endpoint to store the data
    const backendURL = `${host}/api/certificate/store-authorized-by/${encodeURIComponent(instrumentName)}/${encodeURIComponent(id)}`;

    axios.post(backendURL, data)
      .then((response) => {
        console.log(response.data);
        toast.success("Data Added Successfully!")
        // Handle success response here if needed
      })
      .catch((error) => {
        console.error(error.response.data);
        // Handle error response here if needed
      });
    }
  };
  return (
    <div>
      <h1>MainTablePage</h1>
      <div className="border-2 border-black grid grid-flow-col gap-2 p-2">
        <label htmlFor="selection">Select Calibration Result:</label>
        <select
          value={isSelected}
          id="selection"
          className="border border-black/30 rounded-sm p-2"
          onChange={tableSelectedChange}
        >
          <option value="" selected>
            Select Calibration Table
          </option>
          <option value="Digital Vernier Caliper">
            Digital Vernier Caliper
          </option>
          <option value="Pressure Transmitter">Pressure Transmitter</option>
          <option value="RPM Indicator">RPM Indicator</option>
          <option value="Timer">Timer</option>
        </select>
      </div>
      <div className="border my-2 ">
        {isSelected === "Digital Vernier Caliper" && (
          <DigitalVernierCaliperTable
            instrumentName={instrumentName}
            id={id}
            fsValue={fsValue}
          />
        )}
        {isSelected === "Pressure Transmitter" && (
          <p>
            <PressureTransmitterTable
              instrumentName={instrumentName}
              id={id}
              fsValue={fsValue}
            />
          </p>
        )}
        {isSelected === "RPM Indicator" && (
          <p>
            <RPMIndicatorTable />
          </p>
        )}
        {isSelected === "Timer" && (
          <p>
            <TimerTable />
          </p>
        )}
      </div>
      
      {/* <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
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
          <button
                    className="border-2 border-black my-2 py-2 w-full bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
                    type="submit"
                  >
                    Submit
            </button>
        </form>
      </div> */}
      <div>
        <Link
          to={`/instrument-certificate/review/${encodeURIComponent(
            isSelected
          )}/${encodeURIComponent(instrumentName)}/${encodeURIComponent(id)}`}
        >
          <button className="border-2 border-black my-2 py-2 w-1/4 bg-pink-500 hover:bg-pink-600 text-[#ffffff] text-bold">
            Review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainTablePage;
