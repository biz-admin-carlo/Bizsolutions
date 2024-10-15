import React from 'react';
import '../../../../assets/styles/WebDevelopment.css';
import { Image, Container } from 'react-bootstrap';
import WebDevImageOne from '../../../../assets/images/img-web-dev-section-c-2.jpg';

const WebDevelopmentSectionE = () => {

    return (
        <Container>
        <div>
            <div className="webdev-div-container-secondary py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImageOne} alt="Corporate People in Tech Industry" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2-secondary text-start'>Empowering Your Digital Transformation</h2>    
                    <p className='paragraph-webdev-p-secondary text-start pt-lg-3'>BizSolutions is your partner in digital transformation. Our mission: expand your online presence, engage customers, and deliver real-world results. From enhancing websites to streamlining IT and securing digital assets, we have the expertise to make it happen.</p>
                </div>
            </div>
        </div>
        </Container>
    );
};

export default WebDevelopmentSectionE;