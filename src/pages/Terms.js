import React from 'react';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../components/AppFooter';
import '../assets/styles/Terms.css';

import TermsInformation from '../components/Terms_Information';

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
