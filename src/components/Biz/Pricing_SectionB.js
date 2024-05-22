import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Typings from './Pricing_TypingsEffect.js'
import FreeTrial from './Pricing_FreeTrial.js';
import Trial15 from './Pricing_Trial15.js';
import BundleStarter from './Pricing_WebDevBundleStarter.js';
import BundleAdvanced from './Pricing_WebDevBundleAdvanced.js';
import BundleExpert from './Pricing_WebDevBundleExpert.js';

const Pricing_SectionB = () => {
    const [ loadVideo, setLoadVideo ] = useState(false);
    const [ selected, setSelected ] = useState('annual');

    const handleSelect = (button) => {
        setSelected(button);
    };


    useEffect(() => {
        setLoadVideo(true);
    }, []);

    return (
        <Container >
            <div className='text-center pb-lg-3'>
                <h2>Business Listing & Website Development</h2>
                <h4>Free Trial Package</h4>
            </div>

            <div className='container'>
                <div className='row justify-content-around'>

                    <div className='col-sm-12 col-md-6 mb-3'>
                        <FreeTrial selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='col-sm-12 col-md-6 mb-3'>
                        <Trial15 selected={selected} setSelected={setSelected} />
                    </div>
                </div>
            </div>

            <hr />
            
            <div className='text-center py-3 '>
                <h2>Business Listing & Website Development</h2>
                <h4>Bundle Package</h4>

                <p>Embracing paid monthly packages is an invitation to elevate your projects with unwavering support, advanced features, and robust security. These investments empower your production-grade applications, ensuring they thrive with professional reliability, scalability, and peace of mind.</p>

                <div className="button-section">
                    <div className="custom-btn custom-btn-light d-flex align-items-center">
                        <button
                            className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                            onClick={() => handleSelect('annual')}
                        >
                            Annually<span className='lower-case ms-1'>Save up to 10%</span>
                        </button>
                        <button
                            className={`custom-btn ${selected === 'monthly' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                            onClick={() => handleSelect('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row justify-content-around'>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleStarter selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleAdvanced selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleExpert />
                    </div>

                </div>
            </div>

        </Container>
    );
};

export default Pricing_SectionB;