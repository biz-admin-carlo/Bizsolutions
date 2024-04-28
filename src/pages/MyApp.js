import React, { useContext } from 'react';
import UserContext from '../UserContext.js';
import MyApp_Landing from '../components/MyApp_Landing.js';

export default function MyApps() {

  return (
    <>
        <div data-aos="fade-up"><MyApp_Landing /></div>
    </>

  );
}
