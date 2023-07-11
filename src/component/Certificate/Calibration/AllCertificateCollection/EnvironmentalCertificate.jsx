import React from 'react'

const EnvironmentalCertificate = () => {
  return (
    <div>
        <div className='mt-0.5'>
            <div className=' border border-black'>
                <div>
                    <div className='grid grid-cols-5 border border-black'>
                        <div className='col-span-1 border border-black text-bold'>
                            <p className='pl-2'>Environmental Condition</p>
                        </div>
                        <div className='col-span-2'>
                            <div className='grid grid-cols-3'>
                                <div className='col-span-2'>
                                    <div className='grid grid-rows-2'>
                                        <p className='pl-2 border border-black'>Temprature (C)</p>
                                        <p className='pl-2 border border-black'>Relative Humidity (%RH)</p>
                                    </div>
                                </div>
                                <div className='grid grid-rows-2'>
                                    <p className='pl-2 border border-black'>d</p>
                                    <p className='pl-2 border border-black'>d</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='grid grid-rows-2'>
                                <div className='col-span-1'>
                                    <div className='grid grid-cols-2'>
                                        <p className='pl-2 border border-black'>Calibration Procedure</p>
                                        <p className='pl-2 border border-black'>d</p>
                                    </div>                               
                                </div>
                                <div className='col-span-1'>
                                    <div className='grid grid-cols-2'>
                                        <p className='pl-2 border border-black'>Supporting Standars</p>
                                        <p className='pl-2 border border-black'>d</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EnvironmentalCertificate