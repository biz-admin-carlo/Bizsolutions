import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import Footer from '../Shared/Footer/MainFooter.js';
import landingImage from '../../../assets/images/img-app-landing-banner.png';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import '../../../assets/styles/NewLoginInterface.css';
import { loginUser } from '../../../utils/Biz/UserUtils.js';

export default function Login() {
    const navigate = useNavigate();
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const authenticate = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            const result = await loginUser(email, password);
    
            if (result.accessToken) {
                localStorage.setItem('token', result.accessToken);
    
                const loginTime = new Date().toISOString();
                localStorage.setItem('loggedInTime', loginTime);
    
                window.location.reload();
                navigate('/');
            } else if (result.status === 403) {
                setMessage('Account is already inactive.');
            } else {
                setMessage('Password is incorrect!');
            }
        } catch (error) {
            setMessage('Password is incorrect!');
            navigate('/login');
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
                                
                                <div className='py-3 text-container-login'>
                                    <h6 className='text-secondary'>
                                        <span 
                                            className="dotted-underline"
                                            onClick={() => navigate('/forgot-password')}
                                        >
                                            Forgot Password?
                                        </span>
                                    </h6>

                                    <h6 className='text-secondary'>
                                        <span 
                                            className="dotted-underline"
                                            onClick={() => navigate('/sign-up')}
                                        >
                                            Sign-Up?
                                        </span>
                                    </h6>
                                </div>

                                <button type='submit' className="custom-button" disabled={message !== ''}>Login</button>

                            </Form>
                        </div>
                        <div className="login-image">
                            <img className="img-fluid" src={landingImage} alt="BizSolutions LLC Login Interface" />
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};