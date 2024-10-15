import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import ProfessionalRevamp from '../WebRevamp/Professional.js';
import EnterpriseRevamp from '../WebRevamp/Enterprise.js';
import WebRevamp from '../WebRevamp/Main.js';

import '../../../../assets/styles/AppInformation.css';

const Pricing_SectionC = () => {
    const [ selected, setSelected ] = useState('annual');

    const handleSelect = (button) => {
        setSelected(button);
    };

    return (
        <>
            <Container>
                <hr/>

                <div className='pb-lg-3'>
                    <div className='text-center'>
                        <h2>Website Revamp</h2>
                        <h4>Bundle Package</h4>
                    </div>
                    <div className='container'>
                        <WebRevamp />
                    </div>
                </div>

                <hr/>

                <div className='text-center py-3'>
                    <h2>Website Revamp</h2>

                    <p>Choosing our website revamp service is your step towards transforming your online presence with precision and innovation. Our packages offer continuous, dedicated support, state-of-the-art design updates, and strengthened security measures. This commitment not only revitalizes your website's aesthetics and functionality but also boosts its performance and scalability, providing you with a dependable and compelling digital experience that engages and converts.</p>

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

                    <div className='col-sm-12 col-md-6 mb-3'>
                            <ProfessionalRevamp selected={selected} setSelected={setSelected} />
                        </div>

                        <div className='col-sm-12 col-md-6 mb-3'>
                            <EnterpriseRevamp selected={selected} setSelected={setSelected} />
                        </div>
                        
                    </div>
                </div>

            </Container>
        </>
    );
};

export default Pricing_SectionC;