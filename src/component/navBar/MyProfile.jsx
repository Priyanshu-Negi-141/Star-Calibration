import React, { useEffect, useState } from "react";
import avater from "../../data/avatar.jpg";
import { PreviousButton } from "../button";
import { useStateContext } from "../../contexts/ContextProvider";

import {
  AddExpense,
  ApplyLeave,
  DayReport,
  OverTime,
  ViewAttendance,
  ViewProfile,
} from "./myProfileButtonData";
import { GrEdit } from "react-icons/gr";
import { useStateProfileContext } from "../../contexts/ProfileContextProvider";

const MyProfile = () => {

  const { currentColor, fetchIndividualEmployeeData, loggedInEmployee } =
    useStateContext();
    
    
    const {selectedProfilePic, profilePictures, isPopupOpen, setIsPopupOpen, handleProfilePicSelect} = useStateProfileContext()



  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const showData = () => {
    setShow(!show);
    if (show1) {
      setShow1(false);
    }
    if (show2) {
      setShow2(false);
    }
    if (show3) {
      setShow3(false);
    }
    if (show4) {
      setShow4(false);
    }
    if (show5) {
      setShow5(false);
    }
  };
  const showData1 = () => {
    setShow1(!show1);
    if (show) {
      setShow(false);
    }
    if (show2) {
      setShow2(false);
    }
    if (show3) {
      setShow3(false);
    }
    if (show4) {
      setShow4(false);
    }
    if (show5) {
      setShow5(false);
    }
  };
  const showData2 = () => {
    setShow2(!show2);
    if (show) {
      setShow(false);
    }
    if (show1) {
      setShow1(false);
    }
    if (show3) {
      setShow3(false);
    }
    if (show4) {
      setShow4(false);
    }
    if (show5) {
      setShow5(false);
    }
  };
  const showData3 = () => {
    setShow3(!show3);
    if (show) {
      setShow(false);
    }
    if (show1) {
      setShow1(false);
    }
    if (show2) {
      setShow2(false);
    }
    if (show4) {
      setShow4(false);
    }
    if (show5) {
      setShow5(false);
    }
  };
  const showData4 = () => {
    setShow4(!show4);
    if (show) {
      setShow(false);
    }
    if (show1) {
      setShow1(false);
    }
    if (show2) {
      setShow2(false);
    }
    if (show3) {
      setShow3(false);
    }
    if (show5) {
      setShow5(false);
    }
  };

  const showData5 = () => {
    setShow5(!show5);
    if (show) {
      setShow(false);
    }
    if (show1) {
      setShow1(false);
    }
    if (show2) {
      setShow2(false);
    }
    if (show3) {
      setShow3(false);
    }
    if (show4) {
      setShow4(false);
    }
  };

  useEffect(() => {
    fetchIndividualEmployeeData();
  }, []);

  return (
    <div>
      <PreviousButton />
      <div className="text-center text-2xl focus:right-6 pt-2 text-gray-900 dark:text-white">
        <h2>My Profile</h2>
      </div>
      <div className="flex mt-5 gap-4">
        <div className="w-60 h-52 grid place-items-center">
          {/* <img className='object-cover w-60 h-52' src={avater} alt="" /> */}
          {/* <FaUserAlt className='object-cover w-60 h-52' style={{color: currentColor, borderColor: currentColor }} /> */}
          <div className="">
            <div className="relative">
              <img
                src={selectedProfilePic}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />

              <button
                className="absolute bottom-0 right-4 text-white px-2 py-2 rounded-full"
                style={{ backgroundColor: currentColor }}
                onClick={() => setIsPopupOpen(true)}
              >
                <GrEdit />
              </button>
            </div>
          </div>
        </div>
        {loggedInEmployee.map((emp) => {
          return (
            <div className="w-full pl-4 h-50 flex flex-col justify-center gap-3 ">
              <h1
                className="text-5xl text-orange-600"
                style={{ color: currentColor }}
              >
                {emp.employeeData[0].fName} {emp.employeeData[0].lName}
              </h1>
              <div className="grid grid-flow-row text-gray-900 dark:text-white">
                <span className="font-bold text-2xl">
                  {emp.employeeData[0].department}
                </span>{" "}
                <span className="text-lg">
                  {emp.employeeData[0].designation}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:overflow-x-auto p-2">
        <div className="grid grid-flow-col mt-5 mb-5 gap-1">
          <button
            type="button"
            onClick={showData}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={showData1}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            View Attandance
          </button>
          <button
            type="button"
            onClick={showData2}
            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Overtime
          </button>
          <button
            type="button"
            onClick={showData3}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Apply Leave
          </button>
          <button
            type="button"
            onClick={showData4}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={showData5}
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Day Report
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-4 w-full h-auto">
        <div className="w-60 mt-2 h-auto" style={{ backgroundColor: "" }}></div>

        {/* data here */}

        {/* <div className='flex gap-4 w-full h-auto text-gray-900 dark:text-white'>
                    <div className='text-right w-40 ' style={{lineHeight: '2rem'}}>
                        <p>First Name</p>
                        <p>Last Name</p>
                        <p>Gender</p>
                        <p>DOB</p>
                        <p>Father Name</p>
                        <p>Mother Name</p>
                        <p>Mobile Num</p>
                        <p>Email</p>
                        <p>Address</p>
                    </div>
                    <div className='w-full' style={{lineHeight: '2rem'}}>
                        <p>Himanshu</p>
                        <p>Negi</p>
                        <p>Male</p>
                        <p>23/Jun/1993</p>
                        <p>Raghubir Singh Negi</p>
                        <p>Manju Devi</p>
                        <p>8888888888</p>
                        <p>himanshunegi@gmail.com</p>
                        <p>Salami Phaphanj</p>
                        

                    </div>
            </div> */}
      </div>

      {/* show data */}
      {show && <ViewProfile />}
      {show1 && <ViewAttendance />}
      {show2 && <OverTime />}
      {show3 && <ApplyLeave />}
      {show4 && <AddExpense />}
      {show5 && <DayReport />}

      {isPopupOpen && (
        <div className="absolute w-full h-full grid place-items-center  top-0 bottom-0 right-0 left-0 bg-black/30 p-4 rounded shadow-md z-30">
          <div className="bg-white p-2 md:w-2/3 rounded-md">
            <div className="">
              <h2 className="text-lg text-center font-bold mb-2">
                Select Profile Picture
              </h2>
            </div>
            <div className="grid place-items-center my-5 grid-cols-5 gap-2">
              {profilePictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Profile ${index + 1}`}
                  className="w-16 h-16 border border-black cursor-pointer rounded-full"
                  onClick={() => handleProfilePicSelect(index)}
                />
              ))}
            </div>
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4"
            /> */}
            <div className="grid place-items-strech py-2">
              <button
                className="mt-2 bg-blue-500 text-white px-2 py-2 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
