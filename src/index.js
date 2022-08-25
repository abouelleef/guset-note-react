import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>

          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
