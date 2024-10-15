import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../WebDevelopment/SectionA.js';
import SectionB from '../WebDevelopment/SectionB.js';
import SectionC from '../WebDevelopment/SectionC.js';
import SectionD from '../WebDevelopment/SectionD.js';
import SectionE from '../WebDevelopment/SectionE.js';

import '../../../../assets/styles/WebDevelopment.css';

const WebDevHome = () => {

    return (
        <>
            <SectionA />
            <SectionB />
            <SectionC />
            <SectionD />
            <SectionE />
            <Footer />
        </>
    );
};

export default WebDevHome;