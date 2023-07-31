import React from 'react'

const InstrumentCertificate = (props) => {
    const {srfDetails} = props

    

  return (
    <div className='mt-0.5'>
        <div className='border border-x-black border-t-black text-center font-bold'>
            <p>Details of Unit Under Calibration</p>
        </div>
        {srfDetails ? (
        <div className='grid grid-cols-11'>
            <div className='border col-span-5 border-black'>
                <div className='grid grid-cols-5'>
                    <p className='pl-2 col-span-2 border-r border-black'>Instrument Name</p>
                    <p className='pl-2 col-span-3'>{srfDetails.instrumentDetails[0].instrument.instrument_name}</p>
                </div>
                <div className='grid grid-cols-5 border-y border-black'>
                    <p className='pl-2 col-span-2 border-r border-black'>Make/Model</p>
                    <p className='pl-2 col-span-3'>{srfDetails.instrumentDetails[0].instrument.make_model}</p>
                </div>
                <div className='grid grid-cols-5'>
                    <p className='pl-2 col-span-2 border-r border-black'>Range/Size</p>
                    <p className='pl-2 col-span-3'>{srfDetails.instrumentDetails[0].instrument.range}</p>
                </div>
                <div className='grid grid-cols-5 border-y border-black'>
                    <p className='pl-2 col-span-2 border-r border-black'>Least Count</p>
                    <p className='pl-2 col-span-3'>{srfDetails.instrumentDetails[0].instrument.least_count}</p>
                </div>
                <div className='grid grid-cols-5'>
                    <p className='pl-2 col-span-2 border-r border-black'>Calibrated at</p>
                    <p className='pl-2 col-span-3'>{srfDetails.instrumentDetails[0].instrument.calibrate_at}</p>
                </div>
            </div>
            <div className='border-y border-r col-span-6 border-black'>
                <div className='grid grid-cols-2 '>
                    <p className='pl-2 border-r border-black'>Serial No.</p>
                    <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.serial_number}</p>
                </div>
                <div className='grid grid-cols-2 border-y border-black'>
                    <p className='pl-2 border-r border-black'>Identification No.</p>
                    <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.id_number}</p>
                </div>
                <div className='grid grid-cols-2 '>
                    <p className='pl-2 border-r border-black'>Accuracy/Tolarance</p>
                    <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.accuracy}</p>
                </div>
                <div className='grid grid-cols-2 border-y border-black'>
                    <p className='pl-2 border-r border-black'>Visual Inspection</p>
                    <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.visual_inspection}</p>
                </div>
                <div className='grid grid-cols-2 '>
                    <p className='pl-2 border-r border-black'>Zero Error</p>
                    <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.zero_error}</p>
                </div>
            </div>
            <div className='col-span-11 grid grid-cols-11 border-b border-black'>
                    <p className='pl-2 border-x border-black col-span-2'>Location</p>
                    <p className='pl-2 border-r border-black col-span-9'>{srfDetails.instrumentDetails[0].instrument.location}</p>
            </div>
        </div>
        ):(
            <p>Loading....</p>
        )}
    </div>
  )
}

export default InstrumentCertificate