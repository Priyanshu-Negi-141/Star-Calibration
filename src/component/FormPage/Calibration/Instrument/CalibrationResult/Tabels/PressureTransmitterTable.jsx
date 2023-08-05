import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../../../../contexts/ContextProvider";


const PressureTransmitterTable = (props) => {
  const {host} = useStateContext()
  const { instrumentName, id} = props;
  const [unitData, setUnitData] = useState([
    {
      unitUnderCal: "",
      standardReading: "",
    },
  ]);
  const [unitErrors, setUnitErrors] = useState([]);

    

  const [fsValue, setFsValue] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${host}/api/certificate/instrument-data1/${encodeURIComponent(
          instrumentName
        )}/${encodeURIComponent(id)}`
      );

      const instrumentData = [response.data]; // Wrap the response data in an array
      const fsValue = instrumentData[0].instrument.fs;
      setFsValue(fsValue);
    } catch (error) {
        console.log("Error fetching certificate details:", error);
    }
  };



  useEffect(() => {
    const calculateErrors = () => {
      const errors = unitData.map((unit) => {
        const errorData =
          parseFloat(unit.unitUnderCal) - parseFloat(unit.standardReading);
        const formattedNumber = errorData.toFixed(3).replace(/\.?0+$/, "");
        const errorFS = Math.abs((errorData * 100) / fsValue); // Assuming a fixed value for FS (full scale)
        return {
          error: formattedNumber,
          errorFS: errorFS.toFixed(2),
        };
      });
      setUnitErrors(errors);
    };

    calculateErrors();
  }, [unitData, fsValue]);

  const handleUnitChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...unitData];
    newData[index] = { ...newData[index], [name]: value };
    setUnitData(newData);
  };

  //   const handleSubmit1 = async(event) => {
  //     event.preventDefault(); // Prevent the default form submission behavior
  //     const requestBody = unitData.map((unit,index) => ({
  //       unitUnderCal: unit.unitUnderCal,
  //       standardReading: unit.standardReading,
  //       error: unitErrors[index]?.error || "",
  //       errorPer: unitErrors[index]?.errorPer || "",
  //     }));

  //     const apiUrl = `http://localhost:8000/api/certificate/pressureUnit-data/${encodeURIComponent(
  //       instrumentName
  //     )}/${encodeURIComponent(id)}`;

  //     try {
  //       const response = await axios.post(apiUrl, requestBody);
  //       console.log(response.data); // Handle the response data here
  //       // You can add any additional logic here after successful submission
  //     } catch (error) {
  //       console.error("Error:", error);
  //       // Handle errors here if necessary
  //     }
  //   };
  const handleSubmit1 = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Create an array of pressureUnitData objects
    const requestBody = unitData.map((unit, index) => ({
      unitUnderCal: unit.unitUnderCal,
      standardReading: unit.standardReading,
      error: unitErrors[index]?.error || "",
      errorFS: unitErrors[index]?.errorFS || "", 
    }
    ));
    console.log(requestBody)
  
    const apiUrl = `${host}/api/certificate/pressureUnit-data/${encodeURIComponent(
      instrumentName
    )}/${encodeURIComponent(id)}`;
  
    try {
      const response = await axios.post(apiUrl, requestBody);
      console.log(response.data);
      setUnitData([
        {
          unitUnderCal: "",
          standardReading: "",
        },
      ]); 
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here if necessary
    }
  };
  
  
  
  
  
  

  const handleDeleteUnit = (index, event) => {
    event.preventDefault(); // Prevent default link behavior
    const newData = [...unitData];
    newData.splice(index, 1);
    setUnitData(newData);
  };

  const handleAddUnit = () => {
    setUnitData([...unitData, { unitUnderCal: "", standardReading: "" }]);
  };

  return (
    <div>
      <p>{instrumentName}</p> <p>{id}</p>
      <div className="border-2 border-black p-2 my-3">
        <div className="border border-black text-center text-bold p-2">
          Add detail's
        </div>
        <div>
            <div>
              <form onSubmit={handleSubmit1}>
                <table className="w-full">
                  <thead>
                    <th>UUC</th>
                    <th>Standard Reading</th>
                    <th>Error</th>
                    <th>Error in % FS</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {unitData.map((unit, index) => (
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="unitUnderCal"
                            value={unit.unitUnderCal}
                            onChange={(event) => handleUnitChange(index, event)}
                            id={`unit_under_${index}`}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="standardReading"
                            value={unit.standardReading}
                            onChange={(event) => handleUnitChange(index, event)}
                            id={`standard_${index}`}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={unitErrors[index]?.error || ""}
                            name="error"
                            id={`error_${index}`}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={unitErrors[index]?.errorFS || ""}
                            name="errorFS"
                            id={`errorFS_${index}`}
                            disabled
                          />
                        </td>
                        <td>
                          <button
                            className="border-2 border-black my-2 py-2 w-full bg-red-500 hover:bg-red-600 text-[#ffffff] text-bold"
                            onClick={(event) => handleDeleteUnit(index, event)}
                          >
                            D
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end gap-3 w-2/6">
                  {/* Set type attribute to "button" */}
                  <button
                    className="border-2 border-black my-2 py-2 w-full bg-yellow-500 hover:bg-yellow-600 text-[#ffffff] text-bold"
                    type="button"
                    onClick={handleAddUnit}
                  >
                    Add
                  </button>
                  {/* Set type attribute to "button" */}
                  <button
                    className="border-2 border-black my-2 py-2 w-full bg-blue-500 hover:bg-blue-600 text-[#ffffff] text-bold"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
        
    </div>
  );
};

export default PressureTransmitterTable;
