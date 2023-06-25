import React, { useEffect } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'

const CalibrationDayReportsData = ({selectedDate}) => {
  const {calibrationSiteData,calibrationOfficeData, fetchCalibrationSiteData,fetchCalibrationOfficeData} = useStateContext()

  useEffect(() => {
    fetchCalibrationSiteData()
    fetchCalibrationOfficeData()
  })

  const filteredOfficeReports = calibrationOfficeData.filter(
    officeReport=> officeReport.Date === selectedDate)

    const filteredSiteReports = calibrationSiteData.filter(
      siteReport=> siteReport.Date === selectedDate)

  return (
    <div>
      <div>
        <div>
          <h3 className='text-bold underline'>Calibration Office Data</h3>
            {
              filteredOfficeReports.length > 0 ? (
          <table className="w-full border-2 border-black/25">
            <thead className='border-2 border-black/25'>
              <tr className=''>
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Activity</th>
                <th>Site Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredOfficeReports.map((office,index)=> {
                  return(
                    
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{office.Employee.fName} {office.Employee.lName}</td>
                  <td>{office.Date}</td>
                  <td>{office.Activity}</td>
                  <td>{office.SiteName}</td>
                  <td>{office.Description}</td>
                </tr>
                )
              })
            }
              
            </tbody>
          </table>
          ):(
            <p className='flex justify-center items-center'>No data available</p>
          )}

          <h3 className='text-bold underline'>Calibration Site Data</h3>
            {
              filteredSiteReports.length > 0 ? (
          <table className="w-full border-2 border-black/25">
            <thead className='border-2 border-black/25'>
              <tr className=''>
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Activity</th>
                <th>Site Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredSiteReports.map((site,index)=> {
                  return(
                    
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{site.Employee.fName} {site.Employee.lName}</td>
                  <td>{site.Date}</td>
                  <td>{site.Activity}</td>
                  <td>{site.SiteName}</td>
                  <td>{site.Description}</td>
                </tr>
                )
              })
            }
              
            </tbody>
          </table>
          ):(
            <p className='flex justify-center items-center'>No data available</p>
          )}
        </div>
    </div>
    </div>
  )
}

export default CalibrationDayReportsData