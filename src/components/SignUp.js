import '../assets/styles/SignUp.css'
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { Form, Modal, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import imgTwo from '../assets/app-home-banner.png';
import BarSpinner from '../components/BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function NewSignUp() {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ showSuccessModal, setShowSuccessModal ] = useState(false);
    const [ captchaValue, setCaptchaValue ] = useState(null); // For Captcha Integration
    
    const navigate = useNavigate();

    const checkEmail = async (email) => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/users/check-email/${email}`);
            if (response.data.exists === true) {
                setMessage("The email address you entered is already in use.");
            } else {
                setMessage('');
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };
  
    const registerUser = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/v1/users/check-email/${email}`);
            if (!response.data.exists) {
                await axios.post(`${apiUrl}/api/v1/users/register`, {
                    firstName,
                    lastName,
                    email,
                    password: password1
                });
                setShowSuccessModal(true);
            } else {
                navigate('/login-user');
            }
        } catch (error) {
            console.error("There was an error!", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    useEffect(() => {
        let alert = '';
        if (!firstName || !lastName || !email || !password || !password1) {
            alert = 'All fields are required!';
        } else if (password1.length <= 7) {
            alert = 'Password must be at least 8 characters or more';
        } else if (password !== password1) {
            alert = 'Passwords do not match';
        }
        setMessage(alert);
    }, [firstName, lastName, email, password, password1]);

  return (
    <>
        {isLoading ? <BarSpinner /> : (

            <div className='app-landing-page'>
                <Container>
                    <div className="login-container">
                        <div className="login-form">
                            <Form onSubmit={registerUser}>
                                <div className='pb-3'>
                                    <h1>Sign Up</h1>
                                    <h6 className='text-danger'>{message}</h6>
                                </div>

                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="string"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={event => {
                                            setFirstName(event.target.value);
                                        }}
                                        
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="string"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={event => {
                                            setLastName(event.target.value);
                                        }}
                                        
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="string"
                                        placeholder="Email"
                                        value={email}
                                        onChange={event => {
                                            setEmail(event.target.value);
                                            checkEmail(event.target.value);
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

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <div style={{ position: 'relative' }}>
                                        <Form.Control
                                            required
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={password1}
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                        >
                                            {isConfirmPasswordVisible ? <PiEyeSlash /> : <PiEye />}
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" required label="By clicking this, you are agreeing to the Terms & Conditions and the Privacy Policy." />
                                </Form.Group>
                                
                                <div className='pb-2'> 
                                    <h6 className='text-secondary py-2'>
                                        <span 
                                            className="dotted-underline"
                                            onClick={() => navigate('/login')}
                                        >
                                            Login?
                                        </span>
                                    </h6>
                                </div>

                                <button type='submit' className="custom-button" disabled={message !== ''}>Sign Up</button>

                            </Form>
                        </div>
                        <div className="login-image">
                            <img className="img-fluid" src={imgTwo} alt="A Man Approaching the Restaurant Door" />
                        </div>
                    </div>
                </Container>
            </div>
        )}

        <Modal 
            show={showSuccessModal} 
            onHide={handleCloseModal} 
            centered 
            size="lg" 
            backdrop="static"  
            keyboard={false}
        >
            <Modal.Body>
                <Container>
                    <div className='p-3'>
                        <h1> Successful Registration!</h1>
                        <p>Congratulations for signing up! Welcome to BizSolutions!!!</p>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>

  )
}