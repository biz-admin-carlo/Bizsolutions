import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';
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
                <meta name="description" content="Enhance your customer engagement with BizSolutions' top-tier customer service support. Discover our innovative solutions for exceptional customer experiences." />
                <meta property="og:title" content="BizSolutions | Customer Service Support" />
                <meta property="og:description" content="Enhance your customer engagement with BizSolutions' top-tier customer service support. Discover our innovative solutions for exceptional customer experiences." />
                <meta property="og:image" content="https://mybizsolutions.us/static/media/icon-customer-service.abc123d456efg.jpg" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://mybizsolutions.us/customer-service-support" />
                <meta name="keywords" content="customer service, support solutions, BizSolutions support, digital customer engagement, customer experience, AI-driven support, omnichannel engagement" />
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container d-flex flex-column flex-lg-row">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1>Customer Support at BizSolutions</h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-4'>

                                    <h2 className='pb-3 text-dark'>Customer Support Services</h2>

                                    <p className='text-intro-landing'>In an era where customer expectations are continually evolving, providing exceptional customer service is more critical than ever. <span className='biz-color'>BizSolutions</span> is at the forefront of transforming customer service operations, leveraging cutting-edge technology and personalized strategies to deliver unparalleled customer support. Discover how partnering with <span className='biz-color'>BizSolutions</span> can elevate your customer service to meet the demands of today's digital world.</p>

                                    <h2 className='pb-3 text-dark'>Innovative Customer Service Solutions by BizSolutions</h2>

                                    <ul>
                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>AI-Driven Support Systems</span></h3>
                                            <p className='text-intro-landing'>With artificial intelligence and machine learning, BizSolutions offers chatbots and predictive customer service to ensure immediate, proactive support. Our technology is designed to enhance customer interaction, offering 24/7 assistance and anticipating customer needs before they even arise.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Personalized Customer Experience</span></h3>
                                            <p className='text-intro-landing'>At BizSolutions, we believe in the power of personalization. Our customized support solutions and targeted communication strategies ensure every customer interaction is relevant, meaningful, and effective. We harness customer data to tailor our support, making every customer feel valued and understood.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Omnichannel Customer Engagement</span></h3>
                                            <p className='text-intro-landing'>Our commitment to omnichannel support ensures that customers can reach out on their preferred platform and receive consistent, seamless service. By integrating customer interactions across channels, BizSolutions provides a unified customer service experience that is both efficient and satisfying.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Continuous Improvement and Innovation</span></h3>
                                            <p className='text-intro-landing'>The landscape of customer service is continuously changing, and so are we. BizSolutions invests in the ongoing training of our support team and utilizes customer feedback to refine our strategies. This commitment to excellence and innovation keeps us ahead, ensuring our partners offer the best in customer support.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Uncompromising Data Security</span></h3>
                                            <p className='text-intro-landing'>In the digital age, customer data security and privacy are paramount. BizSolutions adheres to the highest standards of data protection, ensuring your customers' information is safe and secure. Trust in our commitment to maintaining the integrity and confidentiality of customer data.</p>
                                        </li>
                                    </ul>

                                    <hr/>

                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/shorts/g5yUde0aPjY" target="_blank" rel="noopener noreferrer">
                                    <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                                        <source src={require('../assets/video-customer-service.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                        <div>
                            <h2 className='py-3 text-dark'>
                                Why Choose BizSolutions for Your Customer Service Needs?
                            </h2>
                            <p className='text-intro-landing'>
                                Choosing BizSolutions means not just meeting but exceeding your customers' expectations. Our digital-first approach to customer service sets us apart, providing your business with the tools and strategies needed to thrive in a competitive landscape. With <span className='biz-color'>BizSolutions</span>, you're not just upgrading your customer service; you're revolutionizing the way you engage with your customers.
                            </p>

                            <h2 className='py-3 text-dark'>
                                Elevate Your Customer Service with BizSolutions
                            </h2>
                            <p className='text-intro-landing'>
                                Ready to transform your customer service experience? Contact <span className='biz-color'>BizSolutions</span> today to learn more about our innovative solutions and how we can help you achieve digital excellence in customer support. Embrace the future of customer service with <span className='biz-color'>BizSolutions</span> and unlock the full potential of your customer interactions.
                            </p>
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default CustomerService;