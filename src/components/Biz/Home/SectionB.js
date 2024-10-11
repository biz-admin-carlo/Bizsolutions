import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../assets/styles/CustomerSupport.css';

const HomeSalesCollection = () => {
    return (
        <>
            <div className="d-lg-block">
                <Container className="section-container-get my-3">
                    <div className="flex-row">
                        <div className="flex-col ">
                            <h1 className='title-brilliance mx-5 pt-lg-5 ps-5'><Link to="/website-development-solutions" style={{ textDecoration: 'none', color: 'black' }}>
                                Get behind the success. 
                                </Link></h1>                     
                            <p className="paragraph-text-behind mx-5 pt-lg-5 ps-5">
                                At BizSolutions, we're not just developing applications; we're shaping the future of digital interactions. Major global brands trust us to enhance their web presence, ensuring their services are accessible, intuitive, and impactful. This isn't just any responsibility—it's an opportunity to innovate and excel in a space that's constantly evolving.
                            </p>
                            <p className='pt-3 see-more-team mx-5 pt-5 px-5'>
                                <Link to="/website-development-solutions" style={{ textDecoration: 'none', color: 'black' }}>
                                Meet the people
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default HomeSalesCollection;