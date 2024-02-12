import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../components/AppFooter';

import '../assets/styles/PageWebDevelopment.css';

const ContactUs = () => {

    return (
        <>
            <Helmet>
                <title>BizSolutions | Contact Us</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h1 className='py-3'>Contact<span className='text-dark'> Us</span></h1>
                                                                
                                <h6>
                                    <a href="mailto:supportus@mybizsolutions.us?subject=Contact%20Support&body=Hi%20there,%20I%20need%20help%20with...">
                                        <span className='biz-color email-text'>supportus@mybizsolutions.us</span>
                                    </a>
                                </h6>
                                
                                <hr />

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default ContactUs;
