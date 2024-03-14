import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';

AOS.init();

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <App />
);