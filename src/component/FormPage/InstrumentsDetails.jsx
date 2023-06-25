import React, { useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

const InstrumentsDetails = () => {

    const [val,setVal] = useState([''])
    const {currentColor} = useStateContext()

    const handleAdd = () => {
        const abc = [...val,['']]
        setVal(abc)
    }

    const handleDelete = (i) => {
        const deleteData = [...val]
        deleteData.splice(i, 1)
        const rearrangedData = deleteData.map((line, index) => ({
            ...line,
            id: index +1,
        }))
        setVal(rearrangedData)
    }

  return (
    <div className='m-3'>
        <h2 className='text-center text-bold underline'>Instruments Details</h2>
        <div className='border grid grid-cols-12 text-bold' style={{borderColor: currentColor}}>
            <div className='border text-center col-span-1' style={{backgroundColor: currentColor}}><h1>S. No.</h1></div>
            <div className='border text-center col-span-2' style={{backgroundColor: currentColor}}><h1>Instrument Name</h1></div>
            <div className='border text-center col-span-2' style={{backgroundColor: currentColor}}><h1>Make/Model</h1></div>
            <div className='border text-center col-span-2' style={{backgroundColor: currentColor}}><h1>Serial. No./ID No.</h1></div>
            <div className='border text-center col-span-2' style={{backgroundColor: currentColor}}><h1>Range/LC</h1></div>
            <div className='border text-center col-span-1' style={{backgroundColor: currentColor}}><h1>Accuracy</h1></div>
            <div className='border text-center col-span-2' style={{backgroundColor: currentColor}}><h1>Location</h1></div>
        </div>
        {
            val.map((data,i) => {
                return (
                    <div className='border grid grid-cols-12 text-center' style={{borderColor: currentColor}}>
                        <div className='border text-center col-span-1' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${i + 1}`} readOnly /></div>
                        <div className='border text-center col-span-2' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                        <div className='border text-center col-span-2' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                        <div className='border text-center col-span-2' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                        <div className='border text-center col-span-2' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                        <div className='border text-center col-span-1' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                        <div className='border text-center col-span-2' style={{borderColor: currentColor}}><input type="text" id="f_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /></div>
                    </div>
                )
            })
        }
        {/* Adding new button for creating new same form */}
        <div className='flex mt-2 justify-end'>
                <div className=''>
                <button type="button" class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={() => handleAdd()} >Add</button>
                </div>
                <div>
                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete()} >Delete</button>
                </div>
            </div>
    </div>
  )
}

export default InstrumentsDetails