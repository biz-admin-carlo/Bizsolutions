import { useState, useEffect, Suspense } from 'react';
import { UserProvider } from './UserContext';
import { Helmet } from 'react-helmet'; 
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Biz/Home';
import Login from './pages/Biz/Login';
import SignUp from './pages/Biz/Signup';
import Referral from './pages/Biz/Referral';
import Search from './pages/Biz/Search_Result';
import SearchHome from './pages/Biz/Search_Home';
import Account from './pages/Biz/Account';
import Pricing from './pages/Biz/Pricing';
import Terms from './pages/Biz/Terms';
import Privacy from './pages/Biz/Privacy';
import ContactUs from './pages/Biz/ContactUs';
import AboutUs from './pages/Biz/AboutUs';
import Career from './pages/Biz/Career';
import Reset from './pages/Biz/Reset';
import Biz from './pages/Biz/Bizness';
import AdminDashboard from './pages/Biz/Admin';
import AdminLogin from './pages/Biz/LoginAdmin';
import AdminAddBiz from './pages/Biz/AdminAddBiz';
import AdminSeeBiz from './pages/Biz/AdminSeeBiz';
import AdminUsers from './pages/Biz/AdminUsers';
import Result from './pages/Biz/Result';

import AppNavbar from './components/Biz/Application_Navbar';
import ScrollToTop from './components/Biz/Reusable_ScrollToTop';
import SignUpReferralTokend from './components/Biz/SignupReferralToken';
import PageWebDevelopment from './components/Biz/Page_WebDevelopment';
import PageWebRevamp from './components/Biz/Page_WebRevamp';
import PageBookkeeping from './components/Biz/Page_Bookkeeping';
import PageTechnicalSupport from './components/Biz/Page_TechnicalSupport';
import PageCustomerService from './components/Biz/Page_CustomerService';
import PageSalesCollections from './components/Biz/Page_SalesCollections';
import Cookies from './components/Biz/Application_Cookies';

function App() {
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null,
    details: {}
  });
  const [ cookiesConsent, setCookiesConsent ] = useState(localStorage.getItem('cookiesConsent'));

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookiesConsent');
    setCookiesConsent(consent);
  }, []);

  const handleCookieConsent = () => {
    localStorage.setItem('cookiesConsent', 'true');
    setCookiesConsent(true);
  };

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Helmet>
            <title>BizSolutions | Home</title>
          </Helmet>
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
                    <Route path="/sign-up-with-referral" element={<SignUpReferralTokend/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/search-biz" element={<SearchHome/>}/>

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
                    <Route path="/forgot-password" element={<Reset/>}/>

                    <Route path="/search?category=Hotel&location=California"/>

                    {/* Super Admin Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/users" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<AdminAddBiz/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>

                    {/* Vendor Manager Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/add-agents" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard/:userId/see-agents" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<AdminAddBiz/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>

                    {/* Vendor Agent Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<AdminAddBiz/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>

                </Routes>
              </Suspense>
            <Container />
        </Router>
      </UserProvider>
      {!cookiesConsent && <Cookies onConsent={handleCookieConsent} />}
      <SpeedInsights />
    </>
  );
}

export default App;