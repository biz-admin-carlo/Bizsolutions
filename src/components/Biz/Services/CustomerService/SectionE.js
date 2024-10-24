import React from 'react';
import '../../../../assets/styles/WebDevelopment.css';
import { Image, Container } from 'react-bootstrap';
import WebDevImageOne from '../../../../assets/images/img-customer-service-section-c-2.avif';

const SectionE = () => {

    return (
        
        <Container>
        <div>
            <div className="webdev-div-container-secondary py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImageOne} alt="Corporate People in Tech Industry" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2-secondary text-start'>Why Trust BizSolutions for Your IT Support?</h2>    
                    <p className='paragraph-webdev-p-secondary text-start pt-lg-3'>Choose BizSolutions to exceed customer expectations with our digital-first approach. We provide tools and strategies to help your business thrive, revolutionizing your customer engagement.</p>
                </div>
            </div>
        </div>
        </Container>

    );
};

export default SectionE;