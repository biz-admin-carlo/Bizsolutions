import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './CustomerService_SectionA.js';
import SectionB from './CustomerService_SectionB.js';
import SectionC from './CustomerService_SectionC.js';
import SectionD from './CustomerService_SectionD.js';
import SectionE from './CustomerService_SectionE.js';

import '../../assets/Biz/styles/WebDevelopment.css';

const Bookkeeping = () => {

    return (
        <>
            <SectionA />
            <SectionB />
            <SectionC />
            <SectionD />
            <SectionE />
            <AppFooter />
        </>
    );
};

export default Bookkeeping;