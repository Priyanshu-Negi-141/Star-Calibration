import React, { useState } from 'react'

const ThermalSOP = () => {

    const [inputSets, setInputSets] = useState([{ id: 1, fields: {} }]);
  const [selectedSetIds, setSelectedSetIds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleAddInputSet = () => {
    const newId = inputSets.length + 1;
    setInputSets((prevInputSets) => [
      ...prevInputSets,
      { id: newId, fields: {} },
    ]);
  };

  const handleChange = (e, setId) => {
    const { name, value } = e.target;
    setInputSets((prevInputSets) =>
      prevInputSets.map((inputSet) => {
        if (inputSet.id === setId) {
          return {
            id: inputSet.id,
            fields: { ...inputSet.fields, [name]: value },
          };
        }
        return inputSet;
      })
    );
  };

  const handleCheckboxChange = (setId) => {
    if (selectedSetIds.includes(setId)) {
      setSelectedSetIds((prevSelectedSetIds) =>
        prevSelectedSetIds.filter((id) => id !== setId)
      );
    } else {
      setSelectedSetIds((prevSelectedSetIds) => [...prevSelectedSetIds, setId]);
      setEditMode(true);
    }
  };

  const handleDeleteInputSets = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationYes = () => {
    setInputSets((prevInputSets) =>
      prevInputSets.filter((inputSet) => !selectedSetIds.includes(inputSet.id))
    );
    setSelectedSetIds([]);
    setEditMode(false);
    setShowConfirmation(false);
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  const handleDoneButtonClick = () => {
    setSelectedSetIds([]);
    setEditMode(false);
  };

  return (

    <div className=''>
        <div className=''>
            <div className='border border-black p-2 text-center text-bold bg-green-700 hover:bg-green-800'><h2>Thermal SOP Index</h2></div>
            <div className='grid border border-black text-bold grid-cols-12 text-center bg-gray-300 dark:bg-gray-800'>
                <div className='col-span-1 border border-black'><h1>S. No.</h1></div>
                <div className='col-span-3 border border-black'><h1>SOP Name</h1></div>
                <div className='col-span-2 border border-black'><h1>SOP Number</h1></div>
                <div className='col-span-1 border border-black'><h1>IS</h1></div>
                <div className='col-span-2 border border-black'><h1>Amendment No.</h1></div>
                <div className='col-span-2 border border-black'><h1>Amendment Date</h1></div>
                <div className='col-span-1 border border-black' ><h1>Action</h1></div>
            </div>
        {inputSets.map((inputSet) => (
            <div 
            className='grid grid-cols-12 border border-black'
            key={inputSet.id}>
                <div className='border col-span-1 border-black flex justify-center items-center' >
                <input
                    type="checkbox"
                    className='w-5 h-5 rounded-full'
                    checked={selectedSetIds.includes(inputSet.id)}
                    onChange={() => handleCheckboxChange(inputSet.id)}
                />
                </div>
                <div className='border border-black col-span-3'>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={`field1-${inputSet.id}`}
                    value={inputSet.fields['field1']}
                    onChange={(e) => handleChange(e, inputSet.id)}
                    disabled={!editMode || !selectedSetIds.includes(inputSet.id)}
                />
                </div>
                <div className='border border-black col-span-2'>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={`field2-${inputSet.id}`}
                    value={inputSet.fields['field2']}
                    onChange={(e) => handleChange(e, inputSet.id)}
                    disabled={!editMode || !selectedSetIds.includes(inputSet.id)}
                />
                </div>
                <div className='border border-black col-span-1'>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={`field3-${inputSet.id}`}
                    value={inputSet.fields['field3']}
                    onChange={(e) => handleChange(e, inputSet.id)}
                    disabled={!editMode || !selectedSetIds.includes(inputSet.id)}
                />
                </div>
                <div className='border border-black col-span-2'>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={`field4-${inputSet.id}`}
                    value={inputSet.fields['field4']}
                    onChange={(e) => handleChange(e, inputSet.id)}
                    disabled={!editMode || !selectedSetIds.includes(inputSet.id)}
                />
                </div>
                <div className='border border-black col-span-2'>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name={`field5-${inputSet.id}`}
                    value={inputSet.fields['field5']}
                    onChange={(e) => handleChange(e, inputSet.id)}
                    disabled={!editMode || !selectedSetIds.includes(inputSet.id)}
                />
                </div>
                <div className='flex justify-center items-center border border-black bg-sky-700/75 hover:bg-sky-800'>
                    <button>
                        View
                    </button>
                </div>
            </div>
        ))}
            <div className='flex justify-end mt-2'>
                <button className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800" onClick={handleAddInputSet}>Add</button>
                {selectedSetIds.length > 0 && editMode && (
                        <>
                        <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={handleDeleteInputSets}>Delete</button>
                        <button className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800" onClick={handleDoneButtonClick}>Done</button>
                        </>
                    )}
                    {showConfirmation && (
                        <div className='absolute top-0 left-0 bottom-0 right-0 bg-black/75 w-full h-full'>
                            <div className='relative flex justify-center top-1/3'>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-700 font-semibold mb-4">Are you sure you want to delete?</p>
                                <div className="flex justify-end">
                                <button
                                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={handleConfirmationYes}
                                >
                                    Yes
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                    onClick={handleConfirmationNo}
                                >
                                    No
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    </div>
  );
}

export default ThermalSOP