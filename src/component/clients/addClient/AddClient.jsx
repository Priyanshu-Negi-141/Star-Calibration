// import React, { useState } from "react";
// import { PreviousButton } from "../../button/";
// import { useStateContext } from "../../../contexts/ContextProvider";

// const AddClient = () => {
//   const { currentColor } = useStateContext();

//   const [rows, setRows] = useState([""]);
//   const [rows1, setRows1] = useState([""]);
//   const handleAddRow = () => {
//     setRows([...rows, ""]);
//   };
//   const handleAddRow1 = () => {
//     setRows1([...rows1, ""]);
//   };

//   const handleDeleteRow = (index) => {
//     const updatedRows = [...rows.slice()];
//     updatedRows.splice(index, 1);
//     setRows(updatedRows);
//   };
//   const handleDeleteRow1 = (index) => {
//     const updatedRows = [...rows1.slice()];
//     updatedRows.splice(index, 1);
//     setRows1(updatedRows);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     // Calculate the sum and update the result field
//   };

//   const handleSendData = () => {
//     // Prepare the data object
//     const data = {
//       client_code: document.getElementById("client_code").value,
//       client_name: document.getElementById("client_name").value,
//        addresses: rows.map((row, index) => ({
//          addressLine1: document.getElementById(`address_line1_${index}`).value,
//     //     addressLine2: document.getElementById(`address_line2_${index}`).value,
//     //     city: document.getElementById(`city_${index}`).value,
//     //     postalCode: document.getElementById(`postal_code_${index}`).value,
//     //     district: document.getElementById(`district_${index}`).value,
//     //     state: document.getElementById(`state_${index}`).value,
//        })),
//     //   consentPersons: rows1.map((data, i) => ({
//     //     slNo: i + 1,
//     //     consentPersonName: document.getElementById(`consent_person_name_${i}`).value,
//     //     mobileNo: document.getElementById(`mobile_no_${i}`).value,
//     //     email: document.getElementById(`email_${i}`).value,
//     //     designation: document.getElementById(`designation_${i}`).value,
//     //     department: document.getElementById(`department_${i}`).value,
//     //   })),
//     }
//     // Convert the data to JSON string
//     const jsonData = JSON.stringify(data);

//     // Send the JSON data to the server
//     fetch("http://localhost:8000/api/client/clients", {
//     method: "POST",
//     body: jsonData,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     })
//     .then(response => {
//         // Handle the response
//         console.log(response);
//     })
//     .catch(error => {
//         // Handle the error
//         console.error(error);
//     });
//     };

