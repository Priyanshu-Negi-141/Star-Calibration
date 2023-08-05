import React, { useEffect, useState } from "react";
import { CalibrationSRFTable } from "../../../FormPage";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const SRFList = () => {
  const { host, currentColor } = useStateContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [sortDirection, setSortDirection] = useState(false); // true for ascending, false for descending
  const [selectedDate, setSelectedDate] = useState(null);
  const itemsPerPage = 10;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateReset = () => {
    setSelectedDate(null);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = (item) => {
      if (!selectedDate) {
        return true; // Show all data when no date is selected
      }
      const itemDate = new Date(item.srf[0].issussDate);
      // Compare year and month only when selectedDate is not defined
      if (!selectedDate.getDate()) {
        return (
          !isNaN(itemDate) &&
          itemDate.getFullYear() === selectedDate.getFullYear() &&
          itemDate.getMonth() === selectedDate.getMonth()
        );
      }

      // Compare full date when selectedDate is defined
      return (
        !isNaN(itemDate) &&
        itemDate.getDate() === selectedDate.getDate() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
      );
    };
    const sortedData = [...data].sort((a, b) => {
      const srfNoA = a.srf[0].srfNo;
      const srfNoB = b.srf[0].srfNo;

      if (sortDirection) {
        return srfNoA.localeCompare(srfNoB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      } else {
        return srfNoB.localeCompare(srfNoA, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }
    });
    // Apply the date filter if selectedDate is defined
    const filteredData = selectedDate
      ? sortedData.filter(filterData)
      : sortedData;
    setDisplayedData(filteredData.slice(startIndex, startIndex + itemsPerPage));
  }, [data, startIndex, sortDirection, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${host}/api/certificate/calibration-srf-data`
      );
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
      <div>
        <div className="">
          <div
            className="font-bold font-roman border text-lg grid place-items-center mb-0.5 p-2"
            style={{ color: currentColor, borderColor: currentColor }}
          >
            <h1>SRF List</h1>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="border my-3">
              <DatePicker
                selected={selectedDate}
                dateFormat="dd/MM/yyyy"
                onChange={handleDateChange}
                placeholderText="Select Date"
              />
            </div>
            <button
              className="border my-3 py-2 px-4 bg-gray-300 text-gray-700"
              onClick={handleDateReset}
            >
              Reset
            </button>
            {startIndex > 0 && (
              <div className="border my-3">
                <button
                  className="py-2 text-bold px-10 bg-[#1D5B79] hover:bg-[#468B97] text-white"
                  onClick={handlePreviousClick}
                >
                  Previous
                </button>
              </div>
            )}
            {startIndex + itemsPerPage < data.length && (
              <div className="border my-3 border-black">
                <button
                  className="py-2 text-bold px-10 bg-[#A2FF86] hover:bg-[#CBFFA9] text-black"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="border border-black"
          style={{ borderColor: currentColor }}
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-center">Sr. No.</th>
                <th>Issue Date</th>
                <th>Client Name</th>
                <th onClick={handleSortClick}>SRF Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-center">{startIndex + index + 1}</td>
                  <td>
                    {item.srf[0].issussDate
                      ? formatDate(item.srf[0].issussDate)
                      : "N/A"}
                  </td>
                  <td className="font-bold" style={{ color: currentColor }}>
                    {item.srf[0].client_name}
                  </td>
                  <td>{item.srf[0].srfNo}</td>
                  <td>
                    <Link
                      to={`/instrument-table/${encodeURIComponent(
                        item.srf[0].client_name
                      )}/${encodeURIComponent(item._id)}`}
                    >
                      <button
                        type="button"
                        class="text-gray-900 bg-white hover:bg-gray-100 border focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                        style={{ borderColor: currentColor }}
                      >
                        Add Instrument
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SRFList;
