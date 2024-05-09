import React from 'react';
import '../assets/styles/AppInformation.css';

import SectionA from './Pricing_SectionA.js';
import SectionB from './Pricing_SectionB.js';
import SectionC from './Pricing_SectionC.js';
import SectionD from './Pricing_SectionD.js';
import SectionE from './Pricing_SectionE.js';

export default function Pricing() {

    return (
        <>
            <div className='app-landing-page-pricing'>
                <div className='pt-lg-5'>
                    <div data-aos="fade-down"><SectionA /></div>
                    <div data-aos="fade-down"><SectionB /></div>
                    <div data-aos="fade-down"><SectionC /></div>
                    <div data-aos="fade-down"><SectionD /></div>
                    <div data-aos="fade-down"><SectionE /></div>
                </div>
            </div>
        </>
    );
}
