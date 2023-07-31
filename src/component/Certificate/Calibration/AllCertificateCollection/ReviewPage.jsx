import React from 'react'

const ReviewPage = () => {
  return (
    <div className='mt-0.5'>
        <div className='grid grid-flow-row border border-black'>
            <div className='grid grid-flow-row'>
                <p className='font-bold pl-2 border-b border-black'>Calibration Done by Loop Method</p>
                <p className='font-bold pl-2'>Results are ok as per acceptance criteria</p>
            </div>
            <div className='grid grid-flow-row pl-2 border-t border-black'>
                <p>* This result of calibration refers only to the particular item submitted/undergone calibration</p>
                <p>* This certificate shall not be reproduce, except in full, without the written permission of the laboratory.</p>
                <p>* The reported results are valid at the time of and under the stated conditions of measurement</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewPage