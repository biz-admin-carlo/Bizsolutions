import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from 'react-icons/go';
import { IconContext } from 'react-icons';

const BookkeepingStarter = ({ selected, packageOne, handleGetStartedClick }) => {

    const navigate = useNavigate();

    const handleModalToggle = () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login/pricing');
            return; 
        }
    
        const stripePaymentLinks = {
            monthly: "https://buy.stripe.com/3cs15kcaLdNR86c7sY",
            annual: "https://buy.stripe.com/bIYeWa4Ij39daekfZx"
        };

        // const keapPaymentLinks = {
        //     monthly: "https://keap.app/checkout/dyb285/starter-package-monthly",
        //     annual: "https://keap.app/checkout/dyb285/starter-package-annual"
        // };
    
        const paymentUrl = stripePaymentLinks[selected];
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } 
    };

    return (
        <div className='card-container'>
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
                    <Card.Subtitle className="mb-2 text-muted">Payroll $12 per employees/Month</Card.Subtitle>
                        
                    <Button variant="outline-warning" className='my-3 full-width-button' onClick={handleModalToggle}>
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
        </div>
    );
};

export default BookkeepingStarter;
