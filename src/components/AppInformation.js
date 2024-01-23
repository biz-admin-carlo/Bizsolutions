import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/AppInformation.css';

export default function Pricing() {
    const [ selected, setSelected ] = useState('annual');

    const handleSelect = (button) => {
      setSelected(button);
  };
    return (
        <>
        <div className='app-landing-page'>
        <Container>
            <div className="content-container">
                <div className="text-section">
                    <h1 className='pt-lg-4'>Biz is the Perfect Plan For You</h1>
                    <p className="pt-2">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                </div>
                <div className="button-section">
                    <div className="custom-btn custom-btn-light">
                        <button
                            className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                            onClick={() => handleSelect('annual')}
                        >
                            Annually<span className='lower-case ms-1'>Save up to 35%</span>
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
        </Container>
        </div>
        </>
    );
}
