import React from 'react'

const HVACValidationCheckIN = () => {
    const officeData = [
        {
          srNum: 1,
          empName: 'John Doe',
          mobile: '1234567890',
          loginTime: '9:00 AM',
          location: 'Office A',
          loginAddress: '123 Main St, City',
          logoutTime: '5:00 PM',
          logoutLocation: 'Office A',
          logoutAddress: '123 Main St, City',
          status: 'Active',
        },
        // Other office data objects
      ];
  
      const siteData = [
        {
          srNum: 1,
          empName: 'Jane Smith',
          mobile: '9876543210',
          loginTime: '8:30 AM',
          location: 'Site B',
          loginAddress: '456 Park Ave, City',
          logoutTime: '4:30 PM',
          logoutLocation: 'Site B',
          logoutAddress: '456 Park Ave, City',
          status: 'Active',
          siteName: 'Site B',
        },
        // Other site data objects
      ];
  return (
    <div>
        <div>
        <div>
          <h3 className='text-bold underline'>HVAC Office Data</h3>
          <table className="w-full text-center border-2 border-black/25">
            <thead className='border-2 border-black/25'>
              <tr className=''>
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Mobile</th>
                <th>Login Time</th>
                <th>Location</th>
                <th>Login Address</th>
                <th>Logout Time</th>
                <th>Logout Location</th>
                <th>Logout Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {officeData.map((row, index) => (
                <tr key={index}>
                  <td>{row.srNum}</td>
                  <td>{row.empName}</td>
                  <td>{row.mobile}</td>
                  <td>{row.loginTime}</td>
                  <td>{row.location}</td>
                  <td>{row.loginAddress}</td>
                  <td>{row.logoutTime}</td>
                  <td>{row.logoutLocation}</td>
                  <td>{row.logoutAddress}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className='text-bold underline'>HVAC Site Data</h3>
          <table className="w-full text-center border-2 border-black/25">
            <thead className='border-2 border-black/25'>
              <tr>
                <th>Sr. Num</th>
                <th>Employee Name</th>
                <th>Mobile</th>
                <th>Login Time</th>
                <th>Location</th>
                <th>Login Address</th>
                <th>Logout Time</th>
                <th>Logout Location</th>
                <th>Logout Address</th>
                <th>Status</th>
                <th>Site Name</th>
              </tr>
            </thead>
            <tbody>
              {siteData.map((row, index) => (
                <tr key={index}>
                  <td>{row.srNum}</td>
                  <td>{row.empName}</td>
                  <td>{row.mobile}</td>
                  <td>{row.loginTime}</td>
                  <td>{row.location}</td>
                  <td>{row.loginAddress}</td>
                  <td>{row.logoutTime}</td>
                  <td>{row.logoutLocation}</td>
                  <td>{row.logoutAddress}</td>
                  <td>{row.status}</td>
                  <td>{row.siteName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
    </div>
  )
}

export default HVACValidationCheckIN