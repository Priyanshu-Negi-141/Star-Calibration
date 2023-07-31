import React from "react";

const SupportingDeviceCertificate = (props) => {
  const { srfDetails } = props;
  if (!srfDetails) {
    return <p>Loading ....</p>;
  }
  return (
    <div className="mt-0.5">
      <div className="border border-x-black border-t-black text-center font-bold">
        <p>Details of Reference Standards and Supporting Devices Used</p>
      </div>
      <div className="grid grid-cols-11 border border-black">
        <div className="col-span-2">
          <p className="pl-2 col-span-1 border-b border-black">
            Name of Device
          </p>
          <p className="pl-2 col-span-1 border-b border-black">Make/Model</p>
          <p className="pl-2 col-span-1 border-b border-black">Serial/ID No.</p>
          <p className="pl-2 col-span-1 border-b border-black">Range</p>
          <p className="pl-2 col-span-1 border-b border-black">Valid Up to</p>
          <p className="pl-2 col-span-1 border-b border-black">Traceability</p>
          <p className="pl-2 col-span-1 border-b border-black">
            Certificate No.
          </p>
          <p className="pl-2 col-span-1">Accuracy</p>
        </div>
        <div className="col-span-9 grid grid-flow-col">
          {srfDetails.instrumentDetails.map((srfData, index) => {
            console.log(srfDetails.instrumentDetails.length);
            return (
              <React.Fragment key={index}>
                {srfData.instrument.deviceDetails.map(
                  (deviceDetailsData, pressureIndex) => (
                    <div className="col-span-1">
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.instrument_name}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.make_model}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.serial_number}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.range}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.due_date}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.traceability}</p>
                      <p className="pl-2 col-span-2 border-l border-b border-black">{deviceDetailsData.deviceData.cf_number}</p>
                      <p className="pl-2 col-span-2 border-l border-black">{deviceDetailsData.deviceData.accuracy}</p>
                    </div>
                  )
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SupportingDeviceCertificate;
