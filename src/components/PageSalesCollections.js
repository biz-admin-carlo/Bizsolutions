import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import tiktok from '../assets/tiktok.mp4'
import AppFooter from './AppFooter';

import '../assets/styles/PageWebDevelopment.css';

const SalesCollection = () => {

    const navigate = useNavigate();

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
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Sales &<span className='text-dark'> Collection</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-5'>

                                    <h5 className='pb-3 text-dark' style={{ fontStyle: 'italic' }}>
                                    Is my current sales and collections strategy maximizing my revenue potential?
                                    </h5>

                                    <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we are here to elevate your sales and collections processes online, ensuring customer engagement and tangible outcomes. Leveraging cutting-edge technology and current design trends, we craft distinctive, user-friendly websites.</p>

                                    <p className='text-intro-landing'>Here in <span className='biz-color'>BizSolutions</span>, we are committed to enhancing your brand's online visibility, engaging your customers effectively, and achieving concrete outcomes. Our seasoned team utilizes the latest in technology and design innovations to build distinctive online experiences. </p>

                                    <p className='text-intro-landing text-danger'>Don't be constrained by outdated sales and collections methods! Minor yet strategic improvements in your approach can significantly elevate efficiency, increase revenue, and provide the reassurance of a smoothly operating sales and collections system.</p>
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
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

export default SalesCollection;