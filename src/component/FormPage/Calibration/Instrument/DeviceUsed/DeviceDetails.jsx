import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DeviceDetails = () => {
    const {instrumentName, id} = useParams()
    const [data,setData] = useState({
        instrumentName: '',
        serialNumber: ''
    })
    const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/certificate/fetch-data', data);
      if (response.status === 200) {
        const fetchedData = response.data;
        setResults((prevResults) => (prevResults ? [...prevResults, fetchedData] : [fetchedData]));
        setError(null);
        setData({
            instrumentName: '',
            serialNumber: ''
          });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setData((prevData) => ({
            ...prevData,
            [name]:value
        }))
    }

    const handleDelete = (index) => {
        setResults((prevResults) => {
          const updatedResults = [...prevResults];
          updatedResults.splice(index, 1);
          return updatedResults;
        });
      };
    
      useEffect(() => {
        // Reset the form fields when the component mounts or when the instrument ID changes
        setData({
          instrumentName: '',
          serialNumber: ''
        });
      }, [id]);


  return (
    <div>
        {/* <Route path='/device-details/:instrumentName/:id' element={<DeviceDetails />}/> */}
        
        <div className='flex gap-3'>
            <p>Selected Instrument Name:</p><p className='text-bold'>{instrumentName}</p>
            <p>Id:</p><p className='text-bold'>{id}</p>
        </div>
        <div className=''>
            <div className='grid gap-3 grid-cols-3'>
            <div className='border-2 border-black p-2 h-72 my-3'>
                <div className='border border-black text-center text-bold p-2'>
                    <h2>Select Supporting Devices Details</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className=''>
                    <label htmlFor="instrumentName">Instrument Name:</label>
                        <input
                        type="text"
                        id="instrumentName"
                        name="instrumentName"
                        value={data.instrumentName}
                        onChange={handleInputChange}
                        required
                        /><br/><br/>
                    </div>
                    <div>
                    <label htmlFor="serialNumber">Serial Number:</label>
                        <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={data.serialNumber}
                        onChange={handleInputChange}
                        required
                        /><br/><br/>
                    </div>
                    <button type="submit">Fetch Data</button>
                </form>
            </div>

                <div className='col-span-2 border border-black'>
                    <div className='overflow-y-auto h-72'>
                    {results && (
                    <div>
                    {results.map((item, index) => (
                        <div key={index}>
                        <div className=''>
                    <div className="bg-white border my-3 border-gray-300 rounded shadow-lg p-4">
                        <div className="grid grid-cols-2 border-y-2 border-black text-white gap-4 bg-blue-900 border">
                        <p className="col-span-1 p-1 text-bold flex items-center">Nomenclature</p>
                        <p className='flex items-center '>{item.instrument_name}</p>
                        </div>
                        <div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Make</p>
                                        
                                        <p className="border p-1">{item.make_model}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Serial No.</p>
                                        
                                        <p className="border p-1 ">{item.serial_number}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Id No.</p>
                                        
                                        <p className="border p-1 ">{item.id_number}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Range</p>
                                        
                                        <p className="border p-1">{item.range}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Least Count</p>
                                        
                                        <p className="border p-1 ">{item.least_count}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Accuracy</p>
                                        
                                        <p className="border p-1 ">{item.accuracy}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Certificate No.</p>
                                        
                                        <p className="border p-1 ">{item.cf_number}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Next Due Date</p>
                                        
                                        <p className="border p-1">{item.due_date}</p>
                                    </div>
                                    <div className="border grid grid-cols-2">
                                        <p className="font-bold p-1 border">Tracability</p>
                                        
                                        <p className="border p-1">{item.traceability}</p>
                                    </div>
                            </div>
                        <div className="text-center w-full">
                        <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-1 border-y-2 border-black">View Certificate</button>
                        </div>
                    </div>
                    </div>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    ))}
                    </div>
                        )}
                        {error && <p>Error: {error}</p>}
                </div>
            </div>
            </div>
        </div>
        

        {/* EnvironMental Data */}
        <div className='border-2 border-black p-2 my-3'>
            <div className='border border-black text-center text-bold p-2 bg-[#F9F5EB]'>
                <h2>Fill Envionmental Details</h2>
            </div>
            <div>
                <form>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <div className='grid gap-2 my-2'>
                                <label htmlFor="temprature">Temprature</label>
                                <input type="text" name="" id="temprature" />
                            </div>
                            <div className='grid gap-2 my-2'>
                                <label htmlFor="humidity">Relative Humadity</label>
                                <input type="text" name="" id="humidity" />
                            </div>
                        </div>
                        <div>
                            <div className='grid gap-2 my-2'>
                                <label htmlFor="cal_procedure">Calibration Procedure</label>
                                <input type="text" name="" id="cal_procedure" />
                            </div>
                            <div className='grid gap-2 my-2'>
                                <label htmlFor="supp_standards">Supporting Standards</label>
                                <input type="text" name="" id="supp_standards" />
                            </div>
                        </div>
                    </div>
                    <div className='grid place-items-end'>
                        <div className='border-2 w-1/5 border-black p-0.5'>
                            <button className='w-full border border-black py-2 cursor-pointer bg-[#EF6262] hover:bg-[#d25252] text-bold text-[#F0F0F0]'>
                                Submit
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default DeviceDetails