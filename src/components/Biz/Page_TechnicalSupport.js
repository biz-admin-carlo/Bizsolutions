import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './TechnicalSupport_SectionA.js';
import SectionB from './TechnicalSupport_SectionB.js';
import SectionC from './TechnicalSupport_SectionC.js';
import SectionD from './TechnicalSupport_SectionD.js';
import SectionE from './TechnicalSupport_SectionE.js';

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