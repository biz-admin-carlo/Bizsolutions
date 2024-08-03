import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../../assets/Biz/styles/WebDevelopment.css';

const SalesSectionD = () => {

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
                    <h1>Sales & Collection Services at BizSolutions</h1>
                    <hr />

                    <div className='text-intro-landing pb-lg-4'>

                        <h2 className='pb-3 text-dark'>Sales & Collections Services</h2>

                        <p className='text-intro-landing'>Are you looking to enhance your business's financial performance? Look no further than <span className='biz-color'>BizSolutions</span>, your ultimate partner in transforming your sales and collections processes. Our bespoke services are designed to propel your business forward, ensuring you not only meet but exceed your revenue goals.</p>

                        <h2 className='pb-3 text-dark'> Why Your Business Needs Professional Sales and Collections Services</h2>

                        <p className='text-intro-landing'>In the rapidly evolving business landscape, staying ahead requires not just hard work but smart strategies. That's where BizSolutions comes in, offering:</p>


                        <ul>
                            <li>
                                <h3 className='text-intro-landing'><span className='biz-color'>Tailored Sales Strategies</span></h3>
                                <p className='text-intro-landing'>With our expert sales services, we optimize your sales funnel, ensuring you attract, engage, and convert leads more effectively than ever before. By leveraging data-driven insights and the latest CRM technologies, we personalize customer interactions, boosting your conversion rates and overall sales performance.</p>
                            </li>

                            <li>
                                <h3 className='text-intro-landing'><span className='biz-color'>Efficient Collections Solutions</span></h3>
                                <p className='text-intro-landing'>Our collections services streamline your payment processes, reducing the time and effort spent on managing receivables. With automated reminders, secure and flexible payment options, and proactive risk management, we help you minimize late payments and improve your cash flow.</p>
                            </li>
                        </ul>

                        <h2 className='pb-3 text-dark'>Optimizing Your Sales and Collections with BizSolutions</h2>

                        <ul>
                            <li>
                                <h3 className='text-intro-landing'><span className='biz-color'>Enhanced Online Presence</span></h3>
                                <p className='text-intro-landing'>In today's digital world, your online presence can make or break your sales goals. Our SEO-optimized, mobile-friendly websites and digital marketing strategies ensure your brand stands out, attracting more leads and driving sales.</p>
                            </li>

                            <li>
                                <h3 className='text-intro-landing'><span className='biz-color'>Custom CRM Integration</span></h3>
                                <p className='text-intro-landing'>We implement advanced CRM solutions tailored to your business needs, enabling better customer relationship management and increased sales efficiency.</p>
                            </li>

                            <li>
                                <h3 className='text-intro-landing'><span className='biz-color'>Streamlined Collections Process</span></h3>
                                <p className='text-intro-landing'>Our automated collections system ensures timely invoicing and follow-ups, making the collections process smoother and more effective. This not only improves your cash flow but also enhances customer satisfaction by offering convenient payment solutions.</p>
                            </li>
                        </ul>


                        <hr/>

                    </div>
                </div>
            </div>

            <div className="video-container ps-lg-5">
                {loadVideo && (
                    <a href="https://www.youtube.com/shorts/GcgdYCVmKAc" target="_blank" rel="noopener noreferrer">
                        <video width="960px" height="540px" className="img-fluid" autoPlay loop controls controlsList="nodownload">
                            <source src={require('../../assets/Biz/videos/video-boost-your-sales.mp4')} type="video/mp4" />
                        </video>
                    </a>
                )}
            </div>

        </div>
    </Container>
    );
};

export default SalesSectionD;