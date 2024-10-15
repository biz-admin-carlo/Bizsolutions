import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import BundleSimple from '../Payroll/Simple.js';
import BundlePlus from '../Payroll/Plus.js';
import BundlePremium from '../Payroll/Premium.js';

import '../../../../assets/styles/Pricing_Payroll.css';

const Pricing_Payroll = () => {
    const [selected, setSelected] = useState('monthly'); // Default selection

    const handleSelect = (plan) => {
        setSelected(plan);
    };

    return (
        <>
            <div className='text-center py-3 '>
                <hr/>
                <Container>
                    <h2>Human Resources Payroll</h2>
                    <h4>Bundle Package</h4>

                    <p className='text-paragraph-payroll'>In the dynamic world of business, the ability to efficiently hire, pay, and manage a team is not just a luxury, but a necessity. The advent of integrated business management platforms has been a game-changer, allowing entrepreneurs and managers to put the joy back into running their businesses.</p>
                </Container>

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
                <div className='row card-container'>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundleSimple selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundlePlus selected={selected} setSelected={setSelected} />
                    </div>

                    <div className='col-sm-12 col-md-4 mb-3'>
                        <BundlePremium />
                    </div>

                </div>
            </div>
        </>            
    );
};

export default Pricing_Payroll;
