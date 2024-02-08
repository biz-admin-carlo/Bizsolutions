import React from 'react';
import { Container, Carousel, Card } from 'react-bootstrap';
import image1 from '../assets/web-dev-1.png';
import image2 from '../assets/web-dev-2.png';
import image3 from '../assets/web-dev-3.png';
import image4 from '../assets/web-dev-4.png';
import image5 from '../assets/web-dev-5.png';

import '../assets/styles/PageWebDevelopment.css';

const WebDevHome = () => {
    const carouselImages = [image1, image2, image3, image4, image5];

    return (
        <>
            <Container className="services-container my-3 d-none d-lg-block">
                <div className='text-center'>
                    <h6 className='text-services'>Services</h6>
                    <h1 className='py-3'>Web <span className='text-dark'>Development</span></h1>
                    <p className='text-intro-landing pb-lg-5'>Welcome to <span className='biz-color'>BizSolutions</span>, where we blend innovation with functionality to create exceptional websites that resonate with your audience. Our dedicated team of skilled developers leverages the latest in technology and design trends to ensure your website isn't just a site, but a unique digital experience.</p>
                </div>

                {/* Carousel Here */}
                <Carousel interval={3500} pause={false} indicators={false} controls={false} className='pb-lg-5'>
                    {carouselImages.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block img-carousel"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="flex-col content-col">
                    <h1 className='title'>Elevate Your Digital Presence with Premier Web Development Services</h1>
                    <hr />
                    <p className="paragraph-text">
                        Unlock the potential of your online presence with our cutting-edge website 
                        development services. We craft responsive, user-friendly, and visually stunning 
                        websites that not only attract visitors but convert them into loyal customers.
                    </p>
                </div>

            </Container>
        </>
    );
};

export default WebDevHome;
