import React, { useContext } from 'react';
import UserContext from '../UserContext';
import AppLanding from '../components/AppLanding.js';
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
        </>
      )}
    </div>
  );
}
