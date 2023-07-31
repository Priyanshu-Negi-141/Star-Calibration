import React from "react";
import { FetchDigitalVernierCaliper, FetchPressureTransmitter, FetchRPMIndicator, FetchTimer } from "./FetchTableData";

const CalibrationResult = (props) => {
  const { srfDetails, isSelected } = props;


  return (
    <div>
      {isSelected === "Digital Vernier Caliper" && <FetchDigitalVernierCaliper srfDetails={srfDetails}/>}
      {isSelected === "Pressure Transmitter" && <FetchPressureTransmitter srfDetails={srfDetails} />}
      {isSelected === "RPM Indicator" && <FetchRPMIndicator srfDetails={srfDetails} />}
      {isSelected === "Timer" && <FetchTimer srfDetails={srfDetails} />}
    </div>
  );
};

export default CalibrationResult;
