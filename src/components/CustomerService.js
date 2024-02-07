import React from 'react';
import { Container, Image } from 'react-bootstrap';
import web from '../assets/CustomerSupport.png';
import '../assets/styles/CustomerSupport.css';

const CustomerService = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title-long'>Customer Service Support</h1>
                        <h5 className='text-secondary-long'>(Chat, Email, and Phone)</h5>
                        <hr />
                        <p className="paragraph-text">
                        Enhance your customer relationships with our comprehensive support solutions. Whether through chat, email, or phone, our team delivers exceptional service, ensuring every interaction with your customers is a positive and satisfying experience.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-two' rounded alt="Web Development" />
                    </div>
                </div>
            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title-long'>Customer Service Support</h1>
                        <h5 className='text-secondary-long'>(Chat, Email, and Phone)</h5>
                        <hr />
                        <p className="paragraph-text text-center">
                        Enhance your customer relationships with our comprehensive support solutions. Whether through chat, email, or phone, our team delivers exceptional service, ensuring every interaction with your customers is a positive and satisfying experience.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-two' rounded alt="Web Development" />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CustomerService;