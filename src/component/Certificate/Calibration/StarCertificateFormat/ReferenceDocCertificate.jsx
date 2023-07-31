import React from 'react'

const ReferenceDocCertificate = (props) => {
  const {srfDetails} = props
  if(!srfDetails){
    return(
      <div>Loading...</div>
    )
  }
  return (
    <div className='mt-0.5'>
        <div>
            <div className='flex gap-2'>
                <p className='font-bold'>Reference Documents for Calibration :</p>
                <p>{srfDetails.instrumentDetails[0].instrument.cal_procedure},</p>
                <p className='font-bold'>Reference Standard :</p>
                <p>{srfDetails.instrumentDetails[0].instrument.supporting_standards}</p>
            </div>
            <div className='flex gap-2 underline underline-offset-1'>
                <p className='font-bold'>Discipline:</p>
                <p>Electro</p>
            </div>
        </div>
    </div>
  )
}

export default ReferenceDocCertificate