import React from 'react'
import { useNavigate } from 'react-router-dom'
import {MdOutlineArrowBackIos} from 'react-icons/md'

const PreviousButton = () => {

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

  return (
    <div className=''>
            <button onClick={goBack} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"><MdOutlineArrowBackIos />Previous</button>
    </div>
  )
}

export default PreviousButton