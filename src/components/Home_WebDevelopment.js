import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web from '../assets/img-web-development-stock.svg';
import '../assets/styles/WebDevHome.css';

const WebDevHome = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size' rounded alt="BizSolutions LLC Home Web Development Image" />
                    </div>
                    <div className="flex-col content-col">
                        <h1 className='title text-center biz-color'><Link to="/website-development-services" style={{ textDecoration: 'none', color: 'inherit' }}>Web Development</Link></h1>
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
                        <h1 className='title text-center'><Link to="/website-development-services" style={{ textDecoration: 'none', color: 'inherit' }}>Web Development</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            Unlock the potential of your online presence with our cutting-edge website 
                            development services. We craft responsive, user-friendly, and visually stunning 
                            websites that not only attract visitors but convert them into loyal customers.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size' rounded alt="BizSolutions LLC Home Web Development Image" />
                    </div>

                </div>
            </Container>
        </>
    );
};

export default WebDevHome;