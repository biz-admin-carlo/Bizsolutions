import React from 'react';
import { Helmet } from 'react-helmet'; 
import BizResult from '../../../components/Biz/Search/BizResult.js';

export default function Biz() {
  
  return (
    <div>
        <Helmet>
            <title>BizSolutions | Biz Details</title>
        </Helmet>

        <>
            <div data-aos="fade-up"><BizResult /></div>
        </>

    </div>

  );
}
