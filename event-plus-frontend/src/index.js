import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import InactivityLogout from "./components/InactivityLogout";
import App from './App';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<AuthProvider>
  <InactivityLogout />
  <App />
</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
