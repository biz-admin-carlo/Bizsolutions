import React, { useContext } from 'react';

import UserContext from '../UserContext';

import AppLanding from '../components/AppLanding.js';
import AppInformation from '../components/AppInformation.js'


export default function Home() {
  
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.isAdmin ? (
        {/*<AdminPanel data-aos="fade-up" />*/}
      ) : (
        <>
            <div><AppInformation /></div>
        </>
      )}
    </div>
  );
}
