import { useState, Suspense } from 'react';
import { UserProvider } from './UserContext';
import { Helmet } from 'react-helmet'; 
import AppNavbar from './components/Application_Navbar';
import SpecialNavbar from './components/Application_Navbar';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';

import SignUpReferralTokend from './components/SignupReferralToken';
import Referral from './pages/Referral';

import Search from './pages/Search';
import Account from './pages/Account';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ScrollToTop from './components/Reusable_ScrollToTop';

import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Career from './pages/Career';
import Business from './pages/Business';
import Reset from './pages/Reset';
import Biz from './pages/Biz';
import ServiceNow from './pages/ServiceNow';

import AdminDashboard from './pages/Admin';
import AdminLogin from './pages/LoginAdmin';
import AdminUsers from './pages/AdminUsers'

import PageWebDevelopment from './components/Page_WebDevelopment';
import PageWebRevamp from './components/Page_WebRevamp';
import PageBookkeeping from './components/Page_Bookkeeping';
import PageTechnicalSupport from './components/Page_TechnicalSupport';
import PageCustomerService from './components/Page_CustomerService';
import PageSalesCollections from './components/Page_SalesCollections';

import Result from './pages/Result';

function NavbarWrapper() {
  const location = useLocation();

  if (location.pathname === '/my-forms') {
      return <SpecialNavbar />;
  }
  return <AppNavbar />;
}


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
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Helmet>
            <title>BizSolutions | Home</title>
          </Helmet>
        <ScrollToTop />
          <NavbarWrapper />
          <Container />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/login/pricing" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-up-with-referral" element={<SignUpReferralTokend/>}/>
                    <Route path="/search" element={<Search/>}/>

                    <Route path="/my-biz" element={<Biz/>}/>\
                    
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/pricing" element={<Pricing/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/privacy" element={<Privacy/>}/>

                    <Route path="/biz-referral-system" element={<Referral/>}/>

                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/careers" element={<Career/>}/>

                    <Route path="/contact-us-page" element={<ContactUs/>}/>
                    <Route path="/about-us-page" element={<AboutUs/>}/>
                    <Route path="/careers-page" element={<Career/>}/>

                    <Route path="/website-development" element={<PageWebDevelopment/>}/>
                    <Route path="/bookkeeping" element={<PageBookkeeping/>}/>
                    <Route path="/technical-support" element={<PageTechnicalSupport/>}/>
                    <Route path="/customer-service" element={<PageCustomerService/>}/>
                    <Route path="/sales-collection" element={<PageSalesCollections/>}/>

                    <Route path="/website-development-solutions" element={<PageWebDevelopment/>}/>
                    <Route path="/website-revamp-solutions" element={<PageWebRevamp/>}/>
                    <Route path="/seo-solutions" element={<PageWebDevelopment/>}/>

                    <Route path="/bookkeeping-services" element={<PageBookkeeping/>}/>
                    <Route path="/technical-support-services" element={<PageTechnicalSupport/>}/>
                    <Route path="/customer-support-services" element={<PageCustomerService/>}/>
                    <Route path="/sales-collection-services" element={<PageSalesCollections/>}/>

                    <Route path="/website-development-service" element={<PageWebDevelopment/>}/>
                    <Route path="/bookkeeping-service" element={<PageBookkeeping/>}/>
                    <Route path="/technical-support-service" element={<PageTechnicalSupport/>}/>
                    <Route path="/customer-support-service" element={<PageCustomerService/>}/>
                    <Route path="/sales-collection-service" element={<PageSalesCollections/>}/>

                    <Route path="/result" element={<Result/>}/>
                    <Route path="/add-biz" element={<Business/>}/>

                    <Route path="/forgot-password" element={<Reset/>}/>

                    <Route path="/admin-login" element={<AdminLogin/>}/>
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/users" element={<AdminUsers/>}/>

                    {/* New Development */}
                    <Route path="/service" element={<ServiceNow/>}/>

                    {/* My Forms Project */}
                    {/* <Route path="/my-forms" element={<FormsHome />}/> */}

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