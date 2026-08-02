import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <BrowserRouter>

      <ThemeProvider>

        <AuthProvider>

          <App />

          <ToastContainer />

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>

  </StrictMode>

)