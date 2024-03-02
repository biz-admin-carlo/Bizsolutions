import React, { useContext } from 'react';
import UserContext from '../UserContext.js';
import AppFooter from '../components/Application_Footer.js';
import HomeLanding from '../components/Home_Landing.js'
import HomeWebDevelopment from '../components/Home_WebDevelopment.js';
import HomeBookkeeping from '../components/Home_Bookkeeping.js';
import HomeTechnical from '../components/Home_Technical.js';
import HomeCustomerService from '../components/Home_CustomerService.js';
import HomeSalesCollection from '../components/Home_SalesCollection.js';


export default function Home() {
  
  const { user } = useContext(UserContext);
  
  return (
    <div>
      {user.isAdmin ? (
        <div>Admin Panel Placeholder</div>
      ) : (
        <>
          <div data-aos="fade-up"><HomeLanding /></div>
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
