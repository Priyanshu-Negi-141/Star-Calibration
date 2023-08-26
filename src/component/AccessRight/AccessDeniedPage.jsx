import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PreviousButton } from "../button";
import { FaArrowLeft, FaTimesCircle } from "react-icons/fa";

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    // <div className="absolute flex items-center min-h-screen top-0 bottom-0 left-0 right-0 justify-center bg-black/30 z-50">
    //   <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    //     <div className="flex items-center justify-center mb-6">
    //       <i className="bi bi-x-circle-fill text-red-500 text-5xl mr-3"></i>
    //       <h2 className="text-2xl font-semibold">Access Denied</h2>
    //     </div>
    //     <p className="text-gray-600 mb-6">
    //       Sorry, but you don't have access to view this page.
    //     </p>
    //     {/* <Link
    //       to="/"
    //       className="block text-center bg-blue-500 text-white py-2 rounded-md transition hover:bg-blue-600"
    //     >
    //       Go back to home
    //     </Link> */}
    //     <div className="flex justify-end">
    //       <button
    //         onClick={goBack}
    //         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow flex items-center"
    //       >
    //         <FaArrowLeft className="mr-2" />
    //         Go back
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
  <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    <div className="flex items-center justify-center mb-6">
      <FaTimesCircle className="text-red-500 text-5xl mr-3" />
      <h2 className="text-2xl font-semibold">Access Denied</h2>
    </div>
    <p className="text-gray-600 mb-6">
      Sorry, but you don't have access to view this page.
    </p>
    <div className="flex justify-end">
      <button
        onClick={goBack}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Go back
      </button>
    </div>
  </div>
</div>

  );
};

export default AccessDeniedPage;
