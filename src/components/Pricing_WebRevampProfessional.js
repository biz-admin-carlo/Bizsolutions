import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from 'react-icons/go';
import { IconContext } from 'react-icons';

const WebRevampProfessional = ({ selected, packageOne, handleGetStartedClick }) => {

    const navigate = useNavigate();

    const handleModalToggle = () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            navigate('/login/pricing');
            return; 
        }
    
        const stripePaymentLinks = {
            monthly: "https://buy.stripe.com/14kcO23Ef39d728eUX",
            annual: "https://buy.stripe.com/7sIaFU1w76lp0DKbIR"
        };
    
        const paymentUrl = stripePaymentLinks[selected];
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } else {
            // console.error('Invalid subscription type selected');
        }
    };

    return (
        <div className='card-container'>
            <Card className='card-shadow'>
                <Card.Body className='ms-3'>
                    <Card.Title>Professional Package</Card.Title>
                    <h3 className='card-text-amount'>
                        ${packageOne}<p>per month {
                            selected === 'annual' ?
                                <Badge pill bg="warning" text="dark">billed annually</Badge> :
                                <Badge pill bg="light" text="warning">billed monthly</Badge>
                        }</p>
                    </h3>
                        
                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleModalToggle}>
                        Get Started
                    </Button>

                    <Card.Text>Priority Business Listing</Card.Text>
                    <div className='pb-5'>
                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                            <div><GoCheckCircleFill />Business Profile</div>
                            <div><GoCheckCircleFill />Contact Information</div>
                            <div><GoCheckCircleFill />Physical Address</div>
                            <div><GoCheckCircleFill />Store Hours & Availability</div>
                            <div><GoCheckCircleFill />Map Integration</div>
                            <div><GoCheckCircleFill />Different Payment Methods</div>
                            <div><GoCheckCircleFill />Links to Your Other Sites</div>
                            <div><GoCheckCircleFill />Embeded Videos</div>
                            <div><GoCheckCircleFill />Photo Gallery</div>
                        </IconContext.Provider>                               
                    </div>

                    <Card.Text>Local Website</Card.Text>
                    <div className='pb-5'>
                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                            <div><GoCheckCircleFill />Responsive design</div>
                            <div><GoCheckCircleFill />Social Media Links</div>
                            <div><GoCheckCircleFill />Search Engine Optimization (SEO)</div>
                            <div><GoCheckCircleFill />Free Hosting</div>
                            <div><GoCheckCircleFill />Ongoing Maintenance and Support</div>
                            <div><GoCheckCircleFill />Directory Submissions</div>
                            <div><GoCheckCircleFill />Standard Security Measures</div>
                            <div><GoCheckCircleFill />Unlimited Changes</div>
                        </IconContext.Provider>                               
                    </div>

                    <Card.Text>Social Media Management:</Card.Text>
                    <div className='pb-5'>
                        <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                            <div><GoCheckCircleFill />Facebook Account</div>
                            <div><GoCheckCircleFill />X Account</div>
                            <div><GoCheckCircleFill />Instagram Account</div>
                            <div><GoCheckCircleFill />Tiktok Account</div>
                            <div><GoCheckCircleFill />Automated Ads</div>
                        </IconContext.Provider>                               
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default WebRevampProfessional;
