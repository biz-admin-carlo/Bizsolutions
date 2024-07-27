import React from 'react';
import { Image } from 'react-bootstrap';
import WebDevImage from '../../assets/Biz/images/img-customer-service-section-c.jpg';
import '../../assets/Biz/styles/WebDevelopment.css';

const WebRevampSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImage} alt="Customer Service" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Partner in Customer Service</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>In today's evolving landscape, exceptional customer service is crucial. BizSolutions transforms customer service operations with advanced technology and personalized strategies. Partner with us to elevate your customer support in the digital age.</p>
                </div>
            </div>
        </div>
    );
};

export default WebRevampSectionC;