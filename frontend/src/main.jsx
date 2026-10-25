import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';
import './i18n/i18n';

// Configure default axios base URL for API requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.headers.common['Content-Type'] = 'application/json';

import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';

import '@fontsource/outfit/700.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-main, #fff)', background: 'var(--bg-primary, #000)' }}>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
