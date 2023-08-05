import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useStateContext } from '../../../../../../contexts/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddAuthorisedSignatory = (props) => {

    const {host} = useStateContext()
    const { instrumentName, id } = props
    const [calibratedByOptions, setCalibratedByOptions] = useState([]);
    const [branchHeadOptions, setBranchHeadOptions] = useState([]);
    const [selectedCalibratedBy, setSelectedCalibratedBy] = useState(null);
    const [selectedBranchHead, setSelectedBranchHead] = useState(null);

    useEffect(() => {
        fetchEmployeesByRole("calibrationEngineer");
        fetchEmployeesByRole("branchHead");
      }, []);
    
      const fetchEmployeesByRole = async (role) => {
        try {
          const response = await axios.post(
            `${host}/api/certificate/fetchEmployeesByRole`,
            {
              roles: [role],
            }
          );
    
          const formattedOptions = response.data.employees.map((employee) => ({
            value: `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`,
            label: `${employee.employeeData[0].fName} ${employee.employeeData[0].lName}`,
          }));
    
          if (role === "calibrationEngineer") {
            setCalibratedByOptions(formattedOptions);
          } else if (role === "branchHead") {
            setBranchHeadOptions(formattedOptions);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const handleCalibratedByChange = (selectedOption) => {
        setSelectedCalibratedBy(selectedOption);
      };
    
      const handleBranchHeadChange = (selectedOption) => {
        setSelectedBranchHead(selectedOption);
      };


    const handleSubmit = (e) => {
    
        // Ensure both options are selected before sending the data
        if (selectedCalibratedBy && selectedBranchHead) {
          // Create the data object to be sent to the backend
          const data = {
            calibratedBy: selectedCalibratedBy.value,
            authorizedBy: selectedBranchHead.value,
          };
    
          // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend endpoint to store the data
          const backendURL = `${host}/api/certificate/store-authorized-by/${encodeURIComponent(
            instrumentName
          )}/${encodeURIComponent(id)}`;
    
          axios
            .post(backendURL, data)
            .then((response) => {
              console.log(response.data);
              toast.success("Data Added Successfully!");
              // Handle success response here if needed
            })
            .catch((error) => {
              console.error(error.response.data);
              // Handle error response here if needed
            });
        }
      };


  return (
    <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="">Calibrated By:</label>
                <Select
                  value={selectedCalibratedBy}
                  onChange={handleCalibratedByChange}
                  options={calibratedByOptions}
                  isSearchable={true}
                  placeholder="Calibrated By"
                />
              </div>

              <div>
                <label htmlFor="">Branch Head:</label>
                <Select
                  value={selectedBranchHead}
                  onChange={handleBranchHeadChange}
                  options={branchHeadOptions}
                  isSearchable={true}
                  placeholder="Branch Head"
                />
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AddAuthorisedSignatory