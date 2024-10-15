import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Collapse } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { IconContext } from "react-icons";
import Axios from 'axios';

import '../../../../assets/styles/AppInformation.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function BundleExpert() {
    const [ open, setOpen ] = useState(false);
    
    const [ setUser] = useState({});
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

    const handleGetStartedClick = () => {
        const token = localStorage.getItem('token');
        if (token)  {
            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=Interest in Human Resources Payroll Pemium Setup&body=I am interested in the Human Resources Payroll Pemium Setup. Please provide me with more information.`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
        }
    };

    const featureList = [
        { 
            features: [
                { name: "Dedicated Customer Success Manager", color: "orange" },
                { name: "HR Resource Center Access", color: "green" },
                { name: "Compliance Alert System", color: "green" },
                { name: "Certified HR Experts Access", color: "green" },
                { name: "Complete Payroll Migration & Setup", color: "green" },
                { name: "Health Insurance Broker Integration", color: "green" },
                { name: "R&D Tax Credit Discount", color: "green" },
                { name: "Waived Fees & Exclusive Pricing", color: "green" },
                { name: "Priority Support Access", color: "green" }
            ]
        }
    ];

    return (
        <>
        <Card className='card-shadow'>
            <Card.Body>
                <Card.Title>Premium Setup</Card.Title>
                <h3 className='card-text-amount'>
                    Let's Talk!<p><Badge pill bg="warning" text="dark">supportus@mybizsolutions.us</Badge></p>
                </h3>
                <Card.Subtitle className="mb-2 text-muted">Scalable HR for Growing Teams</Card.Subtitle>

                {/* Button and collapsible for sm screens */}
                <div className="d-block d-md-none">
                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleGetStartedClick}>
                        Get Started
                    </Button>

                    <Collapse in={open}>
                        <div id="collapse-features-sm">
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
                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleGetStartedClick}>
                        Get Started
                    </Button>
                    
                    <Card.Text>Everything in the <span className='biz-color'>Plus Plan</span>, plus:</Card.Text>
                
                    {featureList.map((section, index) => (
                        <div key={index}>
                            <h6>{section.title}</h6>
                            <div className='pb-3'>
                                {section.features.map((feature, featureIndex) => (
                                    <IconContext.Provider key={featureIndex} value={{ color: feature.color, className: "me-2" }}>
                                        <div><GoCheckCircleFill />{feature.name}</div>
                                    </IconContext.Provider>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
                
            </Card.Body>
        </Card>
        </>
    );
}
