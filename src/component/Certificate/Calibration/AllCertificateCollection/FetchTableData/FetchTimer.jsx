import React from 'react'

const FetchTimer = () => {
  return (
    <div className="mt-0.5 text-12">
      <h2 className="font-bold underline text-center">Calibration Result</h2>
      <div className="mt-1">
        <div className="grid grid-cols-12 text-center font-bold">
          <div className="col-span-1 border-x border-y grid place-items-center border-black">
            <p>Sr. No</p>
          </div>
          <div className="col-span-11 grid grid-cols-8 border-y border-black">
            <div className="border-r border-black grid place-items-center col-span-3">
              <h1>Unit Under Calibration in Min.</h1>
            </div>
            <div className="border-r border-black col-span-5">
              <h1>Standard Reading in</h1>
              <div className='border-t border-black grid grid-cols-4'>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Hrs.</h1>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Min.</h1>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Sec.</h1>
                <div className='col-span-1 grid place-items-center'>
                <h1 className=''>1/100</h1>
                <h1 className=''>Sec</h1>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 text-center border-b border-black">
          <div className="col-span-1 border-x grid place-items-center border-black">
            <p>Sr. No</p>
          </div>
          <div className="col-span-11 grid grid-cols-8">
            <div className="border-r border-black grid place-items-center col-span-3">
              <h1>Unit</h1>
            </div>
            <div className="border-r border-black col-span-5">
              <div className='grid grid-cols-4'>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Hrs.</h1>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Min</h1>
                <h1 className='col-span-1 grid place-items-center border-r border-black'>Sec.</h1>
                <h1 className='col-span-1 grid place-items-center border- border-black'>1/100</h1>     
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FetchTimer