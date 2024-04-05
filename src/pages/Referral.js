import React from 'react';
import { Helmet } from 'react-helmet'; 
import ReferralPage from '../components/Referral_Landing.js';


export default function Referral() {

  return (
      <>
        <Helmet>
          <title>BizSolutions | Referral System</title>
        </Helmet>

        <ReferralPage />
      </>
  );
}
