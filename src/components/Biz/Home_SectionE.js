import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WebDevImage from '../../assets/Biz/images/img-group-of-people-talking.webp';
import '../../assets/Biz/styles/HomeSectionE.css';

const SectionE = () => {
    return (
        <>
        <div class=" d-lg-block">
            <div className="new-webdev-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Group of people talking with each other" />
                </div>
                <div className="new-webdev-text">
                    <h1 className='title-webdev-text text-end'>Startup to scaleup and beyond.</h1>    
                    <p className='paragraph-webdev-text text-end pt-lg-3'>At BizSolutions, we excel in scaling tech ventures. Supporting over 200 leaders in e-commerce and tech, our IT and technical support teams are ready for your growth and pivots at every step.</p>

                    <p className='paragraph-webdev-text text-end pt-lg-3'>
                        <Link to="/customer-support-services" style={{ textDecoration: 'none', color: 'white' }}>
                            Learn more about our unparalleled support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SectionE;