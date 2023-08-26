import React, { useEffect, useRef } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { themeColorData } from '../../data/themeColor/themeColorData';
import { useStateContext } from '../../contexts/ContextProvider';

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } = useStateContext();

  const popupRef = useRef(null); // Create a ref for the popup

  // Add an event listener to handle clicks outside the popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setThemeSettings(false); // Close the popup when clicked outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    
  return (
    <div className="bg-opacity-50 fixed top-0 right-0 w-screen h-screen overflow-y-scroll bg-gray-500">
    <div ref={popupRef} className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52]">
      <div className="flex justify-between items-center p-4 ml-4">
        <p className="font-semibold text-lg">Settings</p>
        <button
          type="button"
          onClick={() => setThemeSettings(false)}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-gray-300 rounded-full"
          style={{ color: 'rgb(153, 171, 180)' }}
        >
          <MdOutlineCancel />
        </button>
      </div>
      {/* <div className="flex-col border-t border-gray-300 p-4 ml-4">
        <p className="font-semibold text-xl">Theme Option</p>
        <div className="mt-4">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            className="cursor-pointer"
            onChange={setMode}
            checked={currentMode === 'Light'}
          />
          <label htmlFor="light" className="ml-2 text-md cursor-pointer">
            Light
          </label>
        </div>
        <div className="">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            onChange={setMode}
            className="cursor-pointer"
            checked={currentMode === 'Dark'}
          />
          <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
            Dark
          </label>
        </div>
      </div> */}
<div className="border-t border-gray-300 p-4 ml-4">
  <p className="font-semibold text-xl">Theme Option</p>
  <div className="mt-4">
    <label className="inline-flex items-center">
      <input
        type="radio"
        id="light"
        name="theme"
        value="Light"
        className="cursor-pointer"
        onChange={setMode}
        checked={currentMode === 'Light'}
      />
      <span className="ml-2 text-md cursor-pointer">Light</span>
    </label>
  </div>
  <div className="mt-2">
    <label className="inline-flex items-center">
      <input
        type="radio"
        id="dark"
        name="theme"
        value="Dark"
        onChange={setMode}
        className="cursor-pointer"
        checked={currentMode === 'Dark'}
      />
      <span className="ml-2 text-md cursor-pointer">Dark</span>
    </label>
  </div>
</div>


      {/* <div className="p-4 border-t border-gray-300 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52]">
        <p className="font-semibold text-xl">Theme Colors</p>
        <div className="grid grid-cols-6 mt-3 gap-3">
          {themeColorData.map((item, index) => (
            <div key={index}>
              <div
                className="relative cursor-pointer flex gap-5 items-center"
                content={item.name}
                position="TopCenter"
              >
                <button
                  type="button"
                  className="h-10 w-10 border border-black rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck
                    className={`ml-2 text-2xl text-white ${
                      item.color === currentColor ? 'block' : 'hidden'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="p-4 border-t border-gray-300 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52]">
  <p className="font-semibold text-xl">Theme Colors</p>
  <div className="grid grid-cols-6 mt-3 gap-3">
    {themeColorData.map((item, index) => (

      <div key={index}>
        <div className="relative cursor-pointer flex gap-5 items-center">
          <button
            type="button"
            className="h-10 w-10 border border-black rounded-full cursor-pointer"
            style={{ backgroundColor: item.color }}
            onClick={() => setColor(item.color)}
          >
            <BsCheck
              className={`ml-2 text-2xl text-white ${
                item.color === currentColor ? 'block' : 'hidden'
              }`}
            />
          </button>
          <span className="text-md">{item.name}</span>
        </div>
      </div>
    ))}
  </div>
</div> */}

<div className="p-4 border-t border-gray-300 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52]">
  <p className="font-semibold text-xl">Theme Colors</p>
  <div className="mt-3 max-h-[calc(80vh-240px)] overflow-y-auto">
    <ul className="space-y-3">
      {themeColorData.map((item, index) => (
        <li key={index} className="flex items-center space-x-3 cursor-pointer">
          <button
            type="button"
            className="h-10 w-10 border border-black rounded-full cursor-pointer"
            style={{ backgroundColor: item.color }}
            onClick={() => setColor(item.color)}
          >
            <BsCheck
              className={`ml-2 text-2xl text-white ${
                item.color === currentColor ? 'block' : 'hidden'
              }`}
            />
          </button>
          <span className="text-md">{item.name}</span>
        </li>
      ))}
    </ul>
  </div>
</div>


    </div>
  </div>
  

  );
};

export default ThemeSettings;