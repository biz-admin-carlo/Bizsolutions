import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/HomeSectionE.css';

const SectionF = () => {
    return (
        <>
        <div class=" d-lg-block">
            <div className="white-webdev-container py-lg-5">
                <div className="new-webdev-text">
                    <div className='text-center'>
                        <h6 className='secondary-webdev-text'>Other Services</h6>
                    </div>
                    <h1 className='dark-title-webdev-text text-center'>Website Revamp</h1>    
                    <p className='dark-paragraph-webdev-text text-center pt-lg-3'>Upgrade your online presence with our targeted website revamp services. We transform your existing site into a modern, responsive, and visually appealing platform that engages and retains visitors. Our team enhances usability and performance, ensuring your site meets today's digital standards. Elevate your brand and captivate your audience with our comprehensive revamp solutions.</p>

                    <p className='paragraph-webdev-text text-center pt-lg-3'>
                        <Link to="/website-revamp-solutions" style={{ color: 'black' }}>
                            Learn more
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SectionF;