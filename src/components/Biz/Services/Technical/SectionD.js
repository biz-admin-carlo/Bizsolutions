import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../../../../assets/styles/WebDevelopment.css';

const TechnicalSupportSectionD = () => {

    const [ loadVideo, setLoadVideo ] = useState(false);

    useEffect(() => {
        setLoadVideo(true);
    }, []);

    return (
        <Container className="services-container mb-3 d-lg-block">
                    
        <div className="flex-container d-flex flex-column flex-lg-row">
            
            <div className='text-content pt-lg-5'>
                <div className='text-center'>
                    <h6 className='text-services'>Services</h6>
                    <h1>Technical & IT Support at BizSolutions</h1>

                    <hr />

                    <div className='text-intro-landing pb-lg-4'>

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
            </div>

            <div className="video-container ps-lg-5">
                {loadVideo && (
                    <a href="https://www.youtube.com/shorts/7rB7tSNpmAI" target="_blank" rel="noopener noreferrer">
                        <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                            <source src={require('../../../../assets/videos/video-streamline-your-IT.mp4')} type="video/mp4" />
                        </video>
                    </a>
                )}
            </div>

        </div>
    </Container>
    );
};

export default TechnicalSupportSectionD;