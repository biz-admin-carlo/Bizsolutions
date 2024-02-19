import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './AppFooter';
import '../assets/styles/PageWebDevelopment.css';

const CustomerService = () => {

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
                <title>BizSolutions | Customer Service Support</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Customer <span className='text-dark'>Service</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-5'>

                                    <h5 className='pb-3 text-dark' style={{ fontStyle: 'italic' }}>
                                    Is my current customer service approach meeting today's digital demands?
                                    </h5>

                                    <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we're dedicated to crafting cutting-edge, user-friendly websites, particularly designed for Customer Service sectors. Our expertise lies in creating digital platforms that not only meet but exceed customer service expectations.</p>

                                    <p className='text-intro-landing'>Our mission at <span className='biz-color'>BizSolutions</span> is to elevate your brand's online presence, engage your customers effectively, and deliver quantifiable results. Our team is adept at utilizing the latest technologies and adhering to the newest design trends, ensuring we build online experiences that are easily navigable and fully optimized for mobile devices, enhancing visibility in the digital realm.</p>

                                    <p className='text-intro-landing text-danger'>Revitalize your growth with updated customer service strategies. Even minor improvements can greatly boost efficiency, enhance customer satisfaction, and ensure your customers are excellently served.</p>
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

export default CustomerService;