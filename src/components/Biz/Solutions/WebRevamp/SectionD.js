import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../../../../assets/styles/WebDevelopment.css';

const WebRevampSectionD = () => {

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
                        <h1>Web Revamp at BizSolutions</h1>
                        <hr />

                        <div className='text-intro-landing pb-lg-4'>

                            <h2 className='pb-3 text-dark'>Website Revamp Services</h2>

                            <p className='text-intro-landing'>Is your current website truly making an impact in today's digital realm? Let's find out! Get a complimentary website assessment and discover if your online platform is effectively engaging potential customers and driving conversions.</p>

                            <h4 className='pb-3 text-dark'>
                            Revamp Your Digital Presence with BizSolutions
                            </h4>

                            <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we specialize in revitalizing your online presence through comprehensive website revamp services. Our mission is simple: to transform outdated websites into dynamic digital experiences that captivate your audience, drive engagement, and convert visitors into loyal customers.</p>

                            <h4 className='pb-3 text-dark'>
                            Why Choose BizSolutions for Website Development?
                            </h4>

                            <ul>
                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Transformational Expertise</span></h3>
                                    <p className='text-intro-landing'>Our team specializes in breathing new life into outdated websites. With a keen eye for design and a strategic approach to functionality, we're experts at transforming lackluster platforms into captivating digital experiences that drive results.
                                    </p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Tailored Solutions for Modern Needs</span></h3>
                                    <p className='text-intro-landing'>We understand the unique challenges of revamping an existing website. Our approach is customized to address your specific pain points and capitalize on opportunities for improvement, ensuring your revamped site meets the demands of today's digital landscape.
                                    </p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Strategic Rejuvenation</span></h3>
                                    <p className='text-intro-landing'>Beyond aesthetics, we focus on strategic enhancements that elevate your online presence and align with your business objectives. From user experience optimizations to conversion rate optimization strategies, every aspect of your revamped website is meticulously crafted to deliver tangible results.
                                    </p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Seamless Transition, Maximum Impact</span></h3>
                                    <p className='text-intro-landing'>Revamping your website shouldn't disrupt your business operations. Our streamlined process ensures a smooth transition from old to new, minimizing downtime while maximizing the impact of your revamped site from day one.
                                    </p>
                                </li>

                                <li>
                                    <h3 className='text-intro-landing'><span className='biz-color'>Continued Support and Evolution</span></h3>
                                    <p className='text-intro-landing'>Our partnership doesn't end once your revamped website goes live. We're committed to your long-term success, providing ongoing support, maintenance, and strategic guidance to ensure your digital presence continues to evolve and thrive in an ever-changing online landscape.
                                    </p>
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

export default WebRevampSectionD;