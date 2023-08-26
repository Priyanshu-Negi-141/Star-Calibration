import React, { useState } from "react";
import { PreviousButton } from "../../button";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  fatherName: "",
  motherName: "",
  dob: "",
  mobileNumber: "",
  gender: "",
  password: "",
  department: "",
  designation: "",
  marital_status: "",
  aadharNumber: "",
  panNumber: "",
  blood: "",
  correspondenceAddresses: [
    {
      address_line_1: "",
      address_line_2: "",
      postal_code: "",
      district: "",
      state: "",
    },
  ],
  permanentAddresses: [
    {
      address_line_1: "",
      address_line_2: "",
      postal_code: "",
      district: "",
      state: "",
    },
  ],
  emergencyDetails: [
    {
      firstPersonName: "",
      firstPersonRelation: "",
      firstPersonContact: "",
      secPersonName: "",
      secPersonRelation: "",
      secPersonContact: "",
    },
  ],
  educationDetails: [
    {
      educationType: "",
      schoolName: "",
      grade: "",
      fromDate: "",
      toDate: "",
    },
  ],
  prevOrganizationDetails: [
    {
      orgName: "",
      designation: "",
      annualCTC: "",
      fromDate: "",
      toDate: "",
    },
  ],
};

const AddEmployee = () => {
  const {
    selectedDepartment,
    setSelectedDepartment,
    selectedDesignation,
    setSelectedDesignation,
    handleDepartmentChange,
    handleDesignationChange,
    host,
  } = useStateContext();

  const [employee, setEmployee] = useState({ ...initialState });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteLastAddress = () => {
    setEmployee((prevEmployee) => {
      const updatedEducationDetails = [...prevEmployee.educationDetails];
      updatedEducationDetails.pop();
      return {
        ...prevEmployee,
        educationDetails: updatedEducationDetails,
      };
    });
  };

  const handleAddEmployee = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };

  const resetForm = () => {
    setSelectedDepartment("");
    setSelectedDesignation("");
    setEmployee({ ...initialState });
  };

  // Backend start
  // HandleClick
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const addEmployee = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        fatherName: employee.fatherName,
        motherName: employee.motherName,
        dob: employee.dob,
        mobileNumber: employee.mobileNumber,
        gender: employee.gender,
        password: employee.password,
        department: selectedDepartment,
        designation: selectedDesignation,
        marital_status: employee.marital_status,
        aadharNumber: employee.aadharNumber,
        panNumber: employee.panNumber,
        blood: employee.blood,
        correspondenceAddresses: employee.correspondenceAddresses,
        permanentAddresses: employee.permanentAddresses,
        emergencyDetails: employee.emergencyDetails,
        educationDetails: employee.educationDetails,
        prevOrganizationDetails: employee.prevOrganizationDetails,
      };
      await axios.post(`${host}/api/employee/addEmployeeData`, addEmployee, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Employee added Successfully!");
      setShowConfirmation(false);
      resetForm();
    } catch (error) {
      toast.error("Somthing Wrong! Please try again");
      console.error("Error adding instrument details:", error);
    }
  };

  const handleChange = (e, addressType, index) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => {
      if (addressType === "correspondence" || addressType === "permanent") {
        const addresses = [...prevEmployee[`${addressType}Addresses`]];
        addresses[index][name] = value;
        return {
          ...prevEmployee,
          [`${addressType}Addresses`]: addresses,
        };
      } else if (addressType === "emergency") {
        const emergencyDetails = [...prevEmployee.emergencyDetails];
        emergencyDetails[0][name] = value;
        return {
          ...prevEmployee,
          emergencyDetails,
        };
      } else if (addressType === "education") {
        // Handle education details
        const educationDetails = [...prevEmployee.educationDetails];
        educationDetails[index][name] = value;
        return {
          ...prevEmployee,
          educationDetails,
        };
      } else if (addressType === "organization") {
        const prevOrganizationDetails = [
          ...prevEmployee.prevOrganizationDetails,
        ];
        prevOrganizationDetails[0][name] = value;
        return {
          ...prevEmployee,
          prevOrganizationDetails,
        };
      } else {
        return {
          ...prevEmployee,
          [name]: value,
        };
      }
    });
  };

  return (
    <div className="">
      <div className="mb-3">
        <div className="flex">
          <PreviousButton className="" />
          <div className="">
            <Link to="/employeeList">
              <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                Employee List
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div>{/* i will create radio button to display deyails filled */}</div>
        <form>
          <h3 className="text-black font-bold text-lg rounded-sm mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800">
            Personal Details
          </h3>
          <div className="bg-[#FFF0F5] dark:bg-[#61677A] mb-5 rounded-lg dark:border-white p-5">
            <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="fName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  value={employee.firstName}
                  onChange={(e) => handleChange(e)}
                  id="fName"
                  name="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="lName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                </div>
                <input
                  type="text"
                  value={employee.lastName}
                  onChange={(e) => handleChange(e)}
                  id="lName"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="fatherName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Father Name
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  onChange={(e) => handleChange(e)}
                  value={employee.fatherName}
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Father Name"
                  required
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="motherName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mother Name
                  </label>
                </div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  value={employee.motherName}
                  id="motherName"
                  name="motherName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mother Name"
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  id="dob"
                  value={employee.dob}
                  name="dob"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="DD/MM/YYYY"
                  required
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>{" "}
                  <p className="text-red-500">*</p>
                </div>
                <select
                  id="gender"
                  value={employee.gender}
                  name="gender"
                  required
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>: : : Gender : : :</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="mobile_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="number"
                  value={employee.mobileNumber}
                  id="mobile_number"
                  name="mobileNumber"
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mobile Number"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>

              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="email"
                  id="email"
                  value={employee.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="xyz@companymail.com"
                  required
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  id="password"
                  value={employee.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected value="">
                    : : : Department : : :
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Account">Account</option>
                  <option value="Calibration">Calibration</option>
                  <option value="HVAC Validation">HVAC Validation</option>
                  <option value="Thermal Validation">Thermal Validation</option>
                  <option value="CA Validation">CA Validation</option>
                  <option value="PLC & CSV Validation">PLC & CSV Validation</option>
                  <option value="Steam Quality Validation">
                    Steam Quality Validation
                  </option>
                </select>
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="designation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Designation
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <select
                  id="designation"
                  value={selectedDesignation}
                  onChange={handleDesignationChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>: : : Designation : : :</option>
                  {selectedDepartment === "Admin" && (
                    <>
                      <option value="Admin Head">Admin Head</option>
                    </>
                  )}
                  {selectedDepartment === "Account" && (
                    <>
                      <option value="Account Head">Account Head</option>
                    </>
                  )}
                  {selectedDepartment === "Calibration" && (
                    <>
                      <option value="Jr. Calibration Engineer">
                        Jr. Calibration Engineer
                      </option>
                      <option value="Sr. Calibration Engineer">
                        Sr. Calibration Engineer
                      </option>
                      <option value="Computer Operator Calibration">
                        Computer Operator (Calibration)
                      </option>
                      <option value="HOD Calibration">HOD Calibration</option>
                      <option value="Assistant Technical Manager">
                        Assistant Technical Manager
                      </option>
                      <option value="Assistant Quality Manager">
                        Assistant Quality Manager
                      </option>
                      <option value="Technical Manager">
                        Technical Manager
                      </option>
                      <option value="Quality Manager">Quality Manager</option>
                    </>
                  )}
                  {selectedDepartment === "HVAC Validation" && (
                    <>
                      <option value="Jr. Validation Engineer">
                        Jr. Validation Engineer
                      </option>
                      <option value="Sr. Validation Engineer">
                        Sr. Validation Engineer
                      </option>
                      <option value="Computer Operator Validation">
                        Computer Operator (Validation)
                      </option>
                      <option value="HOD HVAC Validation">
                        HOD HVAC Validation
                      </option>
                    </>
                  )}
                  {selectedDepartment === "Thermal Validation" && (
                    <>
                      <option value="Jr. Validation Engineer">
                        Jr. Validation Engineer
                      </option>
                      <option value="Sr. Validation Engineer">
                        Sr. Validation Engineer
                      </option>
                      <option value="Computer Operator Thermal">
                        Computer Operator (Thermal)
                      </option>
                      <option value="HOD Thermal Validation">
                        HOD Thermal Validation
                      </option>
                    </>
                  )}
                  {selectedDepartment === "PLC & CSV Validation" && (
                    <>
                      <option value="jrSME">SME</option>
                      <option value="srSME">Sr. SME</option>
                      <option value="managerCSV">Manager CSV</option>
                    </>
                  )}
                  {selectedDepartment === "CA Validation" && (
                    <>
                      <option value="Jr. Validation Engineer">
                        Jr. Validation Engineer
                      </option>
                      <option value="Sr. Validation Engineer">
                        Sr. Validation Engineer
                      </option>
                      <option value="Computer Operator CA">
                        Computer Operator (CA)
                      </option>
                      <option value="HOD CA Validation">
                        HOD CA Validation
                      </option>
                    </>
                  )}
                  {selectedDepartment === "Steam Quality Validation" && (
                    <>
                      <option value="Jr. Validation Engineer">
                        Jr. Validation Engineer
                      </option>
                      <option value="Sr. Validation Engineer">
                        Sr. Validation Engineer
                      </option>
                      <option value="Computer Operator Steam">
                        Computer Operator (Steam)
                      </option>
                      <option value="HOD Steam Validation">
                        HOD Steam Validation
                      </option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="marital"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Marital Status
                  </label>
                </div>
                <input
                  type="text"
                  id="marital"
                  name="marital_status"
                  onChange={(e) => handleChange(e)}
                  value={employee.marital_status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Marital Status"
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="blood"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blood Type
                  </label>
                </div>
                <input
                  type="text"
                  id="blood"
                  name="blood"
                  value={employee.blood}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Blood Group (+ve/-ve)"
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="aadhar_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Aadhar Number
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="number"
                  id="aadhar_number"
                  name="aadharNumber"
                  onChange={(e) => handleChange(e)}
                  value={employee.aadharNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234-4567-7890"
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  required
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="pan_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PAN Number
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  id="pan_number"
                  value={employee.panNumber}
                  name="panNumber"
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pan Number"
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-1">
                <div className="flex gap-1">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Permanent Address
                  </label>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address_line_1"
                  value={employee.permanentAddresses[0].address_line_1}
                  onChange={(e) => handleChange(e, "permanent", 0)}
                  className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 1"
                  required
                />
                <input
                  type="text"
                  id="address"
                  name="address_line_2"
                  value={employee.permanentAddresses[0].address_line_2}
                  onChange={(e) => handleChange(e, "permanent", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 2"
                />
              </div>
              <div className="mb-2 flex gap-1 sm:flex-col md:flex-row">
                <input
                  type="text"
                  id="address"
                  name="postal_code"
                  value={employee.permanentAddresses[0].postal_code}
                  onChange={(e) => handleChange(e, "permanent", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Postal Code"
                  required
                />
                <input
                  type="text"
                  id="address"
                  name="district"
                  value={employee.permanentAddresses[0].district}
                  onChange={(e) => handleChange(e, "permanent", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="District"
                  required
                />
                <input
                  type="text"
                  id="address"
                  name="state"
                  value={employee.permanentAddresses[0].state}
                  onChange={(e) => handleChange(e, "permanent", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                  required
                />
              </div>
              <div className="mb-1">
                <div className="flex gap-1">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Correspondence Address
                  </label>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address_line_1"
                  value={employee.correspondenceAddresses[0].address_line_1}
                  onChange={(e) => handleChange(e, "correspondence", 0)}
                  className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  id="address"
                  name="address_line_2"
                  value={employee.correspondenceAddresses[0].address_line_2}
                  onChange={(e) => handleChange(e, "correspondence", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 2"
                />
              </div>
              <div className="mb-2 flex gap-1 sm:flex-col md:flex-row">
                <input
                  type="text"
                  id="address"
                  name="postal_code"
                  value={employee.correspondenceAddresses[0].postal_code}
                  onChange={(e) => handleChange(e, "correspondence", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-40 sm:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Postal Code"
                />
                <input
                  type="text"
                  id="address"
                  name="district"
                  value={employee.correspondenceAddresses[0].district}
                  onChange={(e) => handleChange(e, "correspondence", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="District"
                />
                <input
                  type="text"
                  id="address"
                  name="state"
                  value={employee.correspondenceAddresses[0].state}
                  onChange={(e) => handleChange(e, "correspondence", 0)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                />
              </div>

              {/* <div className="mt-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Profile Pic
              </label>
              <input
                className="block cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="file_input"
                type="file"
              />
            </div> */}
            </div>
          </div>
          {/* Emergency Detail's */}
          <div>
            <h3 className="text-black font-bold text-lg rounded-sm mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800">
              Emergency Details
            </h3>
            <div className="bg-[#FFF0F5] dark:bg-[#61677A] mb-5 rounded-lg dark:border-white p-5">
              <div className="grid gap-6 mb-6 sm:grid-cols-3 md:grid-cols-3">
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <p className="text-red-500">*</p>
                  </div>
                  <input
                    type="text"
                    value={employee.emergencyDetails[0].firstPersonName}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="name"
                    name="firstPersonName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="relation"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Relation
                    </label>
                    <p className="text-red-500">*</p>
                  </div>
                  <input
                    type="text"
                    value={employee.emergencyDetails[0].firstPersonRelation}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="relation"
                    name="firstPersonRelation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Relation"
                    required
                  />
                </div>
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="contact"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contact
                    </label>
                    <p className="text-red-500">*</p>
                  </div>
                  <input
                    type="number"
                    value={employee.emergencyDetails[0].firstPersonContact}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="contact"
                    name="firstPersonContact"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Number"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 sm:grid-cols-3 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="secPersonName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={employee.emergencyDetails[0].secPersonName}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="secPersonName"
                    name="secPersonName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="secPersonRelation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Relation
                  </label>
                  <input
                    type="text"
                    value={employee.emergencyDetails[0].secPersonRelation}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="secPersonRelation"
                    name="secPersonRelation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Relation"
                  />
                </div>
                <div>
                  <label
                    htmlFor="secPersonContact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="number"
                    value={employee.emergencyDetails[0].secPersonContact}
                    onChange={(e) => handleChange(e, "emergency", 0)}
                    id="secPersonContact"
                    name="secPersonContact"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Detail's Ends*/}

          {/* Education Detail's */}

          <div>
            <h3 className="text-black font-bold text-lg rounded-sm mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800">
              Education Details
              <span className="text-red-500 text-lg ml-2">*</span>
            </h3>
            <div className="bg-[#FFF0F5] dark:bg-[#61677A] mb-5 rounded-lg dark:border-white p-5">
              {employee.educationDetails.map((education, index) => (
                <div key={index} className="p-2 my-3">
                  <div>
                    <div className="grid mb-2 gap-2">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor={`educationType-${index}`}
                          >
                            Edu Type
                          </label>
                          <select
                            id={`educationType-${index}`}
                            name={`educationType`}
                            value={education.educationType}
                            onChange={(e) =>
                              handleChange(e, "education", index)
                            }
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>None</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Greduation">Graduation</option>
                            <option value="Post Graduation">
                              Post Graduation
                            </option>
                          </select>
                        </div>

                        <div className="col-span-3">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor={`schoolName-${index}`}
                          >
                            School/College
                          </label>
                          <input
                            type="text"
                            id={`schoolName-${index}`}
                            name={`schoolName`}
                            value={education.schoolName}
                            placeholder="School/College Name"
                            className="dark:bg-transparent"
                            onChange={(e) =>
                              handleChange(e, "education", index)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-2">
                      <div className="sm:col-span-1 md:col-span-2">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor={`grade-${index}`}
                        >
                          Grade
                        </label>
                        <input
                          type="text"
                          id={`grade-${index}`}
                          name={`grade`}
                          value={education.grade}
                          placeholder="Grade"
                          className="dark:bg-transparent"
                          onChange={(e) => handleChange(e, "education", index)}
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor={`fromDate-${index}`}
                        >
                          From
                        </label>
                        <input
                          type="date"
                          id={`fromDate-${index}`}
                          name={`fromDate`}
                          value={education.fromDate}
                          placeholder="From"
                          className="dark:bg-transparent"
                          onChange={(e) => handleChange(e, "education", index)}
                        />
                      </div>

                      <div className="sm:col-span-3 md:col-span-2">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor={`toDate-${index}`}
                        >
                          To
                        </label>
                        <input
                          type="date"
                          id={`toDate-${index}`}
                          name={`toDate`}
                          value={education.toDate}
                          placeholder="To"
                          className="dark:bg-transparent"
                          onChange={(e) => handleChange(e, "education", index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    setEmployee((prevEmployee) => ({
                      ...prevEmployee,
                      educationDetails: [
                        ...prevEmployee.educationDetails,
                        {
                          educationType: "",
                          schoolName: "",
                          grade: "",
                          fromDate: "",
                          toDate: "",
                        },
                      ],
                    }))
                  }
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={handleDeleteLastAddress}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {/* Education Detail's ends */}
          {/* Previous Company Detail's */}

          <div>
            <h3 className="text-black font-bold text-lg rounded-sm mb-5 p-3 dark:text-yellow-50 bg-gray-300 dark:bg-gray-800">
              Previous Company Details
            </h3>
            <div className="bg-[#FFF0F5] dark:bg-[#61677A] mb-5 rounded-lg dark:border-white p-5">
              <div className="p-2 my-3">
                <div>
                  <div className="grid mb-2 gap-2">
                    <div className="grid sm:grid-flow-row md:grid-cols-5 gap-2">
                      <div className="col-span-3">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="orgName"
                        >
                          Organization
                        </label>
                        <input
                          type="text"
                          id="orgName"
                          name="orgName"
                          value={employee.prevOrganizationDetails[0].orgName}
                          placeholder="Organization Name"
                          className="dark:bg-transparent"
                          onChange={(e) => handleChange(e, "organization", 0)}
                        />
                      </div>

                      <div className="sm:col-span-3 md:col-span-2">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="designation"
                        >
                          Designation
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          value={
                            employee.prevOrganizationDetails[0].designation
                          }
                          placeholder="Designation"
                          className="dark:bg-transparent"
                          onChange={(e) => handleChange(e, "organization", 0)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-2">
                    <div className="sm:col-span-1 md:col-span-2">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="annualCTC"
                      >
                        Annual CTC
                      </label>
                      <input
                        type="text"
                        id="annualCTC"
                        name="annualCTC"
                        value={employee.prevOrganizationDetails[0].annualCTC}
                        placeholder="CTC"
                        className="dark:bg-transparent"
                        onChange={(e) => handleChange(e, "organization", 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor={`fromDate`}
                      >
                        From
                      </label>
                      <input
                        type="date"
                        id="fromDate"
                        name="fromDate"
                        value={employee.prevOrganizationDetails[0].fromDate}
                        placeholder="From"
                        className="dark:bg-transparent"
                        onChange={(e) => handleChange(e, "organization", 0)}
                      />
                    </div>

                    <div className="sm:col-span-3 md:col-span-2">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="toDate"
                      >
                        To
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        name="toDate"
                        value={employee.prevOrganizationDetails[0].toDate}
                        placeholder="To"
                        className="dark:bg-transparent"
                        onChange={(e) => handleChange(e, "organization", 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Company Detail's ends*/}

          <div className="grid place-items-center">
            <button
              type="button"
              onClick={handleAddEmployee}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {showConfirmation && (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold mb-4">
              Are you sure you want to Add {employee.firstName}{" "}
              {employee.lastName} detail's?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleClick}
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
