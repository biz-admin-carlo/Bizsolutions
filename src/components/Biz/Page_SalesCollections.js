import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './Sales_SectionA.js';
import SectionB from './Sales_SectionB.js';
import SectionC from './Sales_SectionC.js';
import SectionD from './Sales_SectionD.js';
import SectionE from './Sales_SectionE.js';

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