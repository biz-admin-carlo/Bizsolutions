import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../WebRevamp/SectionA.js';
import SectionB from '../WebRevamp/SectionB.js';
import SectionC from '../WebRevamp/SectionC.js';
import SectionD from '../WebRevamp/SectionD.js';
import SectionE from '../WebRevamp/SectionE.js';

import '../../../../assets/styles/WebDevelopment.css';

const WebRevampHome = () => {

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

export default WebRevampHome;