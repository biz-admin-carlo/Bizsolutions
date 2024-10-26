import { useState, useEffect, Suspense } from 'react';
import { UserProvider } from './utils/Contexts/userContext.js';
import { Helmet } from 'react-helmet'; 
import { ChakraProvider } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Biz/Shared/Home.js';
import Pricing from './pages/Biz/Shared/Pricing.js';
import Terms from './pages/Biz/Shared/Terms.js';
import Privacy from './pages/Biz/Shared/Privacy.js';
import ContactUs from './pages/Biz/Shared/Contact.js';
import AboutUs from './pages/Biz/Shared/About.js';
import Career from './pages/Biz/Shared/Careers.js';
import CreateBizness from './pages/Biz/Shared/CreateBizness.js';
import SearchHome from './pages/Biz/Shared/Search_Home.js';
import Result from './pages/Biz/Shared/Result.js';
import Search from './pages/Biz/Shared/Search_Result.js';
import Login from './pages/Biz/Shared/Login.js';
import SignUp from './pages/Biz/Shared/Signup.js';
import Reset from './pages/Biz/Shared/Reset.js';
import BizDetails from './pages/Biz/Shared/Biz.js';

import AdminDashboard from './pages/Biz/Admin/Admin.js';
import AdminSeeBiz from './pages/Biz/Admin/AdminSeeBiz.js';
import AdminUsers from './pages/Biz/Admin/AdminUsers.js';
import AdminSeeAgents from './pages/Biz/Admin/AdminSeeAgents.js';
import AdminMonthlyPayLink from './pages/Biz/Admin/AdminMonthly.js';

import Referral from './pages/Biz/User/Referral.js';
import Account from './pages/Biz/User/Account.js';
import Biz from './pages/Biz/User/Bizness.js';

import AppNavbar from './components/Biz/Shared/Navbar/MainNavbar.js';
import ScrollToTop from './components/Biz/Shared/ScrollToTop.js';
import Cookies from './components/Biz/Shared/Cookies.js';

import SignupReferralToken from './components/Biz/SignUp/SignupReferralToken.js';
import PageWebDevelopment from './components/Biz/Solutions/Main/WebDevelopment.js';
import PageWebRevamp from './components/Biz/Solutions/Main/WebRevamp.js';
import PageBookkeeping from './components/Biz/Services/Main/Bookkeeping.js';
import PageTechnicalSupport from './components/Biz/Services/Main/TechnicalSupport.js';
import PageCustomerService from './components/Biz/Services/Main/CustomerService.js';
import PageSalesCollections from './components/Biz/Services/Main/SalesCollection.js';

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
      <ChakraProvider>
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
                    <Route path="/sign-up-with-referral" element={<SignupReferralToken/>}/>
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
                    <Route path="/biz/:bizID/details" element={<BizDetails/>}/>


                    {/* Super Admin Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/users" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<CreateBizness/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>

                    {/* Vendor Manager Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/add-agents" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard/:userId/see-agents" element={<AdminSeeAgents/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<CreateBizness/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>

                    {/* Vendor Agent Links Only */}
                    <Route path="/admin-dashboard/:userId/" element={<AdminDashboard/>}/>
                    <Route path="/admin-dashboard/:userId/add-biz" element={<CreateBizness/>}/>
                    <Route path="/admin-dashboard/:userId/see-biz" element={<AdminSeeBiz/>}/>
                    <Route path="/admin-dashboard/:userId/payment-link/" element={<AdminMonthlyPayLink/>}/>

                </Routes>
              </Suspense>
            <Container />
        </Router>
      </UserProvider>
      </ChakraProvider>
      {/* {!cookiesConsent && <Cookies onConsent={handleCookieConsent} />} */}
      <SpeedInsights />
    </>
  );
}

export default App;