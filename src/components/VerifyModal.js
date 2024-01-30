import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Form, Badge } from 'react-bootstrap';
import { IoMdCheckmark } from "react-icons/io";

import '../assets/styles/VerifyModal.css';


export default function VerifyModal({ showModal, handleModalToggle, user, selected, starterSetup, bundleSetup, transactionDate }) {

    console.log(user);

    const [ subscriptionPeriod, setSubscriptionPeriod ] = useState(selected || 'monthly');

    const handleSubscriptionChange = (event) => {
        setSubscriptionPeriod(event.target.value);
    };

    useEffect(() => {
        setSubscriptionPeriod(selected);
    }, [selected]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const calculateExpirationDate = () => {
        const date = new Date(transactionDate);
        if (subscriptionPeriod === 'annual') {
            date.setFullYear(date.getFullYear() + 1);
        } else {
            date.setMonth(date.getMonth() + 1);
        }
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
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

    return (
        <Modal show={showModal} onHide={handleModalToggle} centered size="lg">
            <Modal.Body>
            <h3 className='modalTitle'>{bundleSetup} Bundle with BizSolutions!</h3>
            <hr />
                <Container>

                    <div className='pb-3'>
                        <IoMdCheckmark className='modalBodyDivCheck'/> Priority Business Listing <br />
                        <IoMdCheckmark className='modalBodyDivCheck'/> Local Website <br />
                        <IoMdCheckmark className='modalBodyDivCheck'/> Social Media Management <br />
                    </div>

                <hr />

                    <Form>
                        <div className="mb-3">
                            <Form.Check 
                                type="radio"
                                id="annual-option"
                                name="subscription-period"
                                value="annual"
                                label={<span>Annually <Badge bg="danger">Best Value - Save $120</Badge></span>}
                                onChange={handleSubscriptionChange}
                                checked={subscriptionPeriod === 'annual'}
                            />
                            {subscriptionPeriod === 'annual' && (
                                <p className='modalBodyDivOne'>{formatPrice(starterSetup * 12)} <span>({formatPrice(starterSetup)}/month)</span></p>
                            )}
                        </div>
                        <div className="mb-3">
                            <Form.Check 
                                type="radio"
                                id="monthly-option"
                                name="subscription-period"
                                label="Monthly"
                                value="monthly"
                                onChange={handleSubscriptionChange}
                                checked={subscriptionPeriod === 'monthly'}
                            />
                            {subscriptionPeriod === 'monthly' && (
                                <p className='modalBodyDivOne'>{formatPrice(starterSetup)}</p>
                            )}
                        </div>
                        
                        <hr className="dashed-line" />


                        <div className='flexContainer'>
                            <div>
                                <p className='modalBodyDivOne'>Due Date: {calculateExpirationDate()}</p>
                            </div>
                            <div>
                                <p className='modalBodyDivOne text-'>Amount: {formatPrice(subscriptionPeriod === 'annual' ? starterSetup * 12 : starterSetup)}</p>
                            </div>
                        </div>
                        <div className='flexContainer'>
                            <div>
                                <p className='modalBodyDivOne'> {user.firstName} {user.lastName} </p>
                            </div>
                            <div>
                                <p className='modalBodyDivOne'> {user.email}</p>
                            </div>
                        </div>

                        <Button variant="success" style={{ width: '100%' }}>Continue</Button>
                    </Form>

                </ Container>
            </Modal.Body>
        </Modal>
    );
};