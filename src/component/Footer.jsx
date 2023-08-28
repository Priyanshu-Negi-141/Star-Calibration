import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Footer = () => {
    const {validexTitle,
        softVersion} = useStateContext()
  return (
    <footer className="bg-gray-800 text-white p-1 text-center text-sm">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} {validexTitle}. All rights reserved.</p>
        <p className='font-semibold from-stone-200'>version : {softVersion}</p>
      </div>
    </footer>
  )
}

export default Footer