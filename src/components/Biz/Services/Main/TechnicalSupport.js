import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../Technical/SectionA.js';
import SectionB from '../Technical/SectionB.js';
import SectionC from '../Technical/SectionC.js';
import SectionD from '../Technical/SectionD.js';
import SectionE from '../Technical/SectionE.js';

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