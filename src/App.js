import { useState, Suspense } from 'react';
import { UserProvider } from './UserContext';
import { Helmet } from 'react-helmet'; 
import AppNavbar from './components/AppNavbar';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/NewHome';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Search from './pages/Search';
import Account from './pages/Account';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import LoginPricing from './components/LoginPricing';
import ScrollToTop from './components/ScrollToTop';

import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Career from './pages/Career'

import PageWebDevelopment from './components/PageWebDevelopment';
import PageBookkeeping from './components/PageBookkeeping';
import PageTechnicalSupport from './components/PageTechnicalSupport';
import PageCustomerService from './components/PageCustomerService';
import PageSalesCollections from './components/PageSalesCollections';

function App() {
  
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null,
    details: {}
  });

  const unsetUser = () => {
    sessionStorage.clear();
  };

  return (
    <>
      <Helmet>
        <title>BizSolutions | Home</title>
      </Helmet>

      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
        <ScrollToTop />
          <AppNavbar />
          <Container />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/login/pricing" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/search" element={<Search/>}/>
                    
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/pricing" element={<Pricing/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/privacy" element={<Privacy/>}/>

                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/careers" element={<Career/>}/>

                    <Route path="/website-development" element={<PageWebDevelopment/>}/>
                    <Route path="/bookkeeping" element={<PageBookkeeping/>}/>
                    <Route path="/technical-support" element={<PageTechnicalSupport/>}/>
                    <Route path="/customer-service" element={<PageCustomerService/>}/>
                    <Route path="/sales-collection" element={<PageSalesCollections/>}/>

                </Routes>
              </Suspense>
            <Container />
        </Router>
      </UserProvider>
      <SpeedInsights />
    </>
  );
}

export default App;