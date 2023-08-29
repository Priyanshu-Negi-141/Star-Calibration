import React from "react";
import { useStateMainContext } from "../../../contexts/MainContextProvider";

const DownloadApk = () => {

  const {appName} = useStateMainContext()

  const handleDownload = () => {
    const apkUrl =
      process.env.PUBLIC_URL + `/apk/${appName}`;
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "OrgManager_27_08_23_debug_1.0.apk";
    link.click();
  };

  return (
    <div className="grid place-items-center bg-[#FBF0B2]/50 h-screen">
        <div className="text-center sm:w-full md:flex md:items-center md:gap-2 md:justify-start">
      <div className={`md:w-1/2 ${"sm:block"} ${"md:hidden"}`}>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">
            Download the OrgManager App
          </h1>
          <p className="text-gray-600">
            Manage your organization with ease using our mobile app.
          </p>
          <button
            className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleDownload}
          >
            Download APK
          </button>
        </div>
      </div>
      <div className={`sm:w-full ${"sm:hidden"} ${"md:hidden"} md:w-1/2`}>
        <button
          className="w-full px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleDownload}
        >
          Download APK
        </button>
      </div>
    </div>
    </div>
  );
};

export default DownloadApk;
