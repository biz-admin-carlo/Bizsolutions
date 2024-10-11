import React from 'react';
import { Helmet } from 'react-helmet'; 
import PricingAppInformation from '../../../components/Biz/Pricing/Pricing.js'
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'


export default function Pricing() {

  return (
    <>  
      <Helmet><title>BizSolutions | Pricing</title></Helmet>
        <div data-aos="fade-up"><PricingAppInformation /></div>
      <Footer />
    </>
  );
}