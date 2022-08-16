import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { bicycleStationApi } from './apis/backends';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const store = configureStore({
  reducer: {
    [bicycleStationApi.reducerPath]: bicycleStationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bicycleStationApi.middleware)
});


const muiTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
        <CssBaseline />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
