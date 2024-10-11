import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';
import ReactGA from 'react-ga';

const APP_VERSION = '1.2.4';

function checkStorageVersion() {
    const storedLocalVersion = localStorage.getItem('appVersion');
    if (storedLocalVersion !== APP_VERSION) {
        localStorage.clear();
        localStorage.setItem('appVersion', APP_VERSION);
    }

    const storedSessionVersion = sessionStorage.getItem('appVersion');
    if (storedSessionVersion !== APP_VERSION) {
        sessionStorage.clear();
        sessionStorage.setItem('appVersion', APP_VERSION);
    }
}

checkStorageVersion();

ReactGA.pageview(window.location.pathname + window.location.search);

AOS.init();

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <App />
);