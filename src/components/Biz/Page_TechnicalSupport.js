import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';
import '../../assets/Biz/styles/PageWebDevelopment.css';

const TechnicalPage = () => {

    const navigate = useNavigate();
    const [ loadVideo, setLoadVideo ] = useState(false);

    useEffect(() => {
        setLoadVideo(true);
    }, []);

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <>
            <Helmet>
                <title>BizSolutions | Technical & IT Support</title>
                <meta name="description" content="Explore state-of-the-art technical and IT support services with BizSolutions. We offer sophisticated solutions tailored for today's dynamic digital landscape." />
                <meta property="og:title" content="BizSolutions | Technical & IT Support" />
                <meta property="og:description" content="Explore state-of-the-art technical and IT support services with BizSolutions. We offer sophisticated solutions tailored for today's dynamic digital landscape."/>
                <meta property="og:image" content="https://mybizsolutions.us/static/media/icon-app-logo.83ff8bf39a11df9fb7ac.jpg" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://mybizsolutions.us/technical-support-services" />
                <meta name="keywords" content="technical support, IT services, BizSolutions IT support, digital transformation, IT infrastructure, technical assistance, advanced IT solutions" />
            </Helmet>

            <div className='app-landing-page-service'>

            <div className='section-container-website-development'>
                    <div className='web-dev-div'>
                        <h1 className='web-dev-h1'>Elevate</h1>
                        <h1 className='web-dev-h1'>Technical Support with us</h1>
                        <h5 className='web-dev-h5'>Expert In Technical Support Service</h5>
                    </div>
                </div>

                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container d-flex flex-column flex-lg-row">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1>Technical & IT Support at BizSolutions</h1>

                                <hr />

                                <div className='text-intro-landing pb-lg-4'>

                                    <h2 className='pb-3 text-dark'>Technical Support Services</h2>

                                    <p className='text-intro-landing'>In the rapidly evolving digital age, having an agile IT infrastructure is not just an advantage—it's a necessity. <span className='biz-color'>BizSolutions</span> stands at the forefront of providing sophisticated, user-friendly website solutions and comprehensive IT and technical support services designed to meet the challenges of today's technology landscape.</p>

                                    <h4 className='pb-3 text-dark'>
                                    Why Choose BizSolutions for Your IT and Technical Support Needs?
                                    </h4>

                                    <ul>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Unmatched Expertise</span></h3>
                                            <p className='text-intro-landing'>At BizSolutions, we specialize in enhancing your online presence through state-of-the-art websites tailored for the technical and IT support sectors. Our expertise lies in creating digital platforms that not only look great but function flawlessly, ensuring your business stays ahead of the curve.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Proactive Support, Round-the-Clock</span></h3>
                                            <p className='text-intro-landing'>Our dedicated team of IT professionals is committed to your success, offering round-the-clock support to resolve issues before they become problems. With BizSolutions, experience the peace of mind that comes from knowing your IT infrastructure is in expert hands.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Customized Solutions for Peak Performance</span></h3>
                                            <p className='text-intro-landing'>Understanding that no two businesses are alike, we provide personalized IT support solutions designed to optimize your systems for peak performance. Our approach focuses on empowering your operations, enabling seamless digital experiences that drive results.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Stay Ahead in a Digital World</span></h3>
                                            <p className='text-intro-landing'>In an era where technology evolves at lightning speed, partnering with BizSolutions means your IT infrastructure will not only keep pace but lead the way. We're committed to leveraging cutting-edge solutions to ensure your technology works as hard as you do, keeping you competitive and compliant in a digital-first marketplace.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Upgrade for Efficiency and Security</span></h3>
                                            <p className='text-intro-landing'>Don't let outdated technology hold you back. Our services are tailored to upgrade your IT support systems for improved efficiency, enhanced performance, and greater security. With BizSolutions, transition smoothly to the latest technologies and safeguard your operations against emerging threats.</p>
                                        </li>

                                        <li>
                                            <h3 className='text-intro-landing'><span className='biz-color'>Enhanced Security</span></h3>
                                            <p className='text-intro-landing'>In an era where data security is paramount, our IT service employs robust security measures to protect your information. With BizSolutions, you can have peace of mind knowing your data is safe and secure.</p>
                                        </li>

                                    </ul>

                                    <hr />
                                    
                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/shorts/7rB7tSNpmAI" target="_blank" rel="noopener noreferrer">
                                    <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                                        <source src={require('../../assets/Biz/videos/video-streamline-your-IT.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                        <div>
                            <h2 className='py-3 text-dark'>
                                Your Partner in Digital Transformation
                            </h2>
                            <p className='text-intro-landing'>
                                <span className='biz-color'>BizSolutions</span> is more than just a service provider; we're your partner in digital transformation. Our mission is to expand your online presence, engage your customers on a deeper level, and deliver the real-world results that matter to your business. Whether you're looking to enhance your website, streamline your IT operations, or secure your digital assets, we have the expertise and solutions to make it happen.
                            </p>

                            <h2 className='py-3 text-dark'>
                                Take the Next Step Towards Seamless Operations
                            </h2>
                            <p className='text-intro-landing'>
                                Ready to revolutionize your IT infrastructure and take your business to the next level? Contact <span className='biz-color'>BizSolutions</span> today for a consultation. Discover how our expert technical and IT support services can help you navigate the complexities of the digital world with confidence and ease.
                            </p>
                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default TechnicalPage;