import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, Button, Badge, Collapse } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { IconContext } from "react-icons";
import useCountingEffect from './Pricing_TypingEffect';
import Axios from 'axios';

import '../../assets/Biz/styles/AppInformation.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function BundleStarter({ selected }) {

    const starterSetup = useCountingEffect(selected === 'annual' ? 71.99 : 79.99 );

    const [ open, setOpen ] = useState(false);

    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
          const response = await Axios.get(`${apiUrl}/api/v1/users/details`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setUser(response.data);

          } else {

        }
        } catch (error) {

        }
      };

    const handleModalToggle = () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login/pricing');
            return; 
        }
    
        const stripePaymentLinks = {
            monthly: "https://buy.stripe.com/00gaFU7UvcJN1HOcNb",
            annual: "https://buy.stripe.com/28odS6fmX39d5Y414s"
        };

        // const keapPaymentLinks = {
        //     monthly: "https://keap.app/checkout/dyb285/simple-payroll-monthly",
        //     annual: "https://keap.app/checkout/dyb285/simple-payroll-annual"
        // };
    
        const paymentUrl = stripePaymentLinks[selected];
        if (paymentUrl) {
            window.location.href = paymentUrl;
        }
    };
    
    const featureList = [
        { 
            features: [
                { name: "Free 5 Users", color: "green" },
                { name: "Complete Single-State Payroll Solution", color: "green" },
                { name: "Comprehensive Support", color: "green" },
                { name: "Employee Self-Service Profiles", color: "green" },
                { name: "Essential Hiring & Onboarding Tools", color: "green" },
                { name: "Managed Health Insurance Admin", color: "green" },
                { name: "Employee Financial Benefits", color: "green" },
                { name: "Payroll & Time-Off Reporting", color: "green" },
                { name: "Customizable Admin Permissions", color: "green" },
                { name: "Versatile Integration Capabilities", color: "green" },
                { name: "Priority Support & HR Resources - Additional $12/Employee", color: "orange" },
            ]
        }
    ];

    return (
        <Card className='card-shadow'>
            <Card.Body>
                <Card.Title>Simple Setup</Card.Title>
                <h3 className='card-text-amount'>
                    ${starterSetup}<p>per month {
                    selected === 'annual' ?
                        <Badge pill bg="warning" text="dark">billed annually</Badge> :
                        <Badge pill bg="light" text="warning">billed monthly</Badge>
                    }</p>
                </h3>
                <Card.Subtitle className="mb-2 text-muted">Automated Payroll and Benefits</Card.Subtitle>

                {/* Collapsible Section for sm screens */}
                <div className="d-block d-md-none">
                    <Button 
                        variant="outline-warning" 
                        className='my-3 full-width-button' 
                        onClick={handleModalToggle}
                        aria-controls="collapse-features-advanced-sm"
                        aria-expanded={open}
                    >
                        Get Started
                    </Button>

                    <Collapse in={open}>
                        <div id="collapse-features-advanced-sm">
                        <Card.Text> Plan Details: </Card.Text>

                                {featureList.map((section, index) => (
                                    <div key={index}>
                                        <h6>{section.title}</h6>
                                        <div className='pb-5'>
                                            {section.features.map((feature, featureIndex) => (
                                                <IconContext.Provider key={featureIndex} value={{ color: feature.color, className: "me-2" }}>
                                                    <div><GoCheckCircleFill />{feature.name}</div>
                                                </IconContext.Provider>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Collapse>
                                        
                    <div className='text-center'>
                        <Button 
                            variant="link" 
                            onClick={() => setOpen(!open)}
                            className="view-more-button text-decoration-none text-secondary"
                        >
                            {open ? 
                                <>View Less <IoMdArrowDropup className={`icon-transition ${open ? 'icon-up' : 'icon-down'}`} /></> : 
                                <>View More <IoMdArrowDropdown className={`icon-transition ${open ? 'icon-down' : 'icon-up'}`} /></>
                            }
                        </Button>           
                    </div>
                </div>

                {/* Regular display for md and larger screens */}
                <div className="d-none d-md-block">
                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleModalToggle}>Get Started</Button>

                    <Card.Text> Features included:</Card.Text>

                    {featureList.map((section, index) => (
                        <div key={index}>
                            <h6>{section.title}</h6>
                            <div className='pb-3'>
                                {section.features.map((feature, featureIndex) => (
                                    <IconContext.Provider key={featureIndex} value={{ color: feature.color, className: "me-2" }}>
                                        <div className='card-text-payroll'><GoCheckCircleFill />{feature.name}</div>
                                    </IconContext.Provider>
                                ))}
                            </div>
                        </div>
                    ))}
            
                </div>

            </Card.Body>
        </Card>
    );
};