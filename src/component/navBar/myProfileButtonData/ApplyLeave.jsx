import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'
import { toast } from 'react-toastify'
import axios from 'axios'


const ApplyLeave = () => {

  const {fetchIndividualEmployeeData,host ,loggedInEmployee} = useStateContext()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data,setData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    comments: "",
  })

  const numOfDays = Math.floor(data.startDate - data.endDate)
  console.log(numOfDays)


  useEffect(() => {
    fetchIndividualEmployeeData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
  }
  setIsSubmitting(true); // Start the submission process

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.post(`${host}/api/checkInDetails/addCheckIn`, {data}, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        console.log(response.data);
        if(response.data.status){
            toast.success(response.data.message)
        }else{
            toast.warning(response.data.message);
        }
        // Handle success or display response to the user
    } catch (error) {
        toast.error(error)
        console.error('Error adding check-in data:', error);
        // Handle error or display error message to the user
    } finally {
      setIsSubmitting(false); // Enable the button again regardless of success or failure
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  
  setData((prevEmployee) => {
    return {...prevEmployee,[name]:value}
  })
  console.log(data)
}


  const employeeDetails = loggedInEmployee[0]?.employeeData[0]


  return (
    <div className=' text-black dark:text-white border border-black dark:border-white'>
      <div className='flex flex-col justify-center items-center p-5 gap-3 divide-y divide-black'>
        <div><h1 className='text-2xl text-bold'>Leave Application Form</h1></div>
        <div className='p-2'><p className='text-justify'>Please fill in the form below if you need to leave work. All leave applications need to be approved by both the HOD and the manager.</p></div>
      </div>
      <div className='border dark:border-white border-black ml-5 mr-5 mb-5'>
        <form action="#">
          <div className='grid grid-cols-2 gap-3 p-5'>
            <div className='col-span-1'><label for="f_name">Applicant First Name</label><input type="text" id="f_name" value={employeeDetails.fName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" disabled /></div>
            <div className='col-span-1'><label for="l_name">Applicant Last Name</label><input type="text" id="l_name" value={employeeDetails.lName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" disabled /></div>
            <div className='col-span-1'><label for="department">Department</label>
            <select id="department" value={employeeDetails.department} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
            <option selected value="">
                    : : : Department : : :
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Account">Account</option>
                  <option value="Calibration">Calibration</option>
                  <option value="HVAC Validation">HVAC Validation</option>
                  <option value="Thermal Validation">Thermal Validation</option>
                  <option value="CA Validation">CA Validation</option>
                  <option value="PLC & CSV Validation">PLC & CSV Validation</option>
                  <option value="Steam Quality Validation">
                    Steam Quality Validation
                  </option>
            </select>
            </div>
            <div className='col-span-1'><label for="pho_number">Phone</label><input type="number" id="pho_number" value={employeeDetails.mobile_number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" disabled /></div>
            <div className='col-span-2'><label for="email">Email</label><input type="email" id="email" value={employeeDetails.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" disabled /></div>
            <div className='col-span-2'><label for="reason">Reason for Leave</label>
                <div className='flex flex-col ml-5 gap-2 p-4'>
                <div className="flex items-center">
                    <input id="reason" type="checkbox" name='reason' value={data.reason} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="reason" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Leave</label>  
                </div>
                <div className="flex items-center">
                    <input id="reason" type="checkbox" name='reason' value={data.reason} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="reason" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Annual Leave</label>
                </div>
                <div className="flex items-center">
                    <input id="reason" type="checkbox" name='reason' value={data.reason} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="reason" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Personal Leave</label>  
                </div>
                <div className="flex items-center">
                    <input id="reason" type="checkbox" name='reason' value={data.reason} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="reason" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label> 
                </div>
                </div>
            </div>
            <div className='col-span-1'><label for="startDate">First day of absence</label><input type="date" id="startDate" name='startDate' value={data.startDate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
            <div className='col-span-1'><label for="endDate">Last day of absence</label><input type="date" id="endDate" name='endDate' value={data.endDate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
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