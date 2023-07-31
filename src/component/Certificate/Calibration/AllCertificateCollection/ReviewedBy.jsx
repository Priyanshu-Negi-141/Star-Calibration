import React from 'react'

const ReviewedBy = () => {
  return (
    <div className='font-roman'>
        <div className='grid grid-cols-2 p-6 font-roman'>
            <div>
                <p>Calibrated By:</p>
                <p>Designation:()</p>
            </div>
            <div className='grid place-items-center'>
                <p>Approved By:</p>
                <p>Designation:()</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewedBy