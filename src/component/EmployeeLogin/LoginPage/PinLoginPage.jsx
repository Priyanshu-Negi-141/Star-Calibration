import React, { useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../../../contexts/ContextProvider';

const PinLoginPage = () => {

    const {handlePinLogin,pin, setPin} = useStateContext()

const handleSubmitPinLogin = async (e) => {
    e.preventDefault();
    handlePinLogin();
  };

  return (
    <div >
  <div class="bg-white p-2 rounded-lg shadow-md">
    <div class="mb-1 w-full">
      <label class="block text-sm font-bold text-gray-700">Enter PIN:</label>
      <input
        type="text"
        class="mt-1 px-1 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-300"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
    </div>
    <div>
      <button
        class="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        onClick={handleSubmitPinLogin}
      >
        Login
      </button>
    </div>
  </div>
</div>

  );
};

export default PinLoginPage;
