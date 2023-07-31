import React from "react";

const RemarkCertificate = () => {
  const remarkList = [
    { description: "The calibration results reported in this certificate are valid at the time of and under the stated condition of measurement", key: 0 },
    { description: "This Report should not be reproduced except in full without our prior permission in writing", key: 1 },
    { description: "Calibration Certificate without signature are not valid", key: 2 },
    { description: "Laboratory standard are traceable to national standard.", key: 3},
    { description: "The Reported expanded uncertainty of measurement is stated as the standard uncertainty of measurement multiplied by the coverage factor k-2 such the coverage probability corresponds to approximately 95% confidence level.", key: 4},
    { description: "* Next due date as per customer request.", key: 5},
    { description: "This certificate refers only to the particular item calibrated at site.", key: 6},
  ];

  return (
    <div>
      <div>
        <h1 className="font-bold">Remarks: Results are ok as per acceptance criteria.</h1>
        <div>
          <ol>
            {remarkList.map((remark,index) => {
              return <li key={remark.key}><h1 className="flex gap-2"><p className="font-bold">{index + 1+"."}</p> {remark.description}</h1></li>;
            })}
          </ol>
        </div>
        <div className="font-bold text-center"><p>----End of Report----</p></div>
      </div>
      {/* 
        1.The calibration results reported in this certificate are valid at the time of and under the stated condition of measurement. 
        2.This Report should not be reproduced except in full without our prior permission in writing.
        3.Calibration Certificate without signature are not valid.
        4.Laboratory standard are traceable to national standard.
        5.The Reported expanded uncertainty of measurement is stated as the standard uncertainty of measurement multiplied by the coverage factor k-2 such the coverage probability corresponds to approximately 95% confidence level. 
        6. Next due date as per customer request.
        7. This certificate refers only to the particular item calibrated at site.
        */}
    </div>
  );
};

export default RemarkCertificate;
