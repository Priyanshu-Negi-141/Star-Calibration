import React from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'

const ViewAttendance = () => {

  const {currentColor} = useStateContext()

  return (
    <div>
      <div className='text-black dark:text-white' style={{border: '1px solid', borderColor: currentColor}}>
        <div className='p-2 text-center bg-gray-300 dark:bg-gray-800 text-lg text-black dark:text-white' style={{border: '1px solid', borderColor: currentColor}}>
          <h1>My Attendance</h1>
        </div>
        <div>
          <div className='p-2 bg-gray-300 dark:bg-gray-800'>
            <h2>Monday</h2>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ViewAttendance