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
import { toast } from 'react-toastify'



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
  const {currentMode, 
            currentColor, 
            activeMenu, 
            setActiveMenu, 
            handleClick, 
            isClicked, 
            setScreenSize, 
            screenSize,
            count,isCounting, 
            formatTime, 
            startCounting, 
            stopCounting, 
            resumeCounting, 
            resetCounting, 
            handleReset, 
            togglePopup, pad, hours,minutes,seconds, fetchIndividualEmployeeData ,loggedInEmployee,addCheckInData,currentDate,
            currentTime,
            fetchCurrentTime, 
            isPopupOpen, 
            openPopup, 
            closePopup,
            isPopupCheckOutOpen,
            openCheckOutPopup,
            closeCheckOutPopup,
            addCheckOutData } = useStateContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checkInData, setCheckInData] = useState({
    date: "" ,
    checkInType: "",
    login: "", 
    login_location: "", 
    login_address: "", 
    site_name: ""
  })
  const [checkOutData, setCheckOutData] = useState({
    logout: "", 
    logout_location: "", 
    logout_address: "", 
  })

  useEffect(() => {
    // Fetch current time and date from WorldTimeAPI

    fetchCurrentTime();
    const interval = setInterval(fetchCurrentTime, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(checkInData.checkInType === ""){
      toast.error("Please Fill the Check-In Detail's");
      return;
    }
    await addCheckInData(
      checkInData.date || currentDate,
      checkInData.checkInType,
      checkInData.login || currentTime,
      checkInData.login_location,
      checkInData.login_address,
      checkInData.site_name
    );
    setCheckInData({
      date: "",
      checkInType: "",
      login: "",
      login_location: "",
      login_address: "",
      site_name: ""
    });
  };

  const handleCheckOut = async(e) => {
    e.preventDefault()
    await addCheckOutData(
      checkOutData.logout || currentTime,
      checkOutData.logout_location,
      checkOutData.logout_address,
    )
    setCheckOutData({
      logout: "",
      logout_location: "",
      logout_address: ""
    })

  }

  

  const handleChange = (e) => {
    setCheckInData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));

    setCheckOutData({
      ...checkOutData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect (() =>{
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize',handleResize)
    handleResize();

    return() =>window.removeEventListener('resize',handleResize);
  },[]);

  useEffect(() => {
    if(screenSize <= 800){
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
    window.location.href = '/'
  }

  const handleDeleteInputSets = () => {
    setShowConfirmation(true);
  };
  const noLogout = () => {
    setShowConfirmation(false);
  };

  const handleButtonClick = () =>{
    openPopup()
  }

  const handleCloseClick = () => {
    closePopup()
  }

  const handleCheckOutButtonClick = () =>{
    openCheckOutPopup()
  }

  const handleCheckOutCloseClick = () => {
    closeCheckOutPopup()
  }


  return (
    <div className=' border flex justify-between items-center p-2 md:ml-6 md:mr-6' style={{backgroundColor: currentMode, borderColor:currentColor}}>
      <NavButton 
      title="Menu" 
      customFunc={handleActiveMenu} 
      color={currentColor} 
      icon= {<AiOutlineMenu />} />
      {/* <div className='text-sm text-bold' style={{color: currentColor}}>
        <h1>{formatTime(count)}</h1>
      </div> */}
      <div className='flex'>
      {/* <NavButton 
        title="Cart" 
        customFunc={() => handleClick('cart')}
        color={currentColor}
        icon= {<FiShoppingCart />} 
      /> */}
      {/* <NavButton 
        title="Chat" 
        dotColor={"#03C9D7"}
        customFunc={() => handleClick('chat')}
        color={currentColor}
        icon= {<BsChatLeft />} 
      /> */}
      {/* <NavButton 
        title="Notifications" 
        dotColor="#03C9D7"
        
        customFunc={() => handleClick('notification')}
        color={currentColor}
        icon= {<RiNotification3Line />} 
      /> */}
      <div content='Profile'position="BottomCenter" ref={menuRef}>
        <div className='flex item-center gap-1 cursor-pointer hover:bg-slate-50 rounded-3xl p-1 round-lg' style={{color: currentColor,border: '1px solid',borderColor: currentMode}} onClick={() => setOpen(!open)}>
          <div>
            <img 
            className='rounded-full w-8 h-8'
            style={{border: '1px solid', borderColor: currentColor}}
            src={avatar} 
            alt="user-profile" />
          </div>
          <div>
            <p>
              <span className='text-14'>Hi,</span>{' '}
              {
                loggedInEmployee.map((user) => {
                  return(
                    <span className='font-bold ml-1 text-14'>{user.employeeData[0].fName} {user.employeeData[0].lName}</span>
                  )
                })
              }
              </p>
          </div>
          <div className='grid place-items-center'>
            <MdKeyboardArrowDown className='text-gray-400 text-lg' style={{color: currentColor}}/>
          </div>

        </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} style={{backgroundColor: currentColor}}>
        {
              loggedInEmployee.map((user) => {
                return(
          <div className='grid gap-2'>
            <h3>{user.employeeData[0].fName} {user.employeeData[0].lName}<br />
            <span>{user.employeeData[0].designation}</span></h3>
          </div>

                  
                )
              })
            }
          <ul>
            <NavLink to={'myProfile'}><button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={""} text = {'My Profile'} /></button></NavLink>
            
            {
            isCounting ? (
              <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={stopCounting}><DropdownItem img={""} text = {'Break'} /></button>
            ) : (
              // onClick={startCounting} baad me use krna
              <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleButtonClick}><DropdownItem img={""} text = {'Check In'} /></button>
            )}
            <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleCheckOutButtonClick}><DropdownItem img={""} text = {'Check Out'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={""} text = {'My Task'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full'><DropdownItem img={""} text = {'Help'} /></button>
            <button className='pl-4 mb-1 border border-black rounded-lg w-full' onClick={handleDeleteInputSets}><DropdownItem img={""} text = {'Log Out'} /></button>
          </ul>

        </div>
        
      </div>
      {/* {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />} */}
            
      </div>
      
      {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl text-center border-2 rounded-lg font-bold p-2 mb-4 font-body">Check In</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block mt-3">
              Date
            </label>
            <input
              type="text"
              name="date"
              id="date"
              value={currentDate}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="checkInType" className="block mt-3">
              Check In Type
            </label>
            <select
              id="checkInType"
              name="checkInType"
              onChange={handleChange}
              value={checkInData.checkInType}
              className="p-2 border-2 rounded-lg w-full"
              required
            >
              <option value="none">None</option>
              <option value="Site">Site</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div>
            <label htmlFor="login" className="block mt-3">
              Time
            </label>
            <input
              type="text"
              name="login"
              id="login"
              value={currentTime}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="login_location" className="block mt-3">
              Current Location
            </label>
            <input
              type="text"
              name="login_location"
              id="login_location"
              value={checkInData.login_location}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="login_address" className="block mt-3">
              Current Address
            </label>
            <input
              type="text"
              name="login_address"
              id="login_address"
              value={checkInData.login_address}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
             
            />
          </div>
          <div>
            <label htmlFor="site_name" className="block mt-3">
              Site Name
            </label>
            <input
              type="text"
              name="site_name"
              id="site_name"
              value={checkInData.site_name}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
             
            />
          </div>
        </div>
        {/* Rest of the form */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCloseClick}
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Check In
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{isPopupCheckOutOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl text-center border-2 rounded-lg font-bold p-2 mb-4 font-body">Check Out</h2>
      <form onSubmit={handleCheckOut}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="logout" className="block mt-3">
              Time
            </label>
            <input
              type="text"
              name="logout"
              id="logout"
              value={currentTime}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="logout_location" className="block mt-3">
              Current Location
            </label>
            <input
              type="text"
              name="logout_location"
              id="logout_location"
              value={checkOutData.logout_location}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
            />

          </div>
          <div>
            <label htmlFor="logout_address" className="block mt-3">
              Current Address
            </label>
            <input
              type="text"
              name="logout_address"
              id="logout_address"
              value={checkOutData.logout_address}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
            />

          </div>
        </div>
        {/* Rest of the form */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCheckOutCloseClick}
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Check Out
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