//   return (
//     <div>
//       <div>
//         <PreviousButton />
//       </div>
//       <h2
//         className="border p-2 text-center bg-gray-300 dark:bg-gray-800"
//         style={{ borderColor: currentColor, color: currentColor }}
//       >
//         Client Details
//       </h2>
//       <form>
//         <div className="border-dashed border-2 border-black p-5 mt-2">
//           <div class="grid gap-6 mb-6 md:grid-cols-2">
//             <div>
//               <label
//                 for="client_code"
//                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Client Code
//               </label>
//               <input
//                 type="text"
//                 id="client_code"
//                 name="client_code"
//                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Code"
//               />
//             </div>
//             <div>
//               <label
//                 for="client_name"
//                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Client Name
//               </label>
//               <input
//                 type="text"
//                 id="client_name"
//                 name="client_name"
//                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Client Name"
//               />
//             </div>
//           </div>
//           {rows.map((row, index) => (
//             <div
//               className="border border-dashed mb-2 p-2"
//               style={{ borderColor: currentColor }}
//             >
//               <div class="mb-1">
//                 <label
//                   for="address"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   id={`address_line1_${index}`}
//                   name="addressLine1"
//                   class="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Address Line 1"
//                 />
//                 <input
//                   type="text"
//                   id="address"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Address Line 2"
//                 />
//               </div>
//               <div class="mb-2 flex gap-1">
//                 <input
//                   type="text"
//                   id="address"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="City"
//                 />
//                 <input
//                   type="text"
//                   id="address"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Postal Code"
//                 />
//                 <input
//                   type="text"
//                   id="address"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-58 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="District"
//                 />
//     <select
//       name="state"
//       id="address"
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     >
//       <option selected>: : : Select State : : :</option>
//       <option value="Andhra Pradesh">Andhra Pradesh</option>
//       <option value="Andaman and Nicobar Islands">
//         Andaman and Nicobar Islands
//       </option>
//       <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//       <option value="Assam">Assam</option>
//       <option value="Bihar">Bihar</option>
//       <option value="Chandigarh">Chandigarh</option>
//       <option value="Chhattisgarh">Chhattisgarh</option>
//       <option value="Dadar and Nagar Haveli">
//         Dadar and Nagar Haveli
//       </option>
//       <option value="Daman and Diu">Daman and Diu</option>
//       <option value="Delhi">Delhi</option>
//       <option value="Lakshadweep">Lakshadweep</option>
//       <option value="Puducherry">Puducherry</option>
//       <option value="Goa">Goa</option>
//       <option value="Gujarat">Gujarat</option>
//       <option value="Haryana">Haryana</option>
//       <option value="Himachal Pradesh">Himachal Pradesh</option>
//       <option value="Jammu and Kashmir">Jammu and Kashmir</option>
//       <option value="Jharkhand">Jharkhand</option>
//       <option value="Karnataka">Karnataka</option>
//       <option value="Kerala">Kerala</option>
//       <option value="Madhya Pradesh">Madhya Pradesh</option>
//       <option value="Maharashtra">Maharashtra</option>
//       <option value="Manipur">Manipur</option>
//       <option value="Meghalaya">Meghalaya</option>
//       <option value="Mizoram">Mizoram</option>
//       <option value="Nagaland">Nagaland</option>
//       <option value="Odisha">Odisha</option>
//       <option value="Punjab">Punjab</option>
//       <option value="Rajasthan">Rajasthan</option>
//       <option value="Sikkim">Sikkim</option>
//       <option value="Tamil Nadu">Tamil Nadu</option>
//       <option value="Telangana">Telangana</option>
//       <option value="Tripura">Tripura</option>
//       <option value="Uttar Pradesh">Uttar Pradesh</option>
//       <option value="Uttarakhand">Uttarakhand</option>
//       <option value="West Bengal">West Bengal</option>
//     </select>
//   </div>

//               <div className="grid gap-6 mb-6 md:grid-cols-2">

//                 <div>
//                   <label
//                     for="gst_no"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     GST No
//                   </label>
//                   <input
//                     type="text"
//                     id="gst_no"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Code"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="flex mt-2 justify-end">
//             <div className="">
//               <button
//                 type="button"
//                 class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
//                 onClick={handleAddRow}
//               >
//                 Add
//               </button>
//             </div>
//             <div className="">
//               <button
//                 type="button"
//                 class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
//                 onClick={handleDeleteRow}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Personal */}

