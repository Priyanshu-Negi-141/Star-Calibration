import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../../../../contexts/ContextProvider';

const ThermalMasterInstrumentList = () => {
  const {host} = useStateContext()
  const { streamId } = useParams();
  const [streamInstrumentCounts, setStreamInstrumentCounts] = useState([]);
  const [streamData, setStreamData] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState('');

  useEffect(() => {
    fetchStreamData();
    fetchStreamInstrumentCounts();
  }, []);

  const fetchStreamInstrumentCounts = async () => {
    try {
      const response = await axios.get(`${host}/api/masterInstrument/ThermalInstrumentCount/${streamId}`);
      setStreamInstrumentCounts(response.data);
    } catch (error) {
      console.error('Error fetching stream counts:', error);
    }
  };

  const fetchStreamData = async () => {
    try {
      const response = await axios.get(`${host}/api/masterInstrument/getThermalStreamDetails/${streamId}`);
      setStreamData(response.data);
    } catch (error) {
      console.error('Error fetching stream data:', error);
    }
  };

  const handleStreamClick = (instrument) => {
    setSelectedInstrument(instrument);
  };

  const filteredStreamData = streamData.filter((item) => item.instrument_name === selectedInstrument);

  return (
    <div>
      <div>
        <h2>Selected Stream: {streamId}</h2>
      </div>

      <div className=''>
        <div className=''>
          <div className='w-full text-center text-bold text-lg border p-1 border-black dark:border-white dark:text-white'><h2>Calibration Master Details</h2></div>
        </div>
        <div className='w-full'>
          <table className='w-full border'>
            <thead>
              <tr>
                <th className='border p-2 bg-gray-200'>SR. No</th>
                <th className='border p-2 bg-gray-200'>Stream</th>
                <th className='border p-2 bg-gray-200'>Data</th>
              </tr>
            </thead>
            <tbody>
              {streamInstrumentCounts.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border p-2'>{index + 1}</td>
                  <td
                    className='border p-2 cursor-pointer hover:text-blue-500'
                    onClick={() => handleStreamClick(item._id)}
                  >
                    {item._id}
                  </td>
                  <td className='border p-2'>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredStreamData.map((item, index) => (
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
      ))}
    </div>
  );
};

export default ThermalMasterInstrumentList;
