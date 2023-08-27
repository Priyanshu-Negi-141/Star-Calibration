import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const InstrumentTableList = () => {
  const { host, currentColor } = useStateContext();
  const [error, setError] = useState(null);
  const [fetchInstrument, setFetchInstrument] = useState([]);
  const { clientName, id } = useParams();
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
    <div>
      <div
        className="mt-5 p-2 border-2 text-center text-bold"
        style={{ color: currentColor, borderColor: currentColor }}
      >
        <h2>{clientName} Instrument List</h2>
      </div>
      <div
        className="my-2 border-2 sm:overflow-x-scroll md:overflow-none"
        style={{ borderColor: currentColor }}
      >
        <table className="w-full">
          <thead
            className="border-2 text-[#164B60]"
            style={{ borderColor: currentColor }}
          >
            <th>Sr. No</th>
            <th>Instrument Name</th>
            <th>Make/Model</th>
            <th>ID number</th>
            <th>Range</th>
            <th>Least Count</th>
            <th>Certificate Number</th>
            <th>Action</th>
          </thead>
          {fetchInstrument.map((item, index) => {
            return (
              <tbody key={item.index}>
                <td className="text-center">{index + 1}</td>

                <td
                  className="font-bold capitalize"
                  style={{ color: currentColor }}
                >
                  {item.instrument.instrument_name}
                </td>
                <td>{item.instrument.make_model}</td>
                <td>{item.instrument.id_number}</td>
                <td>{item.instrument.range}</td>
                <td>{item.instrument.least_count}</td>
                <td>{item.instrument.certificateNumber}</td>
                <td>
                  <Link
                    to={`/device-details/${encodeURIComponent(
                      item.instrument.instrument_name
                    )}/${encodeURIComponent(item._id)}`}
                  >
                    <button
                      type="button"
                      className="text-gray-900 bg-white hover:bg-gray-100 border focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                      style={{borderColor: currentColor}}
                    >
                      Generate Certificate
                    </button>
                  </Link>
                </td>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default InstrumentTableList;
