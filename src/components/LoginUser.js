import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import axios from 'axios';
import UserContext from '../UserContext';
import BarSpinner from './BarSpinner';
import '../assets/styles/AppLanding.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginInterface() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isPassword1Visible, setIsPassword1Visible] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');

  const [emailExists, setEmailExists] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Navigate to home if token exists
    }
  }, [navigate]);

  const retrieveUser = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/v1/users/user-details`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = response.data;
      setUser({ id: result._id, isAdmin: result.isAdmin, email: result.email });
    } catch (error) {
      console.error('An error occurred while retrieving the user: ', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEmail = async (email) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/users/check-email/${email}`);
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const authenticate = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/users/login`, {
        email: email,
        password: password1
      });
  
      const result = response.data;
  
      if (result.accessToken) {
        localStorage.setItem('token', result.accessToken);
        await retrieveUser(result.accessToken);
        navigate('/'); // Redirect to home/dashboard if login is successful
      } else {
        navigate('/re-login'); // Redirect to login if email or password is incorrect
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
      navigate('/re-login'); // Redirect to login on error (you might want to change this behavior)
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? 
      <BarSpinner/>
      :
      <Card>
        <div className="app-landing-page">
          <Row className="py-5 w-100">
            <div className="pt-3">
              <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
                <h2>Login</h2>
                <p><span>Already Have an Account?</span> <span>Login</span></p>

                <div className='text-danger text-center'>
                    The email is already in use! Login to continue.
                </div>

                <Form onSubmit={event => authenticate(event)}>

                <Form.Group controlId="formEmail">
                  <Form.Label className="text-uppercase">Email</Form.Label>
                  <Form.Control
                    id="formEmail"
                    className="app-landing-category px-3 mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={event => {
                      setEmail(event.target.value);
                      checkEmail(event.target.value); // Trigger email check on change
                    }}
                    required
                  />
                </Form.Group>
                  {!emailExists && (
                      <div className='text-danger pb-2'>
                        The email that you've entered does not exist.
                      </div>
                  )}

                <Form.Group controlId="formPassword1">
                  <Form.Label className="text-uppercase">Password</Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      id="formPassword1"
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
                          transform: 'translateY(-50%)'
                        }}
                        onClick={() => setIsPassword1Visible(!isPassword1Visible)}
                      >
                        {isPassword1Visible ? <PiEye /> : <PiEyeSlash />}
                      </div>
                    </div>
                  </Form.Group>
                  
                  
                  <div className='pt-3'>
                    <p><span>Forgot Password?</span></p>
                  </div>
                  
                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="app-landing-search my-2">
                      Login
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