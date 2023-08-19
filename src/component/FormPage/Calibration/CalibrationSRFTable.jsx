import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStateContext } from '../../../contexts/ContextProvider';

const CalibrationSRFTable = () => {
  const {host} = useStateContext()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending

  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      const srfNoA = a.srf[0].srfNo;
      const srfNoB = b.srf[0].srfNo;

      if (sortDirection) {
        return srfNoA.localeCompare(srfNoB, undefined, { numeric: true, sensitivity: 'base' });
      } else {
        return srfNoB.localeCompare(srfNoA, undefined, { numeric: true, sensitivity: 'base' });
      }
      
    });

    setDisplayedData(sortedData.slice(startIndex, startIndex + itemsPerPage));
  }, [data, startIndex, sortDirection]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${host}/api/certificate/calibration-srf-data`);
      setData(response.data);
      setDisplayedData(response.data.slice(0, itemsPerPage));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextClick = () => {
    const nextIndex = startIndex + itemsPerPage;
    setStartIndex(nextIndex);
  };

  const handlePreviousClick = () => {
    const previousIndex = startIndex - itemsPerPage;
    setStartIndex(previousIndex);
  };

  const handleSortClick = () => {
    setSortDirection(!sortDirection);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='grid grid-cols-2'>
        <div className='text-bold text-xl grid items-center p-2'>
          <h1>Calibration SRF Table</h1>
        </div>
        <div className='flex gap-2 justify-end'>
          {startIndex > 0 && (
            <div className='border my-3 border-black'>
              <button className='py-2 text-bold px-10 bg-[#1D5B79] hover:bg-[#468B97] text-white' onClick={handlePreviousClick}>Previous</button>
            </div>
          )}
          {startIndex + itemsPerPage < data.length && (
            <div className='border my-3 border-black'>
              <button className='py-2 text-bold px-10 bg-[#A2FF86] hover:bg-[#CBFFA9] text-black' onClick={handleNextClick}>Next</button>
            </div>
          )}
        </div>
      </div>
      <div className='border border-black'>
        <table className='w-full'>
          <thead>
            <tr>
              <th onClick={handleSortClick}>Sr. No.</th>
              <th>SRF Number</th>
              <th>Client Name</th>
              <th>Client Address</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <tr key={item._id}>
                <td>{startIndex + index + 1}</td>
                <td>{item.srf[0].srfNo}</td>
                <td className='font-bold underline'>
                  <Link
                    to={`/instrument-details/${encodeURIComponent(item.srf[0].client_name)}/${encodeURIComponent(
                      item._id
                    )}`}
                  >
                    {item.srf[0].client_name}
                  </Link>
                </td>
                <td>
                  <p>
                    {item.srf[0].clientAddress.address_line_1},
                    {item.srf[0].clientAddress.address_line_2},
                    {item.srf[0].clientAddress.city},
                    {item.srf[0].clientAddress.district},
                    {item.srf[0].clientAddress.postal_code}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default CalibrationSRFTable;
