import React from 'react'
import { hvacValData } from '../../data/SRF/hvac_validation'

const CaValidation = () => {
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
    <div className='flex m-8 flex-wrap justify-center gap-9 items-center'>
        {
            
           hvacValData.map((item) => ( 
                <div key={item.id}
                id={item.title}
                className='bg-white text-center border dark:text-gray-200 dark:bg-secondary-dark-bg w-60 md:w-54 p-14 pt-12 pb-12  rounded-2xl' style={{backgroundColor: "#ECF2FF"}}>   
                        <button type='button' onClick={() => {}} style={{color:item.iconColor,backgroundColor:item.iconBg}} className='text-2xl opacity-0.9 rounded-full text-center hover:drop-shadow-xl p-4'>
                            {item.icon}
                            {console.log(`${item.component}`)}
                        </button>
                        
                    <p className='text-sm text-center text-gray-600 mt-3'>{item.title}</p>
                </div>
                
            ))
        }
    </div>   
     
</div>
  )
}

export default CaValidation