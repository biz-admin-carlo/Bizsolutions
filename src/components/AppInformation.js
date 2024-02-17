import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from './useCountingEffect';
import '../assets/styles/AppInformation.css';

import tiktok from '../assets/tiktok.mp4'
import Typings from './Typings.js'
import BundleStarter from './BundleStarter.js';
import BundleAdvanced from './BundleAdvanced.js';
import BundleExpert from './BundleExpert.js';
import FreeTrial from './FreeTrial.js';
import Trial15 from './Trial15.js';
import BookkeepingStarter from './BookkeepingStarter.js';

export default function Pricing() {
    const [ selected, setSelected ] = useState('annual');
    const navigate = useNavigate();

    const packageOne = useCountingEffect(selected === 'annual' ? 989.99 : 1099.99);
    

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
    
    const handleSelect = (button) => {
      setSelected(button);
  };
    return (
        <>
        <div className='app-landing-page-pricing'>
            <div className='pt-lg-5'>
                <Container className='py-5'>
                <div className="content-container d-flex align-items-center pb-lg-5">
                    <div className="text-section">
                        <h1 className='pt-lg-4 sm-center'>Unlock Your Business's Full Potential with Biz</h1>
                                <Typings />

                                <hr />
                            <p className="pt-2 pb-lg-3 sm-center">In today's fast-paced business environment, having the right partner can make all the difference.</p>
                            <p className="pt-2 pb-lg-3 sm-center">An online platform that prioritizes providing information about local businesses, including restaurants, bars, cafes, hotels, shops, salons, and more, in addition to user-generated reviews and ratings.</p>
                            <p className="pt-2 pb-lg-3 sm-center">That's where "Biz" comes in. Tailored to meet the unique needs of your business, "Biz" is more than just a plan; it's your pathway to success. Discover why "Biz" is the perfect choice for entrepreneurs who demand excellence and innovation.</p>
                            <hr />
                                <p className='paragraph-2 text-center'>No Large Setup Fee. No Ridiculous Contracts. No Hidden Charges. 100% Satisfaction Guaranteed.</p>
                            <hr />
                    </div>

                    <div className="content-container">
                        <video width="320" height="240" className="img-fluid" src={tiktok} autoPlay loop></video>

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

                        {/* <div className='card-container'>
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
                                        
                                        <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleGetStartedClick}>
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
                                            <div><GoCheckCircleFill />Manage Accounts Receivable*</div>
                                            <div><GoCheckCircleFill />Preparing Management Reports and Financial Statements</div>
                                        </IconContext.Provider>                               
                                    </div>
                                    
                                    <div>
                                        <div className='italic-text'>*This includes - Invoicing and Collections within 30 Days</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div> */}
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
            </div>

        </div>
        </>
    );
}
