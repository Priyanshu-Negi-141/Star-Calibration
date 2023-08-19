import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MainTablePage } from "../CalibrationResult/index";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import Select from "react-select";
import { EditInstrumentDetails } from "../CalibrationResult/Tabels/EditDetails";
import {
  AddAuthorisedSignatory,
  AddRestInstrumentData,
  FetchMasterDetails,
} from "./DeviceDataContent";
const DeviceDetails = () => {
  const { host } = useStateContext();
  const { instrumentName, id } = useParams();
  const [submittedForms, setSubmittedForms] = useState()
  const [data, setData] = useState({
    instrumentName: "",
    idNumber: "",
  });
  const [formData, setFormData] = useState({
    certificateNumber: "",
    instrument_name: "",
    calibrate_at: "",
  });
  const [unitData, setUnitData] = useState([
    {
      unitUnderCal: "",
      standardReading: "",
    },
  ]);

  // new data added

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/api/certificate/instrument-data1/${instrumentName}/${id}`
        );
        setFormData(response.data.instrument);
        console.log(response.data.instrument);
      } catch (error) {
        console.error("Error", error.response.data);
      }
    };
    fetchData();
  }, []);

  // new data ended
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSubmit, setDataSubmit] = useState({});

  const [calibratedByOptions, setCalibratedByOptions] = useState([]);
  const [branchHeadOptions, setBranchHeadOptions] = useState([]);
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


  const fetchDeviceData = async () => {
    try {
      const response = await axios.post(
        `${host}/api/certificate/fetch-data`,
        data
      );
      if (response.status === 200) {
        const fetchedData = response.data;
        setResults((prevResults) =>
          prevResults ? [...prevResults, fetchedData] : [fetchedData]
        );
        setError(null);
        setData({
          instrumentName: "",
          idNumber: "",
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred");
    }
  };


  // Sending data to backend

  // const handleSubmitSend = async (e) => {
  //   e.preventDefault();
  //   console.log("Sending result:", results);

  //   try {
  //     console.log("Data to send:", results[0]); // Access the first object from the results array
  //     console.log(`${instrumentName}/${id}`);
  //     const response = await axios.post(
  //       `${host}/api/certificate/update-device/${instrumentName}/${id}`,
  //       results[0] // Send the first object directly
  //     );
  //     toast.success("Data Sumitted Successfully");
  //     setDataSubmit();
  //     console.log("Response from server:", response.data);
  //     // Handle the response if needed
  //   } catch (error) {
  //     console.error("Something Went wrong");
  //     console.error("Error while sending data:", error);
  //     // Handle the error if needed
  //   }
  // };

  const handleSubmit = async () => {

  }

  // ending of sending data

  useEffect(() => {
    // Reset the form fields when the component mounts or when the instrument ID changes
    setData({
      instrumentName: "",
      serialNumber: "",
    });
  }, [id]);

  return (
    <div>
      {/* <Route path='/device-details/:instrumentName/:id' element={<DeviceDetails />}/> */}

        <EditInstrumentDetails instrumentName={instrumentName} id={id} />
        <AddRestInstrumentData instrumentName={instrumentName} id={id} />
        <FetchMasterDetails instrumentName={instrumentName} id={id} />
        <AddAuthorisedSignatory instrumentName={instrumentName} id={id} />
        <MainTablePage instrumentName={instrumentName} id={id} />
      <div className="my-2 flex justify-end">
        <div className="grid grid-flow-col gap-3">
          <button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
            onClick={handleSubmit}
          >
            Submit Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
