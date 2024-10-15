import React from 'react';
import { Image } from 'react-bootstrap';
import WebDevImage from '../../../../assets/images/img-web-dev-section-c.avif';
import '../../../../assets/styles/WebDevelopment.css';

const WebDevelopmentSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Group of corporate people with each other" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Partner in Digital Success</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>BizSolutions crafts websites that engage and convert, using the latest technologies for optimal design, performance, and visibility.</p>
                </div>
            </div>
        </div>
    );
};

export default WebDevelopmentSectionC;