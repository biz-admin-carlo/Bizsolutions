import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import webRevampImage from '../../assets/Biz/images/img-web-revamp-stock.svg';
import '../../assets/Biz/styles/WebDevHome.css';

const WebRevamp = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col content-col">
                        <h1 className='title text-center biz-color'><Link to="/website-revamp-solutions" style={{ textDecoration: 'none', color: 'inherit' }}>Web Revamp</Link></h1>
                        <hr />
                        <p className="paragraph-text">
                            Upgrade your online presence with our targeted website revamp services. We transform your existing site into a modern, responsive, and visually appealing platform that engages and retains visitors. Our team enhances usability and performance, ensuring your site meets today's digital standards. Elevate your brand and captivate your audience with our comprehensive revamp solutions.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={webRevampImage} className='image-size' rounded alt="BizSolutions LLC Home Web Development Image" />
                    </div>

                </div>
            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col">
                        <h1 className='title text-center biz-color'><Link to="/website-revamp-solutions" style={{ textDecoration: 'none', color: 'inherit' }}>Web Revamp</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            Upgrade your online presence with our targeted website revamp services. We transform your existing site into a modern, responsive, and visually appealing platform that engages and retains visitors. Our team enhances usability and performance, ensuring your site meets today's digital standards. Elevate your brand and captivate your audience with our comprehensive revamp solutions.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={webRevampImage} className='image-size' rounded alt="BizSolutions LLC Home Web Development Image" />
                    </div>

                </div>
            </Container>
        </>
    );
};

export default WebRevamp;