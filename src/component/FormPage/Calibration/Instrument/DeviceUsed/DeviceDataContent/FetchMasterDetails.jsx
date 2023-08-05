import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../../../../contexts/ContextProvider";
import Select from "react-select";
import { toast } from "react-toastify";

const FetchMasterDetails = (props) => {
    const {instrumentName, id} = props
  const { host } = useStateContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [dataSubmit, setDataSubmit] = useState({});
  const [data, setData] = useState({
    instrumentName: "",
    idNumber: "",
  });

  const [instrumentNames, setInstrumentNames] = useState([]);

  const fetchInstrumentNames = async (schema) => {
    try {
      const response = await axios.get(
        `${host}/api/certificate/instrument-names/${schema}`
      );
      if (response.status === 200) {
        setInstrumentNames(response.data.instrumentNames);

        // Automatically fill ID number if there's only one instrument name available
        if (response.data.instrumentNames.length === 1) {
          setData((prevData) => ({
            ...prevData,
            instrumentName: response.data.instrumentNames[0],
          }));
          fetchDeviceData(); // Fetch data automatically
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeviceData = async () => {
    try {
      const response = await axios.post(`${host}/api/certificate/fetch-data`, {
        ...data,
        selectedOption,
      });
      if (response.status === 200) {
        const fetchedData = response.data;
        setResults((prevResults) =>
          prevResults ? [...prevResults, fetchedData] : [fetchedData]
        );
        setError(null);
        setData({
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

  const handleSubmit1 = async(e) => {
    e.preventDefault();
    await fetchDeviceData();
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "instrumentName") {
      try {
        // Fetch instrument ID based on selected device type and instrument name
        const response = await fetch(
          `${host}/api/certificate/instrument-id/${selectedOption}/${value}`
        ); // Replace with your actual API endpoint
        const responseData = await response.json();
        setData((prevData) => ({
          ...prevData,
          idNumber: responseData.instrumentId,
        }));
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };


//   submiting data

const handleSubmitSend = async (e) => {
    e.preventDefault();
    if (results.length === 0) {
      toast.error("No data to submit");
      return;
    }
  
    try {
      console.log("Sending result:", results[0]);
  
      const response = await axios.post(
        `${host}/api/certificate/update-device/${encodeURIComponent(id)}`,
        {
          deviceData: results[0],
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header
          },
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        console.log("Response from server:", response.data.message);
        // Handle the response if needed
      } else {
        toast.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      toast.error("An error occurred while submitting data");
      // Handle the error if needed
    }
  };
  
  


// submiting data ends

  const handleDelete = (index) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults.splice(index, 1);
      return updatedResults;
    });
  };
  return (
    <div>
      <div className="grid grid-cols-3 font-bold gap-2">
        <div className="">
          <div className="border border-black text-center text-bold p-2">
            <h2>Select Supporting Devices Details</h2>
          </div>

          <form onSubmit={handleSubmit1}>
            <div className="grid gap-1.5">
              <div>
                <label htmlFor="deviceType">Device Type: </label>
                <Select
                  onChange={(option) => {
                    setSelectedOption(option.value);
                    fetchInstrumentNames(option.value); // Fetch instrument names based on selected schema
                  }}
                  options={[
                    { value: "calibration", label: "Calibration" },
                    { value: "hvac", label: "HVAC" },
                    { value: "thermal", label: "Thermal" },
                  ]}
                />
              </div>
              <div className="">
                <label htmlFor="instrumentName">Instrument Name:</label>
                <Select
                  // ... (other props)
                  options={instrumentNames.map((name) => ({
                    value: name,
                    label: name,
                  }))}
                  onChange={(option) => {
                    handleInputChange({
                      target: { name: "instrumentName", value: option.value },
                    });
                  }}
                />
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
              </div>
              <button
                className="border border-black py-2 w-full text-[#fff] text-bold bg-[#F1C93B] hover:bg-[#FBD85D]"
                type="submit"
              >
                Fetch Data
              </button>
            </div>
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

                            <p className="border p-1 ">{item.serial_number}</p>
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
                            <p className="font-bold p-1 border">Least Count</p>

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
                            <p className="font-bold p-1 border">Tracability</p>

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
      <div className="grid grid-flow-row m-2">
        <button className=" border border-black p-2 px-5 w-1/4 font-bold" onClick={handleSubmitSend}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FetchMasterDetails;
