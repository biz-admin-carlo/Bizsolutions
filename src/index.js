import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import statement
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init();

const container = document.getElementById('root');
const root = createRoot(container); // Updated usage of createRoot
root.render(
    <App />
);