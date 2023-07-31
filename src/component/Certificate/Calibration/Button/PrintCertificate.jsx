import React from 'react'
import CalibrationCertificate from '../CalibrationCertificate'

const PrintCertificate = () => {

    const handlePrint = () => {
        window.print()
    }

  return (
    <>
        <CalibrationCertificate />
        <div>
          <button onClick={handlePrint}>Print</button>
        </div>
    </>
  )
}

export default PrintCertificate