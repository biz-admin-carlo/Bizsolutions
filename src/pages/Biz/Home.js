import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.js';
import AppFooter from '../../components/Biz/Application_Footer';
import HomeLanding from '../../components/Biz/Home_Landing.js'
import HomeWebDevelopment from '../../components/Biz/Home_WebDevelopment.js';
import HomeWebRevamp from '../../components/Biz/Home_WebRevamp.js';
import HomeBookkeeping from '../../components/Biz//Home_Bookkeeping.js';
import HomeTechnical from '../../components/Biz/Home_Technical.js';
import HomeCustomerService from '../../components/Biz/Home_CustomerService.js';
import HomeSalesCollection from '../../components/Biz/Home_SalesCollection.js';
import HomeModal from '../../components/Biz/Home_Modal.js';
import HomeTestimony from '../../components/Biz/Home_Testimony.js';
import HomeNumbers from '../../components/Biz/Home_Numbers.js';
import NewHomeCustomerService from '../../components/Biz/Home_New_CustomerService.js';
import NewHomeSalesCollection from '../../components/Biz/Home_New_HomeSalesCollection.js';
import NewHomeLanding from '../../components/Biz/Home_New_HomeLanding.js';

export default function Home() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      {user.isAdmin ? (
        navigate(`/admin-dashboard/${user._id}/`)
      ) : (
        <>
          {!isSmallScreen && <div data-aos="fade-up"><HomeModal /></div>}
            <div data-aos="fade-up"><NewHomeLanding /></div>
            <div data-aos="fade-up"><NewHomeSalesCollection /></div>
            <div data-aos="fade-up"><HomeTestimony /></div>
            <div data-aos="fade-up"><NewHomeCustomerService /></div>
            <div data-aos="fade-up"><HomeLanding /></div>
            <div data-aos="fade-up"><HomeWebDevelopment /></div>
            <div data-aos="fade-up"><HomeWebRevamp /></div>
            <div data-aos="fade-up"><HomeTechnical /></div>
            <div data-aos="fade-up"><HomeBookkeeping /></div>
            <div data-aos="fade-up"><HomeSalesCollection /></div>
            <div data-aos="fade-up"><HomeCustomerService /></div>
            <div data-aos="fade-up"><HomeNumbers /></div>
          <AppFooter />
        </>
      )}
    </div>

  );
}
