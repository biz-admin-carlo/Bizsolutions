import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import Footer from '../Shared/Footer/MainFooter.js';
import forgotPasswordImage from '../../../assets/images/img-forgot-password-image.webp';

import '../../../assets/styles/NewLoginInterface.css';


const apiUrl = process.env.REACT_APP_API_URL;

export default function NewLogin() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);


    const authenticate = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.patch(`${apiUrl}/api/v1/users/forgot-password`, {
                email: email,
            });
            
            navigate('/login');

        } catch (error) {
            navigate('/login');
        } 
    };

    return (
        <>
            <div className='app-landing-page'>
                <Container>
                    <div className="login-container">
                        <div className="login-form">
                            <Form onSubmit={authenticate}>
                                <div className='pb-3'>
                                    <h1>Forgot Password</h1>
                                    <h6 className='text-dark'>We will send you an email to reset your password.</h6>
                                </div>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={event => {
                                            setEmail(event.target.value);
                                          }}
                                        
                                    />
                                </Form.Group>
                                
                                <div className='py-5'>
                                    <button type='submit' className="custom-button">Submit</button>
                                </div>

                            </Form>
                        </div>
                        <div className="login-image">
                            <img className="img-fluid" src={forgotPasswordImage} alt="BizSolution LLC Reset Password Interface" />
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};