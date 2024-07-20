import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext.js';
import AppFooter from '../../components/Biz/Application_Footer';
import MainLanding from '../../components/Biz/Home_Landing.js'
import WebDevelopmentServices from '../../components/Biz/Home_WebDevelopment.js';
import NEWWebDevelopmentServices from '../../components/Biz/Home_NewWebDevelopment.js';
import WebRevampServices from '../../components/Biz/Home_WebRevamp.js';
import BookkeepingServices from '../../components/Biz//Home_Bookkeeping.js';
import TechnicalServices from '../../components/Biz/Home_Technical.js';
import CustomerServiceContacts from '../../components/Biz/Home_CustomerService.js';
import SalesHighlights from '../../components/Biz/Home_SalesCollection.js';
import HomeModal from '../../components/Biz/Home_Modal.js';
import CustomerTestimonials from '../../components/Biz/Home_Testimony.js';
import KeyFigures from '../../components/Biz/Home_Numbers.js';
import CustomerSupport from '../../components/Biz/Home_New_CustomerService.js';
import PropertiesForSale from '../../components/Biz/Home_New_HomeSalesCollection.js';
import FeaturedProperties from '../../components/Biz/Home_New_HomeLanding.js';

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
            <div data-aos="fade-up"><FeaturedProperties /></div>
            <div data-aos="fade-up"><PropertiesForSale /></div>
            <div data-aos="fade-up"><CustomerTestimonials /></div>
            <div data-aos="fade-up"><CustomerSupport /></div>
            <div data-aos="fade-up"><NEWWebDevelopmentServices /></div>
            <div data-aos="fade-up"><MainLanding /></div>
            {/* <div data-aos="fade-up"><WebDevelopmentServices /></div> */}
            <div data-aos="fade-up"><WebRevampServices /></div>
            {/* <div data-aos="fade-up"><TechnicalServices /></div> */}
            <div data-aos="fade-up"><BookkeepingServices /></div>
            <div data-aos="fade-up"><SalesHighlights /></div>
            {/* <div data-aos="fade-up"><CustomerServiceContacts /></div> */}
            <div data-aos="fade-up"><KeyFigures /></div>
          <AppFooter />
        </>
      )}
    </div>

  );
}
