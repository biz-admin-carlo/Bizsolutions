import React from 'react';
import Footer from '../../Shared/Footer/MainFooter.js';
import SectionA from '../CustomerService/SectionA.js';
import SectionB from '../CustomerService/SectionB.js';
import SectionC from '../CustomerService/SectionC.js';
import SectionD from '../CustomerService/SectionD.js';
import SectionE from '../CustomerService/SectionE.js';

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