import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from './Pricing_TypingEffect.js';
import '../assets/styles/AppInformation.css';

import Landing from './Pricing_Landing.js';
import Payroll from './Pricing_Payroll.js';
import BundleStarter from './Pricing_WebDevBundleStarter.js';
import BundleAdvanced from './Pricing_WebDevBundleAdvanced.js';
import BundleExpert from './Pricing_WebDevBundleExpert.js';
import FreeTrial from './Pricing_FreeTrial.js';
import Trial15 from './Pricing_Trial15.js';
import BookkeepingStarter from './Pricing_BookkeepingStarter.js';

export default function Pricing() {
    const [ selected, setSelected ] = useState('annual');

    const navigate = useNavigate();

    const packageOne = useCountingEffect(selected === 'annual' ? 989.99 : 1099.99);

    // const webRevamp = selected === 'annual' ? (
    //     <span>
    //       <span style={{ textDecoration: 'line-through', color: 'red' }}>$699.99</span>
    //       <span> $399.99</span>
    //     </span>
    //   ) : (
    //     '$49.99'
    //   );

    const webRevamp = selected === 'annual' ? (
        <span style={{ position: 'relative', fontSize: '24px' }}> {/* Adjust font size as needed */}
          <span style={{ textDecoration: 'line-through', color: 'red' }}> {/* Smaller font size for the original price */}
            $699.99 
          </span>
          <sup style={{ position: 'absolute', top: 0, right: '-100px', fontSize: '30px'}}> {/* Positioning the new price */}
            $399.99
          </sup>
        </span>
      ) : (
        '$49.99'
      );

      
    const handleGetStartedClick = () => {
        const token = sessionStorage.getItem('token');
        if (token)  {
            const subject = encodeURIComponent("Interest in Starter Package");
            const body = encodeURIComponent("I am interested in the Starter Package. Please provide me with more information.");

            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
        }
    };
    
    const handleGetStartedClickAdvanced = () => {
        const token = sessionStorage.getItem('token');
        if (token)  {
            const subject = encodeURIComponent("Interest in Advanced Package + Commission per Collection Rep");
            const body = encodeURIComponent("I am interested in the Advanced Package + Commission per Collection Rep. Please provide me with more information.");

            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
        }
    };

    const handleGetStartedEnterprise = () => {
        const token = sessionStorage.getItem('token');
        if (token)  {
            const subject = encodeURIComponent("Interest in Enterprise Revamp Package");
            const body = encodeURIComponent("I am interested in the AEnterprise Revamp Package. Please provide me with more information.");

            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
        }
    };

    const handleModalToggle = () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            navigate('/login/pricing');
            return; 
        }
    
        // const stripePaymentLinks = {
        //     monthly: "https://buy.stripe.com/14kcO23Ef39d728eUX",
        //     annual: "https://buy.stripe.com/7sIaFU1w76lp0DKbIR"
        // };

        const keapPaymentLinks = {
            monthly: "https://keap.app/checkout/dyb285/revamp-monthly",
            annual: "https://keap.app/checkout/dyb285/revamp-annual"
        };
    
        const paymentUrl = keapPaymentLinks[selected];
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } else {
            // console.error('Invalid subscription type selected');
        }
    };
    
    const handleSelect = (button) => {
      setSelected(button);
  };
    return (
        <>
        <div className='app-landing-page-pricing'>
            <div className='pt-lg-5'>
                <Landing />
            </div>

            <div>
                <Container >
                    <div className='text-center pb-lg-3'>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Free Trial Package</h4>
                    </div>

                    <div className='container'>
                        <div className='row justify-content-around'>

                            <div className='col-sm-12 col-md-6 mb-3'>
                                <FreeTrial selected={selected} setSelected={setSelected} />
                            </div>

                            <div className='col-sm-12 col-md-6 mb-3'>
                                <Trial15 selected={selected} setSelected={setSelected} />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className='text-center py-3 '>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Bundle Package</h4>

                        <p>Embracing paid monthly packages is an invitation to elevate your projects with unwavering support, advanced features, and robust security. These investments empower your production-grade applications, ensuring they thrive with professional reliability, scalability, and peace of mind.</p>

                        <div className="button-section">
                            <div className="custom-btn custom-btn-light d-flex align-items-center">
                                <button
                                    className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                    onClick={() => handleSelect('annual')}
                                >
                                    Annually<span className='lower-case ms-1'>Save up to 10%</span>
                                </button>
                                <button
                                    className={`custom-btn ${selected === 'monthly' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                    onClick={() => handleSelect('monthly')}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='row justify-content-around'>

                            <div className='col-sm-12 col-md-4 mb-3'>
                                <BundleStarter selected={selected} setSelected={setSelected} />
                            </div>

                            <div className='col-sm-12 col-md-4 mb-3'>
                                <BundleAdvanced selected={selected} setSelected={setSelected} />
                            </div>

                            <div className='col-sm-12 col-md-4 mb-3'>
                                <BundleExpert />
                            </div>

                        </div>
                    </div>

                </Container>

                <Container>
                <hr/>
                <div className='text-center py-lg-5'>
                    <h2>Website Revamp</h2>


                    <p>Choosing our website revamp service is your step towards transforming your online presence with precision and innovation. Our packages offer continuous, dedicated support, state-of-the-art design updates, and strengthened security measures. This commitment not only revitalizes your website's aesthetics and functionality but also boosts its performance and scalability, providing you with a dependable and compelling digital experience that engages and converts.</p>

                    <div className="button-section">
                        <div className="custom-btn custom-btn-light d-flex align-items-center">
                            <button
                                className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                onClick={() => handleSelect('annual')}
                            >
                                Annually<span className='lower-case ms-1'>Save up to 10%</span>
                            </button>
                            <button
                                className={`custom-btn ${selected === 'monthly' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                onClick={() => handleSelect('monthly')}
                            >
                                Monthly
                            </button>
                        </div>
                    </div>
                </div>

                    <div className='d-flex flex-wrap justify-content-around pb-5'>

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Professional Revamp Package</Card.Title>
                                    <h3 className='card-text-amount'>
                                    {webRevamp}<p>per month {
                                        selected === 'annual' ?
                                        <>
                                        <Badge pill bg="warning" text="dark">billed annually</Badge>
                                        <Badge pill bg="danger" text="light">discounted promo</Badge>
                                        </>
                                        :
                                        <Badge pill bg="light" text="warning">billed monthly</Badge>
                                    }</p>
                                    </h3>

                                        <Button variant="warning" className='my-3 full-width-button' onClick={handleModalToggle}>
                                            Get Started
                                        </Button>

                                    <Card.Text>Enhanced Business Presence</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Premier Business Profile</div>
                                            <div><GoCheckCircleFill />Essential Contact Details</div>
                                            <div><GoCheckCircleFill />Verified Physical Location</div>
                                            <div><GoCheckCircleFill />Flexible Business Hours</div>
                                            <div><GoCheckCircleFill />Seamless Payment Solutions</div>
                                            <div><GoCheckCircleFill />Integrated Web Links </div>
                                            <div><GoCheckCircleFill />Professional Video Showcases</div>
                                            <div><GoCheckCircleFill />Dynamic Photo Galleries</div>
                                            <div><GoCheckCircleFill />Localized Web Experience</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <Card.Text>Cutting-Edge Website Design</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Tailored Responsive Layouts</div>
                                            <div><GoCheckCircleFill />Integrated Social Media</div>
                                            <div><GoCheckCircleFill />Advanced SEO Tactics</div>
                                            <div><GoCheckCircleFill />Complimentary Web Hosting</div>
                                            <div><GoCheckCircleFill />Dedicated Support & Maintenance</div>
                                            <div><GoCheckCircleFill />Strategic Directory Inclusion</div>
                                            <div><GoCheckCircleFill />Robust Security Protocols</div>
                                            <div><GoCheckCircleFill />Flexible Content Updates</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <Card.Text>Comprehensive Social Media Oversight</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Optimized Social Profiles</div>
                                            <div><GoCheckCircleFill />Managed Social Campaigns</div>
                                            <div><GoCheckCircleFill />Automated Advertising Strategies</div>
                                        </IconContext.Provider>                               
                                    </div>
                            
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Enterprise Revamp Package</Card.Title>
                                    <h3 className='card-text-amount'>
                                        Let's Talk!<p><Badge pill bg="warning" text="dark">supportus@mybizsolutions.us</Badge></p>
                                    </h3>
                                    
                                        <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleGetStartedEnterprise}>
                                            Get Started
                                        </Button> 

                                    <Card.Text>Priority Business Listing</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Premium Business Profile</div>
                                            <div><GoCheckCircleFill />Detailed Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address with Interactive Maps</div>
                                            <div><GoCheckCircleFill />Extended Store Hours & Real-Time Availability</div>
                                            <div><GoCheckCircleFill />Advanced Map Integration with Directions</div>
                                            <div><GoCheckCircleFill />Multiple Payment Gateways</div>
                                            <div><GoCheckCircleFill />Comprehensive Links to All Your Business Sites</div>
                                            <div><GoCheckCircleFill />High-Resolution Photo Gallery</div>
                                            <div><GoCheckCircleFill />Professionally Produced Video Content</div>
                                            <div><GoCheckCircleFill />Dedicated Local Website</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <Card.Text>Superior Web Design</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Customized Responsive Design Tailored to Brand Guidelines</div>
                                            <div><GoCheckCircleFill />High-End Aesthetic Features</div>
                                            <div><GoCheckCircleFill />Dynamic Content Elements</div>
                                            <div><GoCheckCircleFill />Personalized User Experience (UX) Design</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <Card.Text>Advanced Digital Marketing and SEO</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Full SEO Audit and Ongoing Optimization</div>
                                            <div><GoCheckCircleFill />Targeted Keyword Implementation</div>
                                            <div><GoCheckCircleFill />Structured Data and Rich Snippets for Enhanced Visibility</div>
                                            <div><GoCheckCircleFill />Local SEO Enhancement for Multi-location Businesses</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <Card.Text>Social Media Management:</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Customized Profiles on All Relevant Platforms (Facebook, X Account, Instagram, TikTok, etc.)</div>
                                            <div><GoCheckCircleFill />Strategic Content Planning and Creation</div>
                                            <div><GoCheckCircleFill />Full Social Media Campaign Management</div>
                                            <div><GoCheckCircleFill />Automated and Targeted Advertising Solutions</div>
                                            <div><GoCheckCircleFill />Performance Analytics and Reporting</div>
                                        </IconContext.Provider>                               
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>

                <Container>
                <hr/>
                <div className='text-center py-lg-5'>
                    <h2>Bookkeeping Services</h2>


                    <p>Embracing paid monthly packages is an invitation to elevate your projects with unwavering support, advanced features, and robust security. These investments empower your production-grade applications, ensuring they thrive with professional reliability, scalability, and peace of mind.</p>

                    <div className="button-section">
                        <div className="custom-btn custom-btn-light d-flex align-items-center">
                            <button
                                className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                onClick={() => handleSelect('annual')}
                            >
                                Annually<span className='lower-case ms-1'>Save up to 10%</span>
                            </button>
                            <button
                                className={`custom-btn ${selected === 'monthly' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                onClick={() => handleSelect('monthly')}
                            >
                                Monthly
                            </button>
                        </div>
                    </div>
                </div>

                    <div className='d-flex flex-wrap justify-content-around pb-5'>

                        <BookkeepingStarter 
                            selected={selected} 
                            packageOne={packageOne} 
                            handleGetStartedClick={handleGetStartedClick} 
                        />

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Advanced Package + Commission per Collection Rep</Card.Title>
                                    <h3 className='card-text-amount'>
                                        ${packageOne} + 30% Commission<p>per month {
                                        selected === 'annual' ?
                                            <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                            <Badge pill bg="light" text="warning">billed monthly</Badge>
                                        }</p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Plus $100 & 30% Commission per Collection Rep</Card.Subtitle>
                                    
                                        <Button variant="warning" className='my-3 full-width-button' onClick={handleGetStartedClickAdvanced}>
                                            Get Started
                                        </Button>           
                                    <Card.Text> Features included:</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>    
                                            <div><GoCheckCircleFill />Payroll</div>
                                            <div><GoCheckCircleFill />5 Users of Accounting & Payroll Software </div>
                                            <div><GoCheckCircleFill />Day to day Management of Accounts</div>
                                            <div><GoCheckCircleFill />Manage Bank Feeds</div>
                                            <div><GoCheckCircleFill />Handle Accounts Payable</div>
                                        </IconContext.Provider> 
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Manage Accounts Receivable*</div>
                                        </IconContext.Provider> 
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Preparing Management Reports and Financial Statements</div>
                                        </IconContext.Provider>                               
                                    </div>
                                    
                                    <div>
                                        <div className='italic-text'>*This includes - Invoicing and Collections within 31 Days and up</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>

                <Payroll />

            </div>

        </div>
        </>
    );
}
