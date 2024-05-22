import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { BiLoaderCircle, BiCheckDouble, BiXCircle, BiInfoCircle } from 'react-icons/bi';
import homeBanner from '../../assets/Biz/images/img-app-home-banner.png';
import BarSpinner from './Reusable_BarSpinner';
import SuccessBox from './Biz_Success.js';
import FailBox from './Biz_Failure.js';
import { checkEmailAvailability, registerUser } from '../../utils/Biz/UserUtils';

import '../../assets/Biz/styles/SignUp.css';

export default function SignUp() {
    const [ emailStatus, setEmailStatus ] = useState('idle');
    const [ resultStatus, setResultStatus ] = useState('');
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
    const [ termsAccepted, setTermsAccepted ] = useState(false);

    
    const navigate = useNavigate();

    const handleEmailNameChange = (event) => setEmail(event.target.value);

    useEffect(() => {
        if (!email) {
            setEmailStatus('idle');
            return;
        }
        const timer = setTimeout(async () => {
            setEmailStatus('checking');
            try {
                const isAvailable = await checkEmailAvailability(email);
                setEmailStatus(isAvailable ? 'unavailable' : 'available');
            } catch (error) {
                setEmailStatus('error');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [email]);
  
    const handleRegistration = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await registerUser({
            firstName, lastName, email, birthday, password: password1, referredBy
        });
        if (result.success) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setBirthday('');
            setPassword('');
            setPassword1('');
            setReferredBy(null); 
            setResultStatus('success');
            setMessage('Registration successful!'); 
            setEmailStatus('idle');
            setTermsAccepted(false); 
            setResultStatus('success');
            
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } else {
            setResultStatus('failure');
            setMessage(result.message || 'Registration failed. Please try again.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        let alert = '';
        if (!firstName || !lastName || !email || !password || !password1 || !birthday) {
            alert = 'All fields are required!';
        } else if (password1.length < 8) {
            alert = 'Password must be at least 8 characters or more';
        } else if (password !== password1) {
            alert = 'Passwords do not match';
        } else if (emailStatus === 'unavailable') {
            alert = 'Email is already in use';
        } else if (emailStatus === 'checking') {
            alert = 'Checking email availability...';
        } else if (!termsAccepted) {
            alert = 'You must agree to the terms and conditions.';
        }
        setMessage(alert);
    }, [firstName, lastName, email, password, password1, birthday, emailStatus, termsAccepted]);
    

    return (
        <>
            {isLoading ? <BarSpinner /> : (
                <div className='app-landing-page'>
                    <Container>
                        <div className="login-container">
                            <div className="login-form">
                                <Form onSubmit={handleRegistration}>

                                    <div className='pb-3'>
                                        <h1>Sign Up</h1>
                                        <h6 className='text-danger'>{message}</h6>
                                    </div>

                                    <div className='pt-3'>
                                        {resultStatus === 'success' && <div data-aos="fade-down"><SuccessBox /></div>}
                                        {resultStatus === 'failure' && <div data-aos="fade-down"><FailBox /></div>}
                                    </div>

                                    <Form.Group controlId="formBasicFirstName" className='py-2'>
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

                                    <Form.Group controlId="formBasicLastName" className='py-2'>
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

                                    <Form.Group controlId="formBasicBusinessName" className='py-2'> 
                                        <Form.Label>Email</Form.Label>
                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Email"
                                                value={email}
                                                onChange={handleEmailNameChange}
                                                className='mb-2'
                                            />
                                            {emailStatus === 'checking' && (
                                                <BiLoaderCircle
                                                    className='biz-color'
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        fontSize: '24px'
                                                    }}
                                                />
                                            )}
                                            {emailStatus === 'available' && (
                                                <BiCheckDouble
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: 'green',
                                                        fontSize: '24px'
                                                    }}
                                                />
                                            )}
                                            {emailStatus === 'unavailable' && (
                                                <BiXCircle
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: 'red',
                                                        fontSize: '24px'
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {emailStatus === 'unavailable' && (
                                            <div className='pb-3 ps-3'>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    The email <span className='biz-color'>{email}</span> is already in used. 
                                                </p>
                                                <br/>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    Please use a different email address to continue.
                                                </p>
                                            </div>
                                        )}
                                        
                                    </Form.Group>

                                    <Form.Group controlId="formBasicBirthday" className='py-2'>
                                        <Form.Label>Birthday</Form.Label>
                                            <Form.Control
                                                required
                                                type="date" 
                                                placeholder="Enter your birthday"
                                                value={birthday}
                                                onChange={event => setBirthday(event.target.value)}
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3 py-2" controlId="formBasicPassword" >
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

                                    <Form.Group controlId="formBasicConfirmPassword" className='py-2'>
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

                                    <Form.Group className="mb-3 py-2" controlId="formBasicReferredBy">
                                        <Form.Label><span 
                                                className="dotted-underline"
                                                onClick={() => navigate('/biz-referral-system')}
                                            >Referred By</span></Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Referred By (optional)"
                                            value={referredBy}
                                            onChange={event => setReferredBy(event.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 py-2" controlId="formBasicCheckbox">
                                        <Form.Check 
                                            required
                                            type="checkbox" 
                                            label={
                                                <span>
                                                    By clicking this, you are agreeing to the <span className="dotted-underline" onClick={() => navigate('/terms')}>Terms & Conditions</span> and the <span className="dotted-underline" onClick={() => navigate('/privacy')}>Privacy Policy</span>.
                                                </span>
                                            } 
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
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
                                <img className="img-fluid" src={homeBanner} alt="BizSolution LLC SignUp Interface" />
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </>
    );
}
