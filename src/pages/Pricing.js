import React, { useContext } from 'react';
import { Helmet } from 'react-helmet'; 
import PricingAppInformation from '../components/Pricing_AppInformation.js'
import AppFooter from '../components/Application_Footer.js';


export default function Home() {

  return (
    <>  
      <Helmet><title>BizSolutions | Pricing</title></Helmet>
        <div data-aos="fade-up"><PricingAppInformation /></div>
      <AppFooter />
    </>
  );
}