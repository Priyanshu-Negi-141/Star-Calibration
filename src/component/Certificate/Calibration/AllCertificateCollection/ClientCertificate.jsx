import React from 'react'

const ClientCertificate = () => {
  return (
    <div>
        
        <div className='flex justify-between px-8'>
            <p>Format No:</p>
            <div>
                <p>Page:</p>
            </div>
        </div>
        <div className='grid grid-cols-2'>
            <div className='col-span-1 border border-black w-full'>
                <div className='grid grid-cols-3 h-full'>
                <div className='border col-span-1 p-3 text-bold w-full border-black flex flex-col justify-center items-center'>
                    <h1>Customer Name</h1>
                    <h1>&</h1>
                    <h1>Address</h1>
                </div>
                <div className='border col-span-2 w-full border-black'>
                    <p>fkdsflsf</p>
                </div>
                </div>
            </div>
            <div className='w-full col-span-1 border border-black'>
                <div className=''>
                    <div className='text-bold grid grid-cols-2'>
                        <p className='border border-y-black border-r-black'>Certificate No.</p>
                        <p className='border border-black'></p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='border border-y-black border-r-black'>Date of Issue</p>
                        <p className='border border-black'></p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='border border-y-black border-r-black'>Date of Calibration</p>
                        <p className='border border-black'></p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='border border-y-black border-r-black'>Valid Up to</p>
                        <p className='border border-black'></p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='border border-y-black border-r-black text-bold'>SRF No & Date of Receipt</p>
                        <p className='border border-black'></p>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ClientCertificate