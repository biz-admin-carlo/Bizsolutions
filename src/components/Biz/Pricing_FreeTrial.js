import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Collapse } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import Axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default function FreeTrialCard() {

    const [ setUser ] = useState({});
    const navigate = useNavigate();

    const isScreenSmall = () => {
        return window.innerWidth < 768;
    };

    const [ open, setOpen ] = useState(!isScreenSmall());

    useEffect(() => {
        const handleResize = () => {
            setOpen(!isScreenSmall());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const handleModalToggle = () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login/pricing');
        } else {
            navigate('/my-biz');
        }
    };
    
        

    const fetchUserDetails = async (token) => {
        try {
          const response = await Axios.get(`${apiUrl}/api/v1/users/details`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {

        }
      };

    const featureList = [
        { 
            title: "Priority Business Listing", 
            features: [
                { name: "Business Profile", color: "green" },
                { name: "Contact Information", color: "green" },
                { name: "Physical Address", color: "green" },
                { name: "Store Hours & Availability", color: "green" },
                { name: "Map Integration", color: "green" },
                { name: "Different Payment Methods", color: "green" },
                { name: "Links to Your Other Sites", color: "green" },
            ]
        },
    ];

    return (
            <Card className='card-shadow'>
                <Card.Body className='ms-3'>
                    <Card.Title>Free Trial</Card.Title>
                    <h3 className='card-text-amount'>Free</h3>
                    <Card.Subtitle className="mb-2 text-muted">Initiate Your Business With Us</Card.Subtitle>

                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleModalToggle}>Get Started</Button>
                    
                    {/* Collapsible Section */}
                    <Collapse in={open}>
                        <div>
                        <Card.Text> Features included:</Card.Text>
                            {featureList.map((section, index) => (
                                <div key={index}>
                                    <h6>{section.title}</h6>
                                    <div className='pb-5'>
                                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                            {section.features.map((feature, featureIndex) => (
                                                <div key={featureIndex}><GoCheckCircleFill />{feature.name}</div>
                                            ))}
                                        </IconContext.Provider>                               
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
                </Card.Body>
            </Card>
    );
};