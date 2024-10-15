import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/HomeSectionE.css';

const SectionH = () => {
    return (
        <>
        <div class=" d-lg-block">
            <div className="white-webdev-container py-lg-5">
                <div className="new-webdev-text">
                    <div className='text-center'>
                        <h6 className='secondary-webdev-text'>Other Services</h6>
                    </div>
                    <h1 className='dark-title-webdev-text text-center'>Sales & Collections</h1>    
                    <p className='dark-paragraph-webdev-text text-center pt-lg-3'>Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.</p>

                    <p className='paragraph-webdev-text text-center pt-lg-3'>
                        <Link to="/sales-collection-services" style={{ color: 'black' }}>
                            Learn more
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SectionH;