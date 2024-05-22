import React from 'react';
import { Helmet } from 'react-helmet'; 
import PricingAppInformation from '../../components/Biz/Pricing_AppInformation.js'
import AppFooter from '../../components/Biz/Application_Footer.js';


export default function Pricing() {

  return (
    <>  
      <Helmet><title>BizSolutions | Pricing</title></Helmet>
        <div data-aos="fade-up"><PricingAppInformation /></div>
      <AppFooter />
    </>
  );
}