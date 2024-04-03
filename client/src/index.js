import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthState from './context/auth/AuthState';
import SubjectState from './context/subject/SubjectState';
import LocalStorageState from './context/local-storage/LocalStorageState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <LocalStorageState>
    <AuthState>
      <SubjectState>
        <App />
      </SubjectState>
    </AuthState>
  </LocalStorageState>
  // </React.StrictMode>
);