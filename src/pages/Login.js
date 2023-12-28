import '../assets/styles/AppLanding.css'
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {

  const { setUser } = useContext(UserContext);
  const [ isPassword1Visible, setIsPassword1Visible ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password1, setPassword1 ] = useState('');

  const retrieveUser = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = response.data;
        console.log(result);

      setUser({
        id: result._id,
        isAdmin: result.isAdmin,
        email: result.email
      });
    } catch (error) {
      console.error('An error occured while retrieving the user: ', error);
    }
  };

  const authenticate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email: email,
        password: password1
      });

      const result = response.data;

      if (typeof result.accessToken !== 'undefined') {
          localStorage.setItem('token', result.accessToken);
          await retrieveUser(result.accessToken);

          Swal.fire({
            title: 'Login Successful!',
            text: 'Welcome to Bizsolutions LLC!',
            confirmButtonText: 'OK!'
          });

        } else {
          Swal.fire({
            title: 'Authentication Failed!',
            text: 'Incorrect email or password!',
            confirmButtonColor: '#ff0000',
            confirmButtonText: 'Again!'
          });
          setEmail('');
          setPassword1('');
        }

      } catch (error) {

          Swal.fire({
            title: 'Authentication Failed!',
            text: 'An error occurred!',
            confirmButtonColor: '#ff0000',
            confirmButtonText: 'Again!'
          });

          setEmail('');
          setPassword1('');
          console.error('An error occurred during authentication:', error);
        }
    }; 

  return (
    <Card>
    <div className="app-landing-page">
      <Row className="py-5 w-100">
        <div className="pt-3">
          <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
            <h2>Login</h2>
            <p><span>Already Have an Account?</span> <span>Login</span></p>

            <Form onSubmit={event => authenticate(event)}>

              <Form.Group controlId="email">
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

              <Form.Group controlId="password1">
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
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => setIsPassword1Visible(!isPassword1Visible)}
                  >
                    {isPassword1Visible ? <PiEye /> : <PiEyeSlash />}
                  </div>
                </div>
              </Form.Group>

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