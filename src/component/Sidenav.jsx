import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {SiShopware} from 'react-icons/si'
import {MdOutlineCancel} from 'react-icons/md'
import SidenavItem from './SidenavItem'
// import items from '../data/SidebarItem.json'
import items from '../data/SidebarItem_official.json'

import {useStateContext} from '../contexts/ContextProvider'

const Sidenav = () => {

    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () =>{
    if(activeMenu !== undefined && screenSize <= 900){
      setActiveMenu(false)
    }
  }

    const activeLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-400 dark:text-gray-200 dark:hover:text-black hover:bg-black m-2';
  return (

    <div className='ml-3 h-screen overflow-auto no-scrollbar md:overflow-auto pb-10'>
        {activeMenu && (<>
            <div className='flex justify-between items-center' style={{color: currentColor}}>
                <Link to='/' onClick={handleCloseSideBar} 
                style={{borderColor: currentColor}}
                className='item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold rounded-lg hover:border p-3 tracking-tight'>
                    <span>Star Calibration</span>
                </Link>
                <div content='Menu' position="BottomCenter">
                <button type='button' onClick={() => setActiveMenu(!activeMenu)}
                    className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block' style={{border: "1px solid"}}>
                      <MdOutlineCancel />
                    </button>
                </div>
            </div>
            <div className='mt-10'>
                {items.map((item, index) => 
                <SidenavItem 
                key={index} 
                item={item}
                onClick={handleCloseSideBar}
                style = {({isActive}) => ({
                    backgroundColor: isActive ? currentColor : '',
                })}
                className={({isActive}) => (isActive ? activeLink: normalLink)}
                />)}
            </div>
            
        </>)}
    </div>

    
  )
}

export default Sidenav