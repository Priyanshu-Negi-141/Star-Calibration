import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddInstrumentDetails = () => {
  const { clientName, id } = useParams();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState([]);
  const [instrument, setInstrument] = useState({
    instrument_name: "",
    serial_number: "",
    make_model: "",
    id_number: "",
    range: "",
    accuracy: "",
    least_count: "",
    visual_inspection: "",
    calibrate_at: "",
    zero_error: "",
    calibration_date: "",
    valid_date: "",
    location: "",
  });
  const [fetchInstrument, setFetchInstrument] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstrument((prevInstrument) => ({
      ...prevInstrument,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchInstrumentData();
  }, []);

  useEffect(() => {
    fetchUnitParameterDetails();
  }, []);

  const fetchUnitParameterDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/unitParameter/unitParameterDetails");
      const unitParameters = response.data.map(
        (option) => option.unitParameterDetails
      );
      setMatchingOptions(unitParameters);
    } catch (error) {
      console.error("Error retrieving unit parameters:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredOptions = matchingOptions.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setMatchingOptions(filteredOptions);
  };

  const handleOptionSelect = (value) => {
    setInputValue(value);
    setMatchingOptions([]);
  };

  const fetchInstrumentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/certificate/instrument-data/${encodeURIComponent(
          clientName
        )}/${encodeURIComponent(id)}`
      );
      setFetchInstrument(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formInstrument = {
        instrument_name: instrument.instrument_name,
        serial_number: instrument.serial_number,
        make_model: instrument.make_model,
        id_number: instrument.id_number,
        range: instrument.range,
        accuracy: instrument.accuracy,
        least_count: instrument.least_count,
        visual_inspection: instrument.visual_inspection,
        calibrate_at: instrument.calibrate_at,
        zero_error: instrument.zero_error,
        calibration_date: instrument.calibration_date,
        valid_date: instrument.valid_date,
        location: instrument.location,
      };

      await axios.post(
        `http://localhost:8000/api/certificate/update-instrument/${encodeURIComponent(
          clientName
        )}/${encodeURIComponent(id)}`,
        {
          instrument: formInstrument,
        }
      );
      console.log("Instrument details added successfully");
      fetchInstrumentData();
      toast.success("Instrument added Successfully!");
      setInstrument({
        instrument_name: "",
        serial_number: "",
        make_model: "",
        id_number: "",
        range: "",
        accuracy: "",
        least_count: "",
        visual_inspection: "",
        calibrate_at: "",
        zero_error: "",
        calibration_date: "",
        valid_date: "",
        location: "",
      });
    } catch (error) {
      toast.error("Somthing Wrong! Please try again");
      console.error("Error adding instrument details:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 underline justify-center items-center border-2 border-black my-3 p-2">
        <h2 className="text-bold uppercase">Client Name:</h2>
        <p>{clientName}</p>
      </div>
      <div className="border-2 p-2 text-center text-bold border-black ">
        <h1>Instrument Details</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-2 border-2 border-black my-3 grid md:grid-cols-3 gap-3 sm:grid-flow-row">
          <label>
            Instrument Name:
            <input
              type="text"
              name="instrument_name"
              value={instrument.instrument_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Serial Number:
            <input
              type="text"
              name="serial_number"
              value={instrument.serial_number}
              onChange={handleChange}
            />
          </label>
          <label>
            Make Model:
            <input
              type="text"
              name="make_model"
              value={instrument.make_model}
              onChange={handleChange}
            />
          </label>
          <label>
            ID Number:
            <input
              type="text"
              name="id_number"
              value={instrument.id_number}
              onChange={handleChange}
            />
          </label>
          <div className="grid gap-2 grid-cols-3">
            <div className="col-span-2">
              <label>
                Range:
                <input
                  type="text"
                  name="range"
                  value={instrument.range}
                  onChange={handleChange}
                />
              </label>
            </div>
            {/* <div className="grid place-items-end">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type here..."
                  className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                />
                {matchingOptions.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto">
                    {matchingOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {console.log(`${option.unitParameterDetails[0].parameter_symbol}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div> */}
          </div>

          <label>
            Accuracy:
            <input
              type="text"
              name="accuracy"
              value={instrument.accuracy}
              onChange={handleChange}
            />
          </label>
          <label>
            Least Count:
            <input
              type="text"
              name="least_count"
              value={instrument.least_count}
              onChange={handleChange}
            />
          </label>
          <label>
            Visual Inspection:
            <input
              type="text"
              name="visual_inspection"
              value={instrument.visual_inspection}
              onChange={handleChange}
            />
          </label>
          <label>
            Calibrate At:
            <select
              name="calibrate_at"
              className="border border-black/25 shadow-sm w-full rounded-sm p-2"
              value={instrument.calibrate_at}
              onChange={handleChange}
            >
              <option value="" selected>
                None
              </option>
              <option value="Site">Site</option>
              <option value="Office">Office</option>
            </select>
          </label>
          <label>
            Zero Error:
            <input
              type="text"
              name="zero_error"
              value={instrument.zero_error}
              onChange={handleChange}
            />
          </label>
          <label>
            Calibration Date:
            <input
              type="date"
              name="calibration_date"
              value={instrument.calibration_date}
              onChange={handleChange}
            />
          </label>
          <label>
            Valid Up To:
            <input
              type="date"
              name="valid_date"
              value={instrument.valid_date}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={instrument.location}
              onChange={handleChange}
            />
          </label>

          <br />
        </div>
        <div className="flex justify-end">
          <div className=" w-1/5 text-center cursor-pointer hover:bg-green-900 hover:text-white/75 text-bold bg-green-800 text-white border border-black">
            <button className="w-full py-2" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5 p-2 border-2 text-center text-bold border-black">
        <h2>Added Instrument List</h2>
      </div>
      <div className="my-2 border-2 border-black sm:overflow-x-scroll md:overflow-none">
        <table className="w-full">
          <thead className="border-2 border-black">
            <th>Sr. No</th>
            <th>Certificate Number</th>
            <th>Instrument Name</th>
            <th>Serial No</th>
            <th>Make/Model</th>
            <th>ID number</th>
            <th>Location</th>
          </thead>
          {fetchInstrument.map((item, index) => {
            return (
              <tbody key={item.index}>
                <td>{index + 1}</td>
                <td>{item.instrument.certificateNumber}</td>
                <td>
                  <Link to={`/device-details/${encodeURIComponent(item.instrument.instrument_name)}/${encodeURIComponent(item._id)}`} >
                      {item.instrument.instrument_name}
                  </Link>
                </td>
                <td>{item.instrument.serial_number}</td>
                <td>{item.instrument.make_model}</td>
                <td>{item.instrument.id_number}</td>
                <td>{item.instrument.location}</td>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default AddInstrumentDetails;
