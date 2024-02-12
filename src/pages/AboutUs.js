import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../components/AppFooter';

import '../assets/styles/PageWebDevelopment.css';

const AboutUs = () => {

    return (
        <>
            <Helmet>
                <title>BizSolutions | About Us</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h1 className='py-3'>About<span className='text-dark'> Us</span></h1>
                                
                                <h6 className='text-services'>20289 Stevens Creek BLVD #1039 Cupertino CA 95014</h6>
                                
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

export default AboutUs;
