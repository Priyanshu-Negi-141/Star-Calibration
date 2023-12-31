import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment'
import axios from "axios";
import { useStateMainContext } from "./MainContextProvider";
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [isClicked, setIsClicked] = useState(initialState);
  const [themeSettings, setThemeSettings] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [show, setShow] = useState();
  const {localHostServerLink,
    mainHostServerLink,
    MAIN_GOOGLE_MAP_API_KEY ,
    validexTitleMain,
    officialSoftVersion} = useStateMainContext()
  // Timer Counter
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  // Auth and fetching data context
  //const host = localHostServerLink
  // const host = localHostServerLink
  const GOOGLE_MAP_API_KEY = MAIN_GOOGLE_MAP_API_KEY
  const host = mainHostServerLink;
  // Validex India Details
  const validexTitle = validexTitleMain
  const softVersion = officialSoftVersion
  //  Access User end's

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupCheckOutOpen, setPopupCheckOutOpen] = useState(false);
  const [fName, setFName] = useState("");
  const [loggedInEmployee, setLoggedInEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [credential, setCredential] = useState({ mobile_number: "", password: "" });
  const employeesPerPage = 10;
  const [employeeData, setEmployeeData] = useState([]);
  // For DayReport Fetch data
  const [dayReport, setDayReport] = useState([]);
  const [employeeDayReport, setEmployeeDayReport] = useState([]);
  const [calibrationSiteData, setCalibrationSiteData] = useState([]);
  const [calibrationOfficeData, setCalibrationOfficeData] = useState([]);
  const [hvacSiteData, setHvacSiteData] = useState([]);
  const [hvacOfficeData, setHvacOfficeData] = useState([]);
  const [thermalSiteData, setThermalSiteData] = useState([]);
  const [thermalOfficeData, setThermalOfficeData] = useState([]);
  const [plcCsvSiteData, setPlcCsvSiteData] = useState([]);
  const [plcCsvOfficeData, setPlcCsvOfficeData] = useState([]);
  const [caSiteData, setCaSiteData] = useState([]);
  const [caOfficeData, setCaOfficeData] = useState([]);
  const [steamSiteData, setSteamSiteData] = useState([]);
  const [steamOfficeData, setSteamOfficeData] = useState([]);
  // For Check In
  const [checkInReport, setCheckInReport] = useState([]);
  const [checkOutReport, setCheckOutReport] = useState([]);
  const [calibrationCheckInSiteData, setCalibrationCheckInSiteData] = useState(
    []
  );
  const [calibrationCheckInOfficeData, setCalibrationCheckInOfficeData] =
    useState([]);
  const [hvacCheckInSiteData, setHvacCheckInSiteData] = useState([]);
  const [hvacCheckInOfficeData, setHvacCheckInOfficeData] = useState([]);
  const [thermalCheckInSiteData, setThermalCheckInSiteData] = useState([]);
  const [thermalCheckInOfficeData, setThermalCheckInOfficeData] = useState([]);
  const [plcCsvCheckInSiteData, setPlcCsvCheckInSiteData] = useState([]);
  const [plcCsvCheckInOfficeData, setPlcCsvCheckInOfficeData] = useState([]);
  const [caCheckInSiteData, setCaCheckInSiteData] = useState([]);
  const [caCheckInOfficeData, setCaCheckInOfficeData] = useState([]);
  const [steamCheckInSiteData, setSteamCheckInSiteData] = useState([]);
  const [steamCheckInOfficeData, setSteamCheckInOfficeData] = useState([]);


  // Access User

  const allowedDesignation = [
    "Director",
    "Admin Head", 
    "Assistant Technical Manager", 
    "Assistant Quality Manager", 
    "Technical Manager",
    "Quality Manager",
    "HOD Calibration",
    "HOD HVAC Validation",
    "HOD Thermal Validation",
    "Manager CSV",
    "HOD CA Validation",
    "HOD Steam Validation",
    "Operational Manager",
    "Branch Head",
    "Site Incharge",
    "BDO"
  ];

  // Check if the user's department is in the list of allowed departments
  const userDesignation = loggedInEmployee.length > 0 ? loggedInEmployee[0]?.employeeData[0]?.designation : '';




  // Fetching time online

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");


  // formate Date

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  // end formate Date
 
  
  const verifyToken = localStorage.getItem('token');

  useEffect(() => {
    isEmployeeLogin()
  },[])

  const isEmployeeLogin = () => {
    if (!verifyToken) {
      localStorage.setItem('isLoggedIn', 'false');
    }
  };


  const fetchCurrentTime = async () => {
    try {
      const response = await fetch("http://worldtimeapi.org/api/ip");
      if (response.ok) {
        const data = await response.json();
        setCurrentTime(data.datetime.split("T")[1].slice(0, 5));
        const currentDateObj = new Date(data.datetime.split("T")[0]);
        setCurrentDate(currentDateObj.toLocaleDateString("en-GB"));
      }
    } catch (error) {
      console.error("Error fetching current time:", error);
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const openCheckOutPopup = () => {
    setPopupCheckOutOpen(true);
  };
  const closeCheckOutPopup = () => {
    setPopupCheckOutOpen(false);
  };

  const handleLoggedIn = () => {
    setLoggedIn(true);
  };
  const checkLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      handleLoggedIn();
    }
  };

 


  const signupEmployee = async () => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("isLoggedIn", "true");
        handleLoggedIn();
      } else {
        alert("Please try Again");
      }
    } catch (error) {}
  };

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [showPinGenerateModal, setShowPinGenerateModal] = useState(false);
  // Login Employee with Mobile Number
  const loginEmployeeWithMobile = async () => {
    try {
      const response = await fetch(`${host}/api/auth/loginEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          mobile_number: credential.mobile_number,
          password: credential.password,
        }),
      });
      const json = await response.json();
      if (json.status) {
        localStorage.setItem("token", json.data.authtoken);
        localStorage.setItem("First Name", json.data.firstName);
        localStorage.setItem("Last Name", json.data.lastName);
        setLoggedInUser(true)
        setShowPinGenerateModal(true);
      } else {
        alert("Please enter Valid Username And Password");
      }
    } catch (error) {
    // Check if the error message indicates a connection issue
      if (error.message && error.message.includes("Failed to fetch")) {
        alert("Server is not running. Please try after some time.");
      }
    }
  };

  const [pin, setPin] = useState('');

  const handlePinLogin = async () => {
    try {
      const response = await axios.post(
        `${host}/api/auth/loginWithPin`,
        { pin },
        { headers: { 'auth-token': localStorage.getItem('token') } }
      );
        console.log(response.data.status)
      if (response.data.status) {
        // Save the new token to localStorage and replace any existing token
        localStorage.setItem('token', response.data.data);
        localStorage.setItem("isLoggedIn", "true");
        // setError(response.data.message)
        toast.success(response.data.message)
        fetchIndividualEmployeeData()
        handleLoggedIn();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Invalid PIN'); // This message will be shown for a 400 Bad Request
      } else {
        console.error('Error logging in with PIN:', error);
        toast.error('An error occurred while logging in.');
      }
    }
  };

  // Fetch Employee with
  const fetchIndividualEmployeeData = async () => {
    try {
      const response = await fetch(`${host}/api/employee/fetchEmployeeData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const json = await response.json();
      const dataArray = [json];
      setLoggedInEmployee(dataArray);
    } catch (error) {
      localStorage.setItem('isLoggedIn',false)
      console.log("Error fetching user data:", error);
    }
  };

  // Fetch Employee Data
  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(`${host}/api/employee/fetchAllEmployeeList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "your-auth-token", // Replace with your actual auth token
        },
      });
      const json = await response.json();
      setEmployeeData(json);
      setCurrentPage(0);
    } catch (error) {
      console.log("Error fetching employee data:", error);
    }
  };

  const totalEmployees = employeeData.length;
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  const getCurrentPageData = () => {
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    return employeeData.slice(startIndex, endIndex);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

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

  const addEmployee = async (
    firstName,
    lastName,
    email,
    fatherName,
    motherName,
    dob,
    mobileNumber,
    gender,
    password,
    department,
    designation,
    marital_status,
    blood
  ) => {
    // API Call
    try {
      const response = await fetch(`${host}/api/employee/addEmployeeData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          fatherName,
          motherName,
          dob,
          mobileNumber,
          gender,
          password,
          department,
          designation,
          marital_status,
          blood,
        }),
      });
      const employee = await response.json();
      setEmployeeData(employeeData.concat(employee));
      toast.success("Employee Added Successfully!");
    } catch (error) {
      toast.warning("Please check your internet connection");
    }
  };

  // Delete a Note
  const deleteEmployee = async (id) => {
    // API Call

    try {
      const response = await fetch(
        `${host}/api/employee/deleteEmployeeData/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Employee Deleted!")
      const newEmployee = employeeData.filter((employee) => {
        return employee._id !== id;
      });
      setEmployeeData(newEmployee);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit a Note

  const editEmployee = async (
    id,
    fName,
    lName,
    email,
    fatherName,
    motherName,
    dob,
    mobile_number,
    gender
  ) => {
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
  };

  // DayReport Data for Backend

  // Add Data

  const addDayReportData = async (
    Date,
    CheckInType,
    SiteName,
    Activity,
    Description
  ) => {
    try {
      const response = await fetch(`${host}/api/dayReportDetails/addDayReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          Date,
          CheckInType,
          SiteName,
          Activity,
          Description,
        }),
      });
      const dayReportData = await response.json();
      if (response.ok) {
        setDayReport((dayReport) => [...dayReport, dayReportData]);
        toast.success("Your day Report data added Successfully.")
      } else {
        // Handle the validation errors and display them to the user
        const errors = dayReportData.errors.map((error) => error.msg);
        fetchDayReportData()
        alert("Your error are:" + errors);
      }
    } catch (error) {
      toast.error("Getting some error. Please try again")
    }
  };

  // Fetch perticular employee Data:

  const fetchDayReportData = async () => {
    try {
      const response = await fetch(
        `${host}/api/dayReportDetails/individualEmployeeData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      const dataArray = data.data
      setEmployeeDayReport(dataArray);
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Fetch DayReport for Table

  const fetchDayReportTableData = async (date, checkInType, department) => {
    try {
      const queryParameters = {
        date: date,
        checkInType: checkInType,
        department: department,
      };
      const url = new URL(`${host}/api/dayReport/getDayReportData`);
      url.search = new URLSearchParams(queryParameters).toString();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration site table

  const fetchCalibrationSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/calibration-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setCalibrationSiteData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration office table

  const fetchCalibrationOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/calibration-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setCalibrationOfficeData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration site table

  const fetchHVACSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/hvac-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setHvacSiteData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration office table

  const fetchHVACOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/hvac-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setHvacOfficeData(dayReportData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration site table

  const fetchThermalSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/thermal-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setThermalSiteData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration office table

  const fetchThermalOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/thermal-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setThermalOfficeData(dayReportData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV site table

  const fetchPlcCsvSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/plccsv-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setPlcCsvSiteData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV office table

  const fetchPlcCsvOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/plccsv-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setPlcCsvOfficeData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV site table

  const fetchCASiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/ca-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setCaSiteData(dayReportData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV office table

  const fetchCAOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/ca-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setCaOfficeData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV site table

  const fetchSteamSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/steam-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setSteamSiteData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV office table

  const fetchSteamOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/dayReport/steam-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dayReportData = await response.json();
        setSteamOfficeData(dayReportData);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DayReport Data end's here

  // CheckIn Data Start here
  // Add Data

  const addCheckInData = async (
    date,
    checkInType,
    login,
    loginLocation,
    loginAddress,
    siteName
  ) => {
    try {
      const response = await fetch(`${host}/api/checkIn/checkIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          date,
          checkInType,
          login,
          loginLocation,
          loginAddress,
          siteName,
        }),
      });

      const checkInData = await response.json();

      if (response.ok) {
        setCheckInReport((prevCheckInReport) => {
          if (prevCheckInReport === undefined) {
            return [checkInData];
          } else {
            return [...prevCheckInReport, checkInData];
          }
        });
        toast.success("Check-in successful!");
        closePopup(); // Call the function to close the popup
      } else {

        if (response.status === 409) {
          // User already checked in
          toast.warning("You are already checked in");
          closePopup();
        } else if (checkInData.errors && Array.isArray(checkInData.errors)) {
          const errors = checkInData.errors.map((error) => error.msg);
          toast.error("Check-in failed: " + errors.join(", "));
        } else {
          toast.error("Error occurred during Check-In");
        }
      }
    } catch (error) {
    }
  };

  // CheckOut Backend Start here

  const addCheckOutData = async (logout, logoutLocation, logoutAddress) => {
    try {
      const response = await fetch(`${host}/api/checkIn/checkOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ logout, logoutLocation, logoutAddress }),
      });

      const checkOutData = await response.json();

      if (response.ok) {
        setCheckOutReport((prevCheckOutReport) => {
          if (prevCheckOutReport === undefined) {
            return [checkOutData];
          } else {
            return [...prevCheckOutReport, checkOutData];
          }
        });
        toast.success("Check-Out successful");
        closeCheckOutPopup();
      } else {
        if (response.status === 409) {
          toast.warning("You have already checked out today");
          closeCheckOutPopup();
        } else if (checkOutData && checkOutData.message) {
          toast.error("Something went wrong: " + checkOutData.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      toast.error("An error occurred while fetching Check-Out data");
    }
  };

  // fetching data for calibration site table

  const fetchCalibrationCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/calibration-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setCalibrationCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for calibration office table

  const fetchCalibrationCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/calibration-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setCalibrationCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for HVAC site table for checkin

  const fetchHVACCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/hvac-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setHvacCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for HVAC office table for checkin

  const fetchHVACCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/hvac-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setHvacCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for Thermal site table for checkin

  const fetchThermalCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/thermal-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setThermalCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for Thermal office table for checkin

  const fetchThermalCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/thermal-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setThermalCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV site table for checkin

  const fetchPlcCsvCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/plccsv-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setPlcCsvCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for PLC CSV office table for checkin

  const fetchPlcCsvCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/plccsv-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setPlcCsvCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for CA site table for checkin

  const fetchCaCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/ca-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setCaCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for CA office table for checkin

  const fetchCaCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/ca-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setCaCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for CA site table for checkin

  const fetchSteamCheckInSiteData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/steam-site`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setSteamCheckInSiteData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for CA office table for checkin

  const fetchSteamCheckInOfficeData = async () => {
    try {
      const response = await fetch(`${host}/api/checkIn/steam-office`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const checkInData = await response.json();
        setSteamCheckInOfficeData(checkInData)
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // CheckOut Data End's Here

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedDesignation("");
    setSelectedStream("");
  };

  const handleDesignationChange = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const EmployeeJoiningFormData = (show) => {
    if (!show) {
      return null;
    }
  };
  // timer counter

  useEffect(() => {
    let intervalID;

    if (isCounting) {
      intervalID = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [isCounting]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  const pad = (value) => {
    return String(value).padStart(2, "0");
  };
  const startCounting = () => {
    const confirmed = window.confirm("Are you sure you want to Check in?");
    if (confirmed) {
      setIsCounting(true);
    }
  };
  const stopCounting = () => {
    setIsCounting(false);
    setPauseTime(count);
  };

  const resumeCounting = () => {
    setIsCounting(true);
    setCount(pauseTime);
  };
  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to Check Out? If you Checked Out then your working timer will reset."
    );
    if (confirmed) {
      setIsCounting(false);
      setCount(0);
      setPauseTime(0);
    }
  };
  const togglePopup = () => {
    setShowResetPopup(!showResetPopup);
  };
  // const resetCounting = () => {
  //     setIsCounting(false)
  //     setCount(0)
  //     setPauseTime(0)
  // }

  return (
    <StateContext.Provider
      value={{
        GOOGLE_MAP_API_KEY,

        // Validex
        validexTitle,
        softVersion,

        // Validex end

        allowedDesignation,
        userDesignation,
        formatDate,
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
        count,
        setCount,
        isCounting,
        setIsCounting,
        pauseTime,
        setPauseTime,
        showResetPopup,
        setShowResetPopup,
        selectedDepartment,
        setSelectedDepartment,
        selectedDesignation,
        setSelectedDesignation,
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
        currentPage,
        setCurrentPage,
        getCurrentPageData,
        goToPreviousPage,
        goToNextPage,

        // login Details for MainPage
        loggedInUser,
        showPinGenerateModal,
        pin,
        setPin,
        handlePinLogin,


        // signin
        signupEmployee,
        credential,
        setCredential,
        loggedIn,
        setLoggedIn,
        checkLoggedIn,
        fetchIndividualEmployeeData,
        fName,
        setFName,
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
        setPopupOpen,
        openPopup,
        closePopup,
        isPopupCheckOutOpen,
        setPopupCheckOutOpen,
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
