import React, { useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { PreviousButton } from '../button';



const UnitsParameter = () => {
    const { currentColor } = useStateContext()
    const [rows, setRows] = useState(['']);
    const handleAddRow = () => {
        setRows([...rows, '']);
      };

      const handleDeleteRow = (index) => {
        const updatedRows = [...rows.slice()];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      };


  return (
    <div>
        <div>
            <PreviousButton />
        </div>
    <h2 className='border p-2 text-center text-bold bg-gray-300 dark:bg-gray-800' style={{borderColor: currentColor,color: currentColor}}>Units & Parameters</h2>
    <form action="">
    <div className='border-dashed border-2 border-black dark:border-white mt-2 p-5'>
        <div className='border border-black dark:border-white dark:text-white'>
                    <div className='border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white'><h2>Emergency Contact Detail's</h2></div>
                        <div className='grid grid-cols-8 text-center'>
                            <div className='col-span-1 border p-2 border-black dark:border-white dark:text-white'>SL No</div>
                            <div className='col-span-3 border p-2 border-black dark:border-white'><p>Parameter</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Description</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Symbol</p></div>
                        </div>
                        {
                            rows.map((data,i) => {
                                return( 
                                    <div className='grid grid-cols-8 text-center'>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-3 border border-black dark:border-white'><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                    </div>


// Purchase, QA, QC Engineering, Account,HR, 
                                )
                            })
                        }
                </div>
                {/* Adding new button for creating new same form */}
                <div className='flex mt-2 justify-end'>
                    <div className=''>
                    <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={handleAddRow} >Add</button>
                    </div>
                    <div>
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={handleDeleteRow} >Delete</button>
                    </div>
                    
                </div>
            </div>
        </form>

    </div>
  )
}

export default UnitsParameter