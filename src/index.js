import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const title = 'City Explorer'

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
