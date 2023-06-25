import React, { useEffect, useState } from "react";
import '../../css/employeeTable.css'
import { PreviousButton } from '../../button'
import { useStateContext } from '../../../contexts/ContextProvider'
import { Link } from 'react-router-dom'

const EmployeeNewList = () => {
  const [sortConfig, setSortConfig] = useState(null);
  const {employeeData, currentColor, deleteEmployee, fetchEmployeeData, 
    currentPage, setCurrentPage,
    totalPages,
    getCurrentPageData,
    goToPreviousPage,
    goToNextPage,} = useStateContext()

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    useEffect(() => {fetchEmployeeData()}, []);
  
  
    const sortTable = (column) => {
      let direction = "asc";
      if (sortConfig && sortConfig.column === column && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ column, direction });
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
          return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
  
        if (valueA instanceof Date && valueB instanceof Date) {
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }
  
        return 0;
      });
  
      return sortedEmployees;
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
            <th onClick={() => sortTable("dob")}>
              DOB {renderSortIcon("dob")}
            </th>
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
          {sortedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.serialNumber}</td>
              <td>{employee.fName}</td>
              <td>{employee.gender}</td>
              <td>{employee.fatherName}</td>
              <td>{employee.motherName}</td>
              <td>{employee.dob}</td>
              <td>{employee.mobile_number}</td>
              <td>{employee.email}</td>
              <td>
                <div className="action-buttons flex">
                  <Link to={`/editemployeedata/${employee._id}`} ><button className="edit-button" >E</button></Link>
                  <button className="view-button" onClick={() => openViewModal(employee)}>V</button>
                  <button className="delete-button">D</button>
                </div>
              </td>
            </tr>
          ))}
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
              <button className="cancel-button" onClick={closeViewModal}>Cancel</button>
            </div>
            </div>
          </div>
        );
      };
  
    return (
      <div className="table-container">
        <PreviousButton />
        <table className="employee-table">
          <caption className="table-caption dark:text-white">Employee Details</caption>
          {renderTableHeader()}
          {renderTableBody()}
        </table>

        {renderViewModal()}
      </div>
    );
  };
  
  export default EmployeeNewList;
  