//         <div className="border-dashed border-2 border-black dark:border-white mt-2 p-5">
//           <div className="border border-black dark:border-white dark:text-white">
//             <div className="border border-black p-2 text-center bg-gray-300 dark:bg-gray-800 dark:border-white dark:text-white">
//               <h2>Consent Person Detail's</h2>
//             </div>
//             <div className="grid grid-cols-12 text-center">
//               <div className="col-span-1 border p-2 border-black dark:border-white dark:text-white">
//                 SL No
//               </div>
//               <div className="col-span-3 border p-2 border-black dark:border-white">
//                 <p>Consent Person Name</p>
//               </div>
//               <div className="col-span-2 border p-2 border-black dark:border-white">
//                 <p>Mobile No</p>
//               </div>
//               <div className="col-span-2 border p-2 border-black dark:border-white">
//                 <p>Email</p>
//               </div>
//               <div className="col-span-2 border p-2 border-black dark:border-white">
//                 <p>Designation</p>
//               </div>
//               <div className="col-span-2 border p-2 border-black dark:border-white">
//                 <p>Department</p>
//               </div>
//             </div>
//             {rows1.map((data, i) => {
//               return (
//                 <div className="grid grid-cols-12 text-center">
//                   <div className="col-span-1 border border-black dark:border-white">
//                     <input
//                       type="number"
//                       value={i + 1}
//                       id="sl_number"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-3 border border-black dark:border-white">
//                     <input
//                       type="text"
//                       id="f_date"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-2 border border-black dark:border-white">
//                     <input
//                       type="number"
//                       id="f_date"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-2 border border-black dark:border-white">
//                     <input
//                       type="email"
//                       id="f_date"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-2 border border-black dark:border-white">
//                     <input
//                       type="text"
//                       id="f_date"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     />
//                   </div>
//                   <div className="col-span-2 border border-black dark:border-white">
//                     <select
//                       id="countries"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     >
//                       <option selected>: : : Department : : :</option>
//                       <option value="purchase">Purchase</option>
//                       <option value="qa">QA</option>
//                       <option value="qc">QC</option>
//                       <option value="engineering">Engineering</option>
//                       <option value="account">Account</option>
//                       <option value="hr">HR</option>
//                       <option value="sales">Sales</option>
//                     </select>
//                   </div>
//                 </div>
//                 // Purchase, QA, QC Engineering, Account,HR,
//               );
//             })}
//           </div>
//           {/* Adding new button for creating new same form */}
//           <div className="flex mt-2 justify-end">
//             <div className="">
//               <button
//                 type="button"
//                 class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
//                 onClick={handleAddRow1}
//               >
//                 Add
//               </button>
//             </div>
//             <div>
//               <button
//                 type="button"
//                 class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
//                 onClick={handleDeleteRow1}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Submit and reset */}
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             onClick={handleSendData}
//             class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Submit
//           </button>
//           <button
//             type="reset"
//             class="mt-10 text-white bg-green-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default AddClient;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateContext } from "../../../contexts/ContextProvider";

