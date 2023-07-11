import React, { useState } from 'react'
import { PreviousButton } from '../../button'
import { useStateContext } from '../../../contexts/ContextProvider'
import axios from 'axios';
import { Link } from 'react-router-dom';



const AddEmployee = () => {

    const {selectedDepartment, selectedDesignation, handleDepartmentChange, handleDesignationChange, currentColor, addEmployee} = useStateContext()

    const [val,setVal] = useState([])
    const [val1,setVal1] = useState([])
    const [val2,setVal2] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [employee, setEmployee] = useState({fName: "",lName: "",email: "",fatherName: "",motherName: "",dob: "",mobile_number: "",gender: "",password: "", department: "",designation: "",marital_status: "",blood: "" })
    // Add new line 
  const handleAdd = () =>{
    const abc = [...val,[]]
    setVal(abc)
    
    }
    // Backend start
    // HandleSubmit
    const handleClick = (e) => {
        e.preventDefault()
        addEmployee(employee.fName,employee.lName,employee.email,employee.fatherName,employee.motherName,employee.dob,employee.mobile_number,employee.gender,employee.password,selectedDepartment,selectedDesignation,employee.marital_status,employee.blood)
        setEmployee({fName: "",lName: "",email: "",fatherName: "",motherName: "",dob: "",mobile_number: "",gender: "",password: "",department: "",designation: "",marital_status: "",blood: "" })
        alert("Added Data:" + setEmployee({}))
        console.log("Added Data:" + setEmployee({}))
    }

    const onChange = (e) => {
        setEmployee({...employee,[e.target.name]: e.target.value})
    }






    // Backend ENd
    const handleAdd1 = () => {
        const xyz = [...val1,[]]
        setVal1(xyz)

    }
    const handleAdd2 = () => {
        const pqr = [...val2,[]]
        setVal2(pqr)

    }

const handleChange = (onChangeValue, i) => {
    const inputData = [...val]
    inputData[i] = onChangeValue.target.value
    setVal(inputData)
    
}

const handleDelete = (i) => {
      const deleteData = [...val]
      deleteData.splice(i, 1)
      setVal(deleteData)
  }
  const handleDelete1 = (i) => {
    const deleteData1 = [...val1]
    deleteData1.splice(i, 1)
    setVal1(deleteData1)
}
const handleDelete2 = (i) => {
    const deleteData2 = [...val2]
    deleteData2.splice(i, 1)
    setVal2(deleteData2)
}



  return (
    <div className=''> 
        <div className='mb-3'>
        <div className='flex'>
            <PreviousButton className="" />
            <div className='mt-5'>
                <Link to='/employeeList'><button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">Employee List</button></Link>
            </div>
        
        </div>
        </div>
        <div>
    <form>
    <h3 className='text-black text-2xl rounded-xl mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800' style={{color: currentColor, border: '2px solid'}}>Personal Details</h3>
    <div className='border-dashed border-2 mb-5 dark:border-white p-5' style={{borderColor: currentColor}}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label htmlFor="fName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" value={employee.fName} onChange={onChange} id="fName" name='fName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        <div>
            <label htmlFor="lName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" value={employee.lName} onChange={onChange} id="lName" name='lName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe"  />
        </div>
        <div>
            <label htmlFor="fatherName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Father Name</label>
            <input onChange={onChange} value={employee.fatherName} type="text" id="fatherName" name='fatherName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father Name"  />
        </div>
        <div>
            <label htmlFor="motherName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mother Name</label>
            <input onChange={onChange} type="text" value={employee.motherName} id="motherName" name='motherName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mother Name"  />
        </div>
        <div>
            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
            <input onChange={onChange} type="date" id="dob" value={employee.dob} name='dob' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DD/MM/YYYY"  />
        </div>
        <div>
        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                <select id="gender" value={employee.gender} name='gender' onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>: : : Gender : : :</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
        </div>
        <div>
            <label htmlFor="mobile_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
            <input type="number" value={employee.mobile_number} id="mobile_number" name='mobile_number' onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  />
        </div>
        
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" value={employee.email} name='email' onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@companymail.com"  />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="text" id="password" value={employee.password} name='password' onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"  />
        </div>
        
        <div>
            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <select id="department" value={selectedDepartment} onChange={handleDepartmentChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>: : : Department : : :</option>
                <option value="Admin">Admin</option>
                <option value="Account">Account</option>
                <option value="Calibration">Calibration</option>
                <option value="HVAC">HVAC Validation</option>
                <option value="Thermal">Thermal Validation</option>
                <option value="CA">CA Validation</option>
                <option value="PLC-CSV">PLC & CSV</option>
                <option value="Steam Quality">Steam Quality Validation</option>
                </select>
        </div>
        <div>
            <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                <select id="designation" value={selectedDesignation} onChange={handleDesignationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>: : : Designation : : :</option>
                {selectedDepartment === "Admin" && (
                    <>
                        <option>Admin Head</option>
                    </>
                )}
                {selectedDepartment === "Account" && (
                    <>
                        <option>Account Head</option>
                    </>
                )}
                {selectedDepartment === "Calibration" && (
                <>
                    <option value="Jr. Calibration">Jr. Calibration Engineer</option>
                    <option value="Sr. Calibration">Sr. Calibration Engineer</option>
                    <option value="Computer Operator Calibration">Computer Operator (Calibration)</option>
                    <option value="HOD Calibration">HOD Calibration</option>
                    <option value="Assistant Technical Manager">Assistant Technical Manager</option>
                    <option value="Assistant Quality Manager">Assistant Quality Manager</option>
                    <option value="Technical Manager">Technical Manager</option>
                    <option value="Quality Manager">Quality Manager</option>
                </>
                )}
                {
                    selectedDepartment === "HVAC" && (
                        <>
                            <option value="Jr. Validation Engineer">Jr. Validation Engineer</option>
                            <option value="Sr. Validation Engineer">Sr. Validation Engineer</option>
                            <option value="Computer Operator Validation">Computer Operator (Validation)</option>
                            <option value="HOD HVAC Validation">HOD HVAC Validation</option>
                        </>
                    )
                }
                {
                    selectedDepartment === "Thermal" && (
                        <>
                            <option value="Jr. Validation Engineer">Jr. Validation Engineer</option>
                            <option value="Sr. Validation Engineer">Sr. Validation Engineer</option>
                            <option value="Computer Operator Thermal">Computer Operator (Thermal)</option>
                            <option value="HOD Thermal Validation">HOD Thermal Validation</option>
                        </>
                        )
                    }
                    {
                        selectedDepartment === "PLC-CSV" && (
                            <>
                                <option value="jrSME">SME</option>
                                <option value="srSME">Sr. SME</option>
                                <option value="managerCSV">Manager CSV</option>
                            </>
                            )
                    }{
                        selectedDepartment === "CA" && (
                            <>
                                <option value="Jr. Validation Engineer">Jr. Validation Engineer</option>
                                <option value="Sr. Validation Engineer">Sr. Validation Engineer</option>
                                <option value="Computer Operator CA">Computer Operator (CA)</option>
                                <option value="HOD CA Validation">HOD CA Validation</option>
                            </>
                            )
                        }
                        {
                    selectedDepartment === "Steam Quality" && (
                        <>
                            <option value="Jr. Validation Engineer">Jr. Validation Engineer</option>
                            <option value="Sr. Validation Engineer">Sr. Validation Engineer</option>
                            <option value="Computer Operator Steam">Computer Operator (Steam)</option>
                            <option value="HOD Steam Validation">HOD Steam Validation</option>
                        </>
                        )
                    }
                </select>
        </div>
        <div>
            <label htmlFor="marital" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marital Status</label>
            <input type="text" id="marital" name='marital_status' onChange={onChange} value={employee.marital_status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Marital Status"  />
        </div>
        <div>
            <label htmlFor="blood" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood</label>
            <input type="text" id="blood" name="blood" value={employee.blood} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Blood Group (+ve/-ve)"  />
        </div>
        {/*<div>
            <label htmlFor="aadhar_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aadhar Number</label>
            <input type="number" id="aadhar_mnumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234-4567-7890" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"  />
        </div>
        <div>
            <label htmlFor="pan_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PAN Number</label>
            <input type="text" id="pan_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pan Number"  />
        </div> */}
    </div>
    {/* <div className="mb-1">
        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correspondence Address</label>
        <input type="text" id="address" className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 1"  />
        <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 2" />
    </div> 
    <div className="mb-2 flex gap-1 sm:flex-col md:flex-row">
    
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City"  />
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postal Code"  />

        <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State"  />
    </div> 
    <div className="mb-1">
        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Permanent Address</label>
        <input type="text" id="address" className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 1"  />
        <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 2" />
    </div> 
    <div className="mb-2 flex gap-1 sm:flex-col md:flex-row">
    
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City"  />
            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postal Code"  />

        <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State"  />
    </div> 
    <div className='mt-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Profile Pic</label>
                    <input className="block cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="file_input" type="file" />
    </div> */}
    </div>

    {/* Emergency Detail's */}
    <h3 className='text-black text-2xl rounded-xl mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800' style={{color: currentColor, border: '2px solid'}}>Emergency Contact Details</h3>
    <div className='border-dashed border-2 p-5 mb-3' style={{borderColor: currentColor}}>
        <div className='border border-black dark:border-white dark:text-white' style={{borderColor: currentColor}}>
                    <div className='border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white' style={{borderColor: currentColor, color: currentColor}}><h2>Emergency Contact Detail's</h2></div>
                        <div className='grid grid-cols-9 text-center'>
                            <div className='col-span-1 border p-2 border-black dark:border-white dark:text-white' style={{borderColor: currentColor, color: currentColor}}>SL No</div>
                            <div className='col-span-3 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Name</p></div>
                            <div className='col-span-3 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Relation</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Contact</p></div>
                        </div>
                        {
                            val1.map((data,i) => {
                                return( 
                                    <div className='grid grid-cols-9 text-center'>
                                        <div className='col-span-1 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-3 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-3 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-2 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                    </div>
                                )
                            })
                        }
                </div>
            {/* Adding new button for creating new same form */}
            <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={() => handleAdd1()} >Add</button>
                </div>
                <div>
                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete1()} >Delete</button>
                </div>
                
            </div>
        </div>
        

    {/* Educational details start here's */}
    
        <h3 className='text-black flex justify-center text-xl rounded-xl mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800' style={{color: currentColor, border: '2px solid'}}>Education Details <p className='text-red-500'>*</p></h3>
        <div className='border-dashed border-2 border-black dark:border-white mb-3 p-5' style={{borderColor: currentColor}}>
        <div className='border border-black dark:border-white dark:text-white' style={{borderColor: currentColor}}>
                    <div className='border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white' style={{borderColor: currentColor, color: currentColor}}><h2>Add Education Detail's</h2></div>
                        <div className='grid grid-cols-11 text-center'>
                            <div className='col-span-2 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Select</p></div>
                            <div className='col-span-4 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Collage/School Name</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Grade</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>From</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>To</p></div>
                        </div>
                        {
                            val.map((data,i) => {
                                return( 
                                    <div className='grid grid-cols-11 text-center'>
                                        <div className='col-span-2 border border-black dark:border-white' style={{borderColor: currentColor}}>
                                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>None</option>
                                            <option value="US">10th</option>
                                            <option value="CA">12th</option>
                                            <option value="FR">Diploma</option>
                                            <option value="DE">Graduation</option>
                                            <option value="">Post Graduation</option>
                                        </select>

                                        </div>
                                        <div className='col-span-4 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-1 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-2 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-2 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                    </div>
                                )
                            })
                        }
                </div>
            {/* Adding new button for creating new same form */}
            <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={() => handleAdd()} >Add</button>
                </div>
                <div>
                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete()} >Delete</button>
                </div>
                
            </div>
        </div>
    {/* Previous Company Detail's */}

    <h3 className='text-black flex justify-center text-xl rounded-xl mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800' style={{color: currentColor, border: '2px solid'}}>Employee Details <p className='text-red-500'>*</p></h3>
        
        <div className='border-dashed border-2 border-black dark:border-white mb-3 p-5' style={{borderColor: currentColor}}>
        <div className='border border-black dark:border-white dark:text-white' style={{borderColor: currentColor}}>
                    <div className='border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white' style={{borderColor: currentColor, color:currentColor}}><h2>Add Education Detail's</h2></div>
                        <div className='grid grid-cols-11 text-center'>
                        <div className='col-span-1 border p-2 border-black dark:border-white' style={{borderColor: currentColor,color: currentColor}}><p>SL No.</p></div>
                            <div className='col-span-3 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Organization</p></div>
                            <div className='col-span-3 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Designation</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>From</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>To</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white' style={{borderColor: currentColor, color: currentColor}}><p>Annual CTC</p></div>
                        </div>
                        {
                            val2.map((data,i) => {
                                return( 
                                    <div className='grid grid-cols-11 text-center'>
                                        <div className='col-span-1 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-3 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-3 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-1 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-1 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                        <div className='col-span-2 border border-black dark:border-white' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  /></div>
                                    </div>
                                )
                            })
                        }
                </div>
            {/* Adding new button for creating new same form */}
            <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={() => handleAdd2()} >Add</button>
                </div>
                <div>
                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete2()} >Delete</button>
                </div>
                
            </div>
        </div>

    {/* Termas and condition start here's */}
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border rounded focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" style={{backgroundColor: currentColor,borderColor: currentColor,color:currentColor}}  />
        </div>
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500" style={{color: currentColor}}>terms and conditions</a>.</label>
    </div>
    <button type="submit" onClick={handleClick} className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    </div>
    
    </div>
  )
}

export default AddEmployee