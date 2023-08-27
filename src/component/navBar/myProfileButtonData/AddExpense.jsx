import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddExpense = () => {

  const [rows, setRows] = useState([{ num1: '', num2: '', num3: '', result: '' }]);
    const [total, setTotal] = useState(0);
    const [advance, setAdvance] = useState(0)

    

    const handleAddRow = () => {
        setRows([...rows, { num1: '', num2: '', num3: '', result: '' }]);
      };
      
      const handleDeleteRow = (index) => {
        const updatedRows = [...rows.slice()];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        updateTotal(updatedRows)
      };
      
      const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
      
        // Calculate the sum and update the result field
        const sum = Number(updatedRows[index].num1) + Number(updatedRows[index].num2) + Number(updatedRows[index].num3);
        updatedRows[index].result = sum || '';
        setRows(updatedRows);
        updateTotal(updatedRows)
      };
      
        const handleAdvanceChange = (e) => {
          setAdvance(Number(e.target.value))
        }
      
        const updateTotal = (updatedRows) =>  {
          const sum = updatedRows.reduce((acc, row) => acc + Number(row.result), 0);
          setTotal(sum);
        }
      
        const netAmount = total - advance;
    

  return (
    <div>
            <div className=''>
                <div className='border border-black dark:border-white dark:text-white'>
                    <div className='border border-black text-bold p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white'><h2>Add Expense</h2></div>
                        <div className='grid grid-cols-12 text-center text-bold bg-gray-300 dark:bg-gray-800'>
                            <div className='text-left p-1 pl-2 col-span-12 border border-black dark:border-white'><h2>Wallet</h2></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>SL No.</p></div>
                            <div className='col-span-2 border p-2 border-black dark:border-white'><p>Date</p></div>
                            <div className='col-span-4 border p-2 border-black dark:border-white'><p>Description</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>Travel</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>Meal</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>Lodging</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>Your Total</p></div>
                            <div className='col-span-1 border p-2 border-black dark:border-white'><p>Delete</p></div>
                        </div>
                        {
                            rows.map((row,index) => (
                                  <div>
                                    <div className='grid grid-cols-12 text-center'>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-2 border border-black dark:border-white'><input type="date" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-4 border border-black dark:border-white'><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" value={row.num1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleChange(index, 'num1', e.target.value)} required /></div>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" value={row.num2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleChange(index, 'num2', e.target.value)} required /></div>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" value={row.num3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleChange(index, 'num3', e.target.value)} required /></div>
                                        <div className='col-span-1 border border-black dark:border-white'><input type="number" id="f_date" value={row.result} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly /></div>
                                        <div className='col-span-1 border border-black dark:border-white'>
                                              <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-lg w-full h-full dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDeleteRow(index)} >X</button>
                                        </div>
                                    </div>
                                    
                                  </div>
                                )
                            )
                        }
                        <div className='grid grid-cols-3 bg-gray-300 dark:bg-gray-800 border border-black dark:border-white text-center'>
                          <div className='flex flex-col justify-center items-center text-lg text-black dark:text-white text-bold'><p className='border w-full p-2 border-black dark:border-white'>Total</p><input type="number" value={total} className="bg-gray-300 border text-center border-black text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled /></div>
                          <div className='flex flex-col justify-center items-center text-lg text-black dark:text-white text-bold'><p className='border w-full p-2 border-black dark:border-white'>Advance</p><input type="number" value={advance} className="bg-gray-50 border text-center border-black text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleAdvanceChange} /></div>
                          <div className='flex flex-col justify-center items-center text-lg text-black dark:text-white text-bold'><p className='border w-full p-2 border-black dark:border-white'>Net Amount</p><input type="number" value={netAmount} className="bg-gray-300 border text-center border-black text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled /></div>
                        </div>
                </div>

        </div>
        
        <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={handleAddRow} >Add</button>
                </div>
                
                <div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                </div>
            </div>
    </div>

  )
}

export default AddExpense