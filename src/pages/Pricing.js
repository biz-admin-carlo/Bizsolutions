import React, { useContext } from 'react';
import { Helmet } from 'react-helmet'; 
import UserContext from '../UserContext';
import PricingAppInformation from '../components/Pricing_AppInformation.js'
import AppFooter from '../components/AppFooter';


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        {/*<AdminPanel data-aos="fade-up" />*/}
      ) : (
        <>  
          <Helmet><title>BizSolutions | Pricing</title></Helmet>
            <div data-aos="fade-up"><PricingAppInformation /></div>
          <AppFooter />
        </>
      )}
    </div>
  );
}
