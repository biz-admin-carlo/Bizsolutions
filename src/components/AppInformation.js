import React, { useState } from 'react';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from './useCountingEffect';
import '../assets/styles/AppInformation.css';

import tiktok from '../assets/tiktok.mp4'
import Typings from './Typings.js'

export default function Pricing() {
    const [ selected, setSelected ] = useState('annual');
    
    const starterSetup = useCountingEffect(selected === 'annual' ? 44.99 : 49.99);
    const advanceSetup = useCountingEffect(selected === 'annual' ? 89.99 : 99.99);

    const packageOne = useCountingEffect(selected === 'annual' ? 990.00 : 1099.99)
    

    const handleSelect = (button) => {
      setSelected(button);
  };
    return (
        <>
        <div className='app-landing-page'>
            <div className='pt-lg-5'>
                <Container className='py-5'>
                <div className="content-container d-flex align-items-center pb-lg-5">
                    <div className="text-section">
                        <h1 className='pt-lg-4 sm-center'>Biz is the Perfect Plan For You</h1>
                                <Typings />

                                <hr />
                            <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                            <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                            <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                            <hr />
                                <p className='paragraph-2 text-center'>No Large Setup Fee. No Ridiculous Contracts. No Hidden Charges. 100% Satisfaction Guaranteed.</p>
                            <hr />
                    </div>

                    <div className="content-container">
                        <video width="320" height="240" controls className="img-fluid d-none d-md-block" src={tiktok}/>
                    </div>
                </div>

                <hr />
                </Container>
            </div>

            <div>
                <Container >
                    <div className='text-center pb-lg-3'>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Free Trial Package</h4>
                    </div>

                    <div className='d-flex flex-wrap justify-content-around'>

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Free Trial</Card.Title>
                                    <h3 className='card-text-amount'>Free</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Initiate Your Business Communications</Card.Subtitle>
                                    <Button variant="warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included:</Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile </div>
                                            <div><GoCheckCircleFill />Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address</div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                        </IconContext.Provider>                               
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>15-Day Trial</Card.Title>
                                    <h3 className='card-text-amount'>$6.99</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Boost Business with Key Features</Card.Subtitle>
                                    <Button variant="outline-warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included:</Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address</div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                        </IconContext.Provider>  
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Embed Videos</div>
                                            <div><GoCheckCircleFill />Photo Gallery</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <h6>Local Website</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Up to 5 pages*</div>
                                            <div><GoCheckCircleFill />1 Business Email</div>
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                            <div><GoCheckCircleFill />Search Engine Optimization (SEO)</div>
                                            <div><GoCheckCircleFill />Free Hosting</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <div>
                                        <div className='italic-text'>* This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
                                    </div>
                                </Card.Body>
                            </Card>
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

                    <div className='d-flex flex-wrap justify-content-around'>

                        <div className='card-container-three'>
                            <Card className='card-shadow'>
                                <Card.Body>
                                    <Card.Title>Starter Setup</Card.Title>
                                    <h3 className='card-text-amount'>
                                        ${starterSetup}<p>per month {
                                        selected === 'annual' ?
                                            <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                            <Badge pill bg="light" text="warning">billed monthly</Badge>
                                        }</p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Elevate Productivity, Unlock Performance</Card.Subtitle>
                                    <Button variant="outline-warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included:</Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address</div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                            <div><GoCheckCircleFill />Embed Videos</div>
                                            <div><GoCheckCircleFill />Photo Gallery</div>
                                        </IconContext.Provider>                               
                                    </div> 

                                    <h6>Local Website</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Up to 5 pages*</div>
                                            <div><GoCheckCircleFill />5 Business Emails</div>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>   
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                            <div><GoCheckCircleFill />Search Engine Optimization (SEO)</div>
                                            <div><GoCheckCircleFill />Free Hosting</div>
                                        </IconContext.Provider> 

                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Ongoing maintenance and support</div>
                                            <div><GoCheckCircleFill />Directory Submissions</div>
                                            <div><GoCheckCircleFill />Standard Security Measures</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <h6>Social Media Management</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Facebook Account </div>
                                            <div><GoCheckCircleFill />X Account </div>
                                            <div><GoCheckCircleFill />Instagram Account</div>
                                            <div><GoCheckCircleFill />Tiktok Account </div>
                                            <div><GoCheckCircleFill />Automated Ads</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <div>
                                        <div className='italic-text'>* This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='card-container-three'>
                            <Card className='card-shadow'>
                                <Card.Body>
                                    <Card.Title>Advanced Setup</Card.Title>
                                    <h3 className='card-text-amount'>
                                        ${advanceSetup}<p>per month {
                                        selected === 'annual' ?
                                            <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                            <Badge pill bg="light" text="warning">billed monthly</Badge>
                                        }</p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Broaden Reach, Enhance Engagement</Card.Subtitle>
                                    <Button variant="warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included:</Card.Text>

                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address</div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                            <div><GoCheckCircleFill />Embed Videos</div>
                                            <div><GoCheckCircleFill />Photo Gallery</div>
                                        </IconContext.Provider>                               
                                    </div> 

                                    <h6>Local Website</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Up to 10 pages*</div>
                                            <div><GoCheckCircleFill />10 Custom Business Emails</div>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>   
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                            <div><GoCheckCircleFill />Search Engine Optimization (SEO)</div>
                                        </IconContext.Provider>  
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
       
                                            <div><GoCheckCircleFill />Hosting with Custom Domain</div>
                                            <div><GoCheckCircleFill />Ongoing maintenance and support</div>
                                            <div><GoCheckCircleFill />Directory Submissions</div>
                                            <div><GoCheckCircleFill />Standard Security Measures</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <h6>Social Media Management</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Facebook Account </div>
                                            <div><GoCheckCircleFill />X Account </div>
                                            <div><GoCheckCircleFill />Instagram Account</div>
                                            <div><GoCheckCircleFill />Tiktok Account </div>
                                            <div><GoCheckCircleFill />Automated Ads</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <div>
                                        <div className='italic-text'>* This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='card-container-three'>
                            <Card className='card-shadow'>
                                <Card.Body>
                                    <Card.Title>Expert Setup</Card.Title>
                                    {/* <h3 className='card-text-amount'>Let's Talk!</h3> */}
                                    <h3 className='card-text-amount'>
                                        Let's Talk!<p>chat with us <Badge pill bg="warning" text="dark"> email@mail.com </Badge></p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Custom Solutions for Peak Potential</Card.Subtitle>
                                    <Button variant="outline-warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included: </Card.Text>

                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information</div>
                                            <div><GoCheckCircleFill />Physical Address</div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                            <div><GoCheckCircleFill />Embed Videos</div>
                                            <div><GoCheckCircleFill />Photo Gallery</div>
                                        </IconContext.Provider>                               
                                    </div> 

                                    <h6>Local Website</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Unlimited pages*</div>
                                            <div><GoCheckCircleFill />30 Custom Business Emails</div>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Advanced Search Engine Optimization (SEO)</div>
                                            <div><GoCheckCircleFill />Hosting with Custom Domain</div>
                                            <div><GoCheckCircleFill />Ongoing maintenance and support</div>
                                            <div><GoCheckCircleFill />Directory Submissions</div>
                                            <div><GoCheckCircleFill />Premium Security Measures</div>
                                            <div><GoCheckCircleFill />Comprehensive e-commerce solutions</div>
                                            <div><GoCheckCircleFill />Integrated Payment Processing System</div>
                                        </IconContext.Provider>                              
                                    </div>

                                    <h6>Social Media Management</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Facebook Account </div>
                                            <div><GoCheckCircleFill />X Account </div>
                                            <div><GoCheckCircleFill />Instagram Account</div>
                                            <div><GoCheckCircleFill />Tiktok Account </div>
                                            <div><GoCheckCircleFill />Automated Ads</div>
                                        </IconContext.Provider>                               
                                    </div>

                                    <div>
                                        <div className='italic-text'>* This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
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

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Starter Package</Card.Title>
                                    <h3 className='card-text-amount'>
                                        ${packageOne}<p>per month {
                                        selected === 'annual' ?
                                            <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                            <Badge pill bg="light" text="warning">billed monthly</Badge>
                                        }</p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Payroll $8 per employees/Month</Card.Subtitle>
                                    <Button variant="outline-warning" className='my-3 full-width-button'>Get Started</Button>
                                    <Card.Text> Features included:</Card.Text>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Payroll</div>
                                            <div><GoCheckCircleFill />5 Users of Accounting & Payroll Software </div>
                                            <div><GoCheckCircleFill />Day to day Management of Accounts</div>
                                            <div><GoCheckCircleFill />Manage Bank Feeds</div>
                                            <div><GoCheckCircleFill />Handle Accounts Payable</div>
                                            <div><GoCheckCircleFill />Manage Accounts Receivable*</div>
                                            <div><GoCheckCircleFill />Preparing Management Reports and Financial Statements</div>
                                        </IconContext.Provider>                               
                                    </div>
                                    
                                    <div>
                                        <div className='italic-text'>*This includes - Invoicing and Collections within 30 Days</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='card-container'>
                            <Card className='card-shadow'>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Advanced Package + Commission per Collection Rep</Card.Title>
                                    <h3 className='card-text-amount'>
                                        ${packageOne} + 30% Commission<p>per month{
                                        selected === 'annual' ?
                                            <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                            <Badge pill bg="light" text="warning">billed monthly</Badge>
                                        }</p>
                                    </h3>
                                    <Card.Subtitle className="mb-2 text-muted">Plus $100 & 30% Commission per Collection Rep</Card.Subtitle>
                                    <Button variant="warning" className='my-3 full-width-button'>Get Started</Button>
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
            </div>

        </div>
        </>
    );
}
