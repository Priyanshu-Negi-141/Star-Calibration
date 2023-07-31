import React from 'react'

const FetchRPMIndicator = (props) => {

  const { srfDetails } = props;

  if (!srfDetails) {
    return <p>Loading ...</p>;
  }
  
  return (
    <div>
    <div className="mt-0.5 text-12">
      <h2 className="font-bold underline text-center">Calibration Result</h2>
      <div className="mt-1">
        <div className="grid grid-cols-12 text-center font-bold">
          <div className="col-span-1 border-x border-y border-black">
            <p>Sr. No</p>
          </div>
          <div className="col-span-11 grid grid-cols-12 border-y border-black">
            <div className="border-r border-black col-span-4">
              <h1>Unit Under Calibration in RPM</h1>
            </div>
            <div className="border-r border-black col-span-4">
              <h1>Standard Reading in RPM</h1>
              
            </div>
            <div className="border-r border-black col-span-4">
              <h1>Error in RPM</h1>
            </div>
          </div>
        </div>
        {srfDetails.instrumentDetails.map((srfData, index) => {
          return (
            <React.Fragment key={index}>
              {srfData.instrument.pressureUnitDetails.map(
                (pressureUnitData, pressureIndex) => (
                  <div className="grid grid-cols-12 border-b border-black text-center">
                    <div className="col-span-1 border-x border-black font-bold">
                      <p>{pressureIndex+ 1 +"."}</p>
                    </div>
                    <div className="col-span-11 grid grid-cols-12">
                      <div className="border-r border-black col-span-4">
                        <p>{pressureUnitData.pressureUnitData.unitUnderCal}</p>
                      </div>
                      <div className="border-r border-black col-span-4">
                        <p>{pressureUnitData.pressureUnitData.standardReading}</p>
                      </div>
                      <div className="border-r border-black col-span-4">
                        <p>{pressureUnitData.pressureUnitData.error}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
    </div>
  )
}

export default FetchRPMIndicator