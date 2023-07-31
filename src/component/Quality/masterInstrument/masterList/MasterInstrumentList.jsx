import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../../../contexts/ContextProvider';

const MasterInstrumentList = () => {
  const {host} = useStateContext()
  const [calibrationStreamCounts, setCalibrationStreamCounts] = useState([]);
  const [hvacStreamCounts, setHVACStreamCounts] = useState([]);
  const [thermalStreamCounts, setThermalStreamCounts] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');

  useEffect(() => {
    fetchCalibrationStreamCounts();
    fetchHVACStreamCounts();
    fetchThermalStreamCounts();
  }, []);

  const fetchCalibrationStreamCounts = async () => {
    try {
      const response = await axios.get(`${host}/api/masterInstrument/getCalibrationStreamCounts`);
      setCalibrationStreamCounts(response.data);
    } catch (error) {
      console.error('Error fetching stream counts:', error);
    }
  };

  const fetchHVACStreamCounts = async () => {
    try {
      const response = await axios.get(`${host}/api/masterInstrument/getHVACStreamCounts`);
      setHVACStreamCounts(response.data);
    } catch (error) {
      console.error('Error fetching stream counts:', error);
    }
  };

  const fetchThermalStreamCounts = async () => {
    try {
      const response = await axios.get(`${host}/api/masterInstrument/getThermalStreamCounts`);
      setThermalStreamCounts(response.data);
    } catch (error) {
      console.error('Error fetching stream counts:', error);
    }
  };

  const handleStreamClick = (streamId) => {
    setSelectedStream(streamId);
  };

  return (
    <div className=''>
      <div className='grid grid-cols-3 gap-3 my-3'>
        <div className='w-full text-center text-bold text-lg border p-1 border-black dark:border-white dark:text-white'><h2>Calibration Master Details</h2></div>
        <div className='w-full text-center text-bold text-lg border p-1 border-black dark:border-white dark:text-white'><h2>HVAC Master Details</h2></div>
        <div className='w-full text-center text-bold text-lg border p-1 border-black dark:border-white dark:text-white'><h2>Thermal Master Details</h2></div>
      </div>
      <div className='grid grid-cols-3 gap-3 w-full'>
          <table className='w-full border'>
            <thead>
              <tr>
                <th className='border p-2 bg-gray-200'>SR. No</th>
                <th className='border p-2 bg-gray-200'>Stream</th>
                <th className='border p-2 bg-gray-200'>Data</th>
              </tr>
            </thead>
            <tbody>
              {calibrationStreamCounts.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border p-2'>{index + 1}</td>
                  <td
                    className='border p-2 cursor-pointer hover:text-blue-500'
                    onClick={() => handleStreamClick(item._id)}
                  >
                    <Link to={`/masterInstrument/Calibration/${item._id}`}>{item._id}</Link>
                  </td>
                  <td className='border p-2'>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add the other two tables here */}
          <table className='w-full border'>
            <thead>
              <tr>
                <th className='border p-2 bg-gray-200'>SR. No</th>
                <th className='border p-2 bg-gray-200'>Stream</th>
                <th className='border p-2 bg-gray-200'>Data</th>
              </tr>
            </thead>
            <tbody>
              {hvacStreamCounts.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border p-2'>{index + 1}</td>
                  <td
                    className='border p-2 cursor-pointer hover:text-blue-500'
                    onClick={() => handleStreamClick(item._id)}
                  >
                    <Link to={`/masterInstrument/HVAC/${item._id}`}>{item._id}</Link>
                  </td>
                  <td className='border p-2'>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add the other two tables here */}
          <table className='w-full border'>
            <thead>
              <tr>
                <th className='border p-2 bg-gray-200'>SR. No</th>
                <th className='border p-2 bg-gray-200'>Stream</th>
                <th className='border p-2 bg-gray-200'>Data</th>
              </tr>
            </thead>
            <tbody>
              {thermalStreamCounts.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border p-2'>{index + 1}</td>
                  <td
                    className='border p-2 cursor-pointer hover:text-blue-500'
                    onClick={() => handleStreamClick(item._id)}
                  >
                    <Link to={`/masterInstrument/Thermal/${item._id}`}>{item._id}</Link>
                  </td>
                  <td className='border p-2'>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add the other two tables here */}
      </div>
    </div>
  );
};

export default MasterInstrumentList;
