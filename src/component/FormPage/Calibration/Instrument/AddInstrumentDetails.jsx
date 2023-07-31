import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import moment from 'moment'
import { useStateContext } from "../../../../contexts/ContextProvider";


const AddInstrumentDetails = () => {
  const {host} = useStateContext()
  const { clientName, id } = useParams();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState([]);
  const [instrument, setInstrument] = useState({
    instrument_name: "",
    serial_number: "",
    make_model: "",
    id_number: "",
    front_range: "",
    last_range: "",
    accuracy: "",
    least_count: "",
    visual_inspection: "",
    calibrate_at: "",
    decipline: "",
    zero_error: "",
    calibration_date: "",
    valid_date: "",
    location: "",
    temperature: "",
    relative_humidity: "",
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
      const response = await axios.get(
        `${host}/api/unitParameter/unitParameterDetails`
      );
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
        `${host}/api/certificate/instrument-data/${encodeURIComponent(
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
      let temperatureValue = "";
      let humidityValue = "";
      let calProcedure = "";
      let supportingStandards = "";
      let range = "";
      let fs = "";
      let Accuracy = "";
      let calibrationDate = moment(instrument.calibration_date, "YYYY-MM-DD").format("DD/MM/YYYY")
      let validDate = moment(instrument.valid_date, "YYYY-MM-DD").format("DD/MM/YYYY")
      if (instrument.selectRange === "As per Instrument") {
        range = "As Per Instrument";
        fs = "N/A";
        Accuracy = "As Per Range";
      } else if (instrument.selectRange === "Range") {
        range = `${instrument.front_range} to ${instrument.last_range} ${selectedParameter.value}`;
        fs = instrument.last_range - instrument.front_range;
        Accuracy = instrument.accuracy;
      }
      if (instrument.calibrate_at === "Site") {
        temperatureValue = "25 ± 15";
        humidityValue = "50 ± 20";
      } else if (instrument.calibrate_at === "Lab") {
        if (instrument.lab_option === "Electro") {
          temperatureValue = "25 ± 4";
          humidityValue = "30 to 75";
        } else if (instrument.lab_option === "Thermal") {
          temperatureValue = "25 ± 4";
          humidityValue = "30 to 75";
        } else if (instrument.lab_option === "Mech (Mass)") {
          temperatureValue = "25 ± 2";
          humidityValue = "50 ±1 0";
        } else if (instrument.lab_option === "Mech (Volumn)") {
          temperatureValue = "25 ± 3";
          humidityValue = "50 ± 10";
        } else if (instrument.lab_option === "Mech (Pressure)") {
          temperatureValue = "23 ± 1.5";
          humidityValue = "50 ± 10";
        } else if (instrument.lab_option === "Mech (Dimension)") {
          temperatureValue = "20 ± 2";
          humidityValue = "50 ± 10";
        }
      }

      if (instrument.decipline === "Electro") {
        calProcedure = selectedEleSopNumber.value;
        supportingStandards = eleSopIs;
      } else if (instrument.decipline === "Thermal") {
        calProcedure = selectedTheSopNumber.value;
        supportingStandards = theSopIs;
        console.log(calProcedure,supportingStandards)
      } else if (instrument.decipline === "Mechanical") {
        calProcedure = selectedMechSopNumber.value;
        supportingStandards = mechSopIs;
      }

      const formInstrument = {
        instrument_name: instrument.instrument_name,
        serial_number: instrument.serial_number,
        make_model: instrument.make_model,
        id_number: instrument.id_number,
        range: range,
        fs: fs,
        accuracy: Accuracy,
        least_count: instrument.least_count,
        visual_inspection: instrument.visual_inspection,
        calibrate_at: instrument.calibrate_at,
        temperature: temperatureValue,
        relative_humidity: humidityValue,
        cal_procedure: calProcedure,
        supporting_standards: supportingStandards,
        zero_error: instrument.zero_error,
        calibration_date: calibrationDate,
        valid_date: validDate,
        location: instrument.location,
      };

      await axios.post(
        `${host}/api/certificate/update-instrument/${encodeURIComponent(
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
        front_range: "",
        last_range: "",
        accuracy: "",
        least_count: "",
        visual_inspection: "",
        calibrate_at: "",
        temperature: "",
        selectRange: "",
        selectedParameter: "",
        decipline: "",
        cal_procedure: "",
        supporting_standards: "",
        relative_humidity: "",
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

  // SOP Number Electro fetch
  const [sopNumbers, setSopNumbers] = useState([]);
  const [eleSopNumbers, setEleSopNumbers] = useState([]);
  const [theSopNumbers, setTheSopNumbers] = useState([]);
  const [mechSopNumbers, setMechSopNumbers] = useState([]);
  const [selectedEleSopNumber, setSelectedEleSopNumber] = useState("");
  const [selectedTheSopNumber, setSelectedTheSopNumber] = useState("");
  const [selectedMechSopNumber, setSelectedMechSopNumber] = useState("");
  const [eleSopIs, setEleSopIs] = useState("");
  const [theSopIs, setTheSopIs] = useState("");
  const [mechSopIs, setMechSopIs] = useState("");

  useEffect(() => {
    // Fetch SOP numbers
    fetchElectroData();
    fetchThermalData();
    fetchMechanicalData();
  }, []);

  const fetchElectroData = () => {
    fetch(`${host}/api/sop/eleSopNumber`)
      .then((response) => response.json())
      .then((data) => {
        setEleSopNumbers(data.sopNumber);
      })
      .catch((error) => console.error(error));
  };

  const fetchMechanicalData = () => {
    fetch(`${host}/api/sop/mechSopNumber`)
      .then((response) => response.json())
      .then((data) => {
        setMechSopNumbers(data.sopNumber);
      })
      .catch((error) => console.error(error));
  };

  const fetchThermalData = () => {
    fetch(`${host}/api/sop/theSopNumber`)
      .then((response) => response.json())
      .then((data) => {
        setTheSopNumbers(data.sopNumber);
      })
      .catch((error) => console.error(error));
  };

  const handleElectroSopNumberChange = (selectedEleSopNumber) => {
    const selected = selectedEleSopNumber.value;
    setSelectedEleSopNumber(selectedEleSopNumber);

    // Fetch SOP name based on selected SOP number
    fetch(
      `${host}/api/sop/eleSopNumber/${encodeURIComponent(
        selected
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setEleSopIs(data.isNumber);
      })
      .catch((error) => console.error(error));
  };

  const handleMechSopNumberChange = (selectedNumber) => {
    const selected = selectedNumber.value;
    setSelectedMechSopNumber(selectedNumber);
    
    // Fetch SOP name based on selected SOP number
    fetch(
      `${host}/api/sop/mechSopNumber/${encodeURIComponent(
        selected
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMechSopIs(data.isNumber);
      })
      .catch((error) => console.error(error));
  };

  const handleThermalSopNumberChange = (selectedTheSopNumber) => {
    const selected = selectedTheSopNumber.value;
    setSelectedTheSopNumber(selectedTheSopNumber);
    console.log(selectedTheSopNumber)

    // Fetch SOP name based on selected SOP number
    fetch(
      `${host}/api/sop/theSopNumber/${encodeURIComponent(
        selected
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTheSopIs(data.isNumber);
      })
      .catch((error) => console.error(error));
  };

  // SOP Number Electro Fetch End

  // Parameter Fetching

  const [parameterNames, setParameterNames] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);

  useEffect(() => {
    const fetchParameterNames = async () => {
      try {
        const response = await fetch(
          `${host}/api/unitParameter/parameterName`
        );
        if (response.ok) {
          const data = await response.json();
          setParameterNames(data.parameterNames);
        } else {
          console.error("Failed to fetch parameter names");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParameterNames();
  }, []);

  const handleSelectionChange = (selectedParameter) => {
    setSelectedParameter(selectedParameter);
  };

  // Paremater Ending

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
          <div>
            <label>Instrument Name:</label>
            <input
              type="text"
              name="instrument_name"
              value={instrument.instrument_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Serial Number:</label>
            <input
              type="text"
              name="serial_number"
              value={instrument.serial_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Make Model:</label>
            <input
              type="text"
              name="make_model"
              value={instrument.make_model}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ID Number:</label>
            <input
              type="text"
              name="id_number"
              value={instrument.id_number}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label>Range:</label>
            <select
              value={instrument.selectRange}
              className="border border-black/25 shadow-sm w-full rounded-sm p-2"
              name="selectRange"
              onChange={handleChange}
              id=""
            >
              <option value="" selected>
                Select Range
              </option>
              <option value="As per Instrument">As per instrument</option>
              <option value="Range">Range</option>
            </select>
          </div>
          {instrument.selectRange === "As per Instrument" && (
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
          {instrument.selectRange === "Range" && (
            <div>
              <label htmlFor="">Enter Range</label>
              <div className="grid grid-flow-col gap-2">
                <input
                  type="text"
                  name="front_range"
                  value={instrument.front_range}
                  onChange={handleChange}
                />
                <p>to</p>
                <input
                  type="text"
                  name="last_range"
                  value={instrument.last_range}
                  onChange={handleChange}
                />
                <div>
                  <Select
                    className="w-28"
                    value={selectedParameter}
                    onChange={handleSelectionChange}
                    options={parameterNames.map((parameterName) => ({
                      value: parameterName,
                      label: parameterName,
                    }))}
                    isSearchable={true}
                    placeholder="Parameter"
                  />
                </div>
              </div>
            </div>
          )}
          {instrument.selectRange === "Range" && (
            <div>
              <label>Accuracy:</label>
              <input
                type="text"
                name="accuracy"
                value={instrument.accuracy}
                onChange={handleChange}
              />
            </div>
          )}

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

          <div>
            <label>Least Count:</label>
            <input
              type="text"
              name="least_count"
              value={instrument.least_count}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Visual Inspection:</label>
            <input
              type="text"
              name="visual_inspection"
              value={instrument.visual_inspection}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Zero Error:</label>
            <input
              type="text"
              name="zero_error"
              value={instrument.zero_error}
              onChange={handleChange}
            />
          </div>
          <br />
        </div>
        {/* Calibration Field Add */}
        <div className="grid grid-cols-3 gap-3 border-2 border-black p-2">
          <div className="border-2 col-span-2 border-black p-2">
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
                <option value="Lab">Lab</option>
              </select>
            </label>

            {instrument.calibrate_at === "Site" && (
              <div className="grid grid-flow-col gap-3 mt-3">
                <label>
                  Temperature:
                  <input
                    type="text"
                    name="temperature"
                    value="25 &#177; 15"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Humidity:
                  <input
                    type="text"
                    name="relative_humidity"
                    value="50 &#177; 20"
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}
            {instrument.calibrate_at === "Lab" && (
              <div>
                <label>
                  Select an option:
                  <select
                    name="lab_option"
                    className="border border-black/25 shadow-sm w-full rounded-sm p-2"
                    value={instrument.lab_option}
                    onChange={handleChange}
                  >
                    <option value="" selected>
                      None
                    </option>
                    <option value="Electro">Electro</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Mech (Mass)">Mech (Mass)</option>
                    <option value="Mech (Volumn)">Mech (Volumn)</option>
                    <option value="Mech (Pressure)">Mech (Pressure)</option>
                    <option value="Mech (Dimension)">Mech (Dimension)</option>
                  </select>
                </label>
                {instrument.lab_option && (
                  <div>
                    {instrument.lab_option === "Electro" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 4"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="30 to 75"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                    {instrument.lab_option === "Thermal" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 4"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="30 to 75"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                    {instrument.lab_option === "Mech (Mass)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 2"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                    {instrument.lab_option === "Mech (Volumn)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 3"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                    {instrument.lab_option === "Mech (Pressure)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="23 &#177; 1.5"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                    {instrument.lab_option === "Mech (Dimension)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <label>
                          Temperature:
                          <input
                            type="text"
                            name="temperature"
                            value="20 &#177; 2"
                            onChange={handleChange}
                          />
                        </label>
                        <label>
                          Humidity:
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-3 gap-3 my-3">
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
            </div>
          </div>
          <div className="border-2 border-black p-2">
            <label>
              Select Decipline:
              <select
                name="decipline"
                className="border border-black/25 shadow-sm w-full rounded-sm p-2"
                value={instrument.decipline}
                onChange={handleChange}
              >
                <option value="" selected>
                  None
                </option>
                <option value="Electro">Electro</option>
                <option value="Thermal">Thermal</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </label>
            {instrument.decipline && (
              <div>
                {instrument.decipline === "Electro" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-row gap-3">
                      <div className="row-span-1">
                        <label htmlFor="">Calibration Procedure:</label>
                        <Select
                          value={selectedEleSopNumber}
                          onChange={handleElectroSopNumberChange}
                          options={eleSopNumbers.map((eleSopNumber) => ({
                            value: eleSopNumber,
                            label: eleSopNumber,
                          }))}
                          isSearchable={true}
                          placeholder="Parameter"
                        />
                        
                        {/* <select
                          className="border border-black/25 w-full rounded-sm p-2"
                          value={selectedEleSopNumber}
                          onChange={handleElectroSopNumberChange}
                        >
                          <option value="" selected>
                            Select SOP Number
                          </option>
                          {eleSopNumbers.map((eleSopNumber) => (
                            <option
                              key={eleSopNumber}
                              name="eleSopNumber"
                              value={eleSopNumber}
                            >
                              {eleSopNumber}
                            </option>
                          ))}
                        </select> */}
                      </div>
                      <div className="row-span-1 w-full ">
                        <label htmlFor="supp_stand">Supporting Standards</label>
                        <input
                          type="text"
                          id="supp_stand"
                          name="eleSopIs"
                          value={eleSopIs}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
                {instrument.decipline === "Thermal" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-row gap-3">
                      <div className="row-span-1">
                        <label htmlFor="">Calibration Procedure:</label>
                        <Select
                          value={selectedTheSopNumber}
                          onChange={handleThermalSopNumberChange}
                          options={theSopNumbers.map((theSopNumber) => ({
                            value: theSopNumber,
                            label: theSopNumber,
                          }))}
                          isSearchable={true}
                          placeholder="Parameter"
                        />
                        {/* <select
                          className="border border-black/25 w-full rounded-sm p-2"
                          value={selectedTheSopNumber}
                          onChange={handleThermalSopNumberChange}
                        >
                          <option value="">Select SOP Number</option>
                          {theSopNumbers.map((theSopNumber) => (
                            <option key={theSopNumber} value={theSopNumber}>
                              {theSopNumber}
                            </option>
                          ))}
                        </select> */}
                      </div>
                      <div className="row-span-1 w-full ">
                        <label htmlFor="supp_stand">Supporting Standards</label>
                        <input
                          type="text"
                          id="supp_stand"
                          value={theSopIs}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
                {instrument.decipline === "Mechanical" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-row gap-3">
                      <div className="row-span-1">
                        <label htmlFor="">Calibration Procedure:</label>
                        <Select
                          value={selectedMechSopNumber}
                          onChange={handleMechSopNumberChange}
                          options={mechSopNumbers.map((mechSopNumber) => ({
                            value: mechSopNumber,
                            label: mechSopNumber,
                          }))}
                          isSearchable={true}
                          placeholder="Parameter"
                        />
                        {/* <select
                          className="border border-black/25 w-full rounded-sm p-2"
                          value={selectedMechSopNumber}
                          onChange={handleMechSopNumberChange}
                        >
                          <option value="">Select SOP Number</option>
                          {mechSopNumbers.map((mechSopNumber) => (
                            <option key={mechSopNumber} value={mechSopNumber}>
                              {mechSopNumber}
                            </option>
                          ))}
                        </select> */}
                      </div>
                      <div className="row-span-1 w-full ">
                        <label htmlFor="supp_stand">Supporting Standards</label>
                        <input
                          type="text"
                          id="supp_stand"
                          value={mechSopIs}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-3">
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
          <thead className="border-2 border-black text-[#164B60]">
            <th>Sr. No</th>
            <th>Certificate Number</th>
            <th>Instrument Name</th>
            <th>Environmental Data</th>
            <th>HumidityData</th>
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
                <td className="text-bold text-[#164B60] hover:text-[#164B60]/75 capitalize">
                  <Link
                    to={`/device-details/${encodeURIComponent(
                      item.instrument.instrument_name
                    )}/${encodeURIComponent(item._id)}`}
                  >
                    {item.instrument.instrument_name}
                  </Link>
                </td>
                <td>{item.instrument.temperature}</td>
                <td>{item.instrument.relative_humidity}</td>
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
