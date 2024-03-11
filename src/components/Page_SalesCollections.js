import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';
import '../assets/styles/PageWebDevelopment.css';

const SalesCollection = () => {

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
                <title>BizSolutions | Sales & Collections</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container d-flex flex-column flex-lg-row">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Sales &<span className='text-dark'> Collection</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-4'>

                                    <h3 className='pb-3 text-dark'>
                                        Sales & Collections Services
                                    </h3>

                                    <p className='text-intro-landing'>In an era where customer expectations are continually evolving, providing exceptional customer service is more critical than ever. <span className='biz-color'>BizSolutions</span> is at the forefront of transforming customer service operations, leveraging cutting-edge technology and personalized strategies to deliver unparalleled customer support. Discover how partnering with <span className='biz-color'>BizSolutions</span> can elevate your customer service to meet the demands of today's digital world.</p>

                                    <h4 className='pb-3 text-dark'>
                                    Innovative Customer Service Solutions by BizSolutions
                                    </h4>

                                    <ul>
                                        <li><p className='text-intro-landing'><span className='biz-color'>AI-Driven Support Systems</span>: With artificial intelligence and machine learning, BizSolutions offers chatbots and predictive customer service to ensure immediate, proactive support. Our technology is designed to enhance customer interaction, offering 24/7 assistance and anticipating customer needs before they even arise.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Personalized Customer Experience</span>: At BizSolutions, we believe in the power of personalization. Our customized support solutions and targeted communication strategies ensure every customer interaction is relevant, meaningful, and effective. We harness customer data to tailor our support, making every customer feel valued and understood.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Omnichannel Customer Engagement</span>: Our commitment to omnichannel support ensures that customers can reach out on their preferred platform and receive consistent, seamless service. By integrating customer interactions across channels, BizSolutions provides a unified customer service experience that is both efficient and satisfying.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Continuous Improvement and Innovation</span>: The landscape of customer service is continuously changing, and so are we. BizSolutions invests in the ongoing training of our support team and utilizes customer feedback to refine our strategies. This commitment to excellence and innovation keeps us ahead, ensuring our partners offer the best in customer support.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Uncompromising Data Security</span>: In the digital age, customer data security and privacy are paramount. BizSolutions adheres to the highest standards of data protection, ensuring your customers' information is safe and secure. Trust in our commitment to maintaining the integrity and confidentiality of customer data.</p></li>

                                    </ul>

                                    <hr/>

                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/shorts/GcgdYCVmKAc" target="_blank" rel="noopener noreferrer">
                                    <video width="960px" height="540px" className="img-fluid" autoPlay loop>
                                        <source src={require('../assets/video-boost-your-sales.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                        <div>

                            <h5 className='py-3 text-dark'>
                                Why Choose BizSolutions for Your Customer Service Needs?
                            </h5>

                            <p className='text-intro-landing'>Choosing BizSolutions means not just meeting but exceeding your customers' expectations. Our digital-first approach to customer service sets us apart, providing your business with the tools and strategies needed to thrive in a competitive landscape. With <span className='biz-color'>BizSolutions</span>, you're not just upgrading your customer service; you're revolutionizing the way you engage with your customers.</p>

                            <h5 className='py-3 text-dark'>
                                Elevate Your Customer Service with BizSolutions
                            </h5>

                            <p className='text-intro-landing'>Ready to transform your customer service experience? Contact <span className='biz-color'>BizSolutions</span> today to learn more about our innovative solutions and how we can help you achieve digital excellence in customer support. Embrace the future of customer service with <span className='biz-color'>BizSolutions</span> and unlock the full potential of your customer interactions.</p>

                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default SalesCollection;