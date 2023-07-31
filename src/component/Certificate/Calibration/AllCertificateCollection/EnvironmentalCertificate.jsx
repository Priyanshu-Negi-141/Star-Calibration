import React from "react";

const EnvironmentalCertificate = (props) => {
    const {srfDetails} = props
    if(!srfDetails){
        return(
            <p>Loading ...</p>
        )
    }
  return (
    <div>
      <div className="mt-0.5">
        <div className=" border border-black">
          <div>
            <div className="grid grid-cols-11">
              <div className="border-r pl-2 border-black col-span-2 font-bold">
                <p>Environmental Condition</p>
              </div>
              <div className="col-span-9 grid grid-flow-col">
                <div className="col-span-12 grid grid-flow-col">
                  <div className="col-span-2 border-r border-black">
                    <div>
                      <p className="pl-2 border-b border-black">Temprature ( C)</p>
                    </div>
                    <div>
                      <p className="pl-2">Relative Humidity (% RH)</p>
                    </div>
                  </div>
                  <div className="col-span-3 border-r border-black">
                    <div className="pl-2 border-b border-black">{srfDetails.instrumentDetails[0].instrument.temperature}</div>
                    <div className="pl-2">{srfDetails.instrumentDetails[0].instrument.relative_humidity}</div>
                  </div>
                </div>
                <div className="col-span-12 grid grid-flow-col">
                  <div className="col-span-1 font-bold border-r border-black">
                    <p className="pl-2 border-b border-black">
                      Calibration Procedure
                    </p>
                    <p className="pl-2">Supporting Standards</p>
                  </div>
                  <div className="col-span-8">
                    <p className="pl-2 border-b border-black">{srfDetails.instrumentDetails[0].instrument.cal_procedure}</p>
                    <p className="pl-2">{srfDetails.instrumentDetails[0].instrument.supporting_standards}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCertificate;
