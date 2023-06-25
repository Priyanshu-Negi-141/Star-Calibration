import React, {useEffect, useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import avatar from '../data/avatar.jpg'
import './css/navbar.css'
import { useStateContext } from '../contexts/ContextProvider'
import TimeCounter from '../timerCounter/TimeCounter'



const NavButton = ({title,customFunc,icon,color,dotColor}) =>(

  <div content={title} position="BottomCenter">
    <button 
    type='button' 
    onClick={customFunc} 
    style={{color}} 
    className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span style={{background:dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2 ' />
        {icon}
    </button>
  </div>
)


const Navbar = () => {
  let navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const {currentMode, currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize,count,isCounting, formatTime, startCounting, stopCounting, resumeCounting, resetCounting, handleReset, togglePopup, pad, hours,minutes,seconds, fetchIndividualEmployeeData ,loggedInEmployee } = useStateContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isOpen, setISOpen] = useState(false)
  useEffect (() =>{
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize',handleResize)
    handleResize();

    return() =>window.removeEventListener('resize',handleResize);
  },[]);

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false)
    }else{
      setActiveMenu(true);
    }
  },[screenSize]);

  useEffect(() => {
    fetchIndividualEmployeeData()
  }, [])

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  
  let menuRef = useRef()
  useEffect(() => {
    let handler = (e) =>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
      }
    };
    document.addEventListener("mousedown",handler)
    return() => {
      document.removeEventListener("mousedown",handler)
    }
  })

  // Logout COde
  const confirmLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    window.location.href = '/signin'
  }

  const handleDeleteInputSets = () => {
    setShowConfirmation(true);
  };
  const noLogout = () => {
    setShowConfirmation(false);
  };

  const handleButtonClick = () =>{
    setISOpen(true)
  }

  const handleCloseClick = () => {
    setISOpen(false)
  }


  return (
    <div className=' border flex justify-between items-center p-2 md:ml-6 md:mr-6' style={{backgroundColor: currentMode, borderColor:currentColor}}>
      <NavButton 
      title="Menu" 
      customFunc={handleActiveMenu} 
      color={currentColor} 
      icon= {<AiOutlineMenu />} />
      <div className='text-sm text-bold' style={{color: currentColor}}>
        <h1>{formatTime(count)}</h1>
      </div>
      <div className='flex'>
      <NavButton 
        title="Cart" 
        customFunc={() => handleClick('cart')}
        color={currentColor}
        icon= {<FiShoppingCart />} 
      />
      <NavButton 
        title="Chat" 
        dotColor={"#03C9D7"}
        customFunc={() => handleClick('chat')}
        color={currentColor}
        icon= {<BsChatLeft />} 
      />
      <NavButton 
        title="Notifications" 
        dotColor="#03C9D7"
        
        customFunc={() => handleClick('notification')}
        color={currentColor}
        icon= {<RiNotification3Line />} 
      />
      <div content='Profile'position="BottomCenter" ref={menuRef}>
        <div className='flex item-center gap-2 cursor-pointer hover:bg-slate-50 rounded-3xl p-1 round-lg' style={{color: currentColor,border: '1px solid',borderColor: currentMode}} onClick={() => setOpen(!open)}>
          <img 
          className='rounded-full w-8 h-8'
          style={{border: '1px solid', borderColor: currentColor}}
          src={avatar} 
          alt="user-profile" />
          <p>
            <span className='text-14'>Hi,</span>{' '}
            {
              loggedInEmployee.map((user) => {
                return(

                  <span className='font-bold ml-1 text-14'>{user.fName}</span>
                )
              })
            }
            </p>
          <MdKeyboardArrowDown className='text-gray-400 text-14'/>

        </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} style={{backgroundColor: currentColor}}>
        {
              loggedInEmployee.map((user) => {
                return(
          <div>
            <h3>{user.fName} {user.lName}<br />
            <span>Senior Manager</span></h3>
          </div>

                  
                )
              })
            }
          <ul>
            <NavLink to={'myProfile'}><button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={avatar} text = {'My Profile'} /></button></NavLink>
            
            {
            isCounting ? (
              <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={stopCounting}><DropdownItem img={avatar} text = {'Break'} /></button>
            ) : (
              // onClick={startCounting} baad me use krna
              <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleButtonClick}><DropdownItem img={avatar} text = {'Check In'} /></button>
            )}
            <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleReset}><DropdownItem img={avatar} text = {'Check Out'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={avatar} text = {'My Task'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={avatar} text = {'Help'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleDeleteInputSets}><DropdownItem img={avatar} text = {'Log Out'} /></button>
          </ul>

        </div>
        
      </div>
      {/* {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />} */}
            
      </div>

      {
        isOpen && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-40'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-xl text-center border-2 rounded-lg text-bold p-1 font-body mb-4'>Check In</h2>
              <form>
                <div className='grid grid-cols-3 w-full gap-2'>
                  <div className='flex'>
                    <label htmlFor="" className="block mt-3 ">
                      Login Time
                    </label>
                    <input type="text" name="name" id="" className="p-1.5 border-2 rounded-lg" placeholder="" />
                  </div>
                  <div className='col-span-2 flex'>
                    <label htmlFor="" className="block mt-3 ">
                      Login Address
                    </label>
                    <input type="text" name="name" id="" className="p-1.5 border-2 rounded-lg" placeholder="" />
                  </div>
                </div>
                <div className='flex w-full gap-5'>
                  <button onClick={handleCloseClick} className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded'>
                    Close
                  </button>
                  <button onClick={handleCloseClick} className='mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full rounded'>
                    Check In
                  </button>
                </div>
              </form>
            </div>



          </div>
        )}

      {showConfirmation && (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={confirmLogout}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={noLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
      
    </div>
  )
}

function DropdownItem(props){
  return(
    <li className='dropdownItem'>
      <img src={props.img} alt="" />
      <a>{props.text}</a>
    </li>
  );
}

export default Navbar