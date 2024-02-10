// import React from 'react';
// import { Container } from 'react-bootstrap';
// import { Helmet } from 'react-helmet'; 
// import tiktok from '../assets/tiktok.mp4'

// import '../assets/styles/PageWebDevelopment.css';

// const WebDevHome = () => {

//     return (
//         <>
//             <Helmet>
//                 <title>BizSolutions | Website Development</title>
//             </Helmet>

//             <div className='app-landing-page'>
//                 <Container className="services-container my-3 d-none d-lg-block">
//                     <div className='text-center'>
//                         <h6 className='text-services'>Services</h6>
//                         <h1 className='py-3'>Web <span className='text-dark'>Development</span></h1>
//                         <p className='text-intro-landing pb-lg-5'>Welcome to <span className='biz-color'>BizSolutions</span>, where we blend innovation with functionality to create exceptional websites that resonate with your audience. Our dedicated team of skilled developers leverages the latest in technology and design trends to ensure your website isn't just a site, but a unique digital experience.</p>
//                     </div>

//                     <div className="content-container">
//                         <video width="320" height="240" className="img-fluid" src={tiktok} autoPlay loop></video>

//                     </div>
//                 </Container>
//             </div>
//         </>
//     );
// };

// export default WebDevHome;

import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import tiktok from '../assets/tiktok.mp4'

import '../assets/styles/PageWebDevelopment.css';

const WebDevHome = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <>
            <Helmet>
                <title>BizSolutions | Website Development</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-none d-lg-block">
                    
                    {/* Flex Container */}
                    <div className="flex-container">
                        
                        {/* Text Content */}
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Web <span className='text-dark'>Development</span></h1>

                                <div className='text-intro-landing pb-lg-5'>

                                    <h5 className='pb-3 text-dark'>Is your website failing to attract new customers and convert visitors into leads? </h5>

                                    <p className='text-intro-landing'><span className='biz-color'>BizSolutions</span>, we create websites that work, designed to boost your brand, engage your audience, and drive results. Our team of experts leverages the latest technologies and design trends to craft unique digital experiences that are easy to use, mobile-friendly, and SEO-optimized.</p>

                                    <p className='text-intro-landing'>Welcome to <span className='biz-color'>BizSolutions</span>, where we blend innovation with functionality to create exceptional websites that resonate with your audience. Our dedicated team of skilled developers leverages the latest in technology and design trends to ensure your website isn't just a site, but a unique digital experience.</p>

                                    <p className='text-intro-landing text-danger'>Don't settle for an average website – contact us today for a free consultation and see how we can help you achieve your online goals.</p>
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        {/* Video Content */}
                        <div className="video-container ps-5">
                            <video width="1920px" height="1080px" className="img-fluid" muted src={tiktok} autoPlay loop></video>
                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
};

export default WebDevHome;
