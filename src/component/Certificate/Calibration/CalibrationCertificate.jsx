import React from 'react';
import ClientCertificate from './AllCertificateCollection/ClientCertificate';
import InstrumentCertificate from './AllCertificateCollection/InstrumentCertificate';
import SupportingDeviceCertificate from './AllCertificateCollection/SupportingDeviceCertificate';
import EnvironmentalCertificate from './AllCertificateCollection/EnvironmentalCertificate';
import CalibrationResult from './AllCertificateCollection/CalibrationResult';

const CalibrationCertificate = () => {
  return (
    <>
    <div className=" min-h-screen bg-gray-100">
        <div className="w-297 h-420 bg-white rounded-lg shadow-md p-8">
            <ClientCertificate />
            <InstrumentCertificate />
            <SupportingDeviceCertificate />
            <EnvironmentalCertificate />
            <CalibrationResult />
        </div>
    </div>
    </>
  );
};

export default CalibrationCertificate;
