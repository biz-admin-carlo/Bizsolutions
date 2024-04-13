import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext.js';
import AppFooter from '../components/Application_Footer.js';
import HomeLanding from '../components/Home_Landing.js'
import HomeWebDevelopment from '../components/Home_WebDevelopment.js';
import HomeBookkeeping from '../components/Home_Bookkeeping.js';
import HomeTechnical from '../components/Home_Technical.js';
import HomeCustomerService from '../components/Home_CustomerService.js';
import HomeSalesCollection from '../components/Home_SalesCollection.js';
import HomeModal from '../components/Home_Modal.js';
import HomeTestimony from '../components/Home_Testimony.js';
import HomeNumbers from '../components/Home_Numbers.js';

export default function Home() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
          {!isSmallScreen && <div data-aos="fade-up"><HomeModal /></div>}
          <div data-aos="fade-up"><HomeLanding /></div>
          <div data-aos="fade-up"><HomeTestimony /></div>
          <div data-aos="fade-up"><HomeNumbers /></div>
          <div data-aos="fade-up"><HomeWebDevelopment /></div>
          <div data-aos="fade-up"><HomeBookkeeping /></div>
          <div data-aos="fade-up"><HomeTechnical /></div>
          <div data-aos="fade-up"><HomeCustomerService /></div>
          <div data-aos="fade-up"><HomeSalesCollection /></div>
          <AppFooter />
        </>
      )}
    </div>

  );
}
