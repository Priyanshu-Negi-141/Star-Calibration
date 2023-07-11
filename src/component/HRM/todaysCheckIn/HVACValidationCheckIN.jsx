import React, { useEffect } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider';

const HVACValidationCheckIN = ({selectedDate}) => {
  const {hvacCheckInSiteData,
    hvacCheckInOfficeData,
    fetchHVACCheckInSiteData,
    fetchHVACCheckInOfficeData,} = useStateContext()
  useEffect(() => {
    const fetchData = async () => {
      await fetchHVACCheckInSiteData();
      await fetchHVACCheckInOfficeData();
    };

    fetchData();
  }, []);

  const filteredOfficeReports = hvacCheckInOfficeData.filter(
    (officeReport) => officeReport.date === selectedDate
  );
  const filteredSiteReports = hvacCheckInSiteData.filter(
    (siteReport) => siteReport.date === selectedDate
  );

  return (
    <div>
      <div>
        <h3 className="text-bold underline">HVAC Office Data</h3>
        {filteredOfficeReports.length > 0 ? (
          <table className="w-full text-center border-2 border-black/25">
            <thead className="border-2 border-black/25">
              <tr className="">
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Login Time</th>
                <th>Location</th>
                <th>Login Address</th>
                <th>Logout Time</th>
                <th>Logout Location</th>
                <th>Logout Address</th>
                <th>Site Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficeReports.map((office, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${office.Employee.fName} ${office.Employee.lName}`}</td>
                    <td>{office.date}</td>
                    <td>{office.login}</td>
                    <td>{office.login_location}</td>
                    <td>{office.login_address}</td>
                    <td>{office.logout}</td>
                    <td>{office.logout_location}</td>
                    <td>{office.logout_address}</td>
                    <td>{office.site_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="flex justify-center items-center">No data available</p>
        )}

        <h3 className="text-bold underline">HVAC Site Data</h3>
        {filteredSiteReports.length > 0 ? (
          <table className="w-full text-center border-2 border-black/25">
            <thead className="border-2 border-black/25">
              <tr className="">
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Login Time</th>
                <th>Location</th>
                <th>Login Address</th>
                <th>Logout Time</th>
                <th>Logout Location</th>
                <th>Logout Address</th>
                <th>Site Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredSiteReports.map((site, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${site.Employee.fName} ${site.Employee.lName}`}</td>
                    <td>{site.date}</td>
                    <td>{site.login}</td>
                    <td>{site.login_location}</td>
                    <td>{site.login_address}</td>
                    <td>{site.logout}</td>
                    <td>{site.logout_location}</td>
                    <td>{site.logout_address}</td>
                    <td>{site.site_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="flex justify-center items-center">No data available</p>
        )}
      </div>
    </div>
  )
}

export default HVACValidationCheckIN