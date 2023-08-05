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
  const [isUpdate, setIsUpdate] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleUpdateInstrument = () => {
    setIsUpdate(!isUpdate);
  };

  // new data ended
  const [fsValue, setFsValue] = useState([]);
  const [unitError, setUnitError] = useState(null);
  const [unitError1, setUnitError1] = useState(null);
  const [unitErrorPer, setUnitErrorPer] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [fetchInstrument1, setFetchInstrument1] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSubmit, setDataSubmit] = useState({});

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

  const handleSubmit1 = (e) => {
    e.preventDefault();
    fetchDeviceData();
  };

  const handleSubmit = (e) => {
    // Ensure both options are selected before sending the data
    if (selectedCalibratedBy && selectedBranchHead) {
      // Create the data object to be sent to the backend
      const data = {
        calibratedBy: selectedCalibratedBy.value,
        authorizedBy: selectedBranchHead.value,
      };

      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend endpoint to store the data
      const backendURL = `${host}/api/certificate/store-authorized-by/${encodeURIComponent(
        instrumentName
      )}/${encodeURIComponent(id)}`;

      axios
        .post(backendURL, data)
        .then((response) => {
          console.log(response.data);
          toast.success("Data Added Successfully!");
          // Handle success response here if needed
        })
        .catch((error) => {
          console.error(error.response.data);
          // Handle error response here if needed
        });
    }
  };

  //

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   fetchDeviceData();

  // };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   for Calibration Resutlt

  // Sending data to backend

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    console.log("Sending result:", results);

    try {
      console.log("Data to send:", results[0]); // Access the first object from the results array
      console.log(`${instrumentName}/${id}`);
      const response = await axios.post(
        `${host}/api/certificate/update-device/${instrumentName}/${id}`,
        results[0] // Send the first object directly
      );
      toast.success("Data Sumitted Successfully");
      setDataSubmit();
      console.log("Response from server:", response.data);
      // Handle the response if needed
    } catch (error) {
      console.error("Something Went wrong");
      console.error("Error while sending data:", error);
      // Handle the error if needed
    }
  };

  // ending of sending data

  const handleDelete = (index) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults.splice(index, 1);
      return updatedResults;
    });
  };

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

        <FetchMasterDetails instrumentName={instrumentName} id={id} />
        <EditInstrumentDetails instrumentName={instrumentName} id={id} />
        <AddRestInstrumentData instrumentName={instrumentName} id={id} />
        <AddAuthorisedSignatory instrumentName={instrumentName} id={id} />

      <div className="my-2 flex justify-end">
        <div className="grid grid-flow-col gap-3">
          <button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
            onClick={handleSubmitSend}
          >
            Submit Data
          </button>
        </div>
      </div>
      <MainTablePage instrumentName={instrumentName} id={id} />
    </div>
  );
};

export default DeviceDetails;
