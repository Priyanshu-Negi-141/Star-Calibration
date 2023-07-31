import React, { useEffect, useRef, useState } from "react";
import {
  EquipmentCertificate,
  HeaderCertificate,
  InstrumentCertificate,
  ReferenceDocCertificate,
  RemarkCertificate,
} from "./StarCertificateFormat";
import { CalibrationResult, ReviewedBy } from "./AllCertificateCollection";
import ReactToPrint from "react-to-print";

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
    <div>
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
      <div className="text-12 font-roman p-5">
        <HeaderCertificate srfDetails={srfDetails}/>
        <div className="grid grid-cols-2 gap-5">
          <InstrumentCertificate srfDetails={srfDetails}/>
          <EquipmentCertificate srfDetails={srfDetails}/>
        </div>
        <ReferenceDocCertificate srfDetails={srfDetails}/>
        <CalibrationResult
          srfDetails={srfDetails}
          isSelected={isSelected}
          instrumentName={instrumentName}
          id={id}
        />
        <RemarkCertificate />
        <ReviewedBy />
      </div>
    </div>
  );
};

const StarCalibrationCerificateFormat = (props) => {
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

export default StarCalibrationCerificateFormat;
