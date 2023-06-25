import React, { useRef } from 'react'
import {MdOutlineCancel} from 'react-icons/md'
import { useStateContext } from '../../../contexts/ContextProvider'
import { PreviousButton } from '../../button'
import { useReactToPrint } from 'react-to-print'



const EmployeeJoiningFormData = ({show}) => {

    const componentPDF = useRef();
    const {setActiveMenu,activeMenu,setThemeSettings} = useStateContext()
    
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "dsdsdsdsds",
        onAfterPrint:()=>alert("Data saved in PDF")
    })

    if(!show){
        return null
    }
  return (
    <div className='absolute m-8 pt-10 pr-2 pl-2 top-9 bottom-0 right-0 bg-sky-900/25 overflow-y-auto h-screen' >

       <div>
            <button onClick={ generatePDF }>
                Print
            </button>
        </div> 
    <div className='bg-white dark:bg-gray-600 text-black dark:text-white' ref={componentPDF}>
        <div className=''>
        <div className='border border-black w-full p-1 text-black dark:border-white'>
            <div className='border border-black w-full dark:border-white'>
                {/* Company logo */}
                <div className='grid p-5 pt-10 pb-10 grid-cols-2'>
                    <div className='flex items-center '>
                        <img src="" alt="comp_logo" />
                    </div>
                    <div className='flex justify-center items-end flex-col '>
                        <h2>Star Calibration</h2>
                        <h4>Technology Optimized</h4>
                    </div>
                </div>

                {/* Employe joining form  */}
                <div>
                    <h1 className='text-center uppercase underline text-2xl text-bold'>Employee Joining Form</h1>
                </div>

                <div className='border border-black m-1 '>
                    <h2 className='p-1 border border-black underline uppercase text-bold text-xl bg-gray-300 dark:bg-gray-800'>Personal Details</h2>
                    <div className='grid md:grid-cols-5 sm:grid-cols-4 lg:grid-cols-6 w-full'>
                        <div className='md:col-span-4 sm:col-span-3 lg:col-span-5'>
                            <div className='flex gap-3 text-lg p-1 border border-black'>
                                <div className='text-bold'><p>Name:</p></div>
                                <div className=''><p>Himanshu Negi</p></div>
                            </div>
                            <div className='flex gap-3 text-lg p-1 border border-black'>
                                <div className='text-bold'><p>Father's Name:</p></div>
                                <div><p>Raghubir Singh</p></div>
                            </div>
                            <div className='flex gap-3 text-lg p-1 border border-black'>
                                <div className='text-bold'><p>Correspondence Address:</p></div>
                                <div>
                                    
                                    <p>Himanshu Negi</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 text-lg p-1 border border-black'>
                                <div>
                                    <p>Himanshu Negi</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 text-lg p-1 border border-black'>
                                <div>
                                    <p>Himanshu Negi</p>
                                </div>
                            </div>
                            </div>
                         <div className='lg:col-span-1 border border-black dark:border-white'>
                            <div className=''>
                                <img className='w-52 bg-cover text-center ' src="" alt="PHOTOGRAPH" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-3 text-lg p-1 border border-black'>
                                    <div className='text-bold'><p>Permanent Address:</p></div>
                                    <div className=''><p>Himanshu Negi</p></div>
                        </div>
                        <div className='flex gap-3 text-lg p-1 border border-black'>
                                    <div className=''><p>Permanent Address:</p></div>
                        </div>
                        <div className='flex gap-3 text-lg p-1 border border-black'>
                                    <div className=''><p>Permanent Address:</p></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 p-1 border-black border text-lg'>
                        <div className='flex gap-3'>
                            <p className='text-bold '>Mobile:</p>
                            <p>7878787878</p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='text-bold'>Email ID:</p>
                            <p>himanshu@gmail.com</p>

                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Date of Birth:</p><p>23/06/1993</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Marital Status:</p><p>Married</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Pan Card No:</p><p>dsd555454</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Blood Group:</p><p>B+ve</p></div>
                    </div>
                    <div className='p-2 text-center text-bold text-lg border border-black bg-gray-300 dark:bg-gray-800'><h2>Emergency Contact Details</h2></div>
                    <div className='grid grid-cols-3'>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Name:</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Relation:</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Contact No:</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Name</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p>dsdsdsds</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p>56565</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p className='text-bold'>Name</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p>dsdsdsds</p></div>
                        <div className='flex gap-3 border p-1 border-black '><p>56565</p></div>
                    </div>
                </div>
                <div>
                    <div className='m-1' >
                            <h2 className='p-1 text-bold underline uppercase text-xl border border-black bg-gray-300 dark:bg-gray-800'>Education Details</h2>
                            <div className='grid grid-cols-6 text-center'>
                                <div className='text-bold p-1 border border-black'><p>Degree</p></div>
                                <div className='text-bold text-justify p-2 border border-black'><p>University/ Institute</p></div>
                                <div className='text-bold p-1 border border-black'><p>From</p></div>
                                <div className='text-bold p-1 border border-black'><p>To</p></div>
                                <div className='text-bold p-1 border border-black'><p>Percentage/ Grade</p></div>
                                <div className='text-bold p-1 border border-black'><p>Specialization</p></div>
                            </div>
                            <div className='grid grid-cols-6'>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                            </div>
                            <div className='grid grid-cols-6'>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                            </div>
                            <div className='grid grid-cols-6'>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                                <div className='text-justify p-1 border border-black'><p>fdfd</p></div>
                            </div>
                    </div>
                </div>
                <div className='flex gap-3 pt-3 pb-3 pl-1 border border-black'>
                    <p className='text-bold uppercase'>Company Address</p>
                    <p>dsdsdsddddddddddddddddd</p>
                </div>
                <div className='m-1'>
                    <h2 className='text-bold text-center border border-black underline p-2 bg-gray-300 dark:bg-gray-800'>Employment Details</h2>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center text-bold'>
                            <div className='flex border border-black'>
                                <div className='border w-28 border-r-black dark:border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border dark:border-black'>
                                    <p>Organization</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Designation</p></div>
                            <div className='border border-black'><p>Period Of Service</p>
                            <div className='flex justify-evenly border border-black'><p className='border border-black w-full'>From</p><p className='w-full'>To</p></div>
                            </div>
                            <div className='border border-black'><p>Annual CTC</p></div>
                        </div>
                    </div>

                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex border border-black'>
                                <div className='w-28 border border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full'>
                                    <p>Organization</p>
                                </div>
                            </div>
                            <div className='border border-black '><p>Designation</p></div>
                            <div className='border border-black '>
                            <div className='flex justify-evenly'><p className='w-full'>From</p><p className='w-full border border-black'>To</p></div>
                            </div>
                            <div className='border border-black'><p>Annual CTC</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex border border-black'>
                                <div className='w-28 border border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full'>
                                    <p>Organization</p>
                                </div>
                            </div>
                            <div className='border border-black '><p>Designation</p></div>
                            <div className='border border-black '>
                            <div className='flex justify-evenly'><p className='w-full'>From</p><p className='w-full border border-black'>To</p></div>
                            </div>
                            <div className='border border-black'><p>Annual CTC</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex border border-black'>
                                <div className='w-28 border border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full'>
                                    <p>Organization</p>
                                </div>
                            </div>
                            <div className='border border-black '><p>Designation</p></div>
                            <div className='border border-black '>
                            <div className='flex justify-evenly'><p className='w-full'>From</p><p className='w-full border border-black'>To</p></div>
                            </div>
                            <div className='border border-black'><p>Annual CTC</p></div>
                        </div>
                    </div>
                    

                    
                </div>

                <div className='m-1'>
                    <h2 className='text-bold text-center border border-black underline p-1 bg-gray-300 dark:bg-gray-800 uppercase'>Family Details</h2>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center text-bold'>
                            <div className='flex'>
                                <div className='w-28 border border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex'>
                                <div className='border w-28 border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex'>
                                <div className='border w-28 border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex'>
                                <div className='border w-28 border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex'>
                                <div className='border w-28 border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>
                    <div className='' >   
                        <div className='grid grid-cols-4 text-center'>
                            <div className='flex'>
                                <div className='border w-28 border-black'>
                                    <p>Sr No</p>
                                </div>
                                <div className='w-full border border-black'>
                                    <p>Name</p>
                                </div>
                            </div>
                            <div className='border border-black'><p>Relation</p></div>
                            <div className='border border-black'><p>Occupation</p></div>
                        
                            <div className='border border-black'><p>Date of Birth</p></div>
                        </div>
                    </div>

                </div>  

                <div className='m-1 border border-black' >
                    <h2 className='bg-gray-300 text-bold uppercase underline text-center text-xl p-2 border border-black dark:bg-gray-800'>Declaration</h2>
                    <div className='p-2 mt-2 text-justify '>
                        <p>
                            I hereby declare that the above statements made in my application form are true, complete and correct to the best of my knowledge and belief. In the event of any information being found false or incorrect at any stage, my services are liable to be terminated
                            without notice.
                        </p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col gap-5 p-5 mt-7'>
                            <div className='flex gap-4'>
                            <p>Date:</p>
                            <p className='w-60 mt-5'><hr /></p>
                            </div>
                            <div className='flex gap-4'>
                            <p>Place:</p>
                            <p className='w-60 mt-5'><hr /></p>
                            </div>
                        </div>
                        <div className='flex gap-3 items-end p-10'>
                            <p>Signature:</p>
                            <p className='w-full h-20 border border-black dark:border-white rounded-xl'></p>
                        </div>

                    </div>
                </div>
                
            </div> 
        </div>
        </div>
    </div>
    
    </div>
  )
}

export default EmployeeJoiningFormData