import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './WebDevelopment_SectionA.js';
import SectionB from './WebDevelopment_SectionB.js';
import SectionC from './WebDevelopment_SectionC.js';
import SectionD from './WebDevelopment_SectionD.js';
import SectionE from './WebDevelopment_SectionE.js';

import '../../assets/Biz/styles/WebDevelopment.css';

const WebDevHome = () => {

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

export default WebDevHome;