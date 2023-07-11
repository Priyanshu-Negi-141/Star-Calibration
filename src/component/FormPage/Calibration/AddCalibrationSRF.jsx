import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCalibrationSRF = () => {
  const [clientNames, setClientNames] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientAddresses, setClientAddresses] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [formData, setFormData] = useState({
    issueDate: "",
    clientName: "",
    addressLine1: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    fetchClientNames();
  }, []);

  const fetchClientNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/client/clientsName"
      );
      setClientNames(response.data.clientNames);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  const handleClientChange = async (e) => {
    const selectedClientName = e.target.value;
    setSelectedClient(selectedClientName);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/client/addresses/${selectedClientName}`
      );
      setClientAddresses(response.data.addresses);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  const handleAddressChange = (e) => {
    const addressIndex = e.target.value;
    if (addressIndex !== "") {
      const selectedAddress = clientAddresses[addressIndex];
      setFormData({
        ...formData,
        addressLine1: selectedAddress.address_line_1,
      });
    } else {
      setFormData({
        ...formData,
        addressLine1: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      issussDate: currentDate,
      client_name: selectedClient,
      address_line_1: formData.addressLine1,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/certificate/srf",
        requestData
      );

      // Reset the form after successful submission
      setSelectedClient("");
      setClientAddresses([]);
      toast.success("Client Added Successfully!")
      setFormData({
        issueDate: "",
        clientName: "",
        addressLine1: "",
      });

      // Display a success message or perform any necessary actions
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <div className="border-2 border-black rounded-lg p-2 text-center text-bold">
        <h2>Generate SRF</h2>
      </div>
      <div className="my-3">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-3">
            <div className="">
                <label htmlFor="issueDateInput">Issue Date:</label>{" "}
              <input type="text" value={currentDate} readOnly />
            </div>
            <div className="">
            <label htmlFor="clientSelect">Select Client:</label>
                <select
                id="clientSelect"
                className="w-full border border-black p-2 rounded-sm"
                value={selectedClient}
                onChange={handleClientChange}
                >
                <option value="">Select a client</option>
                {clientNames.map((clientName, index) => (
                    <option key={index} value={clientName}>
                    {clientName}
                    </option>
                ))}
                </select>
            </div>

            {clientAddresses.length > 0 && (
              <div>
                <label htmlFor="addressSelect">Select Address:</label>
                <select id="addressSelect" className="w-full border border-black p-2 rounded-sm" onChange={handleAddressChange}>
                  <option value="">Select an address</option>
                  {clientAddresses.map((address, index) => (
                    <option key={index} value={index}>
                      {`${address.address_line_1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedClient && clientAddresses.length === 0 && (
              <p>No addresses found for the selected client.</p>
            )}

          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="border border-white rounded-lg p-2 px-10 text-white text-bold bg-green-700 hover:bg-green-800"
              disabled={!selectedClient || !formData.addressLine1}
            >
              Submit
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddCalibrationSRF;
