import React, {createContext, useContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify';

const StateContext = createContext();

const initialState ={
    chat :false,
    cart :false,
    userProfile :false,
    notification :false,
}

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [currentMode, setCurrentMode] = useState('Light');
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [isClicked, setIsClicked] = useState(initialState)
    const [themeSettings,setThemeSettings] = useState(false) 
    const [screenSize, setScreenSize] = useState(undefined)
    const [show,setShow] = useState()
    // Timer Counter
    const [count,setCount] = useState(0)
    const [isCounting,setIsCounting] = useState(false)
    const [pauseTime,setPauseTime] = useState(0)
    const [showResetPopup,setShowResetPopup] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [selectedStream, setSelectedStream] = useState('')
    // Auth and fetching data context
    // const host = "http://localhost:8000"
    const host = "http://3.6.89.177:8001" 
    
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupCheckOutOpen, setPopupCheckOutOpen] = useState(false);
    const [fName,setFName] = useState('') 
    const [loggedInEmployee, setLoggedInEmployee] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [loggedIn,setLoggedIn] = useState(false)
    const [credential, setCredential] = useState({email: "", password: ""})
    const employeesPerPage = 10;
    const [employeeData, setEmployeeData] = useState([])
    // For DayReport Fetch data
    const [dayReport,setDayReport] = useState([])
    const [employeeDayReport,setEmployeeDayReport] = useState([])
    const [calibrationSiteData, setCalibrationSiteData] = useState([])
    const [calibrationOfficeData, setCalibrationOfficeData] = useState([])
    const [hvacSiteData, setHvacSiteData] = useState([])
    const [hvacOfficeData, setHvacOfficeData] = useState([])
    const [thermalSiteData, setThermalSiteData] = useState([])
    const [thermalOfficeData, setThermalOfficeData] = useState([])
    const [plcCsvSiteData, setPlcCsvSiteData] = useState([])
    const [plcCsvOfficeData, setPlcCsvOfficeData] = useState([])
    const [caSiteData, setCaSiteData] = useState([])
    const [caOfficeData, setCaOfficeData] = useState([])
    const [steamSiteData, setSteamSiteData] = useState([])
    const [steamOfficeData, setSteamOfficeData] = useState([])
    // For Check In
    const [checkInReport,setCheckInReport] = useState([])
    const [checkOutReport,setCheckOutReport] = useState([])
    const [calibrationCheckInSiteData, setCalibrationCheckInSiteData] = useState([])
    const [calibrationCheckInOfficeData, setCalibrationCheckInOfficeData] = useState([])
    const [hvacCheckInSiteData, setHvacCheckInSiteData] = useState([])
    const [hvacCheckInOfficeData, setHvacCheckInOfficeData] = useState([])
    const [thermalCheckInSiteData, setThermalCheckInSiteData] = useState([])
    const [thermalCheckInOfficeData, setThermalCheckInOfficeData] = useState([])
    const [plcCsvCheckInSiteData, setPlcCsvCheckInSiteData] = useState([])
    const [plcCsvCheckInOfficeData, setPlcCsvCheckInOfficeData] = useState([])
    const [caCheckInSiteData, setCaCheckInSiteData] = useState([])
    const [caCheckInOfficeData, setCaCheckInOfficeData] = useState([])
    const [steamCheckInSiteData, setSteamCheckInSiteData] = useState([])
    const [steamCheckInOfficeData, setSteamCheckInOfficeData] = useState([])

    // Fetching time online

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const fetchCurrentTime = async () => {
        try {
          const response = await fetch('http://worldtimeapi.org/api/ip');
          if (response.ok) {
            const data = await response.json();
            setCurrentTime(data.datetime.split('T')[1].slice(0, 5));
            const currentDateObj = new Date(data.datetime.split('T')[0]);
            setCurrentDate(currentDateObj.toLocaleDateString('en-GB'));
          }
        } catch (error) {
          console.error('Error fetching current time:', error);
        }
    };

    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
    
    const openCheckOutPopup = () => {
        setPopupCheckOutOpen(true)
    }
    const closeCheckOutPopup = () => {
        setPopupCheckOutOpen(false)
    }

    const handleLoggedIn = () => {
        setLoggedIn(true)
    }
    const checkLoggedIn = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if(isLoggedIn === 'true'){
            handleLoggedIn()
        }
    }

    const signupEmployee = async() => {
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"

                },
                body: JSON.stringify({email: credential.email,password: credential.password})
            })
            const json = await response.json()
                if(json.success){
                    localStorage.setItem("token", json.authtoken)
                    localStorage.setItem('isLoggedIn','true')
                    console.log('response', json)
                    handleLoggedIn()
                }else{
                    alert("Please try Again")
                }
        } catch (error) {
            
        }
    }

    // Login Employee with Mobile Number
    const loginEmployeeWithMobile = async() => {
        try {
            const response = await fetch(`${host}/api/auth/loginEmployee`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({mobile_number: credential.mobile_number,password: credential.password})
            })
            const json = await response.json()
                if(json.success){
                    localStorage.setItem("token", json.authtoken)
                    localStorage.setItem('isLoggedIn','true')
                    console.log('response', json)
                    handleLoggedIn()
                }else{
                    alert("Please try Again")
                }
        } catch (error) {
            
        }
    }



    // Fetch Employee with 
    const fetchIndividualEmployeeData = async() => {
        try {
            const response = await fetch(`${host}/api/auth/fetchEmployeeData`, {
                method:'GET',
                headers: {
                    "Content-Type":"application/json",
                    "auth-token": localStorage.getItem('token')
                },
            })
            const json = await response.json()
            console.log(json)
            const dataArray = [json]
            setLoggedInEmployee(dataArray)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Fetch Employee Data
    const fetchEmployeeData = async () => {
        try {
          const response = await fetch(`${host}/api/auth/fetchAllEmployeeList`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "auth-token": "your-auth-token" // Replace with your actual auth token
            },
          });
          const json = await response.json();
          setEmployeeData(json);
          setCurrentPage(0)
        } catch (error) {
          console.log('Error fetching employee data:', error);
        }
        
      };

        const totalEmployees = employeeData.length;
        const totalPages = Math.ceil(totalEmployees / employeesPerPage);

        const getCurrentPageData = ()=>{
        const startIndex = currentPage * 10;
        const endIndex = startIndex + 10;
        return employeeData.slice(startIndex, endIndex);
        
      }

      const goToPreviousPage =()=> {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
      }

      // Go to next page
    const goToNextPage = () => {
        const totalPages = Math.ceil(employeeData.length / 10);
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

      



    // Add a Note
    // const addEmployee = async(fName,lName,email,fatherName,motherName,dob,mobile_number,gender,password,department,designation,marital_status, blood) => {
    //     // API Call
    //     const response  = await fetch(`${host}/api/auth/addEmployeeData`,{
    //         method : 'POST',
    //         headers: {
    //                 "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({fName,lName,email,fatherName,motherName,dob,mobile_number,gender,password,department,designation,marital_status, blood})
    //     });
    //     const employee = await response.json()
    //     setEmployeeData(employeeData.concat(employee))
    // }

    const addEmployee = async(firstName,lastName,email,fatherName,motherName,dob,mobileNumber,gender,password,department,designation,marital_status, blood) => {
        // API Call
        try {
            const response  = await fetch(`${host}/api/employee/addEmployeeData`,{
                method : 'POST',
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({firstName,lastName,email,fatherName,motherName,dob,mobileNumber,gender,password,department,designation,marital_status, blood})
            });
            const employee = await response.json()
            setEmployeeData(employeeData.concat(employee))
            toast.success("Employee Added Successfully!")
        } catch (error) {
            toast.warning('Please check your internet connection')
            
        }
    }


    // Delete a Note
    const deleteEmployee = async(id) => {
        // API Call

        try {
            const response = await fetch(`${host}/api/auth/deleteEmployeeData/${id}`, {
                method: 'DELETE',
                headers:{
                    "Content-Type": "application/json"
                },
            })
            alert("Deleting the employee with id:" + id)
            const newEmployee = employeeData.filter((employee) => {return employee._id !== id})
            setEmployeeData(newEmployee)
        } catch (error) {
            console.log(error)
        }
        
    }

    // Edit a Note

    const editEmployee = async(id,fName,lName,email,fatherName,motherName,dob,mobile_number,gender) => {
        // try {
        //     const response = await fetch(`${host}/api/auth/fetchUniqueID/${id}`,{
        //         method: 'PUT',
        //         headers: {
        //             "Content-type":"application/json",
        //         },body: JSON.stringify(id,fName,
        //         lName,
        //         email,
        //         fatherName,
        //         motherName,
        //         dob,
        //         mobile_number,
        //         gender)
        //     })
        //     .then(response => response.json())
        //     .then(updatedEmployee => {
        //         console.log('Employee data updated:', updatedEmployee)
        //     })
        // } catch (error) {
        //     console.error('Error updating employee data:', error)
        // }
    }



    // DayReport Data for Backend
    
    // Add Data 

    const addDayReportData = async(Date,CheckInType,SiteName,Activity,Description) => {
        try {
      const response = await fetch(`${host}/api/dayReport/addDayReport`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({Date,CheckInType,SiteName,Activity,Description})
      })
      const dayReportData = await response.json()
      if(response.ok){
          console.log("your data :" + dayReport)
          setDayReport(dayReport => [...dayReport, dayReportData])
      }else{
        console.log("Error response:", dayReportData);
      // Handle the validation errors and display them to the user
        const errors = dayReportData.errors.map(error => error.msg);
        alert("Your error are:" +errors)
      }
    } catch (error) {
      console.log('Error fetching Day Report data:', error); 
    }
    }

    // Fetch perticular employee Data:

    const fetchDayReportData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/dayReportEmployeeData`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            })
            const data = await response.json()
            setEmployeeDayReport(data)
        } catch (error) {
            console.error('Error', error)
        }
    }

    // Fetch DayReport for Table 

    const fetchDayReportTableData = async (date, checkInType, department) => {
        try {
            const queryParameters = { date: date, checkInType: checkInType, department: department}
            const url = new URL(`${host}/api/dayReport/getDayReportData`)
            url.search = new URLSearchParams(queryParameters).toString()
            const response = await fetch(url, {
                method: 'GET',
                headers:{
                    "Content-Type":'application/json;charset=utf-8'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
            
        }
    }

    // fetching data for calibration site table

    const fetchCalibrationSiteData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/calibration-site`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setCalibrationSiteData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching data for calibration office table

    const fetchCalibrationOfficeData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/calibration-office`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setCalibrationOfficeData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

        // fetching data for calibration site table

        const fetchHVACSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/hvac-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setHvacSiteData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for calibration office table
    
        const fetchHVACOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/hvac-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setHvacOfficeData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }

    
    // fetching data for calibration site table

    const fetchThermalSiteData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/thermal-site`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setThermalSiteData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching data for calibration office table

    const fetchThermalOfficeData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/thermal-office`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setThermalOfficeData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching data for PLC CSV site table

    const fetchPlcCsvSiteData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/plccsv-site`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setPlcCsvSiteData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching data for PLC CSV office table

    const fetchPlcCsvOfficeData = async() =>{
        try {
            const response = await fetch(`${host}/api/dayReport/plccsv-office`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const dayReportData = await response.json()
                setPlcCsvOfficeData(dayReportData)
                console.log(dayReportData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

        // fetching data for PLC CSV site table

        const fetchCASiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/ca-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setCaSiteData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for PLC CSV office table
    
        const fetchCAOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/ca-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setCaOfficeData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }


        
        // fetching data for PLC CSV site table

        const fetchSteamSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/steam-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setSteamSiteData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for PLC CSV office table
    
        const fetchSteamOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/dayReport/steam-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const dayReportData = await response.json()
                    setSteamOfficeData(dayReportData)
                    console.log(dayReportData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    

    // DayReport Data end's here

    // CheckIn Data Start here
        // Add Data 

        const addCheckInData = async (date, checkInType, login, loginLocation, loginAddress, siteName) => {
            try {
              const response = await fetch(`${host}/api/checkIn/checkIn`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ date, checkInType, login, loginLocation, loginAddress, siteName }),
              });
          
              const checkInData = await response.json();
          
              if (response.ok) {
                console.log('Your data:', checkInData);
                setCheckInReport(prevCheckInReport => {
                  if (prevCheckInReport === undefined) {
                    return [checkInData];
                  } else {
                    return [...prevCheckInReport, checkInData];
                  }
                });
                toast.success('Check-in successful!');
                closePopup(); // Call the function to close the popup
              } else {
                console.log('Error response:', checkInData);
          
                if (response.status === 409) {
                  // User already checked in
                  toast.warning('You are already checked in');
                  closePopup()
                } else if (checkInData.errors && Array.isArray(checkInData.errors)) {
                  const errors = checkInData.errors.map(error => error.msg);
                  toast.error('Check-in failed: ' + errors.join(', '));
                } else {
                  toast.error('Error occurred during Check-In');
                }
              }
            } catch (error) {
              console.log('Error fetching Check-In data:', error);
            }
          };


    // CheckOut Backend Start here

    const addCheckOutData = async (logout, logoutLocation, logoutAddress) => {
        try {
          const response = await fetch(`${host}/api/checkIn/checkOut`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ logout, logoutLocation, logoutAddress })
          });
      
          const checkOutData = await response.json();
      
          if (response.ok) {
            console.log('Your CheckOut Data:', checkOutData);
            setCheckOutReport(prevCheckOutReport => {
              if (prevCheckOutReport === undefined) {
                return [checkOutData];
              } else {
                return [...prevCheckOutReport, checkOutData];
              }
            });
            toast.success('Check-Out successful');
            closeCheckOutPopup();
          } else {
            console.log('Error response:', checkOutData);

                if (response.status === 409) {
                toast.warning("You have already checked out today");
                closeCheckOutPopup();
                } else if (checkOutData && checkOutData.message) {
                toast.error('Something went wrong: ' + checkOutData.message);
                } else {
                toast.error('Something went wrong');
                }
          }
        } catch (error) {
          console.log('Error fetching Check-Out data:', error);
          toast.error('An error occurred while fetching Check-Out data');
        }
      };
      
      
        // fetching data for calibration site table

        const fetchCalibrationCheckInSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/calibration-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setCalibrationCheckInSiteData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for calibration office table
    
        const fetchCalibrationCheckInOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/calibration-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setCalibrationCheckInOfficeData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
          
        
      // fetching data for HVAC site table for checkin

      const fetchHVACCheckInSiteData = async() =>{
        try {
            const response = await fetch(`${host}/api/checkIn/hvac-site`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const checkInData = await response.json()
                setHvacCheckInSiteData(checkInData)
                console.log(checkInData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching data for HVAC office table for checkin

    const fetchHVACCheckInOfficeData = async() =>{
        try {
            const response = await fetch(`${host}/api/checkIn/hvac-office`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok){
                const checkInData = await response.json()
                setHvacCheckInOfficeData(checkInData)
                console.log(checkInData)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

          // fetching data for Thermal site table for checkin

          const fetchThermalCheckInSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/thermal-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setThermalCheckInSiteData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for Thermal office table for checkin
    
        const fetchThermalCheckInOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/thermal-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setThermalCheckInOfficeData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }

          // fetching data for PLC CSV site table for checkin

          const fetchPlcCsvCheckInSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/plccsv-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setPlcCsvCheckInSiteData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for PLC CSV office table for checkin
    
        const fetchPlcCsvCheckInOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/plccsv-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setPlcCsvCheckInOfficeData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }

          // fetching data for CA site table for checkin

          const fetchCaCheckInSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/ca-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setCaCheckInSiteData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for CA office table for checkin
    
        const fetchCaCheckInOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/ca-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setCaCheckInOfficeData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }

          // fetching data for CA site table for checkin

          const fetchSteamCheckInSiteData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/steam-site`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setSteamCheckInSiteData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        // fetching data for CA office table for checkin
    
        const fetchSteamCheckInOfficeData = async() =>{
            try {
                const response = await fetch(`${host}/api/checkIn/steam-office`, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok){
                    const checkInData = await response.json()
                    setSteamCheckInOfficeData(checkInData)
                    console.log(checkInData)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
            }
        }
            
          
          
          
          


    // CheckOut Data End's Here


    const handleDepartmentChange = (event) => {
      setSelectedDepartment(event.target.value);
      setSelectedDesignation('');
      setSelectedStream('')
    }
    
    const handleDesignationChange = (event) => {
      setSelectedDesignation(event.target.value);
    }

    const handleStreamChange = (event) => {
        setSelectedStream(event.target.value);
      }


    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
      };
    
      const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
      };

    const handleClick = (clicked) =>{
        setIsClicked({ ...initialState,[clicked]:true});
    }

    const EmployeeJoiningFormData = (show) =>{
        if(!show){
            return null;
        }
    }
    // timer counter

    useEffect(()=>{
        let intervalID;

        if(isCounting){
            intervalID = setInterval(()=>{
                setCount((prevCount) => prevCount +1 )
                },1000)
        }
        return () => {
            clearInterval(intervalID)
        }
    },[isCounting])

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600)/60)
        const seconds = Math.floor(time % 60)


        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
    const pad = (value) => {
        return String(value).padStart(2,'0')
    }
    const startCounting = () => {
        const confirmed = window.confirm("Are you sure you want to Check in?")
        if(confirmed){
            setIsCounting(true)
        }
        
    }
    const stopCounting = () => {
        setIsCounting(false)
        setPauseTime(count)
    }

    const resumeCounting = () => {
        setIsCounting(true)
        setCount(pauseTime)
    }
    const handleReset = () => {
        const confirmed = window.confirm('Are you sure you want to Check Out? If you Checked Out then your working timer will reset.')
        if(confirmed){
            setIsCounting(false)
            setCount(0)
            setPauseTime(0)
        }
    }
    const togglePopup = () => {
        setShowResetPopup(!showResetPopup)
    }
    // const resetCounting = () => {
    //     setIsCounting(false)
    //     setCount(0)
    //     setPauseTime(0)
    // }

    return(
        <StateContext.Provider value ={{
            host,
            currentDate,
            currentTime,
            fetchCurrentTime,
            activeMenu,
            setActiveMenu,
            currentColor,
            setCurrentColor,
            currentMode,
            setCurrentMode,
            isClicked,
            setIsClicked,
            handleClick,
            setColor,
            setMode,
            screenSize,
            setScreenSize,
            themeSettings,
            setThemeSettings,
            show,
            setShow,
            count,setCount,
            isCounting,setIsCounting,
            pauseTime,setPauseTime,
            showResetPopup,setShowResetPopup,
            selectedDepartment, setSelectedDepartment,
            selectedDesignation, setSelectedDesignation,
            selectedStream,
            formatTime,
            startCounting,
            stopCounting,
            resumeCounting,
            handleReset,
            togglePopup,
            handleDepartmentChange,
            handleDesignationChange,
            handleStreamChange,
            // Auth emp data
            employeeData, 
            setEmployeeData,

            // add employee
            addEmployee,
            // fetch employee Data
            fetchEmployeeData,
            // delete employee
            deleteEmployee,
            // edit employee
            editEmployee,
            // pagingdata
            totalPages,
            currentPage, setCurrentPage,
            getCurrentPageData,
            goToPreviousPage,
            goToNextPage,

            // signin
            signupEmployee,
            credential, setCredential,
            loggedIn,
            checkLoggedIn,
            fetchIndividualEmployeeData,
            fName,setFName,
            loggedInEmployee,
            // loginemployewith mobile
            loginEmployeeWithMobile,
            addDayReportData,
            fetchDayReportData,
            employeeDayReport,
            setEmployeeDayReport,
            // Fetching DayReport for All table
            fetchDayReportTableData,
            // fetch Day Report for Calibration
            calibrationOfficeData,
            calibrationSiteData,
            fetchCalibrationSiteData,
            fetchCalibrationOfficeData,
            hvacOfficeData,
            hvacSiteData,
            fetchHVACSiteData,
            fetchHVACOfficeData,
            thermalOfficeData,
            thermalSiteData,
            fetchThermalSiteData,
            fetchThermalOfficeData,
            plcCsvOfficeData,
            plcCsvSiteData,
            fetchPlcCsvSiteData,
            fetchPlcCsvOfficeData,
            caOfficeData,
            caSiteData,
            fetchCASiteData,
            fetchCAOfficeData,
            steamOfficeData,
            steamSiteData,
            fetchSteamSiteData,
            fetchSteamOfficeData,

            // checkIn Data
            addCheckInData,

            // addCheckOut
            addCheckOutData,

            // for the popup
            isPopupOpen, 
            openPopup, 
            closePopup,
            isPopupCheckOutOpen,
            openCheckOutPopup,
            closeCheckOutPopup,
            
            // fetch data for CheckIn
            calibrationCheckInSiteData,
            calibrationCheckInOfficeData,
            fetchCalibrationCheckInSiteData,
            fetchCalibrationCheckInOfficeData,
            hvacCheckInSiteData,
            hvacCheckInOfficeData,
            fetchHVACCheckInSiteData,
            fetchHVACCheckInOfficeData,
            thermalCheckInSiteData,
            thermalCheckInOfficeData,
            fetchThermalCheckInSiteData,
            fetchThermalCheckInOfficeData,
            plcCsvCheckInSiteData,
            plcCsvCheckInOfficeData,
            fetchPlcCsvCheckInSiteData,
            fetchPlcCsvCheckInOfficeData,
            caCheckInSiteData,
            caCheckInOfficeData,
            fetchCaCheckInSiteData,
            fetchCaCheckInOfficeData,
            steamCheckInSiteData,
            steamCheckInOfficeData,
            fetchSteamCheckInSiteData,
            fetchSteamCheckInOfficeData,
            }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);