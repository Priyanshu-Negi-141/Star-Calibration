import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../../../src/Logo/StarLogo.jpg";
import { useStateContext } from "../../../contexts/ContextProvider";
import PinGeneratePage from "./PinGeneratePage";
import DownloadApk from "../apkDownload/DownloadApk";
import QRDownload from "../apkDownload/QRDownload";
const LogInEmployee = () => {
  const {
    credential,
    setCredential,
    currentColor,
    loginEmployeeWithMobile,
    showPinGenerateModal,
  } = useStateContext();
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginEmployeeWithMobile();
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    setIsButtonDisabled(e.target.value === "" || credential === "");
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;

    // Validate that the input contains only numeric characters
    if (/^\d*$/.test(inputText)) {
      setCredential({ ...credential, mobile_number: inputText });
    }
    setIsButtonDisabled(inputText === "" || credential === "");
  };

  useEffect(() => {
    setIsButtonDisabled(
      credential.mobile_number === "" || credential.password === ""
    );
  }, [credential.mobile_number, credential.password]);

  useEffect(() => {
    const fetchedQuotes = [
      {
        id: 1,
        quote:
          "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        author: "Albert Schweitzer",
      },
      {
        id: 2,
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
      // Add the rest of the quotes here
    ];
    setQuotes(fetchedQuotes);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [quotes]);
  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-flow-row w-full sm:h-fill md:h-screen">
        <div className="grid md:grid-rows-4 sm:grid-rows-4 sm:p-0 md:p-3 sm:gap-0 md:gap-5">
          
            <div className="relative text-bold md:row-span-3 sm:row-span-3 flex justify-center w-full h-full items-end text-4xl">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div className="">
                  <QRDownload />
          </div>
          </div>
              Star Calibration
            </div>
            {quotes.length > 0 && (
              <span className="text-center flex md:px-10 sm:justify-center sm:items-center md:items-baseline w-full h-28 text-lg">
                {quotes[currentQuoteIndex].quote}
              </span>
            )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <h3 className="text-bold text-2xl">Log IN</h3>
          </div>
          <div className="w-80">
            <hr className="mt-1 mb-5 border-t border-pink-500 border-opacity-50" />
          </div>
          <div className="">
            <img
              src={Logo} // Replace with the actual path to your logo image
              alt="Logo"
              className="w-36 h-20"
            />
          </div>
          {/* Form Start */}
          <div className="">
            <form className="md:px-8 sm:py-0 md:py-6" onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text" // Keep the type as text
                    name="mobile_number"
                    value={credential.mobile_number}
                    onChange={handleInputChange} // Use handleInputChange for conversion
                    placeholder="Enter your Username"
                    required
                  />
                </div>
              </div>
              <div className="mb-6 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="pl-10 pr-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    value={credential.password}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  style={{ backgroundColor: currentColor }}
                  className="text-white hover:pointer w-full font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Form Ends */}
          <div className="w-80">
            <hr className="my-6 border-t border-pink-500 border-opacity-50" />
          </div>
        </div>
        {/* Conditionally render the PinGeneratePage */}
        {showPinGenerateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
            <div className="bg-white p-4 rounded-md shadow-md">
              <PinGeneratePage />
              {/* <button
               className="mt-4 p-2 bg-blue-500 text-white rounded-md"
               onClick={closePinGenerateModal}
             >
               Close
             </button> */}
            </div>
          </div>
        )}
      </div>
      
      <div className={`${`sm:block sm:h-screen`} ${`md:hidden`}`}>
        <DownloadApk />
      </div>
    </>
  );
};

export default LogInEmployee;
