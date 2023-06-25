import React, { useState } from 'react'
import { PreviousButton } from '../../button'
import { useStateContext } from '../../../contexts/ContextProvider'
import CmcPage from './CmcPage'
const PrimarySecondary = () => {
    const [show, setShow] = useState(false)
    const {selectedDepartment,selectedDesignation,handleDepartmentChange,handleDesignationChange,currentColor} = useStateContext()
    const [rows, setRows] = useState(['']);

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
                <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>: : : Select Master : : :</option>
                    <option value="calibration">Primary Master</option>
                    <option value="hvac">Secondary Master</option>
                </select>
        </div>
        <div>
            <label for="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <select id="department" value={selectedDepartment} onChange={handleDepartmentChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>- - -Department- - -</option>
                <option value="calibration">Calibration</option>
                <option value="hvac">HVAC Validation</option>
                <option value="thermal">Thermal Validation</option>
                </select>
        </div>
        <div>
            <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stream</label>
                <select id="countries" value={selectedDesignation} onChange={handleDesignationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>- - -Stream- - -</option>
                {selectedDepartment === "calibration" && (
                <>
                    <option value="jrCalibration">Electro Technical</option>
                    <option value="srCalibration">Thermal</option>
                    <option value="coCalibration">Pressure</option>
                    <option value="hodCalibration">Mass & Volume</option>
                    <option value="assisTechnicalManager">Dimension</option>
                </>
                )}
                {
                    selectedDepartment === "hvac" && (
                        <>
                            <option value="jrVE">Jr. Validation Engineer</option>
                            <option value="srVE">Sr. Validation Engineer</option>
                            <option value="coVE">Computer Operator (Validation)</option>
                            <option value="hodVE">HOD HVAC Validation</option>
                        </>
                    )
                }
                {
                    selectedDepartment === "thermal" && (
                        <>
                            <option value="jrThermal">Jr. Validation Engineer</option>
                            <option value="srThermal">Sr. Validation Engineer</option>
                            <option value="coThermal">Computer Operator (Thermal)</option>
                            <option value="hodThermal">HOD Thermal Validation</option>
                        </>
                        )
                    }
                    {
                        selectedDepartment === "plccsv" && (
                            <>
                                <option value="jrSME">SME</option>
                                <option value="srSME">Sr. SME</option>
                                <option value="managerCSV">Manager CSV</option>
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
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instrument Name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make/Model</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Model" required />
        </div>
        <div>
            <label for="father" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID No./ Sr. No</label>
            <input type="text" id="father" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Id No./ Sr. No." required />
        </div>
        <div>
            <label for="mother" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range</label>
            <input type="text" id="mother" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Range" required />
        </div>
        <div>
            <label for="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calibration Date</label>
            <input type="date" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DD/MM/YYYY" required />
        </div>
        
        <div>
            <label for="duedate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
            <input type="date" id="mnumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        
        <div>
            <label for="cfnumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CF Number</label>
            <input type="number" id="cfnumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CF Number" required />
        </div>
        <div>
            <label for="accuracy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accuracy</label>
            <input type="text" id="accuracy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Accuracy" required />
        </div>
        <div>
            <label for="tracebility" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Traceability</label>
            <input type="text" id="tracebility" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Traceability" required />
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
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    </form>
    </div>
    </div>
  )
}

export default PrimarySecondary