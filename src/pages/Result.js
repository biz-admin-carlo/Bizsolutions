import React, { useContext } from 'react';
import UserContext from '../UserContext.js';
import Result_Success from '../components/Result_Success.js'; // Import if separate components
import Result_Failed from '../components/Result_Failed.js';  // Import if separate components

export default function Result() {
  const { user } = useContext(UserContext);


  return (
    <>
        {/* <div data-aos="fade-up"><Result_Success /></div> */}
        <div data-aos="fade-up"><Result_Failed /></div>
    </>


  );
}
