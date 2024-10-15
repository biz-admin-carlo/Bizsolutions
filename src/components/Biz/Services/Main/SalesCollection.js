import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../Sales/SectionA.js';
import SectionB from '../Sales/SectionB.js';
import SectionC from '../Sales/SectionC.js';
import SectionD from '../Sales/SectionD.js';
import SectionE from '../Sales/SectionE.js';

import '../../../../assets/styles/WebDevelopment.css';

const Bookkeeping = () => {

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

export default Bookkeeping;