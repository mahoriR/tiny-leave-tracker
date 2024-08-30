import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import posthog from 'posthog-js';

posthog.init('phc_XE8X5lBdApd0JUyFeMMmRnEXpP7mWLzPIDPWe8MhAm7', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always'
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);