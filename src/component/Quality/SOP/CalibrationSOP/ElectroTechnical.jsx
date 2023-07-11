
import React, { useEffect, useState } from 'react';
import AddElectroTechnicalSOP from './AddSOP/AddElectroTechnicalSOP'


const DeleteConfirmationPopup = ({ onDeleteConfirm, onDeleteCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded p-6">
        <p className="text-xl font-bold mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onDeleteConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onDeleteCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const ElectroTechnical = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formDetails, setFormDetails] = useState([]);
  const [data, setData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  
  useEffect(() => {
    fetchETDetails();
  }, []);
  
  const fetchETDetails = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sop/getElectroTechnicalSOP');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete Item from the list of items in SOPs page
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/sop/deleteElectroTechnicalSOP/${deleteItemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Item deleted successfully');
        fetchETDetails(); // Refresh the data after deletion
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };


  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteConfirmation(true);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = (data) => {
    setFormDetails([...formDetails, data]);
  };

  return (
    <div className="">
    <div className='mb-5 flex justify-end'>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleOpenPopup}
    >
      Add SOP
    </button>
    </div>
    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white shadow-md rounded px-8 py-6">
          <AddElectroTechnicalSOP onClose={handleClosePopup} onSubmit={handleFormSubmit} />
        </div>
      </div>
    )}
     
<div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3">
                    Sr. Num
                </th>
                <th scope="col" className="px-6 py-3">
                    Instrument Name
                </th>
                <th scope="col" className="px-6 py-3">
                    SOP Number
                </th>
                <th scope="col" className="px-6 py-3">
                    IS
                </th>
                <th scope="col" className="px-6 py-3">
                    Amendment Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Amendment Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        {
          data.map((items, index) => (
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-2 py-4">
                    {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {items.sop_name}
                </td>
                <td className="px-6 py-4">
                    {items.sop_number}
                </td>
                <td className="px-6 py-4">
                    {items.is}
                </td>
                <td className="px-6 py-4">
                    {items.amendment_no}
                </td>
                <td className="px-6 py-4">
                    {items.amendment_date}
                </td>
                <td>
                {/* Other table cells */}
                  <button className='text-red-500/50 border rounded-full px-5 hover:border-gray-400 hover:text-red-800 p-2' onClick={() => handleDelete(items._id)}>Delete</button>
                </td>
            </tr>
            
        </tbody>
        ))
      }
    </table>
    {/* Delete confirmation popup */}
    {showDeleteConfirmation && (
        <DeleteConfirmationPopup
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={handleDeleteCancel}
        />
      )}
</div>

  </div>
  );
};


export default ElectroTechnical