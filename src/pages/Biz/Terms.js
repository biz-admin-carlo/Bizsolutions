import React from 'react';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../../components/Biz/Application_Footer.js';
import TermsInformation from '../../components/Biz/Terms_Information';

import '../../assets/Biz/styles/Terms.css';

export default function Terms() {

  return (
    <>
      <Helmet>
        <title>BizSolutions | Terms of Service</title>
      </Helmet>
      
        <div data-aos="fade-up"><TermsInformation /></div>
      
      <AppFooter />
    </>
  );
}
