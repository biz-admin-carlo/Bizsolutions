import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web from '../assets/img-testimonies.png';
import '../assets/styles/TechnicalHome.css';

const Testimony = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                    <h1 className='title text-center'><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Client Success Stories at BizSolutions</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            At BizSolutions, we're committed to listening and adapting to our clients' needs. Your feedback is our most valuable asset. Discover the experiences and success stories of our clients.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="BizSolutions LLC Testimonies from Previous Projects" />
                    </div>
                </div>
                <div className="flex-col py-lg-5">
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <h6 className='fw-bold' style={{ color: '#FF851A', fontStyle: 'italic' }}>Exceptional Service! Truly Top Tier!!</h6>
                            <p>Working with BizSolutions has been a remarkable journey. Their dedication and professionalism are unparalleled. Excited for more collaborative projects ahead!</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <strong>Mike S., Entrepreneur, California</strong>
                        </figcaption>
                    </figure>
                </div>

            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                    <h1 className='title text-center'><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Client Success Stories at BizSolutions</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            At BizSolutions, we're committed to listening and adapting to our clients' needs. Your feedback is our most valuable asset. Discover the experiences and success stories of our clients.
                        </p>
                    </div>
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="BizSolutions LLC Testimonies from Previous Projects" />
                    </div>
                </div>
                <div className="flex-col py-lg-5">
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <h6 className='fw-bold' style={{ color: '#FF851A', fontStyle: 'italic' }}>Exceptional Service! Truly Top Tier!!</h6>
                            <p>Working with BizSolutions has been a remarkable journey. Their dedication and professionalism are unparalleled. Excited for more collaborative projects ahead!</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <strong>Mike S., Entrepreneur, California</strong>
                        </figcaption>
                    </figure>
                </div>
            </Container>
        </>
    );
};

export default Testimony;