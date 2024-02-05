import React from 'react';
import { Container, Image } from 'react-bootstrap';
import web from '../assets/web-development.svg';
import '../assets/styles/WebDevHome.css';

const WebDevHome = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size' rounded alt="Web Development" />
                    </div>
                    <div className="flex-col content-col">
                        <h1 className='title'>Web Development</h1>
                        <hr />
                        <p className="paragraph-text">
                            Unlock the potential of your online presence with our cutting-edge website 
                            development services. We craft responsive, user-friendly, and visually stunning 
                            websites that not only attract visitors but convert them into loyal customers.
                        </p>
                    </div>

                </div>
            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col">
                        <h1 className='title text-center'>Web Development</h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            Unlock the potential of your online presence with our cutting-edge website 
                            development services. We craft responsive, user-friendly, and visually stunning 
                            websites that not only attract visitors but convert them into loyal customers.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size' rounded alt="Web Development" />
                    </div>

                </div>
            </Container>
        </>
    );
};

export default WebDevHome;