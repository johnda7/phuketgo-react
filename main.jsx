import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './src/App.jsx';
import TourDetailsPage from './src/pages/TourDetailsPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tour/:slug" element={<TourDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);