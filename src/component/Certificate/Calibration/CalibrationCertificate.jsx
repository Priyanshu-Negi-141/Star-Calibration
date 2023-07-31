import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  ClientCertificate,
  InstrumentCertificate,
  SupportingDeviceCertificate,
  EnvironmentalCertificate,
  CalibrationResult,
  ReviewPage,
  ReviewedBy, 
} from "./AllCertificateCollection";

const PrintableContent = (instrumentDetail) => {
  const { instrumentName, id, isSelected } = instrumentDetail;
  const [srfDetails, setSrfDetails] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API when the component mounts
    fetch(
      `http://localhost:8000/api/certificate/fetch-instru-details/${encodeURIComponent(
        instrumentName
      )}/${encodeURIComponent(id)}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Once the data is fetched, update the state with the fetched data
        setSrfDetails(data.srfDetails);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error, show error message, or take appropriate action.
      });
  }, []);


  return (
    <div className="">
      <style>
        {`
          @media print {
            /* Center the content on the print page */
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              margin-top: 12vh;
            }
          }
        `}
      </style>
        <div className=" px-10 font-roman text-13">
          {/* Child components */}
          <ClientCertificate srfDetails={srfDetails} />
          <InstrumentCertificate srfDetails={srfDetails} />
          <SupportingDeviceCertificate srfDetails={srfDetails} />
          <EnvironmentalCertificate srfDetails={srfDetails} />
          <CalibrationResult srfDetails={srfDetails} isSelected={isSelected} />
          <ReviewPage />
          <ReviewedBy />
        </div>
    </div>
  );
};

const CalibrationCertificate = (props) => {
  const contentRef = useRef();
  const { instrumentName, id, isSelected } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-297 h-420 bg-white rounded-lg shadow-md ">
        <div ref={contentRef}>
          <PrintableContent
            instrumentName={instrumentName}
            id={id}
            isSelected={isSelected}
          />
        </div>
      </div>
      <div>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => contentRef.current}
        />
      </div>
    </div>
  );
};

export default CalibrationCertificate;
