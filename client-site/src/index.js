import React from 'react';
import ReactDOM from 'react-dom/client';
import 'datatables.net-bs4';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='relative bg-slate-50 h-[100vh]' >
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
