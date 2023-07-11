import React from 'react'

const CalibrationResult = () => {
  return (
    <div className='mt-0.5'>
        <h2 className='text-bold underline text-center'>Calibration Result</h2>
        <div className='mt-1 border border-black'>
            <div>
                <table  className='w-full'>
                    <thead className='grid grid-cols-9 w-full'>
                        <th className='border col-span-1 text-center border-black p-0.5'>
                            <h1>Sr. No</h1>
                        </th>
                        <th className='border col-span-2 text-center border-black p-0.5'>
                            <h1>Unit Under Calibration</h1>
                            <h1>in (At Chart Recorder</h1>
                            <h1>CH-06)</h1>
                        </th>
                        <th className='border col-span-2 text-center border-black p-0.5'>
                            <h1>Standard Reading in</h1>
                            <h1>(C)</h1>
                        </th>
                        <th className='border col-span-2 text-center border-black p-0.5'>
                            <h1>Error in</h1>
                            <h1>(C)</h1>
                        </th>
                        <th className='border col-span-2 text-center border-black p-0.5'>
                            <h1>Error in % of ES</h1>
                        </th>
                    </thead>
                    <tbody>
                        <tr className='grid grid-cols-9'>
                            <td className='border col-span-1 text-center border-black p-0.5'>1</td>
                            <td className='border col-span-2 text-center border-black p-0.5'></td>
                            <td className='border col-span-2 text-center border-black p-0.5'></td>
                            <td className='border col-span-2 text-center border-black p-0.5'></td>
                            <td className='border col-span-2 text-center border-black p-0.5'></td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>

    </div>
  )
}

export default CalibrationResult