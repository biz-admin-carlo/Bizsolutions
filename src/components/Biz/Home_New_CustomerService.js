import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import customerSupportImage from '../../assets/Biz/images/img-customer-support-stock.png';
import '../../assets/Biz/styles/CustomerSupport.css';

const CustomerService = () => {
    return (
        <>
            <Container className="section-container my-3 d-none d-lg-block">
                <div className="flex-row">
                    <div className="flex-col ">
                        <h1 className='title-brilliance-sales px-5' style={{ color: 'black' }}>
                            CX tailored for rapidly expanding brands.
                        </h1>                    
                        <p className="paragraph-text mx-5 pt-5 px-5">
                        Why do the most ambitious brands in the world rely on us to manage their customer relationships? The answer is straightforward. We are unwaveringly dedicated: to enhancing customer satisfaction, to ensuring client success, and to achieving remarkable outcomes for every brand we support.
                        </p>
                        <Button className="mt-5 ms-5 rounded-pill" style={{ padding: '10px 20px', backgroundColor: '#000000', color: 'white', borderColor: '#000000' }}><Link to="/customer-support-services" style={{ textDecoration: 'none', color: 'white' }}>
                            See More
                            </Link></Button>

                    </div>
                </div>
            </Container>
        </>
    );
};

export default CustomerService;