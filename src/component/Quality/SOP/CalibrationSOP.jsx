import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { calibrationSOPHomeData } from '../../../data/Quality/SOP/CalibrationSOP/calibrationSOPHome'
import { useStateContext } from '../../../contexts/ContextProvider'
import ElectroTechnical from './CalibrationSOP/ElectroTechnical'
import ThermalSOP from './CalibrationSOP/ThermalSOP'
import Mechanical from './CalibrationSOP/Mechanical'

const CalibrationSOP = () => {

    const { currentColor} = useStateContext()
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const popupRef = useRef(null)
    const contentRef = useRef(null)


    const showData = () => {
        setShow(!show);
        if (show1){
            setShow1(false)
        }
        if (show2){
            setShow2(false)
        }
    } 
    const showData1 = () => {
        setShow1(!show1);
        if (show){
            setShow(false)
        }
        if (show2){
            setShow2(false)
        }
    }
    const showData2 = () => {
        setShow2(!show2);
        if (show1){
            setShow1(false)
            }
            if (show){
                setShow(false)
            }
    }

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShow(false)
            setShow1(false)
            setShow2(false)
            }

    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, false)
            }
    }, [])
                


  return (
    <div className=''>
        <div className='grid grid-cols-3 p-5 gap-3'>
            <button type="button" onClick={showData} class="text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Electro Technical</button>
            <button type="button" onClick={showData1} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Thermal</button>
            <button type="button" onClick={showData2} class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Mechanical</button>
        </div>

    {
        show && (<ElectroTechnical />)
    }
    {
        show1 && (<ThermalSOP />)
    }
    {
        show2 && (<Mechanical />)
    }

    </div>
  )
}

export default CalibrationSOP