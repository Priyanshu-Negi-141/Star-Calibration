import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import { LocationData, LocationMap } from "./";
import axios from "axios";

function IndividualLocation() {
  const { host } = useStateContext();
  const { id, userName } = useParams();
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    axios.get(`${host}/api/checkInDetails/getLocationData/${encodeURIComponent(id)}`)
    .then((response) => {
      console.log("Received response:", response.data);
      const receivedData = response.data.data;
      console.log("Received data:", receivedData);
      if (Array.isArray(receivedData)) {
        setLocationData(receivedData);
      } else {
        console.error("Received data is not an array:", receivedData);
      }
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
    });

  }, []);

  return (
    <div className="flex flex-col items-center justify-start p-2">
  <h1 className="text-3xl font-extrabold text-gray-500 mb-2">{userName} Location</h1>
  <div className="bg-white rounded-lg overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-9 gap-6 p-6">
    <div className="md:col-span-2">
      <LocationData locationData={locationData} />
    </div>
    <div className="md:col-span-7">
      <LocationMap locationData={locationData} />
    </div>
  </div>
</div>



// locationData={locationData}

  );
}

export default IndividualLocation;
