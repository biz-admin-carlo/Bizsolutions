import React from 'react';
import '../../assets/Biz/styles/WebDevelopment.css';
import { Image, Container} from 'react-bootstrap';
import WebDevImageOne from '../../assets/Biz/images/img-sales-collection-section-c-2.jpg';

const SalesSectionE = () => {

    return (
        
        <Container>
        <div>
            <div className="webdev-div-container-secondary py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={WebDevImageOne} alt="Corporate People in Tech Industry" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2-secondary text-start'>The BizSolutions Advantage</h2>    
                    <p className='paragraph-webdev-p-secondary text-start pt-lg-3'>Partner with <span className='biz-color'>BizSolutions</span> for expert sales and collections services. Our experienced team uses the latest technology to deliver real results, offering personalized support to optimize efficiency and profitability.</p>
                </div>
            </div>
        </div>
        </Container>

    );
};

export default SalesSectionE;