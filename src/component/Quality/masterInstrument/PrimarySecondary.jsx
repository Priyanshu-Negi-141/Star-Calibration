import React, { useState } from 'react'
import { PreviousButton } from '../../button'
import { useStateContext } from '../../../contexts/ContextProvider'
import CmcPage from './CmcPage'
import { toast } from 'react-toastify'
const PrimarySecondary = () => {
    const [show, setShow] = useState(false)
    const {selectedDepartment,handleDepartmentChange,handleStreamChange,currentColor} = useStateContext()
    const [rows, setRows] = useState(['']);
    const [data, setData] = useState({
        master_type: "",
        stream: "",
        instrument_name: "",
        make_model: "",
        serial_number: "",
        id_number: "",
        range: "",
        least_count: "",
        calibration_date: "",
        due_date: "",
        cf_number: "",
        accuracy: "",
        traceability: ""
    })
    const handleSubmit = async() => {
        const apiUrl = "http://localhost:8000/api/masterInstrument"
        try {
            const response = await fetch(`${apiUrl}/${selectedDepartment}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            if (response.ok) {
              // Form data submitted successfully
              toast.success('Master Instrument added successfully!');
              console.log('Form data submitted:', data);
              setData({
                master_type: "",
                stream: "",
                instrument_name: "",
                make_model: "",
                serial_number: "",
                id_number: "",
                range: "",
                least_count: "",
                calibration_date: "",
                due_date: "",
                cf_number: "",
                accuracy: "",
                traceability: ""
              })
            } else {
                toast.error('Somthing went wrong, Please try again!!!');
              // Handle error response from the API
              console.error('Error:', response.status);
              
            }
          } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
          }

          
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setData((prevInputValues) => ({
            ...prevInputValues,
            [name]: value
          }));
    }

    const showData = () => {
        if (show === true){
            setShow(false)
        }else{
            setShow(true)
        }
    } 
    const handleAddRow = () => {
        setRows([...rows, { num1: '', num2: '', num3: '', result: '' }]);
      };
      
      const handleDeleteRow = (index) => {
        const updatedRows = [...rows.slice()];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      };

      const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
      
        // Calculate the sum and update the result field
        const sum = Number(updatedRows[index].num1) + Number(updatedRows[index].num2) + Number(updatedRows[index].num3);
        updatedRows[index].result = sum || '';
        setRows(updatedRows);
      };
      
  return (
    <div>
        <div className=''>
        <PreviousButton />
        </div>
        <div>
    <form>
    <h3 className='border p-2 bg-gray-300 dark:bg-gray-800 mb-2 underline text-xl' style={{borderColor: currentColor,color: currentColor}}>Master Details</h3>
    <div className='border-dashed border-2  p-5' style={{borderColor: currentColor}}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
    <div className='md:col-span-2'>
            <label for="master" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Master Type</label>
                <select id="master" name='master_type' value={data.master_type} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>: : : Select Master : : :</option>
                    <option value="Primary">Primary Master</option>
                    <option value="Secondary">Secondary Master</option>
                </select>
        </div>
        <div>
            <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <select id="department" value={selectedDepartment} onChange={handleDepartmentChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>- - -Department- - -</option>
                <option value="addCalibrationMasterData">Calibration</option>
                <option value="addHVACMasterData">HVAC Validation</option>
                <option value="addThermalMasterData">Thermal Validation</option>
                </select>
        </div>
        <div>
            <label for="stream" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stream</label>
                <select id="stream" name='stream' value={data.stream} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>- - -Stream- - -</option>
                {selectedDepartment === "addCalibrationMasterData" && (
                <>
                    <option value="Electro Technical">Electro Technical</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Pressure">Pressure</option>
                    <option value="Mass & Volume">Mass & Volume</option>
                    <option value="Dimension">Dimension</option>
                </>
                )}
                {
                    selectedDepartment === "addHVACMasterData" && (
                        <>
                            <option value="None">None</option>
                        </>
                    )
                }
                {
                    selectedDepartment === "addThermalMasterData" && (
                        <>
                            <option value="None">None</option>
                        </>
                        )
                    }
                </select>
        </div>
    </div>
    </div>
    <div className='mt-2 border-2 border-dashed p-2' style={{borderColor: currentColor}}>
    <h3 className='mb-2 underline dark:text-white border p-2 text-lg bg-gray-300 dark:bg-gray-800' style={{borderColor: currentColor, color: currentColor}}>Instrument Details</h3>
    <div className='border-dashed border-2 dark:border-white p-5' style={{borderColor: currentColor}}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="instrument_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instrument Name</label>
            <input type="text" id="instrument_name" onChange={handleInputChange} value={data.instrument_name} name='instrument_name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div>
            <label for="make_model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make/Model</label>
            <input type="text" id="make_model" onChange={handleInputChange} value={data.make_model} name='make_model' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Model" required />
        </div>
        <div>
            <label for="serial_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sr. No</label>
            <input type="text" id="serial_number" onChange={handleInputChange} value={data.serial_number} name='serial_number' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id No./ Sr. No." required />
        </div>
        <div>
            <label for="id_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID No.</label>
            <input type="text" id="id_number" onChange={handleInputChange} value={data.id_number} name='id_number' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id No./ Sr. No." required />
        </div>
        <div>
            <label for="range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range</label>
            <input type="text" id="range" name='range' onChange={handleInputChange} value={data.range} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Range" required />
        </div>
        <div>
            <label for="least_count" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Least Count</label>
            <input type="text" id="least_count" name='least_count' onChange={handleInputChange} value={data.least_count} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Range" required />
        </div>
        <div>
            <label for="calibration_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calibration Date</label>
            <input type="date" id="calibration_date" name='calibration_date' onChange={handleInputChange} value={data.calibration_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DD/MM/YYYY" required />
        </div>
        
        <div>
            <label for="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
            <input type="date" id="due_date" name='due_date' value={data.due_date} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        
        <div>
            <label for="cf_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CF Number</label>
            <input type="text" id="cf_number" name='cf_number' value={data.cf_number} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CF Number" required />
        </div>
        <div>
            <label for="accuracy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accuracy</label>
            <input type="text" id="accuracy" name='accuracy' value={data.accuracy} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Accuracy" required />
        </div>
        <div>
            <label for="traceability" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Traceability</label>
            <input type="text" id="traceability" name='traceability' value={data.traceability} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Traceability" required />
        </div>
        </div>
        
    </div>

    {/* Button */}

    <div className='mt-2'>
        <button type="button" onClick={showData} class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Add CMC</button>
    </div>



        
    {
        show && (<CmcPage />)
    }
    </div>
    <div className='mt-2'>
        <button type="button" onClick={handleSubmit} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    </form>
    </div>
    </div>
  )
}

export default PrimarySecondary