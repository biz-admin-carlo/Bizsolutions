import React from 'react';
import { Image } from 'react-bootstrap';
import WebDevImage from '../../../../assets/images/img-web-revamp-section-c.avif';
import '../../../../assets/styles/WebDevelopment.css';

const WebRevampSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Software Development" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Partner in Digital Presence</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>BizSolutions we revamp your website to captivate audiences, drive engagement, and convert visitors into loyal customers.</p>
                </div>
            </div>
        </div>
    );
};

export default WebRevampSectionC;