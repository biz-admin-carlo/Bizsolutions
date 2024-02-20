import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';
import '../assets/styles/PageWebDevelopment.css';

const TechnicalPage = () => {

    const navigate = useNavigate();
    const [ loadVideo, setLoadVideo ] = useState(false);

    useEffect(() => {
        setLoadVideo(true);
    }, []);

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

                                    <p className='text-intro-landing'>Here in <span className='biz-color'>BizSolutions</span>, Empowering Your Success with Expert Technical and IT Support: At the Heart of Your Operations, We're Here to Ensure Your Technology Works as Hard as You Do. With round-the-clock availability, cutting-edge solutions, and a dedicated team of professionals, we're not just solving problems—we're preventing them, optimizing your systems for peak performance. Experience seamless operations with our proactive, personalized support designed to keep you ahead in a digital world.</p>

                                    <p className='text-intro-landing text-danger'>Upgrade your IT support systems for improved efficiency, enhanced performance, and greater peace of mind. Don't let outdated technology hold you back!</p>
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/shorts/XcoLWjWWh7g" target="_blank" rel="noopener noreferrer">
                                    <video width="960px" height="540px" className="img-fluid" muted autoPlay loop>
                                        <source src={require('../assets/video-are-you-ready-stock.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default TechnicalPage;