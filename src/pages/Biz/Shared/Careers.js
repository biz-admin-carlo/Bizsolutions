import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import Footer from '../../../components/Biz/Shared/Footer/MainFooter.js'

import '../../../assets/styles/PageWebDevelopment.css';

const CareerPage = () => {

    return (
        <>
            <Helmet>
                <title>BizSolutions | Careers</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-none d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h1 className='py-3'>Careers<span className='text-dark'></span></h1>
                                                                
                                <hr />

                                <p className='text-intro-landing py-3'>At <span className='biz-color'>BizSolutions</span>, we are always on the lookout for talented and passionate individuals to join our dynamic team. Our commitment to excellence starts with our employees, and we pride ourselves on creating an inclusive and supportive work environment.</p>
                                
                                <h4>No Open Positions at This Time</h4>

                                <p className='text-intro-landing py-3'>We currently do not have any open positions, but we are always keen to meet talented professionals who would like to join our team. If you believe that your skills and experience align with our company's goals and values, we would love to hear from you.</p>

                                <p className='text-intro-landing'>Please feel free to send your resume and a cover letter to <span className='biz-color'>supportus@mybizsolutions.us</span>. We will review your application and keep it on file for future opportunities.</p>

                                <h4>Stay Connected</h4>

                                <p className='text-intro-landing py-3'>We encourage you to check back periodically as new opportunities can arise at any time.</p>

                                <p className='text-intro-landing'>Thank you for considering a career with <span className='biz-color'>supportus@mybizsolutions.us</span>. We appreciate your interest in joining our team and look forward to the possibility of working together in the future.</p>


                            </div>

                        </div>

                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default CareerPage;
