import React, { useEffect, useState } from 'react'
import { PreviousButton } from '../../button'
import EmployeeJoiningFormData from './EmployeeJoiningFormData'
import {AiFillEye} from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'
import { useStateContext } from '../../../contexts/ContextProvider'
import { Link } from 'react-router-dom'



const EmployeList = () => {
    const [employeeListData, setEmployeeListData] = useState([]);
    const [show,setShow] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [serialNumber, setSerialNumber] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const {employeeData, deleteEmployee, fetchEmployeeData, 
        currentPage, setCurrentPage,
        totalPages,
        getCurrentPageData,
        goToPreviousPage,
        goToNextPage,} = useStateContext()
    const [employeesPerPage] = useState(10);
    const currentPageData = getCurrentPageData()
        // fetching data from context
        
        // 

        useEffect(() => {
            
        
            fetchEmployeeData();
          }, []);
        
        


        // 
            

      const handleSearch = (e) => {
        const serchValue = e.target.value.toLowerCase()
        setSearchQuery(serchValue)
      };

      useEffect(() => {
        setSerialNumber((currentPage * employeesPerPage) + 1)
      }, [currentPage, employeesPerPage])

  return (
    <div className='mb-10'>
    <div className='mt-5 h-screen'>
        <div className='grid grid-cols-9'>
            <PreviousButton className="col-span-1" />
            <div className='mt-5 col-span-2'>
                <Link to='/addemployee'><button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">Add Employee</button></Link>
            </div>
            <div className='col-span-2'>
            <h3 className='text-bold dark:text-white text-2xl'>Employee Detail's</h3>
            </div>
        
        </div>
        
    <div className='flex justify-end mb-5'>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" value={searchQuery} onChange={handleSearch} />
        </div>
    </div>     
<div className="overflow-x-auto shadow-md sm:rounded-lg">

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sr. Num
                </th>
                <th scope="col" className="px-6 py-3">
                    Employee name
                </th>
                <th scope="col" className="px-6 py-3">
                    DOB
                </th>
                <th scope="col" className="px-6 py-3">
                    Gender
                </th>
                <th scope="col" className="px-6 py-3">
                    Father Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Mother Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Contact Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
               currentPageData.map((employee,index) => {
                    const fullName = `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`.toLowerCase()
                    const showEmployee = fullName.includes(searchQuery)
                    return(
                        <tr key={employee._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${showEmployee ? '' : 'hidden'}`}>
                            <td className="px-6 py-4 whitespace-no-wrap">
                                {serialNumber + index}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <a href="">{employee.employeeData[0].fName} {employee.employeeData[0].lName}</a>
                            </th>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].dob}
                            </td>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].gender}
                            </td>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].fatherName}
                            </td>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].motherName}
                            </td>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].mobile_number}
                            </td>
                            <td className="px-6 py-4">
                                {employee.employeeData[0].email}
                            </td>
                            <td className="px-6 py-4 flex gap-2">

                                    <button 
                                    type="button" 
                                    className="text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 rounded-full text-xl p-3 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                    onClick={() => setShow(true)}
                                    >
                                        <AiFillEye />
                                    </button>
                                    <button 
                                    type="button" 
                                    className="text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 rounded-full text-xl p-3 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                    onClick={() => {deleteEmployee(employee._id)}}
                                    >
                                        <TiDelete onClick={()=>{}} />

                                        
                                    </button>
                                    

                                    <EmployeeJoiningFormData show={show} />
                            </td>
                        </tr>
                    )})}
                    {!employeeData.some((employee) => {
                        const fullName = `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`.toLowerCase();
                        return fullName.includes(searchQuery)
                    }) && (
                        <tr>
                            <td className='px-4 py-3' colSpan='9'>
                                No matching employees found.
                            </td>
                        </tr>
                    )}
            
        </tbody>
    </table>
</div>

{/* Pagination */}
   
<div className="flex justify-center mt-4">
  <button
    className={`${
      currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    } text-white font-semibold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors`}
    onClick={goToPreviousPage}
    disabled={currentPage === 0}
  >
    <svg
      className="w-4 h-4 inline-block mr-1 -mt-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      ></path>
    </svg>
    Previous
  </button>
  <button
    className={`${
      currentPage === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    } text-white font-semibold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors`}
    onClick={goToNextPage}
    disabled={currentPage === totalPages - 1}
  >
    Next
    <svg
      className="w-4 h-4 inline-block ml-1 -mt-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
  </button>
</div>
                    
    </div>
</div>
  )
}

export default EmployeList