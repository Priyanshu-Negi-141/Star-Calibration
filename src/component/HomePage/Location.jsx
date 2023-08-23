import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScript, Polyline } from "@react-google-maps/api";
import { useStateContext } from "../../contexts/ContextProvider";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Location() {
  const { GOOGLE_MAP_API_KEY } = useStateContext();
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState({ lat: 0, lng: 0 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null); // Reference to the map instance
  const [loading, setLoading] = useState(true); // Loading state
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationInput((prevLocation) => ({
      ...prevLocation,
      [name]: parseFloat(value),
    }));
  };

  const handleAddLocation = () => {
    setLocations((prevLocations) => [...prevLocations, locationInput]);
    setLocationInput({ lat: 0, lng: 0 }); // Reset input fields

    if (map) {
      // Center the map on the last added location
      map.panTo(locationInput);
    }
  };

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleMarkerMouseOver = (location) => {
    setHoveredLocation(location);
  };

  const handleMarkerMouseOut = () => {
    setHoveredLocation(null);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <input
              type="number"
              placeholder="Enter latitude"
              name="lat"
              value={locationInput.lat}
              onChange={handleLocationChange}
            />
            <input
              type="number"
              placeholder="Enter longitude"
              name="lng"
              value={locationInput.lng}
              onChange={handleLocationChange}
            />
            <button onClick={handleAddLocation}>Add Location</button>
          </div>
          <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentLocation}
              zoom={15}
              onLoad={handleMapLoad}
            >
              {locations.map((loc, index) => (
                <Marker
                  key={index}
                  position={loc}
                  onMouseOver={() => handleMarkerMouseOver(loc)}
                  onMouseOut={handleMarkerMouseOut}
                >
                  {hoveredLocation === loc ? (
                    <InfoWindow position={loc}>
                      <div>
                        {index === locations.length - 1
                          ? "Current Location"
                          : "Previous Location"}
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
              {locations.length >= 2 && (
                <React.Fragment>
                  <Polyline
                    path={locations}
                    options={{
                      strokeColor: "#0000FF", // Blue color for existing polyline
                      strokeOpacity: 1,
                      strokeWeight: 3,
                    }}
                  />
                  {locations.length >= 3 && (
                    <Polyline
                      path={[locations[locations.length - 2], locations[locations.length - 1]]}
                      options={{
                        strokeColor: "#FFFF00", // Yellow color for new polyline
                        strokeOpacity: 1,
                        strokeWeight: 3,
                      }}
                    />
                  )}
                  <Marker
                    position={locations[0]}
                    label="A"
                    icon={{
                      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                      anchor: new window.google.maps.Point(7, 7),
                    }}
                  />
                  <Marker
                    position={locations[locations.length - 1]}
                    label="B"
                    icon={{
                      url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                      anchor: new window.google.maps.Point(7, 7),
                    }}
                  />
                </React.Fragment>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
}

export default Location;
