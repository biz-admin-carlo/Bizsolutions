import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import useCountingEffect from './useCountingEffect';
import '../assets/styles/AppInformation.css';
import VerifyModal from './VerifyModal';

import Axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default function BundleAdvanced({ selected }) {
    const advanceSetup = useCountingEffect(selected === 'annual' ? 89.99 : 99.99);

    const [ transactionDate, setTransactionDate ] = useState(null);

    const [ showModal, setShowModal ] = useState(false);
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
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const handleModalToggle = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login/pricing');
        } else if (!user.isAdmin) {
            setTransactionDate(new Date());
            setShowModal(!showModal);
        }
    };

    const formatDateToPacificTime = (date) => {
        if (!date) return '';
        
        return date.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatPrice = (price) => {
        return price.toFixed(2);
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
                { name: "Embeded Videos", color: "green" },
                { name: "Photo Gallery", color: "green" },
            ]
        },
        { 
            title: "Local Website", 
            features: [
                { name: "Up to 10 pages*", color: "orange" },
                { name: "10 Custom Business Emails", color: "orange" },
                { name: "Responsive design", color: "green" },
                { name: "Social Media Links", color: "green" },
                { name: "Search Engine Optimization (SEO)", color: "green" },
                { name: "Hosting with Custom Domain", color: "orange" },
                { name: "Ongoing Maintenance and Support", color: "orange" },
                { name: "Directory Submissions", color: "orange" },
                { name: "Standard Security Measures", color: "orange" },
                { color: "white" },
                { color: "white" },
            ]
        },
        { 
            title: "Social Media Management", 
            features: [
                { name: "Facebook Account", color: "orange" },
                { name: "X Account", color: "orange" },
                { name: "Instagram Account", color: "orange" },
                { name: "Tiktok Account", color: "orange" },
                { name: "Automated Ads", color: "orange" },
            ]
        },
    ];

    return (
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
                <Button variant="warning" className='my-3 full-width-button' onClick={handleModalToggle}>Get Started</Button>
                <Card.Text> Features included:</Card.Text>
                
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

                <div>
                    <div className='italic-text'>*This includes Home Page, About Us Page, Services Page, Blog Page, Contract Page</div>
                </div>

                <VerifyModal 
                    showModal={showModal}
                    handleModalToggle={handleModalToggle}
                    user={user}
                    selected={selected}
                    starterSetup={advanceSetup}
                    bundleSetup="Advanced Setup"
                    transactionDate={transactionDate}
                />

            </Card.Body>
        </Card>
    );
};