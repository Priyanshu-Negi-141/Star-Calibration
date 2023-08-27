import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

const CalibrationHomePage = () => {
  const {host} = useStateContext()
  const [maxCertificateNumber, setMaxCertificateNumber] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${host}/api/client/counter`);
      const maxCertificateNumber = String(response.data.maxCertificateNumber);
        // Extract the number from the string
        const number = maxCertificateNumber.split('/').pop();
        setMaxCertificateNumber(number);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      

      {/* <div
        className="cursor-pointer border-2 rounded-br-2xl p-2 text-bold shadow-md border-s-fuchsia-800 drop-shadow-2xl stroke-fuchsia-700 shadow-rose-300"
        onClick={toggleDropdown}
      >
        Calibration
      </div> */}
      
        <div className="my-2 mx-5">
          <div className="grid place-items-center p-4 md:grid-cols-3 gap-4 bg-yellow-500/20 md:rounded-se-full md:rounded-es-full sm:rounded-ee-full md:rounded-ee-none antialiased text-gray-900">
            <div className=" px-4 w-full ">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                  Total Certificate
                </h4>
                <div className="mt-4 text-end">
                  <span className="text-teal-600 text-xl font-semibold">
                    {maxCertificateNumber}
                  </span>
                </div>
              </div>
            </div>
            <div className=" px-4 w-full ">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                  Completed Certificate
                </h4>
                <div className="mt-4">
                  <span className="text-teal-600 text-md font-semibold">
                    4/5 ratings{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className=" px-4 w-full ">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                  Pending Certificate
                  <div></div>
                </h4>
                <div className="mt-4">
                  <span className="text-teal-600 text-md font-semibold">
                    4/5 ratings{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default CalibrationHomePage;
