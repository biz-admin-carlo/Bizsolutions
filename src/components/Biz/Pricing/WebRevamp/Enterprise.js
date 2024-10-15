import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import Axios from 'axios';

import '../../../../assets/styles/AppInformation.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function ProfessionalRevamp({ selected }) {

    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const handleGetStartedEnterprise = () => {
        const token = localStorage.getItem('token');
        if (token)  {
            const subject = encodeURIComponent("Interest in Enterprise Revamp Package");
            const body = encodeURIComponent("I am interested in the Enterprise Revamp Package. Please provide me with more information.");

            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login/pricing'); 
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

    return (
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
    );
};