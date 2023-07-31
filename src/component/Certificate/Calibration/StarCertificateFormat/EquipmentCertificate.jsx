import React from "react";

const EquipmentCertificate = (props) => {
  const { srfDetails } = props;
  if (!srfDetails) {
    return <p>Loading ....</p>;
  }
  return (
    <div className="border border-black mt-0.5">
      <div>
        <h1 className="text-center font-bold">
          Equipment & Master Used For Calibration
        </h1>
        {srfDetails.instrumentDetails.map((srfData, index) => {
            console.log(srfDetails.instrumentDetails.length);
            return (
              <React.Fragment key={index}>
                {srfData.instrument.deviceDetails.map(
                  (deviceDetailsData, pressureIndex) => (
        <div className="border-t border-black grid grid-cols-5">
          <div className="col-span-2 flex">
            <div className="pl-2 font-bold">
              <p>Nomenclature</p>
              <p>Make</p>
              <p>Serial No./id No.</p>
              <p>Certificate No.</p>
              <p>Next Due Date</p>
              <p>Traceability</p>
            </div>
            <div className="pl-2 font-bold">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
          </div>
          <div className="pl-2 col-span-3">
            <p>{deviceDetailsData.deviceData.instrument_name}</p>
            <p>{deviceDetailsData.deviceData.make_model}</p>
            <p>{deviceDetailsData.deviceData.serial_number}</p>
            <p>{deviceDetailsData.deviceData.cf_number}</p>
            <p>{deviceDetailsData.deviceData.due_date}</p>
            <p>{deviceDetailsData.deviceData.traceability}</p>
          </div>
        </div>
        )
                )}
              </React.Fragment>
            );
          })}
        {/* <div className="border-t border-black grid grid-cols-3">
          <div className="col-span-1 flex">
            <div className="pl-2 font-bold">
              <p>Nomenclature</p>
              <p>Make</p>
              <p>Serial No./id No.</p>
              <p>Certificate No.</p>
              <p>Next Due Date</p>
              <p>Traceability</p>
            </div>
            <div className="pl-2 font-bold">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
          </div>
          <div className="pl-2 col-span-2">
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EquipmentCertificate;
