import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from '../TypingEffects/Amount.js';

import BookkeepingStarter from '../Bookkeeping/Starter.js';

import '../../../../assets/styles/AppInformation.css';

const Pricing_SectionB = () => {
    const [ loadVideo, setLoadVideo ] = useState(false);
    const [ selected, setSelected ] = useState('annual');

    const packageOne = useCountingEffect(selected === 'annual' ? 989.99 : 1099.99);

    const navigate = useNavigate();

    const handleSelect = (button) => {
        setSelected(button);
    };

    const handleGetStartedClick = () => {
        const token = localStorage.getItem('token');
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
        const token = localStorage.getItem('token');
        if (token)  {
            const subject = encodeURIComponent("Interest in Advanced Package + Commission per Collection Rep");
            const body = encodeURIComponent("I am interested in the Advanced Package + Commission per Collection Rep. Please provide me with more information.");

            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
        }
    };

    useEffect(() => {
        setLoadVideo(true);
    }, []);

    return (
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
    );
};

export default Pricing_SectionB;