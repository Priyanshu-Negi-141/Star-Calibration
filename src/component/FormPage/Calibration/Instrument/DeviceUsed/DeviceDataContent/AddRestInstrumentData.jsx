import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../../../../contexts/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const AddRestInstrumentData = (props) => {
  const { host } = useStateContext();
  const { instrumentName, id } = props;
  const [calibratedAt, setCalibratedAt] = useState("");
  const [formData, setFormData] = useState({
    visual_inspection: "",
    zero_error: "",
    calibrate_at: "",
    // temperature: temperatureValue,
    // relative_humidity: humidityValue,
    // cal_procedure: calProcedure,
    // supporting_standards: supportingStandards,
    // calibration_date: calibrationDate,
    // valid_date: validDate,
    // location: instrument.location,
    // visual_inspection: instrument.visual_inspection,
    // zero_error: instrument.zero_error,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${host}/api/certificate/instrument-data1/${instrumentName}/${id}`
        );

        setCalibratedAt(response.data.instrument.calibrate_at);
      } catch (error) {
        console.error("Error", error.response.data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${host}/api/certificate/instrument-data1/${encodeURIComponent(
          instrumentName
        )}/${encodeURIComponent(id)}`,
        formData
      );
      console.log("Response:", response.data); // Log the response data for debugging
      if (response.status === 200) {
        setFormData({
          visual_inspection: "",
          zero_error: "",
        });
        toast.success("Instrument Details Added Successfully");
      } else {
        toast.error("Error while adding Instrument details");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //   EnvironCondition

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
  const [isDisabled, setIsDisabled] = useState(true);

  const handleToggle = () => {
    setIsDisabled(!isDisabled);
  };

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
    fetch(`${host}/api/sop/eleSopNumber/${encodeURIComponent(selected)}`)
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
    fetch(`${host}/api/sop/mechSopNumber/${encodeURIComponent(selected)}`)
      .then((response) => response.json())
      .then((data) => {
        setMechSopIs(data.isNumber);
      })
      .catch((error) => console.error(error));
  };

  const handleThermalSopNumberChange = (selectedTheSopNumber) => {
    const selected = selectedTheSopNumber.value;
    setSelectedTheSopNumber(selectedTheSopNumber);
    console.log(selectedTheSopNumber);

    // Fetch SOP name based on selected SOP number
    fetch(`${host}/api/sop/theSopNumber/${encodeURIComponent(selected)}`)
      .then((response) => response.json())
      .then((data) => {
        setTheSopIs(data.isNumber);
      })
      .catch((error) => console.error(error));
  };

  // SOP Number Electro Fetch End

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="mt-1 bg-[#afc0ca]">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 p-2">
          <div>
            <label>Visual Inspection:</label>
            <input
              type="text"
              name="visual_inspection"
              value={formData.visual_inspection}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Zero Error:</label>
            <input
              type="text"
              name="zero_error"
              value={formData.zero_error}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border grid sm:grid-row-2 md:grid-row-3 gap-3 p-2">
          <div className="grid gap-2">
            <div className="">
            <label htmlFor="">Calibrate At</label>
            <input type="text" name="calibratedAt" onChange={handleChange} value={calibratedAt} disabled={isDisabled} />
            <button onClick={handleToggle}>
                {isDisabled ? 'Enable Edit' : 'Disable Edit'}
            </button>
            </div>
            <div>
            {calibratedAt === "Site" && (
              <div className="grid grid-flow-col gap-3 mt-3">
                <div>
                  <label>Temperature:</label>
                  <input
                    type="text"
                    name="temperature"
                    value="25 &#177; 15"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Humidity:</label>
                  <input
                    type="text"
                    name="relative_humidity"
                    value="50 &#177; 20"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            </div>
            <div>
            {calibratedAt === "Lab" && (
              <div>
                <div>
                  <label>Select an option:</label>
                  <select
                    name="lab_option"
                    className="border border-black/25 shadow-sm w-full rounded-sm p-2"
                    value={formData.lab_option}
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
                </div>
                {formData.lab_option && (
                  <div>
                    {formData.lab_option === "Electro" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 4"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="30 to 75"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                    {formData.lab_option === "Thermal" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 4"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="30 to 75"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                    {formData.lab_option === "Mech (Mass)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 2"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                    {formData.lab_option === "Mech (Volumn)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="25 &#177; 3"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                    {formData.lab_option === "Mech (Pressure)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="23 &#177; 1.5"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                    {formData.lab_option === "Mech (Dimension)" && (
                      <div className="grid grid-flow-col gap-3 mt-3">
                        <div>
                          <label>Temperature:</label>
                          <input
                            type="text"
                            name="temperature"
                            value="20 &#177; 2"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label>Humidity:</label>
                          <input
                            type="text"
                            name="relative_humidity"
                            value="50 &#177; 10"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            </div>
            {/*  */}
            {/* Calibration At Data ends */}
          </div>
          <div className="grid gap-1.5">
            <div>
            <label>Select Decipline:</label>
            <select
              name="decipline"
              className="border border-black/25 shadow-sm w-full rounded-sm p-2"
              value={formData.decipline}
              onChange={handleChange}
            >
              <option value="" selected>
                None
              </option>
              <option value="Electro">Electro</option>
              <option value="Thermal">Thermal</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            </div>
            <div>
            {formData.decipline && (
              <div>
                {formData.decipline === "Electro" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-col gap-3">
                      <div className="col-span-1">
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
                      </div>
                      <div className="col-span-1 w-full ">
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
                {formData.decipline === "Thermal" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-col gap-3">
                      <div className="col-span-1">
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
                      </div>
                      <div className="col-span-1 w-full ">
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
                {formData.decipline === "Mechanical" && (
                  <div className="grid grid-flow-col gap-3 mt-3">
                    <div className="grid grid-flow-col gap-3">
                      <div className="col-span-1">
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
                      </div>
                      <div className="col-span-1 w-full ">
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
          <div className="grid grid-cols-3 gap-3">
              <div>
                <label>Calibration Date:</label>
                <input
                  type="date"
                  name="calibration_date"
                  className="p-1.5"
                  value={formData.calibration_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Valid Up To:</label>
                <input
                  type="date"
                  name="valid_date"
                  className="p-1.5"
                  value={formData.valid_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
        </div>
        

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
          >
            Update Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestInstrumentData;
