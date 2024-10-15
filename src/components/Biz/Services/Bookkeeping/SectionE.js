import React from 'react';
import '../../../../assets/styles/WebDevelopment.css';
import { Image, Container} from 'react-bootstrap';
import WebDevImageOne from '../../../../assets/images/img-web-dev-section-c-2.jpg';

const BookkeepingSectionE = () => {

    return (
        
        <Container>
        <div>
            <div className="webdev-div-container-secondary py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImageOne} alt="Corporate People in Tech Industry" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2-secondary text-start'>Boost Your Business with BizSolutions</h2>    
                    <p className='paragraph-webdev-p-secondary text-start pt-lg-3'>Choose BizSolutions for bookkeeping to upgrade your financial management and achieve your business goals. Our innovative, personalized service makes us your ideal partner for thriving in the digital age.</p>
                </div>
            </div>
        </div>
        </Container>

    );
};

export default BookkeepingSectionE;