import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ContextProvider>
);

