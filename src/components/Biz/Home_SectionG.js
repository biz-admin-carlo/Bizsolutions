import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Biz/styles/HomeSectionE.css';

const SectionG = () => {
    return (
        <>
        <div class=" d-lg-block">
            <div className="biz-webdev-container py-lg-5">
                <div className="new-webdev-text">
                    <div className='text-center'>
                        <h6 className='secondary-webdev-text'>Other Services</h6>
                    </div>
                    <h1 className='dark-title-webdev-text text-center'>Bookkeeping</h1>    
                    <p className='dark-paragraph-webdev-text text-center pt-lg-3'>Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.</p>

                    <p className='paragraph-webdev-text text-center pt-lg-3'>
                        <Link to="/bookkeeping-services" style={{ color: 'black' }}>
                            Learn more
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SectionG;