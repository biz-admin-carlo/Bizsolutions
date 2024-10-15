import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../../../../assets/styles/WebDevelopment.css';

const WebDevelopmentSectionD = () => {

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
                        <h1>Web Development at BizSolutions</h1>
                        <hr />

                        <div className='text-intro-landing pb-lg-4'>

                            <h4 className='pb-3 text-dark'>
                                Why Choose BizSolutions for Website Development?
                            </h4>

                            <ul>
                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Customized Solutions</span></h3>
                                    <p className='text-intro-landing'>We understand that your business is unique. That's why we offer bespoke website development services tailored to your specific goals and requirements. Whether you're a startup looking to make a strong first impression or an established brand aiming to rejuvenate your online presence, we have the expertise to make it happen.</p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Mobile-First Design</span></h3>
                                    <p className='text-intro-landing'>With the majority of internet traffic now coming from mobile devices, having a mobile-friendly website is non-negotiable. Our designs prioritize responsiveness and user experience across all devices, ensuring that your site looks great and functions perfectly, no matter how your audience accesses it.</p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Customized Solutions for Peak Performance</span></h3>
                                    <p className='text-intro-landing'>Understanding that no two businesses are alike, we provide personalized IT support solutions designed to optimize your systems for peak performance. Our approach focuses on empowering your operations, enabling seamless digital experiences that drive results.</p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>SEO-Optimized</span></h3>
                                    <p className='text-intro-landing'>What good is a beautiful website if no one can find it? Our websites are built with SEO best practices in mind, from the coding structure to content strategy, to ensure that your site ranks well on search engines and attracts organic traffic.</p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Cutting-Edge Technologies</span></h3>
                                    <p className='text-intro-landing'>We stay at the forefront of web development trends and technologies, incorporating the latest advancements to ensure your website is fast, secure, and ahead of the curve.</p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Comprehensive Support</span></h3>
                                    <p className='text-intro-landing'>Our relationship doesn't end once your website goes live. We offer ongoing support and maintenance to ensure your site remains up-to-date, secure, and continues to perform at its best.</p>
                                </li>
                            </ul>


                            <hr />

                        </div>
                    </div>
                </div>

                <div className="video-container ps-lg-5">
                    {loadVideo && (
                        <a href="https://www.youtube.com/watch?v=GR7sBwyCttQ" target="_blank" rel="noopener noreferrer">
                            <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                                <source src={require('../../../../assets/videos/video-having-a-website.mp4')} type="video/mp4" />
                            </video>
                        </a>
                    )}
                </div>


            </div>

        </Container>
    );
};

export default WebDevelopmentSectionD;