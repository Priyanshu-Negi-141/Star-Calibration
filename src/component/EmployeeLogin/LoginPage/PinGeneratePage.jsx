import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PinLoginPage from './PinLoginPage';
import { useStateContext } from '../../../contexts/ContextProvider';
import { toast } from 'react-toastify';

const PinGeneratePage = () => {
  const [pin, setPin] = useState('');
  const {host} = useStateContext()
  const [message, setMessage] = useState('');
  const [hasPin, setHasPin] = useState(false);
  const [currentPage, setCurrentPage] = useState('generate'); // 'generate' or 'login'


  const generatePin = async () => {
    const authToken = localStorage.getItem('token');
    

    try {
      const response = await axios.post(
        `${host}/api/auth/createPin`,
        { pin },
        { headers: { 'auth-token': authToken } }
      );

      if (response.data.status) {
        toast.success(response.data.message)
        setHasPin(true);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error generating PIN:', error);

      if (error.response) {
        toast.warning(error.response.data.message)
      } else {
        setMessage('An error occurred');
      }
    }
  };

  const UserFirstName = localStorage.getItem("First Name")
  const UserLastName = localStorage.getItem("Last Name")
  console.log(UserFirstName)
  console.log(UserLastName)

  const handleTogglePage = () => {
    setCurrentPage(currentPage === 'generate' ? 'login' : 'generate');
  };

  return (
    <div>
  <div className="bg-white p-2 rounded-lg shadow-md w-96">
    <h1 className="text-xl text-center font-semibold">
      {currentPage === 'generate' ? 'Generate' : 'Login'} PIN
    </h1>
    <h3>
      Employee Name : {UserFirstName} {UserLastName}
    </h3>
    {currentPage === 'generate' ? (
      <div>
        {hasPin ? (
          <div>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              onClick={handleTogglePage}
            >
              Go to {currentPage === 'generate' ? 'Login' : 'Generate'} Page
            </button>
          </div>
        ) : (
          <div>
            <label className="block mb-2">Enter PIN:</label>
            <input
              type="text"
              className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              onClick={generatePin}
            >
              Generate PIN
            </button>
          </div>
        )}
      </div>
    ) : (
      <div>
        <PinLoginPage />
        <br />
      </div>
    )}
    <button
      className="mt-4 w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
      onClick={handleTogglePage}
    >
      Go to {currentPage === 'generate' ? 'Login' : 'Generate'} Page
    </button>
  </div>
</div>

  );
};

export default PinGeneratePage;
