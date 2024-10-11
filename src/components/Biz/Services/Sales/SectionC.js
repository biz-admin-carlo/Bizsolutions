import React from 'react';
import { Image } from 'react-bootstrap';
import SalesCollectionImage from '../../../../assets/images/img-customer-sales-collection-c.jpg';
import '../../../../assets/styles/WebDevelopment.css';

const WebRevampSectionC = () => {

    return (
        <div>
            <div className="webdev-div-container py-lg-5">
                <div>
                    <Image className="new-webdev-image" src={SalesCollectionImage} alt="Sales Collection" />
                </div>
                <div className="div-webdev-text">
                    <h2 className='title-webdev-h2 text-end'>Your Partner in Sales Collection</h2>    
                    <p className='paragraph-webdev-p text-end pt-lg-3'>Enhance your financial performance with BizSolutions. We transform your sales and collections processes, helping you exceed revenue goals with our bespoke services.</p>
                </div>
            </div>
        </div>
    );
};

export default WebRevampSectionC;