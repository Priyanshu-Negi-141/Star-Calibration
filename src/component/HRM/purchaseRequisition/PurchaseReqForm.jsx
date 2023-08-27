import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { AiOutlineSend } from 'react-icons/ai'
import { useStateContext } from '../../../contexts/ContextProvider'

const PurchaseReqForm = () => {

    const {currentColor} = useStateContext()

  return (

    <div className='m-10'>
        <div className='mb-5 text-center border border-black p-2 bg-gray-300 dark:bg-gray-800 dark:text-white'><h1>Purchase Request Form</h1></div>
        <form action="#" className=''>
            <div className='grid grid-cols-12 text-center text-black dark:text-white border border-black dark:border-white dark:bg-gray-800 bg-gray-300'>
                <div className="col-span-1 p-2 border border-white"><p>SL No.</p></div>
                <div className="col-span-3 p-2 border border-white"><p>Item Name</p></div>
                <div className="col-span-4 p-2 border border-white"><p>Description</p></div>
                <div className="col-span-1 p-2 border border-white"><p>Qty</p></div>
                <div className="col-span-1 p-2 border border-white"><p>Rate</p></div>
                <div className="col-span-2 p-2 border border-white"><p>Amount</p></div>
            </div>
            <div className='grid grid-cols-12 text-center text-black dark:text-white border border-black dark:border-white'>
                <div className="col-span-1 border border-white"><input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                <div className="col-span-3 border border-white"><input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                <div className="col-span-4 border border-white"><input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                <div className="col-span-1 border border-white"><input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                <div className="col-span-1 border border-white"><input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
                <div className="col-span-2 border border-white"><input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/></div>
            </div>
            <div className='flex justify-end items-end gap-2 mt-5'>
                <button style={{color:currentColor}} className='text-xl opacity-0.9 rounded-full text-center bg-gray-800 dark:bg-gray-600 hover:drop-shadow-xl p-4'>
                        <IoIosAddCircleOutline />
                </button>
                <button style={{color:currentColor}} className='text-xl opacity-0.9 rounded-full text-center bg-sky-600 dark:bg-sky-600 hover:drop-shadow-xl p-4'><AiOutlineSend /></button>

            </div>
        </form>
    
    
    
    
    
    
    
    
    </div>
  )
}

export default PurchaseReqForm