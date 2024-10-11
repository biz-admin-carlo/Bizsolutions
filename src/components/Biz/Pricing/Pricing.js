import React from 'react';

import SectionA from './Main/SectionA.js';
import SectionB from './Main/SectionB.js';
import SectionC from './Main/SectionC.js';
import SectionD from './Main/SectionD.js';
import SectionE from './Main/SectionE.js';

import '../../../assets/styles/AppInformation.css';

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
