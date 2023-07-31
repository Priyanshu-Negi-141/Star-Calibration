import React from 'react'

const HeaderCertificate = (props) => {
    const {srfDetails} = props

    if(!srfDetails){
        return(
            <div>Loading....</div>
        )
    }



  return (
    <div>
        <div className='grid grid-cols-2 gap-5 font-bold'>
            <div className='col-span-1 grid grid-cols-3'>
                <p className=''>Certificate No:</p>
                <p className='col-span-2'>{srfDetails.instrumentDetails[0].instrument.certificateNumber}</p>
            </div>
            <div className='col-span-1 flex justify-end'>
                <p>Page No: 1 of 1</p>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <div className='col-span-1 grid grid-cols-3'>
                <p className='font-bold'>User Name:</p>
                <h1 className='col-span-2'>
                <p>{srfDetails.client_name}</p>
                    <p>{srfDetails.clientAddress.address_line_1}, {srfDetails.clientAddress.address_line_2},{srfDetails.clientAddress.city}, {srfDetails.clientAddress.postal_code},</p>
                    <p>{srfDetails.clientAddress.district}, {srfDetails.clientAddress.state}</p>
                </h1>
            </div>
        </div>
    </div>
  )
}

export default HeaderCertificate