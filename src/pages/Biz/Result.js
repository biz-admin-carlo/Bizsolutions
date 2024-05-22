import React, { useContext } from 'react';
import UserContext from '../../UserContext.js';
import Result_Failed from '../../components/Biz/Result_Failed.js';

export default function Result() {
  const { user } = useContext(UserContext);


  return (
    <>
        <div data-aos="fade-up"><Result_Failed /></div>
    </>


  );
}
