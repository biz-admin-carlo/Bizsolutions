import { Form, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

import { PiEye, PiEyeSlash } from 'react-icons/pi';

import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Register() {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  
  const [alertMessage, setAlertMessage] = useState('');

  const [ isPassword1Visible, setIsPassword1Visible ] = useState(false);
  const [ isPassword2Visible, setIsPassword2Visible ] = useState(false);

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ mobileNumber, setMobileNumber ] = useState('');

  const [ agree, setAgree ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password1, setPassword1 ] = useState('')
  const [ password2, setPassword2 ] = useState('')

  const [ isActive, setIsActive ] = useState(false)

  function registerUser(event) {
    event.preventDefault();

    axios.post(`${apiUrl}/users/check-email`, {
      email: email
    })
    .then(response => {
      const result = response.data;
      console.log(result);

      if(result === true) {
        Swal.fire({
          title: 'Oops!',
          icon: 'error',
          text: 'Email already exists!'
        });
        navigate('/login');
      } else {
        //return axios.post('http://localhost:8001/users/register', {
        return axios.post(`${apiUrl}/users/register`, {
          firstName: firstName,
          lastName: lastName,
          mobileNo: mobileNumber,
          email: email,
          password: password1,
          mobileNumber: mobileNumber
        });
      }
    })
    .then(response => {
      if(response) {
        const result = response.data;
        console.log(result);

        setEmail('');
        setPassword1('');
        setPassword2('');
        setFirstName('');
        setLastName('');
        setMobileNumber('');
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
  }


  useEffect(() => {
    let alert = '';

    if (firstName === '' || lastName === '' || mobileNumber === '' || email === '' || password1 === '' || password2 === '') {
      alert = 'All fields are required!';
    } else if (mobileNumber.length !== 11) {
      alert = 'Mobile number should be 11 digits';
    } else if (password1 !== password2) {
      alert = 'Passwords do not match';
    } else if (!agree) {
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
  }, [firstName, lastName, mobileNumber, email, password1, password2, agree]);

  return (
    (user.id !==null) ?
      <Navigate to="/"/>
    :

    <Container>
      <Row className="w-100">
        <Col xs={12} md={8} lg={5} className="mx-auto">
          <Form onSubmit={event => registerUser(event)}>
            <h1 className="loginTitle pb-4">Create Account</h1>  
            <Form.Group controlId="firstName">
                  <Form.Label className="loginSub">First Name</Form.Label>
                    <Form.Control
                      className="loginText my-2" 
                        type="text" 
                        placeholder="First Name"
                        value={firstName} 
                        onChange={event => setFirstName(event.target.value)}
                        required
                    />
              </Form.Group>

              <Form.Group controlId="lastName">
                  <Form.Label className="loginSub">Last Name</Form.Label>
                    <Form.Control
                      className="loginText my-2" 
                        type="text" 
                        placeholder="Last Name"
                        value={lastName} 
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
              </Form.Group>

              <Form.Group controlId="userEmail">
                  <Form.Label className="loginSub">Email address</Form.Label>
                    <Form.Control
                      className="loginText my-2" 
                        type="email" 
                        placeholder="Email"
                        value={email} 
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
              </Form.Group>

              <Form.Group controlId="password1">
                <Form.Label className="loginSub">Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    className="loginText my-2"
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
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => setIsPassword1Visible(!isPassword1Visible)}
                  >
                    {isPassword1Visible ? <PiEye /> : <PiEyeSlash />}
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="password2">
                <Form.Label className="loginSub">Verify Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    className="loginText my-2"
                    type={isPassword2Visible ? "text" : "password"}
                    placeholder="Verify Password"
                    value={password2}
                    onChange={event => setPassword2(event.target.value)}
                    required
                  />
                  <div 
                    style={{
                      position: 'absolute', 
                      top: '50%', 
                      right: '10px', 
                      cursor: 'pointer',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => setIsPassword2Visible(!isPassword2Visible)}
                  >
                    {isPassword2Visible ? <PiEye /> : <PiEyeSlash />}
                  </div>
                </div>
              </Form.Group>

                  <Form.Group controlId="agree">
                    {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="loginText my-3">
                            <Form.Check 
                              required
                              label={` By signing up, you agree to our Terms of Service and Privacy Policy. You will be sent a single email to verify your account.`}
                              onChange={e => setAgree(e.target.checked)}
                            />
                          </div>
                    ))}
                  </Form.Group>

                  <p className="text-danger loginText">{alertMessage}</p>

                  
          </Form>
        </Col>
      </Row>
    </Container>
  )
}