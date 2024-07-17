import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {HelmetProvider} from "react-helmet-async";
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline>
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </CssBaseline>
    </HelmetProvider>
  </React.StrictMode>,
)
