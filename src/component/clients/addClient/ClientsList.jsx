import React, { useEffect, useState } from 'react';

const ClientTable = () => {

        const [clients, setClients] = useState([]);
        const [searchValue, setSearchValue] = useState('');
        const [filteredClients, setFilteredClients] = useState([]);
      
        useEffect(() => {
          fetchClientsData();
        }, []);
      
        const fetchClientsData = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/client/clients');
            const data = await response.json();
            setClients(data);
          } catch (error) {
            console.error('Error fetching clients data:', error);
          }
        };
      
        const handleSearch = () => {
          const filtered = clients.filter(
            (client) =>
              client.client_code.toLowerCase() === searchValue.toLowerCase() ||
              client.client_name.toLowerCase() === searchValue.toLowerCase()
          );
          setFilteredClients(filtered);
        };
      
        const handleInputChange = (e) => {
          setSearchValue(e.target.value);
          const filtered = clients.filter(
            (client) =>
              client.client_code
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              client.client_name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
          );
          setFilteredClients(filtered);
        };
      
        const handleClearSearch = () => {
          setSearchValue('');
          setFilteredClients([]);
        };

  return (
    <div className="mx-auto px-4">
      <div className="flex justify-end items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search by Client ID or Name"
          value={searchValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        {/* <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={handleClearSearch}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Clear
        </button> */}
      </div>
      <div className="overflow-auto">
        <div className="w-full">
          <thead>
            <tr>
              <th className="py-2">Client Code</th>
              <th className="py-2">Client Name</th>
              <th className="py-2">Address</th>
              <th className="py-2">Consent Name</th>
              <th className="py-2">Mobile No</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {(filteredClients.length > 0 ? filteredClients : clients).map(
              (client) =>
                client.addresses.map((address, index) => (
                  <tr key={`${client.client_code}-${index}`}>
                    {index === 0 && (
                      <>
                        <td rowSpan={client.addresses.length} className="py-2">
                          {client.client_code}
                        </td>
                        <td rowSpan={client.addresses.length} className="py-2">
                          {client.client_name}
                        </td>
                      </>
                    )}
                    <td className="py-2">
                      <div>{address.address_line_1}</div>
                      <div>{address.address_line_2}</div>
                      <div>{address.city}, {address.postal_code}</div>
                      <div>{address.district}, {address.state}</div>
                      
                    </td>
                    {index === 0 && (
                      <>
                        <td rowSpan={client.addresses.length} className="py-2">
                          {client.consent.consent_name}
                        </td>
                        <td rowSpan={client.addresses.length} className="py-2">
                          {client.consent.mobile_no}
                        </td>
                        <td rowSpan={client.addresses.length} className="py-2">
                          {client.consent.email}
                        </td>
                      </>
                    )}
                  </tr>
                ))
            )}
          </tbody>
        </div>
      </div>

    </div>
  );
};

export default ClientTable;
