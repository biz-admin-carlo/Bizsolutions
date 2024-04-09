import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import web from '../assets/img-sales-collection-stock.png';
import '../assets/styles/SalesCollection.css';

const SalesCollection = () => {
    return (
        <>
            <Container className="landing-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="BizSolutions LLC Home Sales Collection Image" />
                    </div>
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center biz-color'><Link to="/sales-collection-services" style={{ textDecoration: 'none', color: 'inherit' }}>Sales & Collections</Link></h1>
                        <hr />
                        <p className="paragraph-text">
                        Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.
                        </p>
                    </div>
                    
                </div>
            </Container>

            <Container className="landing-container d-lg-none">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center'><Link to="/sales-collection-services" style={{ textDecoration: 'none', color: 'inherit' }}>Sales & Collections</Link></h1>
                        <hr />
                        <p className="paragraph-text text-center">
                        Boost your revenue with our expert sales and collections services. We combine strategic insight with persuasive communication skills to effectively manage sales and collections, driving better business outcomes for you.
                        </p>
                    </div>

                    <div className="flex-col image-col">
                        <Image src={web} className='image-size-three' rounded alt="BizSolutions LLC Home Sales Collection Image" />
                    </div>
                    
                </div>
            </Container>
        </>
    );
};

export default SalesCollection;