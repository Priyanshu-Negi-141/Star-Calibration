import React, { useEffect } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'

const ViewProfile = () => {

  const {currentColor ,fetchIndividualEmployeeData ,loggedInEmployee} = useStateContext()
  useEffect(() => {
    fetchIndividualEmployeeData()
  },[])
  return (
    <div>
      {
        loggedInEmployee.map((emp)=>{
          return(

          
      <div className=''>
        <div className='p-2 text-lg text-bold, text-center text-black dark:text-white bg-gray-300 dark:bg-gray-800' style={{border: '1px solid', borderColor: currentColor}} >
          <h1>My Profile</h1>
        </div>
        <div className='flex gap-3 col-span-12 p-2'><h1 style={{color: currentColor}}>Employe Name</h1><p className='text-black dark:text-white'>{emp.employeeData[0].fName} {emp.employeeData[0].lName}</p></div>
        {/* personal Info */}
        
        <div className='grid grid-cols-1 mb-2 border' style={{border: '1px solid', borderColor: currentColor}}>
          <div className='p-2 text-bold text-center text-black dark:text-white bg-gray-300 dark:bg-gray-800'><h1>Personal Information</h1></div>
            <div className='grid sm:grid-flow-row md:grid-cols-2' style={{border: '1px solid', borderColor: currentColor}} >
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Mobile Number</h1><p className='text-black dark:text-white'>{emp.employeeData[0].mobile_number}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Email</h1><p className='text-black dark:text-white'>{emp.employeeData[0].email}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Father Name</h1><p className='text-black dark:text-white'>{emp.employeeData[0].fatherName}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Mother Name</h1><p className='text-black dark:text-white'>{emp.employeeData[0].motherName}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Gender</h1><p className='text-black dark:text-white'>{emp.employeeData[0].gender}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Date of Birth</h1><p className='text-black dark:text-white'>{emp.employeeData[0].dob}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>{emp.employeeData[0].department}</p></div>
                <div className='flex justify-between gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>{emp.employeeData[0].designation}</p></div>
            </div>
        </div>
        {/* Education */}
        {/* <div className='grid grid-cols-1 mb-2 border' style={{border: '1px solid', borderColor: currentColor}}>
          <div className='p-2 text-bold text-center text-black dark:text-white bg-gray-300 dark:bg-gray-800'><h1>Personal Information</h1></div>
            <div className='grid grid-cols-2' style={{border: '1px solid', borderColor: currentColor}} >
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
            </div>
        </div> */}
        {/*  */}
        {/* <div className='grid grid-cols-1 mb-2 border' style={{border: '1px solid', borderColor: currentColor}}>
          <div className='p-2 text-bold text-center text-black dark:text-white bg-gray-300 dark:bg-gray-800'><h1>Personal Information</h1></div>
            <div className='grid grid-cols-2' style={{border: '1px solid', borderColor: currentColor}} >
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
            </div>
        </div> */}

        {/*  */}
        {/* <div className='grid grid-cols-1 mb-2 border' style={{border: '1px solid', borderColor: currentColor}}>
          <div className='p-2 text-bold text-center text-black dark:text-white bg-gray-300 dark:bg-gray-800'><h1>Personal Information</h1></div>
            <div className='grid grid-cols-2' style={{border: '1px solid', borderColor: currentColor}} >
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
                <div className='flex gap-3 p-2'><h1 style={{color: currentColor}}>Department</h1><p className='text-black dark:text-white'>Department Name</p></div>
            </div>
        </div> */}

        {/*  */}
      </div>
          )
        })
      }
    </div>
  )
}

export default ViewProfile