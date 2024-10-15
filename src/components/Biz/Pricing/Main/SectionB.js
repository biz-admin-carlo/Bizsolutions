import React from 'react';
import { Container } from 'react-bootstrap';
import TrialPackage from '../Trial/Main.js';
import WebDevPackage from '../WebDevelopment/Main.js';

export default function Pricing_SectionB() {

    return (
        <>
            <Container >
                <div className='pb-lg-3'>
                    <div className='text-center'>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Free Trial Package</h4>
                    </div>
                    <div className='container'>
                        <TrialPackage />
                    </div>
                </div>

                <div className='pb-lg-3'>
                    <div className='text-center'>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Bundle Package</h4>
                    </div>
                    <div className='container'>
                        <WebDevPackage />
                    </div>
                </div>
            </Container>
        </>

    );
};