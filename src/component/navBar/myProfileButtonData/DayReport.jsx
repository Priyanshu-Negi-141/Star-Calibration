import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
//
const DayReport = () => {
  // For Automatic date
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // sent Data to backend
  const { addDayReportData, fetchDayReportData, employeeDayReport, formatDate } =
    useStateContext();
  const [dayReport, setDayReport] = useState({
    date: "",
    checkInType: "",
    siteName: "",
    activity: "",
    description: "",
  });
  const [updatedData, setUpdatedData] = useState({
    Date: "",
    CheckInType: "",
    SiteName: "",
    Activity: "",
    Description: "",
  });
  const defaultDate = getTodayDate();
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  //fetch data for backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    addDayReportData(
      dayReport.date || defaultDate,
      dayReport.checkInType,
      dayReport.siteName,
      dayReport.activity,
      dayReport.description
    );
    setDayReport({ date: "", checkInType: "", siteName: "",activity: "", description: "" });
    handleClose()
  };

  const handleChange = (e) => {
    setDayReport({
      ...dayReport,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchDayReportData();
  }, []);

  // Function to handle update button click
  const handleUpdate = (report) => {
    setSelectedReport(report);
    setShowPopup(true);
    setUpdatedData({
      Date: report.Date,
      CheckInType: report.CheckInType,
      SiteName: report.SiteName,
      Activity: report.Activity,
      Description: report.Description,
    });
  };

  // Function to handle close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sortedReports = [...employeeDayReport].sort((a, b) => {
    // Compare the user's data with other reports
    if (a.Date === b.Date) {
      // If the dates are the same, compare by index
      return employeeDayReport.indexOf(a) - employeeDayReport.indexOf(b);
    } else {
      // Sort by date in descending order
      return new Date(b.Date) - new Date(a.Date);
    }
  });

  const handleSubmitDayReport = () => {
    setShowConfirmation(true);
  };
  const handleClose = () => {
    setShowConfirmation(false);
  };


  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <div className="border border-black dark:border-white p-2 text-center text-bold bg-gray-300 dark:bg-gray-800">
          DayReport
        </div>

        <div className="border border-black dark:border-white p-2 text-center text-bold">
          <div>
            <label htmlFor="date">Select a date:</label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={defaultDate}
              max={defaultDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="border border-black dark:border-white dark:text-white">
            <div className="border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white">
              <h2>Your Activity</h2>
            </div>
            <div className="grid grid-cols-12 text-center">
              <div className="col-span-2 border p-2 border-black dark:border-white">
                <label htmlFor="checkInType">Check In Type</label>
              </div>
              <div className="col-span-2 border p-2 border-black dark:border-white">
                <label htmlFor="siteName">Site Name</label>
              </div>
              <div className="col-span-2 border p-2 border-black dark:border-white">
                <label htmlFor="activity">Activity</label>
              </div>
              <div className="col-span-6 border p-2 border-black dark:border-white">
                <label htmlFor="description">Description</label>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-12 text-center">
                <div className="col-span-2 border border-black dark:border-white">
                  <select
                    id="checkInType"
                    name="checkInType"
                    onChange={handleChange}
                    value={dayReport.checkInType}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="Site">Site</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div className="col-span-2 border border-black dark:border-white">
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    onChange={handleChange}
                    value={dayReport.siteName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2 border border-black dark:border-white">
                  <select
                    id="activity"
                    name="activity"
                    onChange={handleChange}
                    value={dayReport.activity}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="Calibration">Calibration</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Thermal">Thermal Validation</option>
                    <option value="PLC-CSV">PLC CSV</option>
                    <option value="CA">CA Validation</option>
                    <option value="Steam">Steam Validation</option>
                  </select>
                </div>
                <div className="col-span-6 border border-black dark:border-white">
                  <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={dayReport.description}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-2 justify-end">
              <div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form> */}

<div className="flex items-center justify-center bg-gray-100">
  <div className="bg-[#F3FDE8] p-4 rounded shadow-md w-full">
    <h1 className="text-2xl font-bold text-center mb-2 underline">Day Report Form</h1>
    <form className="space-y-4">
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex items-center justify-center">
        <h2 className="text-xl font-bold ">Your Activity</h2>
        </div>
      <div className="col-span-1">
        <label htmlFor="date" className="block font-semibold mb-1">
          Select a date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={defaultDate}
          max={defaultDate}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="checkInType" className="block font-semibold">
              Check In Type
            </label>
            <select
              id="checkInType"
              name="checkInType"
              onChange={handleChange}
              value={dayReport.checkInType}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="none">None</option>
              <option value="Site">Site</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div>
            <label htmlFor="siteName" className="block font-semibold">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              onChange={handleChange}
              value={dayReport.siteName}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
          <label htmlFor="activity" className="block font-semibold">
            Activity
          </label>
          <select
            id="activity"
            name="activity"
            onChange={handleChange}
            value={dayReport.activity}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="Calibration">Calibration</option>
            <option value="HVAC">HVAC</option>
            <option value="Thermal">Thermal Validation</option>
            <option value="PLC-CSV">PLC CSV</option>
            <option value="CA">CA Validation</option>
            <option value="Steam">Steam Validation</option>
          </select>
        </div>
        </div>
        
        <div className="flex gap-4">
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={dayReport.description}
          placeholder="Type your today activity here..."
          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          rows={4} // Adjust the number of rows as needed
          required
        />
      </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmitDayReport}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>





      {/* Table data */}
      <div className="w-full my-5">
        <button
          className="w-full bg-yellow-500/75 hover:bg-yellow-600/75 text-white font-bold py-2 px-4 rounded"
          onClick={toggleTable}
        >
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
      </div>

      {showTable && (
        // <div className="w-full h-screen overflow-y-auto">
        // <div className="">
        //   <table className="w-full overflow-auto divide-y divide-gray-200">
        //     <thead className>
        //       <tr>
        //         <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        //           Type
        //         </th>
        //         <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        //           SiteName
        //         </th>
        //         <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        //           Date
        //         </th>
        //         <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        //           Activity
        //         </th>
        //         <th className="py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        //           Description
        //         </th>
        //       </tr>
        //     </thead>
        //     <tbody className="bg-white divide-y text-left divide-gray-200">
        //       {sortedReports.map((report, index) =>{
        //       const dateFormate = formatDate(report.Date)
        //       return(
        //         <tr key={report._id}>
        //           <td className="py-4 px-6 whitespace-nowrap">
        //             {report.CheckInType}
        //           </td>
        //           <td className="py-4 px-6 whitespace-nowrap">
        //             {report.SiteName}
        //           </td>
        //           <td className="py-4 px-6 whitespace-nowrap">{dateFormate}</td>
        //           <td className="py-4 px-6 whitespace-nowrap">
        //             {report.Activity}
        //           </td> 
        //           <td className="py-4 px-6 whitespace-nowrap">
        //             {report.Description}
        //           </td>
        //         </tr>
        //       )})}
        //     </tbody>
        //   </table>
        // </div>
        // </div>
//         <div className="bg-gray-100 flex justify-center items-center">
//   <div className="bg-white p-6 rounded shadow-md w-full">
//     <h1 className="text-2xl font-semibold text-center mb-4">Day Report Table</h1>
//     <div className="overflow-x-auto">
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//               Type
//             </th>
//             <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//               Site Name
//             </th>
//             <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//               Date
//             </th>
//             <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//               Activity
//             </th>
//             <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//               Description
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedReports.map((report, index) => {
//             const dateFormate = formatDate(report.Date);
//             return (
//               <tr key={report._id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   {report.CheckInType}
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   {report.SiteName}
//                 </td>
//                 <td className="py-3 px-4 whitespace-nowrap">{dateFormate}</td>
//                 <td className="py-3 px-4 whitespace-nowrap">
//                   {report.Activity}
//                 </td>
//                 <td className="py-3 px-4 whitespace-break-spaces">
//                   {report.Description}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

<div className=" bg-gray-100 flex justify-center items-center">
  <div className="bg-white p-6 rounded shadow-md w-full">
    <h1 className="text-2xl font-semibold text-center mb-4">Day Report Table</h1>
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Type
            </th>
            <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Site Name
            </th>
            <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Activity
            </th>
            <th className="py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.map((report, index) => {
            const dateFormate = formatDate(report.Date);
            return (
              <tr key={report._id} className="hover:bg-gray-50">
                <td className="py-1 px-4 whitespace-nowrap">
                  {report.CheckInType}
                </td>
                <td className="py-1 px-4 whitespace-nowrap">
                  {report.SiteName}
                </td>
                <td className="py-1 px-4 whitespace-nowrap">{dateFormate}</td>
                <td className="py-1 px-4 whitespace-nowrap">
                  {report.Activity}
                </td>
                <td className="py-1 px-4 whitespace-pre-wrap">
                  <div className="h-20 overflow-y-scroll no-scrollbar ">
                    {report.Description}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>




      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Update Day Report</h2>
            <form onSubmit={{}}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="Date"
                  value={updatedData.Date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="checkInType"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Check-In Type
                </label>
                <input
                  type="text"
                  id="checkInType"
                  name="CheckInType"
                  value={updatedData.CheckInType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="siteName"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="SiteName"
                  value={updatedData.SiteName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="Description"
                  value={updatedData.Description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
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
            Confirm submission? Once submitted, day reports cannot be edited.
          </p>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
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

export default DayReport;



