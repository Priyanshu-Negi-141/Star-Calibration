import React, { useState } from "react";
import CalibrationCertificate from "../../../Certificate/Calibration/CalibrationCertificate";
import { useParams } from "react-router-dom";
import PrintCertificate from "../../../Certificate/Calibration/Button/PrintCertificate";
import StarCalibrationCerificateFormat from "../../../Certificate/Calibration/StarCalibrationCerificateFormat";

const ReviewPage = () => {
  const { instrumentName, id, isSelected } = useParams();

  //   new data

  const [isPreviewOneDropDownOpen, setIsPreviewOneDropDownOpen] =
    useState(false);
  const [isPreviewTwoDropDownOpen, setIsPreviewTwoDropDownOpen] =
    useState(false);
  const [isPreviewThreeDropDownOpen, setIsPreviewThreeDropDownOpen] =
    useState(false);
  const [activeButton, setActiveButton] = useState("");
  const previewOneToggleDropdown = () => {
    setIsPreviewOneDropDownOpen(!isPreviewOneDropDownOpen);
  };
  const previewTwoToggleDropdown = () => {
    setIsPreviewTwoDropDownOpen(!isPreviewTwoDropDownOpen);
  };
  const previewThreeToggleDropdown = () => {
    setIsPreviewThreeDropDownOpen(!isPreviewThreeDropDownOpen);
  };

  const handleButtonClick = (buttonName) => {
    // Close previously opened dropdown
    if (activeButton === "PreviewOne") {
      previewOneToggleDropdown();
    } else if (activeButton === "PreviewTwo") {
      previewTwoToggleDropdown();
    } else if (activeButton === "PreviewThree") {
      previewThreeToggleDropdown();
    }

    // Set the active button
    setActiveButton(buttonName);

    // Open the corresponding dropdown
    if (buttonName === "PreviewOne") {
      previewOneToggleDropdown();
    } else if (buttonName === "PreviewTwo") {
      previewTwoToggleDropdown();
    } else if (buttonName === "PreviewThree") {
      previewThreeToggleDropdown();
    }
  };

  return (
    <div>
      <p>{instrumentName}</p>
      <p>{id}</p>
      <p>{isSelected}</p>
      <div className="grid sm:grid-flow-row md:grid-cols-3 gap-5">
        <div className="md:col-span-1 p-2 border border-red-400">
          <div className="grid gap-3 sm:grid-flow-col md:grid-flow-row">
            <div className="border border-emerald-300">
              <button
                className={`p-3  ${
                  activeButton === "PreviewOne"
                    ? " border-b-4 border-b-gray-950 bg-black/20 text-bold"
                    : "bg-transparent"
                }`}
                onClick={() => handleButtonClick("PreviewOne")}
              >
                Preview 1
              </button>
            </div>
            <div className="border border-emerald-300">
            <button
                className={`p-3  ${
                  activeButton === "PreviewTwo"
                    ? " border-b-4 border-b-gray-950 bg-black/20 text-bold"
                    : "bg-transparent"
                }`}
                onClick={() => handleButtonClick("PreviewTwo")}
              >
                Preview 2
              </button>
            </div>
            <div className="border border-emerald-300">
            <button
                className={`p-3  ${
                  activeButton === "PreviewThree"
                    ? " border-b-4 border-b-gray-950 bg-black/20 text-bold"
                    : "bg-transparent"
                }`}
                onClick={() => handleButtonClick("PreviewThree")}
              >
                Preview 3
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 border border-black">
          <div className="col-span-2 border border-black p-2 h-screen">
            <div className="overflow-y-auto h-screen">
              {isPreviewOneDropDownOpen && (
                <CalibrationCertificate
                  instrumentName={instrumentName}
                  id={id}
                  isSelected={isSelected}
                />
              )}
              {isPreviewTwoDropDownOpen && (
                <StarCalibrationCerificateFormat
                  instrumentName={instrumentName}
                  id={id}
                  isSelected={isSelected}
                />
              )}
              {isPreviewThreeDropDownOpen && (
                <CalibrationCertificate
                  instrumentName={instrumentName}
                  id={id}
                  isSelected={isSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
