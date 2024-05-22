import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { Form, Modal, Container, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import home from '../../assets/Biz/images/img-app-home-banner.webp';
import BarSpinner from './Reusable_BarSpinner';

import '../../assets/Biz/styles/SignUp.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function SignUpReferralToken() {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ referredBy, setReferredBy ] = useState(null);
    const [ password, setPassword ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ showSuccessModal, setShowSuccessModal ] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const referralCode = queryParams.get('ref');
        if (referralCode) {
            setReferredBy(referralCode);
        }
    }, [location]);
  
    const registerUser = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/v1/users/check-email/${email}`);
            console.log(response);
            if (!response.data.exists) {
                await axios.post(`${apiUrl}/api/v1/users/register`, {
                    firstName,
                    lastName,
                    email,
                    birthday,
                    password: password1,
                    referredBy
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
        <Helmet>
            <title>BizSolutions | Sign Up</title>
        </Helmet>

        {isLoading ? <BarSpinner /> : (

            <div data-aos="fade-up" className='app-landing-page'>
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
                                        }}
                                        
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control
                                    required
                                    type="date" 
                                    placeholder="Enter your birthday"
                                    value={birthday}
                                    onChange={event => setBirthday(event.target.value)}
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

                                <Form.Group controlId="formBasicConfirmPassword">
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

                                <Form.Group controlId="formBasicReferredBy" className='py-3'>
                                    <Form.Label><span 
                                            className="dotted-underline"
                                            onClick={() => navigate('/biz-referral-system')}
                                        >Referred By</span></Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="Referred By (optional)"
                                        value={referredBy ?? ''}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check 
                                        type="checkbox" 
                                        required 
                                        label={
                                            <span>
                                                By clicking this, you are agreeing to the <span className="dotted-underline" onClick={() => navigate('/terms')}>Terms & Conditions</span> and the <span className="dotted-underline" onClick={() => navigate('/privacy')}>Privacy Policy</span>.
                                            </span>
                                        } 
                                    />
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
                            <img className="img-fluid" src={home} alt="BizSolution LLC SignUp Interface" />
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