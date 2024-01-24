import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import '../assets/styles/AppInformation.css';

export default function Pricing() {
    const [ selected, setSelected ] = useState('annual');

    const handleSelect = (button) => {
      setSelected(button);
  };
    return (
        <>
        <div className='app-landing-page'>
            <div className='py-5'>
                <Container className='py-3'>
                    <div className="content-container">
                        <div className="text-section">
                            <h1 className='pt-lg-4'>Biz is the Perfect Plan For You</h1>
                            <p className="pt-2">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                        </div>
                        <div className="button-section">
                            <div className="custom-btn custom-btn-light">
                                <button
                                    className={`custom-btn ${selected === 'annual' ? 'custom-btn-selected' : 'custom-btn-secondary'}`}
                                    onClick={() => handleSelect('annual')}
                                >
                                    Annually<span className='lower-case ms-1'>Save up to 35%</span>
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

                    <hr />
                </Container>
            </div>

            <div>
                <Container >
                    <div className='text-center py-3'>
                        <h2>Business Listing & Website Development</h2>
                        <h4>Free Trial Package</h4>
                    </div>

                    <Row>
                        <Col lg={2}>
                        
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Body className='ms-3'>
                                    <Card.Title>Free Trial</Card.Title>
                                    <h3>Free</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Get started with your customer communications</Card.Subtitle>
                                    <Button variant="secondary" className='my-3'>Get Started</Button>
                                    <Card.Text> Features included </Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile <IoInformationCircleOutline /></div>
                                            <div><GoCheckCircleFill />Contact Information (Phone and Email)<IoInformationCircleOutline /></div>
                                            <div><GoCheckCircleFill />Physical Address <IoInformationCircleOutline /></div>
                                            <div><GoCheckCircleFill />Store Hours and Availability</div>
                                            <div><GoCheckCircleFill />Map Integration</div>
                                            <div><GoCheckCircleFill />Payment Methods Accepted</div>
                                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                                        </IconContext.Provider>                               
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card>
                                <Card.Body className='ms-3'>
                                    <Card.Title>15-Day Trial</Card.Title>
                                    <h3>$6.99</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Empower teams with advanced features & integrations</Card.Subtitle>
                                    <Button variant="warning" className='my-3'>Get Started</Button>
                                    <Card.Text> All features of Free Trial & </Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information (Phone and Email)</div>
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
                                            <div><GoCheckCircleFill />Up to 5 pages (Home, About Us, Services, Blog, Contact)</div>
                                            <div><GoCheckCircleFill />Business Email: 1</div>
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                            <div><GoCheckCircleFill />Search Engine Optimization (SEO)</div>
                                            <div><GoCheckCircleFill />Free Hosting</div>
                                        </IconContext.Provider>                               
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={2}>
                        
                        </Col>
                    </Row>
                    <hr />
                    <div className='text-center py-3'>
                        <h4>Monthly Package</h4>
                    </div>

                    <Row>
                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Starter Setup</Card.Title>
                                    <h3>$49.99/Month</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Unlock peak performance & accelerate productivity</Card.Subtitle>
                                    <Button variant="secondary" className='my-3'>Get Started</Button>
                                    <Card.Text> All features of 15-Day Trial & </Card.Text>
                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information (Phone and Email)</div>
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
                                            <div><GoCheckCircleFill />Up to 5 pages (Home, About Us, Services, Blog, Contact)</div>
                                            <div><GoCheckCircleFill />Business Email: 5</div>
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
                                            <div><GoCheckCircleFill />Security Measures: Standard</div>
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
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Starter Setup</Card.Title>
                                    <h3>$99.99/Month</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Unlock peak performance & accelerate productivity</Card.Subtitle>
                                    <Button variant="warning" className='my-3'>Get Started</Button>
                                    <Card.Text> Features included </Card.Text>

                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information (Phone and Email)</div>
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
                                            <div><GoCheckCircleFill />Up to 10 pages (Home, About Us, Services, Blog, Contact)</div>
                                            <div><GoCheckCircleFill />Business Email: 10 Custom Email</div>
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
                                            <div><GoCheckCircleFill />Security Measures: Standard</div>
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
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Custom Enterprise Setup Contact Sales</Card.Title>
                                    <h3>Talk to Us</h3>
                                    <Card.Subtitle className="mb-2 text-muted">Unlock peak performance & accelerate productivity</Card.Subtitle>
                                    <Button variant="secondary" className='my-3'>Get Started</Button>
                                    <Card.Text> Features included </Card.Text>

                                    <h6>Priority Business Listing</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Business Profile</div>
                                            <div><GoCheckCircleFill />Contact Information (Phone and Email)</div>
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
                                            <div><GoCheckCircleFill />Unlimited pages (Home, About Us, Services, Blog, Contact)</div>
                                            <div><GoCheckCircleFill />Business Email: 30 (Custom Email)</div>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Responsive design</div>
                                            <div><GoCheckCircleFill />Social Media Links</div>
                                            <div><GoCheckCircleFill />Search Engine Optimization (SEO): Advanced</div>
                                            <div><GoCheckCircleFill />Custom Domain</div>
                                            <div><GoCheckCircleFill />Ongoing maintenance and support</div>
                                            <div><GoCheckCircleFill />Directory Submissions</div>
                                        </IconContext.Provider> 
                                        <IconContext.Provider value={{ color: "orange", className: "me-2" }}>
                                            <div><GoCheckCircleFill />Security Measures: Premium</div>
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

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
        </>
    );
}
