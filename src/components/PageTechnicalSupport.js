import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import tiktok from '../assets/tiktok.mp4'
import AppFooter from './AppFooter';

import '../assets/styles/PageWebDevelopment.css';

const TechnicalPage = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <>
            <Helmet>
                <title>BizSolutions | Technical & IT Support</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Technical &<span className='text-dark'> IT Support</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-4'>

                                    <h5 className='pb-3 text-dark' style={{ fontStyle: 'italic' }}>
                                    Is my current IT infrastructure agile enough to adapt to rapidly changing technology landscapes?</h5>

                                    <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we specialize in creating sophisticated, user-friendly websites for Technical & IT Support sectors. Our primary goal is to expand your online presence, engage your customers, and deliver real-world results. </p>

                                    <p className='text-intro-landing'>Here in <span className='biz-color'>BizSolutions</span>, we create user-friendly, mobile-optimized websites that rank well in search engines. Our focus is on secure, robust, and scalable web solutions tailored for the tech support industry, streamlining processes and enhancing customer engagement for a dynamic web presence.</p>

                                    <p className='text-intro-landing text-danger'>Upgrade your IT support systems for improved efficiency, enhanced performance, and greater peace of mind. Don't let outdated technology hold you back!</p>
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            <video width="1920px" height="1080px" className="img-fluid" muted src={tiktok} autoPlay loop></video>
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default TechnicalPage;