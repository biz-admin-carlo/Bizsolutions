import React from 'react';
import AppFooter from './Application_Footer';
import SectionA from './WebRevamp_SectionA.js';
import SectionB from './WebRevamp_SectionB.js';
import SectionC from './WebRevamp_SectionC.js';
import SectionD from './WebRevamp_SectionD.js';
import SectionE from './WebRevamp_SectionE.js';

import '../../assets/Biz/styles/WebDevelopment.css';

const WebRevampHome = () => {

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

export default WebRevampHome;