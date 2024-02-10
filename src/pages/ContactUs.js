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
                <Container className="services-container mb-3 d-none d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h1 className='py-3'>Contact<span className='text-dark'> Us</span></h1>
                                                                
                                <h6><span className='biz-color'>supportus@mybizsolutions.us</span></h6>
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
