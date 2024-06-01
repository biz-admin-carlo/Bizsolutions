import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Collapse } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
// import VerifyModal from './VerifyModal';
import Axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Trial15() {

    const [ user, setUser ] = useState({});
    const [ paymentStatus, setPaymentStatus ] = useState('');

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
            return; 
        }
    
        // const trialUrl = "https://keap.app/checkout/dyb285/15-day-trial";
        const trialUrl = "https://buy.stripe.com/cN2eWa4IjcJNbiofZ0"
        window.location.href = trialUrl;
    };
    

    if (paymentStatus === 'success') {
        return <div>Payment Successful! Thank you.</div>;
    } else if (paymentStatus === 'failed') {
        return <div>Payment Failed. Please try again.</div>;
    }

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
            // console.error('Failed to fetch user details');
          }
        } catch (error) {
          // console.error('Error:', error);
        }
    };

    const featureList = [
        {
            title: "Priority Business Listing",
            color: "green",
            features: [
                "Business Profile",
                "Contact Information",
                "Physical Address",
                "Store Hours and Availability",
                "Map Integration",
                "Payment Methods Accepted",
                "Links to Your Other Sites",
            ]
        },
        {
            title: "Local Website",
            color: "orange",
            features: [
                "Up to 5 pages*",
                "1 Business Email",
                "Responsive design",
                "Social Media Links",
                "Search Engine Optimization (SEO)",
                "Free Hosting",
            ]
        }
    ];

    return (
        <Card className='card-shadow'>
            <Card.Body className='ms-3'>
                <Card.Title>15-Day Trial</Card.Title>
                <h3 className='card-text-amount'>$5.99</h3>
                <Card.Subtitle className="mb-2 text-muted">Boost Business with Key Features</Card.Subtitle>

                <Button variant="warning" className='my-3 full-width-button' onClick={handleModalToggle}>Get Started</Button>
                
                <Collapse in={open}>
                    <div>
                    <Card.Text> Features included:</Card.Text>
                        {featureList.map((section, index) => (
                            <div key={index}>
                                <h6>{section.title}</h6>
                                <div className='pb-5'>
                                    <IconContext.Provider value={{ color: section.color, className: "me-2" }}>
                                        {section.features.map((feature, featureIndex) => (
                                            <div key={featureIndex}><GoCheckCircleFill />{feature}</div>
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
}
