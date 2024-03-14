import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css'; // Import your CSS file(s)
import App from './components/App/index.jsx'; // Import your main App component

// Use createRoot to render your application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
