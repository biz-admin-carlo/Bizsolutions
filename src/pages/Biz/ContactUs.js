import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import AppFooter from '../../components/Biz/Application_Footer';

import '../../assets/Biz/styles/PageContact.css';


const ContactUs = () => {

    return (
        <>
            <Helmet>
                <title>BizSolutions | Contact Us</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h1 className='py-3'>Contact<span className='text-dark'> Us</span></h1>
                                
                                <hr />

                                <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we're not just about creating websites – we're about crafting digital experiences that resonate with your audience. Our passion is blending cutting-edge technology with innovative design to elevate your brand.</p>

                                <h5 className='text-start pt-3'>Let's Talk About Your Next Project!</h5>

                                <p className='text-intro-landing'>Whether you're looking to revamp your existing website or embark on a completely new digital journey, our team is here to turn your ideas into reality. From sleek, mobile-friendly designs to SEO-optimized content, we ensure that every aspect of your website is fine-tuned to engage and impress your audience.</p>

                                <h5 className='text-start pt-3'>Your Vision, Our Expertise: A Perfect Match</h5>

                                <p className='text-intro-landing'>We believe that great solutions are born from collaboration. Share your vision with us, and let our experts add their magic. With our experience in the latest technologies and trends, we ensure your website is not just a digital space, but a dynamic tool for growth and engagement.</p>

                                <h5 className='text-start pt-3'>Reach Out and Let the Magic Begin</h5>

                                <p className='text-intro-landing'>Drop us a message, give us a call, or pay us a visit. We’re excited to hear about your project and eager to discuss how we can make it come to life. Your journey towards an impactful digital presence starts here.</p>

                                <hr />

                                <div className='contact-info'>

                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <p className="font-weight-bold">Email Us</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className='text-align-start'>
                                                <a className='text-services-email' href="mailto:webdev@bizsolutions.us?subject=Contact%20Support&body=Hi%20there,%20I%20need%20help%20with...">
                                                    webdev@bizsolutions.us
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <p className="font-weight-bold">Call Us</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className='text-services-email'>(415) 609-9342</p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <p className="font-weight-bold">Visit Us</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className='text-services-email'>20289 Stevens Creek BLVD #1039 Cupertino CA 95014</p>
                                        </div>
                                    </div>

                                </div>

                                <hr />

                                <blockquote className="blockquote text-center pt-lg-5">
                                    <p className="mb-0 text-secondary">"In <span className='biz-color'>BizSolutions</span>, we’re more than just a web development company; we’re your partners in digital success."</p>
                                </blockquote>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default ContactUs;
