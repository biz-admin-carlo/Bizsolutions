import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../Bookkeeping/SectionA.js';
import SectionB from '../Bookkeeping/SectionB.js';
import SectionC from '../Bookkeeping/SectionC.js';
import SectionD from '../Bookkeeping/SectionD.js';
import SectionE from '../Bookkeeping/SectionE.js';

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