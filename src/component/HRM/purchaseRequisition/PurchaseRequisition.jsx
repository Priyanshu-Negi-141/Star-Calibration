import React from 'react'
import { purchaseRequisitionData } from '../../../data/userManagement/purchaseRequisition/purchaseRequisitionData'
import { NavLink } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
const PurchaseRequisition = () => {
  const {currentColor} = useStateContext()
  return (
    <div className='ml-10'>
    <h3 className='text-black text-2xl dark:text-yellow-50'>Perchase Requisition</h3>
    <div className='flex flex-wrap lg:flex-nowrap justify-center'> 
        <button className='flex m-1 flex-wrap justify-center gap-9 items-center'>
            {
                purchaseRequisitionData.map((item) => (
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

export default PurchaseRequisition