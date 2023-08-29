import React, { createContext, useContext} from "react";

const MainStateContext = createContext();
export const MainContextProvider = ({ children }) => {
    const localHostServerLink = "http://localhost:8000"
    const mainHostServerLink = "AIzaSyBBG3Qt18ozFaeh_cHNVNriZaOV58gB3g0"
    const MAIN_GOOGLE_MAP_API_KEY = "http://starback.validex.in:8001"
    const validexTitleMain = "Validex India"
    const officialSoftVersion = "1.0.1"
    const appName = "OrgManager_27_08_23_debug_1.0.apk"


  return (
    <MainStateContext.Provider
      value={{
        localHostServerLink,
        mainHostServerLink,
        MAIN_GOOGLE_MAP_API_KEY ,
        validexTitleMain,
        officialSoftVersion,
        appName
      }}
    >
      {children}
    </MainStateContext.Provider>
  );
};
export const useStateMainContext = () => useContext(MainStateContext);
