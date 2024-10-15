import React from 'react';
import { Image } from 'react-bootstrap';
import WebDevImage from '../../../../assets/images/img-bookkeeping-section-c.jpg';
import '../../../../assets/styles/WebDevelopment.css';

const WebRevampSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Bookkeeping" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Partner in Bookkeeping Services</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>In today's competitive landscape, precise and efficient financial management is essential. BizSolutions offers advanced, user-friendly bookkeeping services to streamline your operations and drive success.</p>
                </div>
            </div>
        </div>
    );
};

export default WebRevampSectionC;