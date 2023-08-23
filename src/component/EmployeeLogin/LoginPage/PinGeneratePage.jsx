import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PinLoginPage from './PinLoginPage';
import { useStateContext } from '../../../contexts/ContextProvider';

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

      if (response.data.success) {
        setMessage('PIN generated successfully');
        setHasPin(true);
      } else {
        setMessage('PIN generation failed');
      }
    } catch (error) {
      console.error('Error generating PIN:', error);

      if (error.response) {
        setMessage(error.response.data.error); // Display the error message from the server
      } else {
        setMessage('An error occurred');
      }
    }
  };

  const handleTogglePage = () => {
    setCurrentPage(currentPage === 'generate' ? 'login' : 'generate');
  };

  return (
    <div>
  <div class="bg-white p-2 rounded-lg shadow-md w-96">
    <h1 class="text-xl text-center font-semibold mb-4">
      {currentPage === 'generate' ? 'Generate' : 'Login'} PIN
    </h1>
    {currentPage === 'generate' ? (
      <div>
        {hasPin ? (
          <div>
            <p class="mb-4">{message}</p>
            <button
              class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              onClick={handleTogglePage}
            >
              Go to {currentPage === 'generate' ? 'Login' : 'Generate'} Page
            </button>
          </div>
        ) : (
          <div>
            <label class="block mb-2">Enter PIN:</label>
            <input
              type="text"
              class="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button
              class="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              onClick={generatePin}
            >
              Generate PIN
            </button>
            <div class="mt-2 text-red-500">{message}</div>
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
      class="mt-4 w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
      onClick={handleTogglePage}
    >
      Go to {currentPage === 'generate' ? 'Login' : 'Generate'} Page
    </button>
  </div>
</div>

  );
};

export default PinGeneratePage;
