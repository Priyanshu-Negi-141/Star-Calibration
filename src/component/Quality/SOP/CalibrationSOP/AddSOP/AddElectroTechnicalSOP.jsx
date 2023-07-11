import React, { useState } from 'react';

const AddElectroTechnicalSOP = ({ onClose }) => {
  const [formData, setFormData] = useState({
    sop_name: '',
    sop_number: '',
    is: '',
    amendment_no: '',
    amendment_date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/sop/addElectroTechnicalSOP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Form data submitted successfully
        console.log('Form data submitted:', formData);
      } else {
        // Handle error response from the API
        console.error('Error:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }

    onClose(); // Close the form popup
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="max-w-md mx-auto">
        <div className='flex justify-center items-center text-bold text-xl dark:text-black'><h2>Electro Thermal SOP</h2></div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sop_name">
            SOP Name
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="sop_name"
            name="sop_name"
            value={formData.sop_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sop_number">
            SOP No
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="sop_number"
            name="sop_number"
            value={formData.sop_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is">
            IS
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="is"
            name="is"
            value={formData.is}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amendment_no">
            Amendment No
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="amendment_no"
            name="amendment_no"
            value={formData.amendment_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amendment_date">
            Amendment Date
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="amendment_date"
            name="amendment_date"
            value={formData.amendment_date}
            onChange={handleChange}
          />
        </div>
        {/* Rest of the input fields */}
        <div className="col-span-2 flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddElectroTechnicalSOP;
