import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './Bookkeeping_SectionA.js';
import SectionB from './Bookkeeping_SectionB.js';
import SectionC from './Bookkeeping_SectionC.js';
import SectionD from './Bookkeeping_SectionD.js';
import SectionE from './Bookkeeping_SectionE.js';

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