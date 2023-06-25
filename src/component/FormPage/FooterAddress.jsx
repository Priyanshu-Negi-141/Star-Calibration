import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

const FooterAddress = () => {

    const { currentColor } = useStateContext()

  return (
    <div className='m-4 ml-6 mr-6 text-lg border text-gray-600 p-4' style={{borderColor: currentColor}}>
        <p className='text-center text-bold' style={{fontFamily: 'Playfair'}}>Bayan Khala, Raja Road, Near Bajaj Workshop , Selaqui, Dehradun (U.K)</p>
        <p className='text-center text-bold' style={{fontFamily: 'Playfair'}}>Ph: 07533902785, 09548128188| email: star.calibration.tm@gmail.com | subhash1804@gmail.com</p>
    </div>
  )
}

export default FooterAddress