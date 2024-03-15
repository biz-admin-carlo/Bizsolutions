import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';
import ReactGA from 'react-ga';

ReactGA.initialize('YOUR_TRACKING_ID'); // Replace 'YOUR_TRACKING_ID' with your actual GA tracking ID
ReactGA.pageview(window.location.pathname + window.location.search);

AOS.init();

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <App />
);