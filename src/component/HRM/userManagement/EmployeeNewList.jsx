import React, { useEffect, useState } from "react";
import "../../css/employeeTable.css";
import { PreviousButton } from "../../button";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import moment from "moment";
import { AccessDeniedPage } from "../../AccessRight";
const EmployeeNewList = () => {
  const [sortConfig, setSortConfig] = useState(null);
  const {
    employeeData,
    currentColor,
    deleteEmployee,
    fetchEmployeeData,
    currentPage,
    setCurrentPage,
    totalPages,
    getCurrentPageData,
    goToPreviousPage,
    goToNextPage,
    loggedInEmployee, allowedDesignation,
    userDesignation
  } = useStateContext();
  const [serialNumber, setSerialNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [employeesPerPage] = useState(10);
  const currentPageData = getCurrentPageData();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    setSerialNumber((currentPage * employeesPerPage) + 1)
  }, [currentPage, employeesPerPage])

  const sortTable = (column) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ column, direction });
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handleSearch = (e) => {
    const serchValue = e.target.value.toLowerCase();
    setSearchQuery(serchValue);
  };

  const sortedData = () => {
    if (!sortConfig) {
      return employeeData;
    }

    const { column, direction } = sortConfig;
    const sortedEmployees = [...employeeData];

    sortedEmployees.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "number") {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });

    return sortedEmployees;
  };

  const handleDeleteEmployee = (_id) => {
    setEmployeeIdToDelete(_id)
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedEmployee(null);
    setIsEditModalOpen(false);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedEmployee(null);
    setIsViewModalOpen(false);
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => sortTable("serialNumber")}>
            Sr Num {renderSortIcon("serialNumber")}
          </th>
          <th onClick={() => sortTable("fName")}>
            Employee Name {renderSortIcon("fName")}
          </th>
          <th onClick={() => sortTable("gender")}>
            Gender {renderSortIcon("gender")}
          </th>
          <th onClick={() => sortTable("fatherName")}>
            Father's Name {renderSortIcon("fatherName")}
          </th>
          <th onClick={() => sortTable("motherName")}>
            Mother's Name {renderSortIcon("motherName")}
          </th>
          <th onClick={() => sortTable("dob")}>DOB {renderSortIcon("dob")}</th>
          <th onClick={() => sortTable("mobileNumber")}>
            Number {renderSortIcon("mobileNumber")}
          </th>
          <th onClick={() => sortTable("email")}>
            Email {renderSortIcon("email")}
          </th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const renderSortIcon = (column) => {
    if (!sortConfig || sortConfig.column !== column) {
      return null;
    }

    if (sortConfig.direction === "asc") {
      return <i className="fa fa-caret-up sort-icon" />;
    }

    return <i className="fa fa-caret-down sort-icon" />;
  };

  const renderTableBody = () => {
    const sortedEmployees = sortedData();

    return (
      <tbody className="dark:text-white">
        {currentPageData.map((employee, index) => {
          const fullName =
            `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`.toLowerCase();
          const showEmployee = fullName.includes(searchQuery);
          const birthDate = formatDate(`${employee.employeeData[0].dob}`);
          return (
            <tr
              key={employee._id}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                showEmployee ? "" : "hidden"
              }`}
            >
              <td>{serialNumber + index}</td>
              <td>
                {employee.employeeData[0].fName}{" "}
                {employee.employeeData[0].lName}
              </td>
              <td>{employee.employeeData[0].gender}</td>
              <td>{employee.employeeData[0].fatherName}</td>
              <td>{employee.employeeData[0].motherName}</td>
              <td>{birthDate}</td>
              <td>{employee.employeeData[0].mobile_number}</td>
              <td>{employee.employeeData[0].email}</td>
              <td>
                <div className="action-buttons flex">
                  <Link to={`/editemployeedata/${employee._id}`}>
                    <button type="button"  className="edit-button">E</button>
                  </Link>
                  <button
                  type="button" 
                    className="view-button"
                    onClick={() => openViewModal(employee)}
                  >
                    V
                  </button>
                  <button type="button"  className="delete-button" onClick={() => handleDeleteEmployee(employee._id)}>D</button>
                </div>
              </td>
            </tr>
          );
        })}
        {!employeeData.some((employee) => {
          const fullName =
            `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`.toLowerCase();
          return fullName.includes(searchQuery);
        }) && (
          <tr>
            <td className="px-4 py-3" colSpan="9">
              No matching employees found.
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  const renderViewModal = () => {
    if (!isViewModalOpen || !selectedEmployee) {
      return null;
    }

    return (
      <div className="edit-modal">
        <div className="edit-modal-content">
          <h2>View Employee</h2>
          <div className="edit-modal-details">
            {/* Display employee details */}
          </div>
          <div className="edit-modal-buttons">
            <button className="save-button">Save</button>
            <button className="cancel-button" onClick={closeViewModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchEmployee = () => {
    return (
      // <div className="flex justify-end mb-5">
      //   <div className="relative">
      //     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      //       <svg
      //         className="w-5 h-5 text-gray-500 dark:text-gray-400"
      //         aria-hidden="true"
      //         fill="currentColor"
      //         viewBox="0 0 20 20"
      //         xmlns="http://www.w3.org/2000/svg"
      //       >
      //         <path
      //           fill-rule="evenodd"
      //           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      //           clip-rule="evenodd"
      //         ></path>
      //       </svg>
      //     </div>
      //     <input
      //       type="text"
      //       id="table-search-users"
      //       className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      //       placeholder="Search for Employee..."
      //       value={searchQuery}
      //       onChange={handleSearch}
      //     />
      //   </div>
      // </div>
      <div className="flex justify-end mb-5">
  <div className="relative">
    <input
      type="text"
      id="table-search-users"
      className="block p-2 pl-10 pr-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search for Employee..."
      value={searchQuery}
      onChange={handleSearch}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</div>



    );
  };

  const pagination = () => {
    return (
      <div className="flex justify-center mt-4">
        <button
          className={`${
            currentPage === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors`}
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          <svg
            className="w-4 h-4 inline-block mr-1 -mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Previous
        </button>
        <button
          className={`${
            currentPage === totalPages - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
          <svg
            className="w-4 h-4 inline-block ml-1 -mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    );
  };

  const showPopUp = (_id) => {

    
    return(
      <>
      {showConfirmation && employeeIdToDelete && (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold mb-4">
              Are you sure you want to delete selected employee?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {deleteEmployee(employeeIdToDelete) && handleClose()}}
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
      </>
    )
  }

  return loggedInEmployee.length > 0 ? (
    <>
    {allowedDesignation.includes(userDesignation) ? (
    <div>
      <div className="flex">
      <PreviousButton />
      <div className="">
            <Link to="/UserManagement/addemployee">
              <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                Add Employee
              </button>
            </Link>
          </div>
      </div>
      <h1 className="font-bold text-lg underline p-2 dark:text-white text-center">
        Employee Details
      </h1>
      {renderSearchEmployee()}
      <div className="table-container">
        <table className="employee-table">
          {renderTableHeader()}
          {renderTableBody()}
        </table>

        {renderViewModal()}
      </div>
      {pagination()}
      {showPopUp()}
    </div>
  ) : (
    <AccessDeniedPage />
  )}
  </>
) : (
  null
)
};

export default EmployeeNewList;
