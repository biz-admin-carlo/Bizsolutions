import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import AppFooter from './Application_Footer';
import '../assets/styles/PageWebDevelopment.css';

const WebDevHome = () => {

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
                <title>BizSolutions | Website Development</title>
            </Helmet>

            <div className='app-landing-page-service'>
                <Container className="services-container mb-3 d-lg-block">
                    
                    <div className="flex-container d-flex flex-column flex-lg-row">
                        
                        <div className='text-content pt-lg-5'>
                            <div className='text-center'>
                                <h6 className='text-services'>Services</h6>
                                <h1 className='py-3'>Web <span className='text-dark'>Development</span></h1>
                                <hr />

                                <div className='text-intro-landing pb-lg-4'>

                                    <h3 className='pb-3 text-dark'>
                                    Website Development Services
                                    </h3>

                                    <p className='text-intro-landing'>In today's digital era, your website is more than just an online brochure; it's the centerpiece of your digital marketing efforts, the first point of contact for many potential customers. However, is your current website living up to its potential? Are you attracting new customers and effectively converting visitors into leads?</p>

                                    <h3 className='pb-3 text-dark'>
                                    Introducing BizSolutions - Your Partner in Digital Success
                                    </h3>

                                    <p className='text-intro-landing'>At <span className='biz-color'>BizSolutions</span>, we don't just build websites; we create digital experiences that resonate with your target audience, drive user engagement, and foster conversions. Our team of seasoned developers, designers, and digital strategists leverages the latest technologies and design trends to craft websites that are not only visually stunning but also optimized for performance, usability, and search engine visibility.</p>

                                    <h4 className='pb-3 text-dark'>
                                    Why Choose BizSolutions for Website Development?
                                    </h4>

                                    <ul>
                                        <li><p className='text-intro-landing'><span className='biz-color'>Customized Solutions</span>: We understand that your business is unique. That's why we offer bespoke website development services tailored to your specific goals and requirements. Whether you're a startup looking to make a strong first impression or an established brand aiming to rejuvenate your online presence, we have the expertise to make it happen.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Mobile-First Design</span>: With the majority of internet traffic now coming from mobile devices, having a mobile-friendly website is non-negotiable. Our designs prioritize responsiveness and user experience across all devices, ensuring that your site looks great and functions perfectly, no matter how your audience accesses it.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Customized Solutions for Peak Performance</span>: Understanding that no two businesses are alike, we provide personalized IT support solutions designed to optimize your systems for peak performance. Our approach focuses on empowering your operations, enabling seamless digital experiences that drive results.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>SEO-Optimized</span>: What good is a beautiful website if no one can find it? Our websites are built with SEO best practices in mind, from the coding structure to content strategy, to ensure that your site ranks well on search engines and attracts organic traffic.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Cutting-Edge Technologies</span>: We stay at the forefront of web development trends and technologies, incorporating the latest advancements to ensure your website is fast, secure, and ahead of the curve.</p></li>

                                        <li><p className='text-intro-landing'><span className='biz-color'>Comprehensive Support</span>: Our relationship doesn't end once your website goes live. We offer ongoing support and maintenance to ensure your site remains up-to-date, secure, and continues to perform at its best.</p></li>

                                    </ul>

                                    <hr />

                                </div>
                            </div>

                            <button className="custom-button" onClick={handleButtonClick}>Contact Us!</button>
                        </div>

                        <div className="video-container ps-lg-5">
                            {loadVideo && (
                                <a href="https://www.youtube.com/watch?v=GR7sBwyCttQ" target="_blank" rel="noopener noreferrer">
                                    <video width="960px" height="540px" className="img-fluid" autoPlay loop>
                                        <source src={require('../assets/video-having-a-website.mp4')} type="video/mp4" />
                                    </video>
                                </a>
                            )}
                        </div>

                        <div>

                            <h5 className='py-3 text-dark'>
                                Take the First Step Towards a Winning Digital Strategy
                            </h5>

                            <p className='text-intro-landing'>Your website should be your strongest marketing tool, working tirelessly to attract, engage, and convert your target audience. Don't settle for an average website that fails to meet your business objectives.</p>

                            <h5 className='py-3 text-dark'>
                                Contact BizSolutions Today
                            </h5>

                            <p className='text-intro-landing'>Ready to transform your online presence? Contact us today for a free consultation. Discover how our innovative website development services can help you achieve your online goals and drive real business results. Let <span className='biz-color'>BizSolutions</span> be the partner you need for digital success in a competitive online world.</p>

                        </div>

                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};

export default WebDevHome;