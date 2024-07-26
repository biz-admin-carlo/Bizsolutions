import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/Biz/styles/CustomerSupport.css';
import '../../assets/Biz/styles/OtherService.css';

const HomeSalesCollection = () => {
    return (
        <>
        <div className="d-none d-lg-block">
            <Container className="section-container-get my-3">
                <div className="flex-row">
                    <div className="flex-col ">
                        <h1 className='title-other'>
                            Other Services That We Provide 
                        </h1>           

                        <div className='pt-5 flex-container'>
                            <h2 className='title-secondary-other'>
                                Web Revamp
                            </h2>  
                            <p className='paragraph-secondary'>
                                Upgrade your online presence with our targeted website revamp services. We transform your existing site into a modern, responsive, and visually appealing platform that engages and retains visitors. Our team enhances usability and performance, ensuring your site meets today's digital standards. Elevate your brand and captivate your audience with our comprehensive revamp solutions.
                                <p className='pt-3 see-more text-end'>See More ...</p>
                            </p>
                        </div>

                        <div className='pt-5 flex-container'>
                            <h2 className='title-secondary-other'>
                                Bookkeeping
                            </h2>  
                            <p className='paragraph-secondary'>
                                Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.
                                <p className='pt-3 see-more text-end'>See More ...</p>
                            </p>
                        </div>

                        <div className='pt-5 flex-container'>
                            <h2 className='title-secondary-other'>
                                Sales & Collections
                            </h2>  
                            <p className='paragraph-secondary'>
                                Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.
                                <p className='pt-3 see-more text-end'>See More ...</p>
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