import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import tiktok from '../assets/video-are-you-ready-stock.mp4'
import AppFooter from './AppFooter';

import imgOne from '../assets/icon-gusto-logo.png';
import imgTwo from '../assets/icon-quickbooks-logo.png';
import imgThree from '../assets/icon-xero-logo.png';

import '../assets/styles/PageWebDevelopment.css';

const Bookkeeping = () => {

    const navigate = useNavigate();

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
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Book<span className='text-dark'>keeping</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-5'>

                                    <h5 className='pb-3 text-dark' style={{ fontStyle: 'italic' }}>
                                    Is my current bookkeeping system holding me back?
                                    </h5>

                                    <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we specialize in developing cutting-edge, user-friendly websites specifically tailored for bookkeeping services.</p>

                                    <p className='text-intro-landing'>Here in <span className='biz-color'>BizSolutions</span>, Our mission is to enhance your brand's digital presence, engage your clients, and drive measurable results. Our expert team harnesses the latest technologies and design trends to create unique online experiences that are not only easy to navigate but also optimized for mobile use and search engine visibility.</p>

                                    <p className='text-intro-landing text-danger'>Don't settle for outdated methods! Remember, even small improvements in your bookkeeping can lead to significant gains in efficiency, profitability, and peace of mind.</p>
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>

                            <div className='py-5 center-images'>
                                <h6 className='text-services'>Brand Partners</h6>

                                <img className="py-lg-2 img-fluid custom-img-size" src={imgOne} alt="Web Application" />
                                <img className="py-lg-2 img-fluid custom-img-size" src={imgTwo} alt="Web Application" />
                                <img className="py-lg-2 img-fluid custom-img-size" src={imgThree} alt="Web Application" />
                            </div>

                        </div>

                        <div className="video-container ps-lg-5">
                            <a href="https://www.youtube.com/shorts/XcoLWjWWh7g" target="_blank" rel="noopener noreferrer">
                                <video width="960px" height="540px" className="img-fluid" muted src={tiktok} autoPlay loop></video>
                            </a>
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default Bookkeeping;