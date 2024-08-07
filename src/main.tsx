import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TanstackProvider from './providers/TanstackProvider.tsx';
import ContextProvider from './providers/ContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanstackProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </TanstackProvider>
  </React.StrictMode>
);
