import React, { useContext } from 'react';

import UserContext from '../UserContext';
import AppInformation from '../components/AppInformation.js'
import AppFooter from '../components/AppFooter';


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        {/*<AdminPanel data-aos="fade-up" />*/}
      ) : (
        <>
            <div><AppInformation /></div>
            <AppFooter />
        </>
      )}
    </div>
  );
}
