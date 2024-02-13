import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Container, Form, Badge } from 'react-bootstrap';
import { IoMdCheckmark } from "react-icons/io";
import imgOne from '../assets/qr-sample.svg';

import '../assets/styles/VerifyModal.css';


export default function VerifyModal({ showModal, handleModalToggle, user, selected, starterSetup, bundleSetup, transactionDate }) {

    const [ subscriptionPeriod, setSubscriptionPeriod ] = useState(selected || 'monthly');
    const [ showContent, setShowContent ] = useState(false);
    const [ isAgreed, setIsAgreed ] = useState(false);

    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handleTermsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/terms');
    };

    const handlePrivacyClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/privacy');
    };


    const getPrice = () => {
        const basePrice = bundleSetup === 'Starter Setup' ? 49.99 : 99.99;
        let price = subscriptionPeriod === 'annual' ? basePrice * 12 : basePrice;
    
        if (subscriptionPeriod === 'annual') {
            price *= 0.9;
        }
    
        return price;
    };

    const handleSubscriptionChange = (event) => {
        setSubscriptionPeriod(event.target.value);
    };

    const resetContentAndToggleModal = () => {
        setShowContent(false); 
        handleModalToggle(); 
    };

    const handleContinueClick = () => {
        setShowContent(true);
    };

    useEffect(() => {
        setSubscriptionPeriod(selected);
    }, [selected]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const calculateExpirationDate = () => {
        const date = new Date(transactionDate);
        if (bundleSetup === 'Trial') {
            date.setDate(date.getDate() + 15);
        } else {
            if (subscriptionPeriod === 'annual') {
                date.setFullYear(date.getFullYear() + 1);
            } else {
                date.setMonth(date.getMonth() + 1);
            }
        }
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    

    return (
        
    <Modal show={showModal} onHide={resetContentAndToggleModal} centered size="lg">

        <Modal.Header closeButton className="modal-header-sm">
            <h3 className='modalTitle'>{bundleSetup} Bundle with BizSolutions!</h3>
        </Modal.Header>
            
        <Modal.Body>
            <Container>

            <div className='pb-3'>
                <IoMdCheckmark className='modalBodyDivCheck'/> Priority Business Listing <br />
                <IoMdCheckmark className='modalBodyDivCheck'/> Local Website <br />
                {bundleSetup !== 'Trial' && (
                    <>
                        <IoMdCheckmark className='modalBodyDivCheck'/> Social Media Management <br />
                    </>
                )}
            </div>

            <hr />

                {bundleSetup === 'Trial' ? (
                    <div>
                        <p className='modalBodyDivOne'>Trial Price: {formatPrice(5.99)}</p>
                        <p>Note: This is a one-time charge for the 15-day trial period.</p>
                    </div>
                ) : (
                    <Form>
                        <div className="mb-2">
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
                                <div>
                                    <p className='modalBodyDivOne'>
                                        Total Annual Cost: {formatPrice(getPrice())}
                                        <span> ({formatPrice(getPrice() / 12)}/month)</span>
                                    </p>
                                </div>
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
                                <p className='modalBodyDivOne'>{formatPrice(getPrice())}</p>
                            )}
                        </div>
                    </Form>
                )}

                <hr className="dashed-line" />

                <div className='flexContainer'>
                    <div>
                        <p className='modalBodyDivOne'>Due Date: {calculateExpirationDate()}</p>
                    </div>
                    <div>
                        <p className='modalBodyDivOne text-'>Amount: {bundleSetup === 'Trial' ? formatPrice(5.99) : formatPrice(getPrice())}</p>
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

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        required 
                        label={
                            <span>
                                I understand and agree to the 
                                <a onClick={handleTermsClick}><span className='text-secondary'> Terms and Conditions </span></a> 
                                and 
                                <a onClick={handlePrivacyClick}><span className='text-secondary'> Privacy Policy</span></a>.
                            </span>
                        }
                        onChange={handleCheckboxChange}
                        checked={isAgreed}
                    />
                </Form.Group>

                {showContent && (
                    <div className="content-wrapper">
                        <div className="login-image">
                            <img className="img-fluid resized-image" src={imgOne} alt="Web Application" />
                        </div>

                        <p className='note'>
                            <em>
                                *Scan the QR Code and click 'Continue'. Our 
                                <span className="sales-team"> Sales Team </span> 
                                at 
                                <span className="bizsolutions"> BizSolutions </span> 
                                will then contact you at your registered email address.
                                <br/> <br/> 
                                **If you have a preferred payment method, please send us an email to communicate this properly. Our email is 
                                <span className="sales-team"> sales@bizsolutions.com</span>.
                            </em>
                        </p>
                    </div>
                )}

                <Button 
                    variant="success" 
                    style={{ width: '100%' }}
                    onClick={handleContinueClick}
                    disabled={!isAgreed} 
                >
                    Continue
                </Button>


            </Container>
        </Modal.Body>

    </Modal>

    );
};