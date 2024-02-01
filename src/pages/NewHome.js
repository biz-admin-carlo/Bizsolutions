import React, { useContext } from 'react';
import UserContext from '../UserContext';
import AppFooter from '../components/AppFooter';
import LandingSecondary from '../components/LandingSecondary.js'


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        <div>Admin Panel Placeholder</div>
      ) : (
        <>
          <div data-aos="fade-up"><LandingSecondary /></div>
          <AppFooter />
        </>
      )}
    </div>
  );
}
