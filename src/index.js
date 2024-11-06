import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Select the root element where your app will be mounted
const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
