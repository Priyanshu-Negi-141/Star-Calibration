import React from 'react'

const LocationData = (locationData) => {
    const dataArray = locationData.locationData || [];
  return (
    <div class="">
  <div class="bg-white rounded-lg shadow-lg p-2">
    <h1 class="text-2xl font-semibold mb-4">Location Data</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={item._id} class="{{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}}">
              <td class="py-2">{item.address}</td>
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