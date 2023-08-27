import React from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'


const ApplyLeave = () => {

  const {fetchIndividualEmployeeData ,loggedInEmployee} = useStateContext()


  return (
    <div className=' text-black dark:text-white border border-black dark:border-white'>
      <div className='flex flex-col justify-center items-center p-5 gap-3 divide-y divide-black'>
        <div><h1 className='text-2xl text-bold'>Leave Application Form</h1></div>
        <div className='p-2'><p className='text-justify'>Please fill in the form below if you need to leave work. All leave applications need to be approved by both the HOD and the manager.</p></div>
      </div>
      <div className='border dark:border-white border-black ml-5 mr-5 mb-5'>
        <form action="#">
          <div className='grid grid-cols-2 gap-3 p-5'>
            <div className='col-span-1'><label for="f_name">Applicant First Name</label><input type="text" id="f_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required /></div>
            <div className='col-span-1'><label for="l_name">Applicant Last Name</label><input type="text" id="l_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required /></div>
            <div className='col-span-1'><label for="department">Department</label>
            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>: : : Select Department : : :</option>
                        <option value="calibration">Calibration</option>
                        <option value="hvac">HVAC Validation</option>
                        <option value="thermal">Thermal Validation</option>
                        <option value="plccsv">PLC & CSV Validation</option>
                        <option value="ca">CA Validation</option>
                        <option value="steam">Steam Quality Test</option>
            </select>
            </div>
            <div className='col-span-1'><label for="pho_number">Phone</label><input type="number" id="pho_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required /></div>
            <div className='col-span-2'><label for="email">Email</label><input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required /></div>
            <div className='col-span-2'><label for="">Reason for Leave</label>
                <div className='flex flex-col ml-5 gap-2 p-4'>
                <div className="flex items-center">
                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Leave</label>  
                </div>
                <div className="flex items-center">
                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Annual Leave</label>
                </div>
                <div className="flex items-center">
                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Personal Leave</label>  
                </div>
                <div className="flex items-center">
                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label> 
                </div>
                </div>
            </div>
            <div className='col-span-1'><label for="f_date">First day of absence</label><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
            <div className='col-span-1'><label for="l_date">Last day of absence</label><input type="date" id="l_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
            <div className='col-span-2'><label for="">No, of days requested</label><input type="text" id="mother" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Day's" required /></div>
            <div className='col-span-2'><label for="comments">Comments (optional)</label>
            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>
          </div>
          <div className='flex justify-center items-center'>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
            </span>
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}
 

export default ApplyLeave