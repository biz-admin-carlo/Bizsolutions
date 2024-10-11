import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/HomeSectionF.css';

const HomeSalesCollection = () => {
    return (
        <>
        <div className="d-lg-block">
            <Container className="section-container-get my-3">
                <div className="flex-row">
                    <div className="flex-col" data-aos="fade-up">
                        <h1 className='title-other-f'>
                            Other Services That We Provide 
                        </h1>           

                        <div className='pt-5 flex-container' data-aos="fade-up">
                            <h2 className='title-secondary-f'>
                                Web Revamp
                            </h2>  
                            <p className='paragraph-secondary-f'>
                                Upgrade your online presence with our targeted website revamp services. We transform your existing site into a modern, responsive, and visually appealing platform that engages and retains visitors. Our team enhances usability and performance, ensuring your site meets today's digital standards. Elevate your brand and captivate your audience with our comprehensive revamp solutions.
                                <Link to="/website-revamp-solutions" style={{ textDecoration: 'none' }}>
                                <p className='pt-3 see-more text-end learn-more'>See More ...</p>
                                </Link>
                            </p>
                        </div>

                        <div className='pt-5 flex-container' data-aos="fade-up">
                            <h2 className='title-secondary-f'>
                                Bookkeeping
                            </h2>  
                            <p className='paragraph-secondary-f'>
                                Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.
                                <Link to="/bookkeeping-services" style={{ textDecoration: 'none' }}>
                                    <p className='pt-3 see-more text-end learn-more'>See More ...</p>
                                </Link>
                            </p>
                        </div>

                        <div className='pt-5 flex-container' data-aos="fade-up">
                            <h2 className='title-secondary-f'>
                                Sales & Collections
                            </h2>  
                            <p className='paragraph-secondary-f'>
                                Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.
                                <Link to="/sales-collection-services" style={{ textDecoration: 'none' }}>
                                <p className='pt-3 see-more text-end learn-more'>See More ...</p>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
        </>
    );
};

export default HomeSalesCollection;