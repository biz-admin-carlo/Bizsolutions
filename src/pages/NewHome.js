import React, { useContext } from 'react';
import UserContext from '../UserContext';
import AppFooter from '../components/AppFooter';
import LandingSecondary from '../components/LandingSecondary.js'
import WebDevHome from '../components/WebDevHome.js';
import BookkeepingHome from '../components/BookkeepingHome.js';
import TechnicalHome from '../components/TechnicalHome.js';


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        <div>Admin Panel Placeholder</div>
      ) : (
        <>
          <div data-aos="fade-up"><LandingSecondary /></div>
          <div data-aos="fade-up"><WebDevHome /></div>
          <div data-aos="fade-up"><BookkeepingHome /></div>
          <div data-aos="fade-up"><TechnicalHome /></div>
          <AppFooter />
        </>
      )}
    </div>
  );
}
