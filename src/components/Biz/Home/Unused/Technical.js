import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import technicalSupportImage from '../../assets/images/img-technology-support-stock.png';
import '../../assets/styles/TechnicalHome.css';

const TechnicalHome = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col image-col">
                        <Image src={technicalSupportImage} className='image-size-three' rounded alt="BizSolutions LLC Home Technical Support Image" />
                    </div>
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center biz-color'><Link to="/technical-support-services" style={{ textDecoration: 'none', color: 'inherit' }}>Technical & IT Support</Link></h1>
                        <hr />
                        <p className="paragraph-text">
                        Navigate the complexities of technology with ease. Our technical and IT support services are here to resolve your tech challenges promptly, ensuring your operations run smoothly without any disruptions.
                        </p>
                    </div>
                    
                </div>
            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center'><Link to="/technical-support-services" style={{ textDecoration: 'none', color: 'inherit' }}>Technical & IT Support</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                        Navigate the complexities of technology with ease. Our technical and IT support services are here to resolve your tech challenges promptly, ensuring your operations run smoothly without any disruptions.
                        </p>
                    </div>

                    <div className="flex-col image-col">
                        <Image src={technicalSupportImage} className='image-size-three' rounded alt="BizSolutions LLC Home Technical Support Image" />
                    </div>
                    
                </div>
            </Container>
        </>
    );
};

export default TechnicalHome;