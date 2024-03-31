import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthState from './context/auth/AuthState';
import SubjectState from './context/subject/SubjectState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <SubjectState>
        <App />
      </SubjectState>
    </AuthState>
  </React.StrictMode>
);