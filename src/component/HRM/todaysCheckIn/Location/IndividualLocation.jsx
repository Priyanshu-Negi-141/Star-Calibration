import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import { LocationData, LocationMap } from "./";

function IndividualLocation() {
  const { host } = useStateContext();
  const { id, userName } = useParams();
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    // Fetch location data from the API endpoint
    fetch(
      `${host}/api/checkInDetails/getLocationData/${encodeURIComponent(id)}`
    ) // Replace with the appropriate endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data.locationData);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }, []);

  return (
    <div class="flex flex-col items-center justify-start p-2">
  <h1 class="text-3xl font-extrabold text-gray-500 mb-2">{userName} Location</h1>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-9 gap-6 p-6">
    <div class="md:col-span-2">
      <LocationData locationData={locationData} />
    </div>
    <div class="md:col-span-7">
      <LocationMap locationData={locationData} />
    </div>
  </div>
</div>



// locationData={locationData}

  );
}

export default IndividualLocation;
