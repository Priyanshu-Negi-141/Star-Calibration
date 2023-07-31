import React from "react";

const InstrumentCertificate = (props) => {

  const {srfDetails} = props

  if(!srfDetails){
    return(
      <div>Loading....</div>
    )
  }

  return (
    <div className="mt-0.5 grid border border-black">
      <div className=" grid grid-cols-2">
        <div className="font-bold">
          <p className="border-b pl-2 border-r border-black">
            Equip. For Calibration
          </p>
          <p className="border-b pl-2 border-r border-black">Make/Model</p>
          <p className="border-b pl-2 border-r border-black">Range</p>
          <p className="border-b pl-2 border-r border-black">Least Count</p>
          <p className="border-b pl-2 border-r border-black">
            Accuracy/Acceptance limit
          </p>
          <p className="border-b pl-2 border-r border-black">Id No Serial No.</p>
          <p className="border-b pl-2 border-r border-black">
            SRF No.& Date of Receipt
          </p>
          <p className="border-b pl-2 border-r border-black">Visual Inspection</p>
          <p className="border-b pl-2 border-r border-black">Condition of UUC</p>
          <p className="border-b pl-2 border-r border-black">Date of Calibration</p>
          <p className="border-b pl-2 border-r border-black">Next Due Date</p>
          <p className="border-b pl-2 border-r border-black">Date of Issue</p>
          <p className="border-b pl-2 border-r border-black">Calibrated at</p>
          <p className="border-b pl-2 border-r border-black">Location</p>
        </div>
        <div>
          <p className="border-b pl-2 border-black">
          {srfDetails.instrumentDetails[0].instrument.instrument_name}
          </p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.make_model}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.range}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.least_count}</p>
          <p className="border-b pl-2 border-black">
          {srfDetails.instrumentDetails[0].instrument.accuracy}
          </p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.serial_number}</p>
          <p className="border-b pl-2 border-black">
          {srfDetails.srfNo}
          </p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.visual_inspection}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.visual_inspection}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.calibration_date}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.valid_date}</p>
          <p className="border-b pl-2 border-black">{srfDetails.issussDate}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.calibrate_at}</p>
          <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.location}</p>
        </div>
        <div className="col-span-2">
            <div className="col-span-2 grid grid-cols-2 border-b border-black">
            <div className="col-span-2 font-bold border-b border-black grid place-items-center">
                <p className="col-span-2 ">Environmental Condition</p>
            </div>
            <div className="font-bold">
                <p className="border-b pl-2 border-r border-black">Temprature</p>
                <p className="border-r pl-2 border-black">Humidity</p>
            </div>
            <div>
                <p className="border-b pl-2 border-black">{srfDetails.instrumentDetails[0].instrument.temperature}</p>
                <p className="pl-2">{srfDetails.instrumentDetails[0].instrument.relative_humidity}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentCertificate;
