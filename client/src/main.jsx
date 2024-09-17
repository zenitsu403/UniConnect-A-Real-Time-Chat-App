import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {HelmetProvider} from "react-helmet-async";
import {CssBaseline} from "@mui/material";
import { Provider } from "react-redux"
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline>
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </CssBaseline>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)
