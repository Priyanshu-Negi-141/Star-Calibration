import React, { createContext, useContext, useEffect, useState } from "react";
import defaultProfilePic from "../component/ProfilePic/man.png";
import ProfilePic1 from "../component/ProfilePic/man1.png";
import ProfilePic2 from "../component/ProfilePic/boy.png";
import ProfilePic3 from "../component/ProfilePic/smiling1.png";
import ProfilePic4 from "../component/ProfilePic/happy.png";
import ProfilePic5 from "../component/ProfilePic/woman.png";
import ProfilePic6 from "../component/ProfilePic/girl2.png";
import ProfilePic7 from "../component/ProfilePic/smiling.png";
import ProfilePic8 from "../component/ProfilePic/girl1.png";
import ProfilePic9 from "../component/ProfilePic/girl.png";
import axios from "axios";
import { useStateContext } from "./ContextProvider";

const profilePictures = [
  defaultProfilePic,
  ProfilePic1,
  ProfilePic2,
  ProfilePic3,
  ProfilePic4,
  ProfilePic8,
  ProfilePic5,
  ProfilePic6,
  ProfilePic7,
  ProfilePic9,
];
const ProfileStateContext = createContext();
export const ProfileContextProvider = ({ children }) => {
  const [selectedProfilePic, setSelectedProfilePic] =
    useState(defaultProfilePic);
  const { host, fetchIndividualEmployeeData, loggedInEmployee } =
    useStateContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const handleFileChange = (event) => {
  //     const selectedFile = event.target.files[0];
  //     setSelectedProfilePic(URL.createObjectURL(selectedFile));
  //     setIsPopupOpen(false);
  //   };

  useEffect(() => {
    fetchIndividualEmployeeData();
  }, []);

  const handleProfilePicSelect = (index) => {
    const selectedImagePath = profilePictures[index];
    console.log("Selected Image Path:", selectedImagePath);
    setSelectedProfilePic(selectedImagePath);
    setIsPopupOpen(false);

    // Make API call to store selected image path
    axios
      .put(
        `${host}/api/profileImage/add-predefined-images`,
        { imageUrl: selectedImagePath },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Image path stored:", response.data);
      })
      .catch((error) => {
        console.error("Error storing image path:", error);
      });
  };

  // Retrieve employee ID from the token
  const employeeID = loggedInEmployee[0]?._id;

  useEffect(() => {
    // Fetch predefined images based on the employeeId
    axios
      .get(`${host}/api/profileImage/employee-predefined-images/${encodeURIComponent(employeeID)}`)
      .then((response) => {
        const imageData = response.data.data; // Assuming the API response structure
        if (imageData && imageData.length > 0) {
          setSelectedProfilePic(imageData[0].imageUrl);
        } else {
          // Handle case when no image data is available
          setSelectedProfilePic(defaultProfilePic);
        }
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  }, [employeeID]);

  return (
    <ProfileStateContext.Provider
      value={{
        selectedProfilePic,
        setSelectedProfilePic,
        profilePictures,
        isPopupOpen,
        setIsPopupOpen,
        handleProfilePicSelect,
      }}
    >
      {children}
    </ProfileStateContext.Provider>
  );
};
export const useStateProfileContext = () => useContext(ProfileStateContext);
