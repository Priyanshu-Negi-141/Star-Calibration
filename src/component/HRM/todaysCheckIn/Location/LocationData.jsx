import React from 'react'

const LocationData = (locationData) => {
    const dataArray = locationData.locationData || [];
  return (
    <div className="">
  <div className="bg-white rounded-lg shadow-lg p-2">
    <h1 className="text-2xl font-semibold mb-4">Location Data</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={item._id} className="{{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}}">
              <td className="py-2">{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  )
}

export default LocationData