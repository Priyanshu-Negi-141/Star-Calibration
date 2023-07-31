import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MainTablePage } from "../CalibrationResult/index";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import Select from "react-select";
const DeviceDetails = () => {
  const {host} = useStateContext()
  const { instrumentName, id } = useParams();
  const [data, setData] = useState({
    instrumentName: "",
    idNumber: "",
  });
  const [unitData, setUnitData] = useState([
    {
      unitUnderCal: "",
      standardReading: "",
    },
  ]);
  const [fsValue, setFsValue] = useState([]);
  const [unitError, setUnitError] = useState(null);
  const [unitError1, setUnitError1] = useState(null);
  const [unitErrorPer, setUnitErrorPer] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [fetchInstrument1, setFetchInstrument1] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSubmit, setDataSubmit] = useState({})

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
    }
  
    const handleSubmit = (e) => {
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

    // 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   fetchDeviceData();
    
  // };

  const fetchDeviceData = async() => {
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
  }

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
    console.log('Sending result:', results);
  
    try {
      console.log('Data to send:', results[0]); // Access the first object from the results array
      console.log(`${instrumentName}/${id}`)
      const response = await axios.post(
        `${host}/api/certificate/update-device/${instrumentName}/${id}`,
        results[0], // Send the first object directly
      );
      toast.success("Data Sumitted Successfully")
      setDataSubmit()
      console.log('Response from server:', response.data);
      // Handle the response if needed
    } catch (error) {
      console.error("Something Went wrong")
      console.error('Error while sending data:', error);
      // Handle the error if needed
    }
    handleSubmit()
    
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

      <div className="flex gap-3">
        <p>Selected Instrument Name:</p>
        <p className="text-bold">{instrumentName}</p>
        <p>Id:</p>
        <p className="text-bold">{id}</p>
      </div>
      <div className="">
        <div className="grid gap-3 grid-cols-3">
          <div className="border-2 border-black p-2 my-3">
            <div className="border border-black text-center text-bold p-2">
              <h2>Select Supporting Devices Details</h2>
            </div>
            <form onSubmit={handleSubmit1}>
              <div className="">
                <label htmlFor="instrumentName">Instrument Name:</label>
                <input
                  type="text"
                  id="instrumentName"
                  name="instrumentName"
                  value={data.instrumentName}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <br />
              </div>
              <div>
                <label htmlFor="idNumber">ID Number:</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={data.idNumber}
                  onChange={handleInputChange}
                  required
                />
                <br />
                <br />
              </div>
              <button
                className="border border-black py-2 w-full text-[#fff] text-bold bg-[#F1C93B] hover:bg-[#FBD85D]"
                type="submit"
              >
                Fetch Data
              </button>
            </form>
          </div>
          
          

          <div className="col-span-2 border border-black">
            <div className="overflow-y-auto h-72">
              {results && (
                <div>
                  {results.map((item, index) => (
                    <div key={index}>
                      <div className="grid place-items-end mt-3">
                        <div className="w-1/6">
                          <button
                            className="border border-black py-2 w-full text-[#fff] text-bold bg-[#FE0000] hover:bg-[#e30f0f]"
                            onClick={() => handleDelete(index)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <div className="bg-white border my-3 border-gray-300 rounded shadow-lg p-4">
                          <div className="grid grid-cols-2 border-y-2 border-black text-white gap-4 bg-blue-900 border">
                            <p className="col-span-1 p-1 text-bold flex items-center">
                              Nomenclature
                            </p>
                            <p className="flex items-center ">
                              {item.instrument_name}
                            </p>
                          </div>
                          <div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">Make</p>

                              <p className="border p-1">{item.make_model}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">Serial No.</p>

                              <p className="border p-1 ">
                                {item.serial_number}
                              </p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">Id No.</p>

                              <p className="border p-1 ">{item.id_number}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">Range</p>

                              <p className="border p-1">{item.range}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">
                                Least Count
                              </p>

                              <p className="border p-1 ">{item.least_count}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">Accuracy</p>

                              <p className="border p-1 ">{item.accuracy}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">
                                Certificate No.
                              </p>

                              <p className="border p-1 ">{item.cf_number}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">
                                Next Due Date
                              </p>

                              <p className="border p-1">{item.due_date}</p>
                            </div>
                            <div className="border grid grid-cols-2">
                              <p className="font-bold p-1 border">
                                Tracability
                              </p>

                              <p className="border p-1">{item.traceability}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {error && <p>Error: {error}</p>}
            </div>
          </div>
        </div>
        <div>
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
          {/* <button
                    className="border-2 border-black my-2 py-2 w-full bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
                    type="submit"
                  >
                    Submit
            </button> */}
        </form>
      </div>
      </div>

      <div>
            <button className="border-2 border-black my-2 py-2 w-full bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold" onClick={handleSubmitSend}>Submit Data</button>
      </div>
      <MainTablePage instrumentName= {instrumentName} id= {id} />
      
      
    </div>
  );
};

export default DeviceDetails;
