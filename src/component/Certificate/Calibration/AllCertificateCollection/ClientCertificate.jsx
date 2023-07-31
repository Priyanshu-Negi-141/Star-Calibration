import axios from "axios";
import React, { useEffect, useState } from "react";

const ClientCertificate = (props) => {
  const { srfDetails, currentPage ,totalPages } = props;

  // Rest of the code remains the same...
  return (
    <div className="">
        
      <div className='flex justify-between px-8 text-12 text-sm'>
            <p className="font-bold">Format No: STC/7.8F-01</p>
            <div>
                <p>Page: 1 of 1</p>
            </div>
        </div>
        {srfDetails ? (
        <div className='grid grid-cols-11 border border-black'>
            <div className='col-span-5 w-full'>
                <div className='grid grid-cols-5 h-full'>
                <div className='border-r col-span-2 font-bold w-full border-black flex flex-col justify-center items-center'>
                    <h1>Customer Name</h1>
                    <h1>&</h1>
                    <h1>Address</h1>
                </div>
                <div className=' col-span-3 pl-2 w-full'>
                    <p>{srfDetails.client_name}</p>
                    <p>{srfDetails.clientAddress.address_line_1}, {srfDetails.clientAddress.address_line_2},</p>
                    <p>{srfDetails.clientAddress.city}, {srfDetails.clientAddress.postal_code},</p>
                    <p>{srfDetails.clientAddress.district}, {srfDetails.clientAddress.state}</p>
                    
                </div>
                </div>
            </div>
            <div className='w-full col-span-6 border-l border-black'>
                <div className=''>
                    <div className='font-bold grid grid-cols-2 border-b border-black'>
                        <p className='pl-2 border-r border-black'>Certificate No.</p>
                        <p className='pl-2'>{srfDetails.instrumentDetails[0].instrument.certificateNumber}</p>
                    </div>
                    <div className='grid grid-cols-2 border-b border-black'>
                        <p className='pl-2 border-r border-black'>Date of Issue</p>
                        <p className='pl-2 '>{srfDetails.issussDate}</p>
                    </div>
                    <div className='grid grid-cols-2 border-b border-black'>
                        <p className='pl-2 border-r border-black'>Date of Calibration</p>
                        <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.calibration_date}</p>
                    </div>
                    <div className='grid grid-cols-2 border-b border-black'>
                        <p className='pl-2 border-r border-black'>Valid Up to</p>
                        <p className='pl-2 '>{srfDetails.instrumentDetails[0].instrument.valid_date}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='pl-2 border-r border-black font-bold'>SRF No & Date of Receipt</p>
                        <p className='pl-2 '>{srfDetails.srfNo}</p>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <p>Loading...</p>
      )}
      
    </div>
  );
};

export default ClientCertificate;
