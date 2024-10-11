import React from 'react';
import '../../../../assets/styles/WebDevelopment.css';
import { Image, Container} from 'react-bootstrap';
import WebDevImageOne from '../../../../assets/images/img-web-dev-section-c-2.jpg';

const WebRevampSectionE = () => {

    return (
        
        <Container>
        <div>
            <div className="webdev-div-container-secondary py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImageOne} alt="Corporate People in Tech Industry" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2-secondary text-start'>Revamp Your Digital Strategy Today</h2>    
                    <p className='paragraph-webdev-p-secondary text-start pt-lg-3'>Your application is key to your digital strategy. First impressions matter. Choose excellence with BizSolutions. We transform tired websites into valuable business assets.</p>
                </div>
            </div>
        </div>
        </Container>

    );
};

export default WebRevampSectionE;