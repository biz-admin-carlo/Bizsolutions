import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import AppFooter from './Application_Footer';
import imgOne from '../assets/img-app-landing-banner.png';
import UserContext from '../UserContext';
import BarSpinner from './Reusable_BarSpinner';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import '../assets/styles/NewLoginInterface.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AdminLogin() {

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate(`/home`);
        }
    }, [navigate]);

    const authenticate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/api/v1/users/admin-login`, {
                email: email,
                password: password
            });

            const result = response.data;
            
            if (result.accessToken) {
                window.location.reload();
                sessionStorage.setItem('token', result.accessToken);
                navigate(`/admin-dashboard/${result.userId}/`);

            } else if (result.code === 1) {
                setMessage('Missing required fields.');
            }  else if (result.code === 2) {
                setMessage('Invalid email!');
            } else if (result.code === 3) {
                setMessage('Account is inactive.');
            } else if (result.code === 4) {
                setMessage('Please provide the correct password!');
            } else {
                setMessage('Access denied. Not an admin.');
            };

            
        } catch (error) {
                // console.error('An error occurred during authentication:', error);
            navigate('/admin-login');
            setMessage('Access denied. Not an admin.');

        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? 

        <BarSpinner />
        :
        <>
            <div className='app-landing-page'>
                <Container>
                    <div className="login-container">
                        <div className="login-form">
                            <Form onSubmit={authenticate}>
                                <div className='pb-3'>
                                    <h1>Login</h1>
                                    <h6 className='text-danger'>{message}</h6>
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

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <div style={{ position: 'relative' }}>
                                        <Form.Control
                                            required
                                            type={isPasswordVisible ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        >
                                            {isPasswordVisible ? <PiEyeSlash /> : <PiEye />}
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Do you remember me?" />
                                </Form.Group>

                                <button type='submit' className="custom-button" disabled={message !== ''}>Login</button>

                            </Form>
                        </div>
                        <div className="login-image">
                            <img className="img-fluid" src={imgOne} alt="BizSolutions LLC Login Interface Image " />
                        </div>
                    </div>
                </Container>
            </div>
            <AppFooter />
        </>
    );
};