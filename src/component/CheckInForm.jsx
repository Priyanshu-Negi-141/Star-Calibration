import React, { useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

function CheckInForm() {
    const { host } = useStateContext();
    const [checkInType, setCheckInType] = useState('');
    const [activity, setActivity] = useState('');
    const [loginAddress, setLoginAddress] = useState('');
    const [siteName, setSiteName] = useState('');
    const [officeOption, setOfficeOption] = useState('');

    const handleCheckInTypeChange = (value) => {
        setCheckInType(value);
        setLoginAddress('');

        if (value === 'Office') {
            setOfficeOption('Select Office Option'); // Reset office option
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token not found.');
                return;
            }

            const response = await axios.post(`${host}/api/checkInDetails/addCheckIn`, {
                login_location: {
                    // Latitude and longitude logic if needed...
                },
                checkInType,
                activity,
                login_address: loginAddress,
                site_name: siteName,
                office_option: officeOption // Include selected office option
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });

            console.log(response.data);
            // Handle success or display response to the user
        } catch (error) {
            console.error('Error adding check-in data:', error);
            // Handle error or display error message to the user
        }
    };

    const isOfficeCheckIn = checkInType === 'Office';
    const isSiteCheckIn = checkInType === 'Site';
    const isSubmitDisabled = isSiteCheckIn || (!isSiteCheckIn && !officeOption);

    return (
        <div>
            <h2>Check-In Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="checkInType">Check-In Type:</label>
                <select id="checkInType" value={checkInType} onChange={(e) => handleCheckInTypeChange(e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="Site">Site</option>
                    <option value="Office" selected>Office</option>
                </select><br />
                

                {isOfficeCheckIn && (
                    <div>
                        <label htmlFor="officeOption">Select Office Option:</label>
                        <select id="officeOption" value={officeOption} onChange={(e) => setOfficeOption(e.target.value)} required>
                            <option value="">Select Office Option</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select><br />
                    </div>
                )}

                {isSiteCheckIn && (
                    <p>Please check in through mobile for site locations.</p>
                )}

                <label htmlFor="activity">Activity:</label>
                <input type="text" id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} required /><br />

                <label htmlFor="loginAddress">Login Address:</label>
                <input type="text" id="loginAddress" value={loginAddress} onChange={(e) => setLoginAddress(e.target.value)} required /><br />

                <label htmlFor="siteName">Site Name:</label>
                <input type="text" id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} required /><br />

                <button type="submit" disabled={isSubmitDisabled}>Submit</button>
            </form>
        </div>
    );
}

export default CheckInForm;
