import React, { useContext } from 'react';

import UserContext from '../UserContext';

import AppLanding from '../components/AppLanding.js';
import AppInfo1 from '../components/AppInfo1';
import AppInformation from '../components/AppInformation.js'
import AppFooter from '../components/AppFooter';


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        <div>Admin Panel Placeholder</div>
      ) : (
        <>
          <div data-aos="fade-up"><AppLanding /></div>
          <AppFooter />
          {/* <div data-aos="fade-up"><AppInfo1 /></div> */}
          {/* <div><AppInformation /></div> */}
        </>
      )}
    </div>
  );
}
