import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './src/App.jsx';
import TourDetailsPage from './src/pages/TourDetailsPage.jsx';
import './index.css';

// Определяем базовый путь для GitHub Pages
const basename = import.meta.env.PROD ? '/phuketgo-react' : '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tour/:slug" element={<TourDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);