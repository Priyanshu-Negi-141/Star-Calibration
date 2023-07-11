import React from 'react'

const InstrumentCertificate = () => {
  return (
    <div className='mt-0.5'>
        <div className='border border-x-black border-t-black text-center text-bold'>
            <p>Details of Unit Under Calibration</p>
        </div>
        <div className='grid grid-cols-2 border border-black'>
            <div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Instrument Name</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Make/Model</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Range/Size</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Least Count</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Calibrated at</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Serial No.</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Identification No.</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Accuracy/Tolarance</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Visual Inspection</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
                <div className='grid grid-cols-2 border border-black'>
                    <p className='pl-2 border border-x-black'>Zero Error</p>
                    <p className='pl-2 border border-x-black'></p>
                </div>
            </div>
            <div className='col-span-2'>
                <div className='grid grid-cols-4 border border-black'>
                    <p className='pl-2 col-span-1 border border-x-black'>Location</p>
                    <p className='pl-2 col-span-3 border border-x-black'></p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default InstrumentCertificate