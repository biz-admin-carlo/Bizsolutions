import '../assets/styles/AppLanding.css'
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";

const apiUrl = process.env.REACT_APP_API_URL;

export default function SignUp() {

  const navigate = useNavigate();

  const [ attempt, setAttempt ] = useState(0);

  const [ isPassword1Visible, setIsPassword1Visible ] = useState(false);

  const [ captchaValue, setCaptchaValue ] = useState(null);

  const [ alertMessage, setAlertMessage ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ password1, setPassword1 ] = useState('');
  const [ agree, setAgree ] = useState('');

  const [ isActive, setIsActive ] = useState(false);

  const onChange = (value) => {
    setCaptchaValue(value);
  }

  function registerUser(event) {
    event.preventDefault();

    setAttempt(attempt + 1);

    axios.get(`${apiUrl}/api/v1/users/check-email/${email}`)
    .then(response => {
      const result = response.data;

      if(result.exists === true) {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          text: 'Email already exists!'
        });
        navigate('/login');
      } else {
        return axios.post(`${apiUrl}/api/v1/users/register`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password1
        });
      }
    })
    .then(response => {
      if(response) {
        const result = response.data;
        console.log(result);

        setEmail('');
        setPassword1('');
        setFirstName('');
        setLastName('');
        setAgree('');

        if(result.error) {
          Swal.fire({
            title: 'Registration Failed',
            text: "Error creating an account!"
          });
          navigate('/register');
        } else {
          Swal.fire({
            title: 'Register Successful!',
            text: 'You may now login!'
          });
          navigate('/login');
        }
      }
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
  };

  useEffect(() => {
    let alert = '';

    if (firstName === '' || lastName === '' || email === '' || password1 === '') {
      alert = 'All fields are required!';
    } else if (password1.length <= 7){
      alert = 'Password must be atleast 8 characters or more';
    }else if (!agree) {
      alert = 'You must agree to the terms and conditions';
    } else {
      alert = '';
    }

    setAlertMessage(alert);

    console.log(alert)

    if (alert === '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [ firstName, lastName, email, password1, agree ]);


  return (
    <Card>
      <div className="app-landing-page">
        <Row className="py-5 w-100">      
          <div className="pt-3">
            
            <Col xs={9} sm={10} md={8} lg={6} xl={4} className=" landing-banner custom-card p-5 mx-auto">

            <h2>Sign Up</h2>
            <p>
              <span>Already Have an Account?</span> <span>Login</span>
            </p>

              <Form onSubmit={event => registerUser(event)}>
                <Form.Group controlId="formFirstName">
                  <Form.Label className="text-uppercase">First Name</Form.Label>
                  <Form.Control
                    className="app-landing-category px-3 mb-2"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    required
                  />
                </Form.Group>
      
                <Form.Group controlId="formLastName">
                  <Form.Label className="text-uppercase">Last Name</Form.Label>
                  <Form.Control
                    className="app-landing-category px-3 mb-2"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    required
                  />
                </Form.Group>
      
                <Form.Group controlId="formEmail">
                  <Form.Label className="text-uppercase">Email</Form.Label>
                  <Form.Control
                    className="app-landing-category px-3 mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword1">
                  <Form.Label className="text-uppercase">Password</Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      className="app-landing-category px-3 mb-2"
                      type={isPassword1Visible ? "text" : "password"}
                      placeholder="Password"
                      value={password1}
                      onChange={event => setPassword1(event.target.value)}
                      required
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        cursor: 'pointer',
                        transform: 'translateY(-50%)',
                      }}
                      onClick={() => setIsPassword1Visible(!isPassword1Visible)}
                    >
                      {isPassword1Visible ? <PiEye /> : <PiEyeSlash />}
                    </div>
                  </div>
                  {password1.length > 0 && password1.length < 8 && (
                    <p className="text-danger loginText">
                      Password must be 8 characters or more!
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="agree">
                    {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="loginText my-3">
                            <Form.Check 
                              required
                              label={` By clicking this, you are agreeing to the Terms & Conditions and the Privacy Policy.`}
                              onChange={e => setAgree(e.target.checked)}
                            />
                          </div>
                    ))}
                  </Form.Group>

                { attempt > 0 && <p className="text-danger loginText">{alertMessage}</p> }

                <div className="d-flex justify-content-center">
                  <Button type="submit" className="app-landing-search my-2" disabled={!isActive}>
                    Sign Up
                  </Button>
                </div>
                
              </Form>
            </Col>
          </div>
        </Row>
    </div> 
    </Card> 
  )
}