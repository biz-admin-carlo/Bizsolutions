import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';

import imgOne from '../assets/icon-gusto-logo.png';
import imgTwo from '../assets/icon-quickbooks-logo.png';
import imgThree from '../assets/icon-xero-logo.png';

import '../assets/styles/PageWebDevelopment.css';

const Bookkeeping = () => {

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
                <title>BizSolutions | Bookkeeping</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container d-flex flex-column flex-lg-row">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Book<span className='text-dark'>keeping</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-5'>

                                    <p className='text-intro-landing text-center'>At <span className='biz-color'>BizSolutions</span>, we specialize in developing cutting-edge, user-friendly websites specifically tailored for bookkeeping services.</p>

                                    <hr />

                                    <h3 className='pb-3 text-dark'>
                                    Bookkeeping Services
                                    </h3>
                                    <p className='text-intro-landing'>In today's competitive business landscape, managing your finances with precision and efficiency isn't just an option—it's a necessity. <span className='biz-color'>BizSolutions</span> stands at the forefront of this revolution, offering a bookkeeping service that combines cutting-edge technology with user-friendly functionality to streamline your financial operations and drive your business success.</p>

                                    <h4 className='pb-3 text-dark'>
                                    Why BizSolutions' Bookkeeping Service is Different
                                    </h4>

                                    <ul>
                                        <li><p className='text-intro-landing'><span className='biz-color'>Tailored Technology Solutions</span>: At BizSolutions, we leverage the latest in digital technology to offer bookkeeping services that are not only advanced but tailored to meet the unique needs of your business. From automation to real-time financial reporting, our solutions are designed to enhance accuracy and efficiency.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Tailored Technology Solutions</span>: At BizSolutions, we leverage the latest in digital technology to offer bookkeeping services that are not only advanced but tailored to meet the unique needs of your business. From automation to real-time financial reporting, our solutions are designed to enhance accuracy and efficiency.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Empower Your Decision-Making</span>: With our innovative bookkeeping service, gain access to real-time data and insightful analytics that empower you to make informed decisions. Say goodbye to guesswork and embrace a future where every financial decision is backed by solid data.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Seamless Integration</span>: Our bookkeeping solutions seamlessly integrate with your existing systems, ensuring a smooth transition and continuity of operations. Whether it's invoicing, payroll, or expense tracking, our platform connects all aspects of your financial management in one place.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Dedicated Support</span>: BizSolutions is more than just a service provider; we're your partner in success. Our team of experts provides ongoing support and advice, ensuring that your bookkeeping is not only compliant but optimized for maximum efficiency and growth.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Enhanced Security</span>: In an era where data security is paramount, our bookkeeping service employs robust security measures to protect your financial information. With BizSolutions, you can have peace of mind knowing your data is safe and secure.</p></li>

                                    </ul>

                                    <hr />


                                </div>
                            </div>

                            <button className="custom-button mb-lg-5" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/watch?v=HmbA_4g-iLc" target="_blank" rel="noopener noreferrer">
        
                                    <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                                        <source src={require('../assets/video-runninng-a-business-stock.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                        <div>

                            <h5 className='py-3 text-dark'>
                                Drive Your Business Forward with BizSolutions
                            </h5>

                            <p className='text-intro-landing'>Choosing <span className='biz-color'>BizSolutions'</span> bookkeeping service means not just upgrading your financial management system but taking a significant step towards achieving your business goals. Our commitment to innovation, combined with our dedication to personalized service, makes us the ideal partner for businesses looking to thrive in the digital age.</p>

                            <h5 className='py-3 text-dark'>
                                Experience the Difference Today
                            </h5>

                            <p className='text-intro-landing'>Ready to transform your approach to bookkeeping and propel your business to new heights? Contact <span className='biz-color'>BizSolutions</span> today and discover how our innovative bookkeeping service can redefine the way you manage your finances. With <span className='biz-color'>BizSolutions</span>, it's not just about keeping books; it's about setting the foundation for your business's future success.</p>

                        </div>
                    </div>

                    <div className='pt-lg-5'>
                        <h6 className='text-services text-center biz-color'>Trusted Brand Partners</h6>

                        <div className='py-3 center-images d-flex flex-column flex-lg-row justify-content-around align-items-center'>
                            <img className="py-lg-2 img-fluid custom-img-size" src={imgOne} alt="BizSolution Brand Partner Gusto Logo" loading="lazy" />
                            <img className="py-lg-2 img-fluid custom-img-size" src={imgTwo} alt="BizSolution Brand Partner Quickbooks Logo" loading="lazy" />
                            <img className="py-lg-2 img-fluid custom-img-size" src={imgThree} alt="BizSolution Brand Xero Gusto" loading="lazy" />
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default Bookkeeping;