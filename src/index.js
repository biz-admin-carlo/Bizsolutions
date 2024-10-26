import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';
import ReactGA from 'react-ga';

const APP_VERSION = '1.3.8';


function checklistUser() {
    const storedLocalVersion = localStorage.getItem('appVersion');
    const loginTime = localStorage.getItem('loginTime');

    if (storedLocalVersion !== APP_VERSION) {
        localStorage.clear();
        localStorage.setItem('appVersion', APP_VERSION);
    }

    if (loginTime) {
        const now = new Date();
        const loggedInTime = new Date(loginTime);
        const timeDifference = (now - loggedInTime) / 1000 / 60;

        if (timeDifference > 2) {
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    const storedSessionVersion = sessionStorage.getItem('appVersion');

    if (storedSessionVersion !== APP_VERSION) {
        sessionStorage.clear();
        sessionStorage.setItem('appVersion', APP_VERSION);
    }
}

checklistUser()

ReactGA.pageview(window.location.pathname + window.location.search);

AOS.init();

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <App />
);


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import AuthService from './utils/Biz/Constants/auth.js';
// import { initializeAnalytics } from './utils/Biz/Constants/analytics.js';

// // Styles
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'aos/dist/aos.css';
// import 'leaflet/dist/leaflet.css';

// // Third-party initializations
// import AOS from 'aos';

// // Initialize services
// const initializeApp = () => {
//     // Check authentication
//     AuthService.checkUserAuthentication();
    
//     // Initialize analytics
//     initializeAnalytics();
    
//     // Initialize AOS
//     AOS.init();
    
//     // Mount React application
//     const container = document.getElementById('root');
//     const root = createRoot(container);
//     root.render(<App />);
// };

// // Bootstrap application
// initializeApp();