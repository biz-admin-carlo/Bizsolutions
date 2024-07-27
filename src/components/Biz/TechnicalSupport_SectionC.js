import React from 'react';
import { Image } from 'react-bootstrap';
import WebDevImage from '../../assets/Biz/images/img-IT-support-section-c.avif';
import '../../assets/Biz/styles/WebDevelopment.css';

const WebRevampSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Software Development" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Trusted IT Support Partner</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>In today's digital age, agile IT infrastructure is essential. BizSolutions provides sophisticated, user-friendly website solutions and comprehensive IT support to meet modern technology challenges.</p>
                </div>
            </div>
        </div>
    );
};

export default WebRevampSectionC;