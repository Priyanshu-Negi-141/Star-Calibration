import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { PreviousButton } from "../button";
import axios from "axios";
import { toast } from "react-toastify";

const UnitsParameter = () => {
  const {host} = useStateContext()
  const [fetchUnitData, setFetchUnitData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState({
    parameter_name: "",
    parameter_desc: "",
    parameter_symbol: "",
  });
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((perData) => ({
      ...perData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${host}/api/unitParameter/unitParameterDetails`
      );
      setFetchUnitData(response.data);
      setDisplayedData(
        response.data.slice(startIndex, startIndex + itemsPerPage)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextClick = () => {
    const nextIndex = startIndex + itemsPerPage;
    setStartIndex(nextIndex);
    setDisplayedData(fetchUnitData.slice(nextIndex, nextIndex + itemsPerPage));
  };

  const handlePreviousClick = () => {
    const previousIndex = startIndex - itemsPerPage;
    setStartIndex(previousIndex);
    setDisplayedData(
      fetchUnitData.slice(previousIndex, previousIndex + itemsPerPage)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        parameter_name: data.parameter_name,
        parameter_desc: data.parameter_desc,
        parameter_symbol: data.parameter_symbol,
      };
      await axios.post(
        `${host}/api/unitParameter/unitParameterDetails`,
        requestData
      );
      console.log("Unit Parameter Added", data);
      fetchData();
      toast.success("Parameter added Successfully!");
      setData({
        parameter_name: "",
        parameter_desc: "",
        parameter_symbol: "",
      });
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error adding unit parameter:", error);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsEditModalOpen(true);
    setData({
      parameter_name: item.unitParameterDetails[0].parameter_name,
      parameter_desc: item.unitParameterDetails[0].parameter_desc,
      parameter_symbol: item.unitParameterDetails[0].parameter_symbol,
    });
  };

  const handleDelete = (item) => {
    setEditData(item);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        parameter_name: data.parameter_name,
        parameter_desc: data.parameter_desc,
        parameter_symbol: data.parameter_symbol,
      };
      await axios.put(
        `${host}/api/unitParameter/unitParameterDetails/${editData._id}`,
        updatedData
      );
      console.log("Unit Parameter Updated", updatedData);
      fetchData();
      toast.success("Parameter updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error updating unit parameter:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${host}/api/unitParameter/unitParameterDetails/${editData._id}`);
      console.log("Unit Parameter Deleted", editData._id);
      fetchData();
      toast.success("Parameter deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error deleting unit parameter:", error);
    }
  };

  return (
    <>
      <div className="">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <div className="border-2 border-black p-2 text-center">
              <h2>Add Unit & Parameter</h2>
            </div>
            <form className="my-5" onSubmit={handleSubmit}>
              <div className="grid gap-2 my-2">
                <label htmlFor="unit_name">Unit Name</label>
                <input
                  type="text"
                  id="unit_name"
                  name="parameter_name"
                  placeholder="Enter Unit Name"
                  value={data.parameter_name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 my-2">
                <label htmlFor="unit_desc">Unit Desc</label>
                <input
                  type="text"
                  id="unit_desc"
                  name="parameter_desc"
                  placeholder="Enter Unit Desc"
                  value={data.parameter_desc}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 grid-cols-3">
                <div className="col-span-2 gap-2">
                  <label htmlFor="unit_symbol">Unit Symbol</label>
                  <input
                    type="text"
                    id="unit_symbol"
                    name="parameter_symbol"
                    placeholder="Enter Unit Symbol"
                    value={data.parameter_symbol}
                    onChange={handleChange}
                  />
                </div>
                <div className=" grid place-items-end">
                  <button
                    type="submit"
                    className="py-2 bg-[#EF6262] hover:bg-[#EF8070] text-white w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-span-2">
            <div className="border-2 sticky border-black p-2 text-center">
              <h2>Unit & Parameter Details</h2>
            </div>
            <div className="col-span-2 h-3/4 overflow-scroll">
              <div className="">
                <div className="flex gap-2 justify-end">
                  {startIndex > 0 && (
                    <div className="border my-3 border-black">
                      <button
                        className="py-2 text-bold px-10 bg-[#1D5B79] hover:bg-[#468B97] text-white"
                        onClick={handlePreviousClick}
                      >
                        Previous
                      </button>
                    </div>
                  )}
                  {startIndex + itemsPerPage < fetchUnitData.length && (
                    <div className="border my-3 border-black">
                      <button
                        className="py-2 text-bold px-10 bg-[#A2FF86] hover:bg-[#CBFFA9] text-black"
                        onClick={handleNextClick}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
                <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Sr No.</th>
                      <th className="px-4 py-2">Unit and Parameter</th>
                      <th className="px-4 py-2">Unit Symbol</th>
                      <th className="px-4 py-2">Unit Description</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-scroll">
                    {displayedData.map((item, index) => {
                      const serialNumber = startIndex + index + 1;
                      return (
                        <tr key={item._id}>
                          <td className="px-4 py-2">{serialNumber}</td>
                          <td className="px-4 py-2">{item.unitParameterDetails[0].parameter_name}</td>
                          <td className="px-4 py-2">{item.unitParameterDetails[0].parameter_symbol}</td>
                          <td className="px-4 py-2">{item.unitParameterDetails[0].parameter_desc}</td>
                          <td className="px-4 py-2">
                            {/* <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button> */}
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* {isEditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    <div className="bg-white p-8 rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Unit Parameter</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="grid gap-2 my-2">
          <label htmlFor="unit_name">Unit Name</label>
          <input
            type="text"
            name="parameter_name"
            placeholder="Enter Unit Name"
            value={editData.parameter_name}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2 my-2">
          <label htmlFor="unit_desc">Unit Desc</label>
          <input
            type="text"
            name="parameter_desc"
            placeholder="Enter Unit Desc"
            value={editData.parameter_desc}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2 grid-cols-3">
          <div className="col-span-2 gap-2">
            <label htmlFor="unit_symbol">Unit Symbol</label>
            <input
              type="text"
              name="parameter_symbol"
              placeholder="Enter Unit Symbol"
              value={editData.parameter_symbol}
              onChange={handleChange}
            />
          </div>
          <div className="grid place-items-end">
            <button
              type="submit"
              className="py-2 bg-[#EF6262] hover:bg-[#EF8070] text-white w-full"
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)} */}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Delete Unit Parameter</h2>
            <p>Are you sure you want to delete this unit parameter?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnitsParameter;
