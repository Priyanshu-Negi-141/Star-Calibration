import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../../../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import Select from "react-select";

const EditInstrumentDetails = (props) => {
  const { instrumentName, id , onFormSubmit } = props;
  const { host } = useStateContext();
  const [frontRange, setFrontRange] = useState("");
  const [lastRange, setLastRange] = useState("");
  const [parameterOptions, setParameterOptions] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [formData, setFormData] = useState({
    certificateNumber: "",
    instrument_name: "",
    serial_number: "",
    selectRange: "",
    make_model: "",
    id_number: "",
    accuracy: "",
    least_count: "",
    calibrate_at: "",
  });

  //   Using for fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/api/certificate/instrument-data1/${instrumentName}/${id}`
        );

        // Split the range value to extract parts
        const rangeParts = response.data.instrument.range.split(" ");
        setFrontRange(rangeParts[0]);
        setLastRange(rangeParts[2]);
        // Assuming you have the value for selectedParameter, set it here
        const selectedParamValue = rangeParts[3];
        setSelectedParameter(selectedParamValue);

        const parameterNamesResponse = await fetch(
          `${host}/api/unitParameter/parameterName`
        );
        if (parameterNamesResponse.ok) {
          const data = await parameterNamesResponse.json();
          setParameterOptions(
            data.parameterNames.map((parameterName) => ({
              value: parameterName,
              label: parameterName,
            }))
          );
        } else {
          console.error("Failed to fetch parameter names");
        }

        setFormData(response.data.instrument);
        console.log(response.data.instrument);
      } catch (error) {
        console.error("Error", error.response.data);
      }
    };
    fetchData();
  }, []);
  //  fetching data ends

  // for changing value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //   Parameter Data Start
  const handleSelectionChange = (selectedParameter) => {
    setSelectedParameter(selectedParameter);
  };

  // Parameter Data ends

  //   changing value ends

  // handle Submit all

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    try {
      // Handle the main form data
      const mainResponse = await axios.put(
        `${host}/api/certificate/instrument-data1/${encodeURIComponent(instrumentName)}/${encodeURIComponent(id)}`,
        formData
      );
  
      let rangeResponse;
  
      // Handle the range form data only if the required fields are provided
      if (formData.selectRange && (formData.selectRange === "As per Instrument" || formData.selectRange === "Range")) {
        let range = "";
        let fs = "";
        let accuracy = "";
        if (formData.selectRange === "As per Instrument") {
          range = "As Per Instrument";
          fs = "N/A";
          accuracy = "As Per Range";
        } else if (formData.selectRange === "Range") {
          range = `${frontRange} to ${lastRange} ${selectedParameter.value}`;
          fs = lastRange - frontRange;
          accuracy = formData.accuracy;
        }
        
        rangeResponse = await axios.put(
          `${host}/api/certificate/instrument-data2/${instrumentName}/${id}`,
          {
            range: range,
            fs: fs,
            accuracy: accuracy,
          }
        );
      }
  
      if (mainResponse.status === 200 && (!rangeResponse || rangeResponse.status === 200)) {
        toast.success("Updated Successfully");
      } else {
        console.error("Error updating data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // You can show an error message to the user
    }
  };
  

  // handle submit all ends

  return (
    <div className="p-2 bg-[#afc0ca]">
      <div className="border border-black p-2 font-bold text-center mb-2">
        <h1>Instrument Detail's</h1>
      </div>
      
      <form onSubmit={handleSubmitAll}>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 ">
            <div>
              <label htmlFor="certificateNumber">Certificate Number</label>
              <input
                type="text"
                name="certificateNumber"
                id="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <label htmlFor="instrument-name">Instrument Name</label>
              <input
                type="text"
                name="instrument_name"
                id="instrument-name"
                value={formData.instrument_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="serial_number">Serial Number</label>
              <input
                type="text"
                name="serial_number"
                id="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="make_model">Make Model</label>
              <input
                type="text"
                name="make_model"
                id="make_model"
                value={formData.make_model}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="id_number">ID Number</label>
              <input
                type="text"
                name="id_number"
                id="id_number"
                value={formData.id_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="least_count">Least Count</label>
              <input
                type="text"
                name="least_count"
                id="least_count"
                value={formData.least_count}
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <label htmlFor="calibrate_at">Calibrate At</label>
              <input
                type="text"
                name="calibrate_at"
                id="calibrate_at"
                value={formData.calibrate_at}
                onChange={handleChange}
              />
            </div> */}
            <div>
              <label htmlFor="calibrate_at">Calibrate At</label>
              <select
                type="text"
                name="calibrate_at"
                id="calibrate_at"
                className="border border-black/25 shadow-sm w-full rounded-sm p-2"
                value={formData.calibrate_at}
                onChange={handleChange}
              >
                <option value="Site">Site</option>
                <option value="Lab">Lab</option>
              </select>
            </div>

          </div>
          {/* <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
            >
              Update Data
            </button>
          </div> */}
        </form>
        <form>
          <div>
            {/* range data start  */}
            <div className="">
              <label htmlFor="range">Range:</label>
              <select
                value={formData.selectRange}
                className="border border-black/25 shadow-sm w-full rounded-sm p-2"
                name="selectRange"
                onChange={handleChange}
                id="range"
              >
                <option value="" selected>
                  Select Range
                </option>
                <option value="As per Instrument">As per instrument</option>
                <option value="Range">Range</option>
              </select>
            </div>
            {formData.selectRange === "As per Instrument" && (
              <div>
                <label>Accuracy:</label>
                <input
                  type="text"
                  name="accuracy"
                  value="As Per Range"
                  onChange={handleChange}
                  readOnly
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {formData.selectRange === "Range" && (
                <div>
                  <label htmlFor="">Enter Range</label>
                  <div className="grid grid-flow-col place-items-center gap-2">
                    <input
                      type="number"
                      name="frontRange"
                      value={frontRange}
                      onChange={(e) => setFrontRange(e.target.value)}
                    />
                    <p>to</p>
                    <input
                      type="number"
                      name="lastRange"
                      value={lastRange}
                      onChange={(e) => setLastRange(e.target.value)}
                    />
                    <div>
                      <Select
                        className="w-28"
                        value={selectedParameter}
                        onChange={handleSelectionChange}
                        options={parameterOptions}
                        isSearchable={true}
                        placeholder="Parameter"
                      />
                    </div>
                  </div>
                </div>
              )}
              {formData.selectRange === "Range" && (
                <div>
                  <label>Accuracy:</label>
                  <input
                    type="text"
                    name="accuracy"
                    value={formData.accuracy}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            {/* Range data ends */}
          </div>
        </form>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
          >
            Update Data
          </button>
        </div>
      </form>
      {/* <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
          >
            Update Data
          </button>
        </div> */}
    </div>
  );
};

export default EditInstrumentDetails;
