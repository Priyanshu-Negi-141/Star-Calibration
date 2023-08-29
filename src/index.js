import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import App from "./App";
import { ProfileContextProvider } from "./contexts/ProfileContextProvider";
import { MainContextProvider } from "./contexts/MainContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainContextProvider>
    <ContextProvider>
      <ProfileContextProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </ProfileContextProvider>
    </ContextProvider>
  </MainContextProvider>
);
