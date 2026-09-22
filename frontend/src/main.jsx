import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App.jsx';
import './index.css';
import './styles/mobile.css';
import './styles/hero-fluid.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>,
);
