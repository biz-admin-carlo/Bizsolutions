import React from 'react';
import { Container, Image } from 'react-bootstrap';
import web from '../assets/IT-Support.png';
import '../assets/styles/TechnicalHome.css';

const TechnicalHome = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="Web Development" />
                    </div>
                    <div className="flex-col content-col mx-3">
                        <h1 className='title'>Technical & IT Support</h1>
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
                        <h1 className='title text-center'>Technical & IT Support</h1>
                        <hr />
                        <p className="paragraph-text text-center">
                        Navigate the complexities of technology with ease. Our technical and IT support services are here to resolve your tech challenges promptly, ensuring your operations run smoothly without any disruptions.
                        </p>
                    </div>

                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="Web Development" />
                    </div>
                    
                </div>
            </Container>
        </>
    );
};

export default TechnicalHome;