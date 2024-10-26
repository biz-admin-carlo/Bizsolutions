import ReactGA from 'react-ga';
import { APP_CONFIG } from './config.js';

export const initializeAnalytics = () => {
    ReactGA.initialize(APP_CONFIG.GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
};