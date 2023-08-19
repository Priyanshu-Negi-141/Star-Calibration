import React, {useEffect, useState} from 'react'
import avater from '../../data/avatar.jpg'
import { PreviousButton } from '../button'
import { useStateContext } from '../../contexts/ContextProvider'
import { EmployeList } from '../HRM/userManagement/'
import { AddExpense, ApplyLeave, DayReport, OverTime, ViewAttendance, ViewProfile } from './myProfileButtonData'

const MyProfile = () => {
    const {currentColor,fetchIndividualEmployeeData ,loggedInEmployee} = useStateContext()
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)
    const showData = () => {
        setShow(!show)
        if(show1){
            setShow1(false)
        }
        if(show2){
            setShow2(false)
        }
        if(show3){
            setShow3(false)
        }
        if(show4){
            setShow4(false)
        }
        if(show5){
            setShow5(false)
        }      
    } 
    const showData1 = () => {
        setShow1(!show1)
        if(show){
            setShow(false)
        }
        if(show2){
            setShow2(false)
        }  
        if(show3){
            setShow3(false)
            }
            if(show4){
                setShow4(false)
                }
                if(show5){
                    setShow5(false)
                    }
    } 
    const showData2 = () => {
        setShow2(!show2)
        if(show){
            setShow(false)
            }
            if(show1){
        setShow1(false)
        }
        if(show3){
            setShow3(false)
        }
        if(show4){
           setShow4(false)
        }
        if(show5){
            setShow5(false)
        }
    }
    const showData3 = () => {
        setShow3(!show3)
        if(show){
            setShow(false)
            }
            if(show1){
        setShow1(false)
        }
        if(show2){
            setShow2(false)
        }
        if(show4){
           setShow4(false)
        }
        if(show5){
            setShow5(false)
        }
    }
    const showData4 = () => {
        setShow4(!show4)
        if(show){
            setShow(false)
            }
            if(show1){
        setShow1(false)
        }
        if(show2){
            setShow2(false)
        }
        if(show3){
           setShow3(false)
        }
        if(show5){
            setShow5(false)
        }
    }

    const showData5 = () => {
        setShow5(!show5)
        if(show){
            setShow(false)
            }
            if(show1){
        setShow1(false)
        }
        if(show2){
            setShow2(false)
        }
        if(show3){
           setShow3(false)
        }
        if(show4){
            setShow4(false)
        }
    }

    useEffect(() => {
        fetchIndividualEmployeeData()

    },[])
 
  return (
    <div>
        <PreviousButton />
        <div className='text-center text-2xl focus:right-6 pt-2 text-gray-900 dark:text-white'>
        <h2>My Profile</h2>
        </div>
        <div className='flex mt-5 gap-4'>
            <div className='w-60 h-52'>
                <img className='object-cover w-60 h-52' src={avater} alt="" />
            </div>
            {
                loggedInEmployee.map((emp) => {
                    return(
                    <div className='w-full pl-4 h-50 flex flex-col justify-center gap-3 '>
                        <h1 className='text-5xl text-orange-600' style={{color:currentColor}}>{emp.employeeData[0].fName} {emp.employeeData[0].lName}</h1>
                        <div className='grid grid-flow-row text-gray-900 dark:text-white'><span className='font-bold text-2xl'>{emp.employeeData[0].department}</span> <span className='text-lg'>{emp.employeeData[0].designation}</span></div>
                    </div>
                    )
                })
            }
            
        </div>
        <div className='sm:overflow-x-auto p-2'>
        <div className='grid grid-flow-col mt-5 mb-5 gap-1'>
            <button type="button" onClick={showData} class="text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">View Profile</button>
            <button type="button" onClick={showData1} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View Attandance</button>
            <button type="button" onClick={showData2} class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Overtime</button>
            <button type="button" onClick={showData3} class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Apply Leave</button>
            <button type="button" onClick={showData4} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Expense</button>
            <button type="button" onClick={showData5} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Day Report</button>
            
            </div>
        </div>
        <div className='flex gap-4 mt-4 w-full h-auto'>
            <div className='w-60 mt-2 h-auto'style={{backgroundColor: ''}} >
            </div>

            {/* data here */}

            {/* <div className='flex gap-4 w-full h-auto text-gray-900 dark:text-white'>
                    <div className='text-right w-40 ' style={{lineHeight: '2rem'}}>
                        <p>First Name</p>
                        <p>Last Name</p>
                        <p>Gender</p>
                        <p>DOB</p>
                        <p>Father Name</p>
                        <p>Mother Name</p>
                        <p>Mobile Num</p>
                        <p>Email</p>
                        <p>Address</p>
                    </div>
                    <div className='w-full' style={{lineHeight: '2rem'}}>
                        <p>Himanshu</p>
                        <p>Negi</p>
                        <p>Male</p>
                        <p>23/Jun/1993</p>
                        <p>Raghubir Singh Negi</p>
                        <p>Manju Devi</p>
                        <p>8888888888</p>
                        <p>himanshunegi@gmail.com</p>
                        <p>Salami Phaphanj</p>
                        

                    </div>
            </div> */}  
        </div>
        
            {/* show data */}
            {
                show && (<ViewProfile />)
            }
            {
                show1 && (<ViewAttendance />)
            }
            {
                show2 && (<OverTime />)
            }
            {
                show3 && (<ApplyLeave />)
            }
            {
                show4 && (<AddExpense />)
            }
            {
                show5 && (<DayReport />)
            }



    </div>
  )
}

export default MyProfile