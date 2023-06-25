import React, {useState} from 'react'
import {PreviousButton} from '../../button/'
import { useStateContext } from '../../../contexts/ContextProvider'

const AddClient = () => {

    const {currentColor} = useStateContext()

    const [rows, setRows] = useState(['']);
    const [rows1, setRows1] = useState(['']);
    const handleAddRow = () => {
        setRows([...rows, '']);
        
      };
      const handleAddRow1 = () => {
        setRows1([...rows1, '']);
        
      };
      
      const handleDeleteRow = (index) => {
        const updatedRows = [...rows.slice()];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      };
      const handleDeleteRow1 = (index) => {
        const updatedRows = [...rows1.slice()];
        updatedRows.splice(index, 1);
        setRows1(updatedRows);
      };
      
      const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
      
        // Calculate the sum and update the result field
        
      }
      
      
       

  return (
    <div>

        <div>
            <PreviousButton />
        </div>
        <h2 className='border p-2 text-center bg-gray-300 dark:bg-gray-800' style={{borderColor: currentColor,color: currentColor}}>Client Details</h2>
    <form action="">
        <div className='border-dashed border-2 border-black p-5 mt-2'>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Code</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Name</label>
                    <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Client Name" required />
                </div>
            
                {/* <div>
                    <label for="mnumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile </label>
                    <input type="number" id="mnumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@companymail.com" required />
                </div> */}
            </div>
            {
                            rows.map((row,index) => (
            <div className='border border-dashed mb-2 p-2' style={{borderColor: currentColor}}>
            <div class="mb-1">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input type="text" id="address" class="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 1" required />
                <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address Line 2" />
            </div> 
            <div class="mb-2 flex gap-1">
                <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" required />
                <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Postal Code" required />
                <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-58 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="District" required />
                <select name="state" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>: : : Select State : : :</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                </select>
            </div>
             
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MSME No</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PAN No</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Client Name" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GST No</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Type</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>: : : Client Type : : :</option>
                            <option value="automobile">Automobile</option>
                            <option value="dealers">Dealers</option>
                            <option value="plastic">Plastic</option>
                            <option value="pharmaceuticals">Pharmaceuticals</option>
                            <option value="Testing & Calibration">Testing & Calibration</option>
                            <option value="lab">Lab</option>
                            <option value="oil_gas">Oil & Gas</option>
                            <option value="food_beverages">Food & Beverages</option>
                            <option value="Textiles">Textiles</option>
                            <option value="leather">Leather</option>
                            <option value="power_plant">Power Plant</option>
                            <option value="chemical">Chemical</option>
                            <option value="hospital">Hospital</option>
                            <option value="vender">Vender</option>
                            <option value="pathology">Pathology</option>
                        </select>
                    </div>
                    
            </div>
            </div>
            ))}
            <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={handleAddRow} >Add</button>
                </div>
                <div className=''>
                    <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={handleDeleteRow} >Delete</button>
                </div>
            </div>
        </div>

        {/* Personal */}
        
        <div className='border-dashed border-2 border-black dark:border-white mt-2 p-5'>
        <div className='border border-black dark:border-white dark:text-white'>
                    <div className='border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white'><h2>Emergency Contact Detail's</h2></div>
                        <div className='grid grid-cols-12 text-center'>
                            <div className='col-span-1 border p-2 border-black dark:border-white dark:text-white'>SL No</div>
                            <div className='col-span-3 border p-2 border-black dark:border-white'><p>Contact Person Name</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Mobile No</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Email</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Designation</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Department</p></div>
                        </div>
                        {
                            rows1.map((data,i) => {
                                return( 
                                    <div className='grid grid-cols-12 text-center'>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-3 border border-black dark:border-white'><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="email" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'>
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>: : : Department : : :</option>
                                            <option value="purchase">Purchase</option>
                                            <option value="qa">QA</option>
                                            <option value="qc">QC</option>
                                            <option value="engineering">Engineering</option>
                                            <option value="account">Account</option>
                                            <option value="hr">HR</option>
                                            <option value="sales">Sales</option>
                                        </select>
                                        </div>
                                    </div>


// Purchase, QA, QC Engineering, Account,HR, 
                                )
                            })
                        }
                </div>
                {/* Adding new button for creating new same form */}
                <div className='flex mt-2 justify-end'>
                    <div className=''>
                    <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={handleAddRow1} >Add</button>
                    </div>
                    <div>
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={handleDeleteRow1} >Delete</button>
                    </div>
                    
                </div>
            </div>

        {/* Submit and reset */}
        <div className='flex gap-3'>
        <button type="submit" class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <button type="reset" class="mt-10 text-white bg-green-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
        </div>

   
        </form>

    </div>

  )
}

export default AddClient