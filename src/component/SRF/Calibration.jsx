import { NavLink } from "react-router-dom";
import { calibrationData } from "../../data/SRF/calibration";
import { useStateContext } from "../../contexts/ContextProvider";

import React from 'react'

const Calibration = () => {

    const {currentColor} = useStateContext()


  return (
    <div className=''>
    <h3 className='text-black text-2xl rounded-xl mb-5 p-3 dark:text-yellow-50' style={{color: currentColor, border: '2px solid'}}>Calibration SRF</h3>
    <div className='flex flex-wrap lg:flex-nowrap justify-center'> 
        <button className='flex m-1 flex-wrap justify-center gap-9 items-center'>
            {
                calibrationData.map((item) => (
                    <NavLink to={item.path} >
                    <div key={item.path}
                    type = "button"
                    id={item.title}
                    className='dark:bg-white bg-gray-300 text-center border border-black dark:border-red-600 flex gap-1 dark:text-gray-200 dark:bg-secondary-dark-bg w-60 md:w-54 p-9 pt-4 pb-4  rounded-2xl'>   
                            
                                <button type='button' onClick={() => {}} style={{color:currentColor}} className='text-2xl opacity-0.9 rounded-full text-center bg-gray-800 dark:bg-gray-800 hover:drop-shadow-xl p-4'>
                                    {item.icon}
                                
                                </button>
                                
                            
                        <p className='text-sm flex items-center justify-center text-gray-600'>{item.title}</p>
                    </div>
                    </NavLink>
                ))
            }
        </button>
        
    </div>
    </div>
  )
}

export default Calibration