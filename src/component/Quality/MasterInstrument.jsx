import React from 'react'
import { NavLink } from 'react-router-dom'
import { masterInstrumentData } from '../../data/Quality/masterInstrument'
import { useStateContext } from '../../contexts/ContextProvider'

const MasterInstrument = () => {

    const {currentColor} = useStateContext()

  return (
    <div className="">
    <h3
      className="font-bold text-white text-xl mb-5 p-2 bg-[#0B666A] dark:text-yellow-50"
      style={{ backgroundColor: currentColor, border: "2px solid" }}
    >
      Master Instrument
    </h3>
    <div className="flex bg-[#FAF0E4] flex-wrap lg:flex-nowrap p-2">
      <button className="flex flex-wrap  gap-3">
        {masterInstrumentData.map((item) => (
          <NavLink to={item.path}>
            <div key={item.path} type="button" id={item.title}>
              <button
                type="button"
                className="text-white bg-[#10A19D] hover:bg-[#10A19D]/80 focus:ring-4 focus:outline-none focus:ring-[#10A19D]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-2 justify-center items-center dark:hover:bg-[#10A19D]/80 dark:focus:ring-[#10A19D]/40 mr-2 mb-2"
                style={{backgroundColor: currentColor}}
              >
                {item.icon} {item.title}
              </button>
            </div>
          </NavLink>
        ))}
      </button>
    </div>
  </div>
  )
}

export default MasterInstrument