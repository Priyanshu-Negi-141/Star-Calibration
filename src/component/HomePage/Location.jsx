import React, { useState } from 'react';

function Location() {
    const [location, setLocation] = useState(null);

    const fetchLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                error => {
                    console.error('Error fetching geolocation:', error);
                }
            );
        } else {
            console.log('Geolocation is not available.');
        }
    };

    return (
        <div className="App">
            <h1>Fetch Current Location</h1>
            <button className='border rounded-md px-5 py-2 border-blue-500 bg-slate-600 text-white font-semibold' onClick={fetchLocation}>Get Location</button>
            <div className='mt-5'>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            </div>
        </div>
    );
}

export default Location;