const AddClient = () => {
  const {host} = useStateContext()
  const [client, setClient] = useState({
    client_code: "",
    client_name: "",
    addresses: [
      {
        address_line_1: "",
        address_line_2: "",
        city: "",
        postal_code: "",
        district: "",
        state: "",
      },
    ],
    consent: {
      consent_name: "",
      mobile_no: "",
      email: "",
      designation: "",
      department: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressIndex = name.split("-")[1];
      const updatedAddresses = client.addresses.map((address, index) => {
        if (index === Number(addressIndex)) {
          return { ...address, [name.split("-")[2]]: value };
        }
        return address;
      });
      setClient({ ...client, addresses: updatedAddresses });
    } else if (name.includes("consent")) {
      setClient({
        ...client,
        consent: { ...client.consent, [name.split("-")[1]]: value },
      });
    } else {
      setClient({ ...client, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${host}/api/client`;
      const response = await fetch(`${apiUrl}/addClients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      if (response.ok) {
        toast.success("Client addedd successfully");
        setClient({
          client_code: "",
          client_name: "",
          addresses: [
            {
              address_line_1: "",
              address_line_2: "",
              city: "",
              postal_code: "",
              district: "",
              state: "",
            },
          ],
          consent: {
            consent_name: "",
            mobile_no: "",
            email: "",
            designation: "",
            department: "",
          },
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const handleDeleteLastAddress = () => {
    setClient((prevClient) => {
      const updatedAddresses = [...prevClient.addresses];
      updatedAddresses.pop(); // Remove the last address line
      return { ...prevClient, addresses: updatedAddresses };
    });
  };

  return (
    <div>
      <div className="border border-black p-2 rounded-lg dark:text-white">
        <div className="text-center bg-gray-300 dark:bg-gray-800 border p-2 text-bold rounded-xl my-3">
          <h2>Add Client</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex gap-2">
            <div className="w-full">
              <label htmlFor="client-code">Client Code:</label>
              <input
                type="text"
                id="client-code"
                name="client_code"
                placeholder="Client Code"
                className="dark:bg-transparent"
                value={client.client_code}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="client-name">Client Name:</label>
              <input
                type="text"
                id="client-name"
                name="client_name"
                placeholder="Client Name"
                className="dark:bg-transparent"
                value={client.client_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {client.addresses.map((address, index) => (
            <div key={index} className="border dark:border-white border-black p-2 my-3">
              <div className="border bg-gray-300 dark:bg-gray-800 dark:border-white text-bold text-center p-2 border-black rounded-lg my-3">
                <h1>Client Address {index + 1}</h1>
              </div>
              <div>
              <div className="grid mb-2 gap-2">
                <input
                  type="text"
                  id={`address-line-1-${index}`}
                  name={`address-${index}-address_line_1`}
                  value={address.address_line_1}
                  placeholder="Address Line 1"
                  className="dark:bg-transparent"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  id={`address-line-2-${index}`}
                  name={`address-${index}-address_line_2`}
                  value={address.address_line_2}
                  placeholder="Address Line 2"
                  className="dark:bg-transparent"
                  onChange={handleChange}
                />
                </div>
                <div className="grid grid-cols-8 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      id={`city-${index}`}
                      name={`address-${index}-city`}
                      value={address.city}
                      placeholder="City"
                      className="dark:bg-transparent"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      id={`postal-code-${index}`}
                      name={`address-${index}-postal_code`}
                      value={address.postal_code}
                      placeholder="Postal Code"
                      className="dark:bg-transparent"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      id={`district-${index}`}
                      name={`address-${index}-district`}
                      value={address.district}
                      placeholder="District"
                      className="dark:bg-transparent"
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div>
            <input
              type="text"
              id={`state-${index}`}
              name={`address-${index}-state`}
              value={address.state}
              placeholder='State'
              className='dark:bg-transparent'
              onChange={handleChange}
            />
            </div> */}
                  <div className="col-span-2">
                    <select
                      id={`state-${index}`}
                      name={`address-${index}-state`}
                      value={address.state}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>: : : Select State : : :</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">
                        Dadar and Nagar Haveli
                      </option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() =>
                setClient({
                  ...client,
                  addresses: [
                    ...client.addresses,
                    {
                      address_line_1: "",
                      address_line_2: "",
                      city: "",
                      postal_code: "",
                      district: "",
                      state: "",
                    },
                  ],
                })
              }
            >
              Add
            </button>

            <button
              type="button"
              onClick={handleDeleteLastAddress}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>

          <div className="grid sm:grid-flow-row gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="consent-name">Contact Person:</label>
              <input
                type="text"
                id="consent-name"
                name="consent-consent_name"
                placeholder="Person Name"
                value={client.consent.consent_name}
                className="dark:bg-transparent"
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="mobile-no">Mobile Number:</label>
              <input
                type="text"
                id="mobile-no"
                name="consent-mobile_no"
                placeholder="Mobile Number"
                value={client.consent.mobile_no}
                className="dark:bg-transparent"
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="consent-email"
                placeholder="Email"
                value={client.consent.email}
                className="dark:bg-transparent"
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                id="designation"
                name="consent-designation"
                placeholder="Designation"
                value={client.consent.designation}
                className="dark:bg-transparent"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="consent-department"
                placeholder="Department"
                value={client.consent.department}
                className="dark:bg-transparent"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="border w-full p-2 my-3 rounded-full text-white text-bold hover:bg-[#001C30] bg-[#213363]"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
