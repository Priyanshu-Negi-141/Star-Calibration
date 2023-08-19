import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from '../../../../contexts/ContextProvider';
import axios from 'axios';

const GetInstrumentDetails = (props) => {

  const {host} = useStateContext()
  const [error, setError] = useState(null);
  const [fetchInstrument, setFetchInstrument] = useState([]);
  const {clientName, id} = props
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchInstrumentData();
  }, []);

  const fetchInstrumentData = async () => {
    try {
      const response = await axios.get(
        `${host}/api/certificate/instrument-data/${encodeURIComponent(
          clientName
        )}/${encodeURIComponent(id)}`
      );
      setFetchInstrument(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div><div className="mt-5 p-2 border-2 text-center text-bold border-black">
    <h2>Added Instrument List</h2>
  </div>
  <div className="my-2 border-2 border-black sm:overflow-x-scroll md:overflow-none">
    <table className="w-full">
      <thead className="border-2 border-black text-[#164B60]">
        <th>Sr. No</th>
        <th>Instrument Name</th>
        <th>Make/Model</th>
        <th>ID number</th>
        <th>Range</th>
        <th>Least Count</th>
        <th>Certificate Number</th>
      </thead>
      {fetchInstrument.map((item, index) => {
        return (
          <tbody key={item.index}>
            <td>{index + 1}</td>
            
            <td className="font-bold text-[#000203] capitalize">
              {/* <Link
                to={`/device-details/${encodeURIComponent(
                  item.instrument.instrument_name
                )}/${encodeURIComponent(item._id)}`}
              > */}
                {item.instrument.instrument_name}
              {/* </Link> */}
            </td>
            <td>{item.instrument.make_model}</td>
            <td>{item.instrument.id_number}</td>
            <td>{item.instrument.range}</td>
            <td>{item.instrument.least_count}</td>
            <td>{item.instrument.certificateNumber}</td>
          </tbody>
        );
      })}
    </table>
  </div></div>
  )
}

export default GetInstrumentDetails