import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, Polyline, InfoWindow } from "@react-google-maps/api";
import { useStateContext } from "../../../../contexts/ContextProvider";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function LocationMap({ locationData }) {
  const { GOOGLE_MAP_API_KEY } = useStateContext();
  const [map, setMap] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleMarkerMouseOver = (location) => {
    setHoveredLocation(location);
  };

  const handleMarkerMouseOut = () => {
    setHoveredLocation(null);
  };

  useEffect(() => {
    if (map && locationData.length > 0) {
      // Center the map on the last fetched location
      const lastLocation = locationData[locationData.length - 1];
      map.panTo({ lat: lastLocation.latitude, lng: lastLocation.longitude });
    }
  }, [map, locationData]);

  return (
    <LoadScript googleMapsApiKey={`${GOOGLE_MAP_API_KEY}`}>
  <div className=" bg-gray-100 flex items-start justify-center p-8">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
      <h1 className="text-3xl font-semibold mb-4">Location Map</h1>
      <div className="rounded-lg overflow-hidden h-96">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={locationData[0]}
          zoom={15}
          onLoad={handleMapLoad}
        >
          {locationData.map((location, index) => (
            <Marker
              key={location._id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onMouseOver={() => handleMarkerMouseOver(location)}
              onMouseOut={handleMarkerMouseOut}
            >
              {hoveredLocation === location && (
                <InfoWindow position={{ lat: location.latitude, lng: location.longitude }}>
                  <div className="text-gray-800">
                    <p className="font-semibold">{location.address}</p>
                    <p>{location.fetchTime}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
          {locationData.length >= 2 && (
            <Polyline
              path={locationData.map((location) => ({ lat: location.latitude, lng: location.longitude }))}
              options={{
                strokeColor: "#007BFF",
                strokeOpacity: 0.8,
                strokeWeight: 3,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  </div>
</LoadScript>

  );
}

export default LocationMap;
