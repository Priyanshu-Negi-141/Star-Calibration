import React from 'react'

const SRF_Form = () => {
  return (
    <div>
        <h2 className='text-center text-bold uppercase underline' style={{fontFamily: 'Playfair'}}>Service Request Form</h2>
        <form action="">
            <div className='grid grid-cols-2 p-2'>
                <div className='flex col-span-1 gap-3'><h1>S.R.F No</h1><p></p></div>
                <div className='flex col-span-1 gap-3'><h1>Customer Ref</h1><p></p></div>
                <div className='flex col-span-1 gap-3'><h1>Date</h1><p></p></div>
                <div className='flex col-span-1 gap-3'><h1>Date</h1><p></p></div>
                <div className='flex col-span-2'><h1>Customer's Name and Address:</h1></div>
                <div className='flex col-span-1'><h1>Contact No.</h1><p></p></div>
                <div className='col-span-1'><h1>Contact Person:</h1><p></p></div>
            </div>
        </form>
    </div>
  )
}

export default SRF_Form