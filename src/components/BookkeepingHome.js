import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web from '../assets/bookkeeping.png';
import '../assets/styles/BookkeepingHome.css';

const BookkeepingHome = () => {

    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center'><Link to="/bookkeeping" style={{ textDecoration: 'none', color: 'inherit' }}>Bookkeeping</Link></h1>
                        <hr />
                        <p className="paragraph-text">
                        Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.
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
                        <h1 className='title text-center'><Link to="/bookkeeping" style={{ textDecoration: 'none', color: 'inherit' }}>Bookkeeping</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                        Keep your financial records accurate and up-to-date with our professional bookkeeping services. We provide meticulous attention to detail, ensuring your finances are well-organized and compliant, giving you more time to focus on growing your business.
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

export default BookkeepingHome;