import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../UserContext';
import Swal from 'sweetalert2';

import '../assets/styles/AppLanding.css'

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [ category, setCategory ] = useState('')
  const [ location, setLocation ] = useState('')

  function registerUser(event) {
    event.preventDefault();

    axios.post(`${apiUrl}/users/check-email`, {
      category: category
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
        return axios.post(`${apiUrl}/users/register`, {
          category: category,
          location: location,
        });
      }
    })
    .then(response => {
      if(response) {
        const result = response.data;
        console.log(result);

        setCategory('');
        setLocation('');

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

  return (
    (user.id !==null) ?
      <Navigate to="/"/>
    :
    <Card>
      <div className="app-landing-page">
        <Row className="py-5 w-100">
          <div className="pt-3 d-flex justify-content-between">
            
            <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
              <h2>Find and Discover</h2>
              <h2>Local Business</h2>
              <p><span>Already Registered?</span> <span>Login</span></p>

              <Form onSubmit={event => registerUser(event)}>

                <Form.Group controlId="category">
                  <Form.Label className="text-uppercase">Category</Form.Label>
                  <Form.Select 
                    className="app-landing-category ps-3 mb-2" 
                    value={category} 
                    onChange={event => setCategory(event.target.value)}
                    required
                  >
                    <option value="">Find a business</option>
                    <option value="Restaurants">Restaurants</option>
						        <option value="Dentists">Dentists</option>
						        <option value="Plumbers">Plumbers</option>
						        <option value="Contractors">Contractors</option>
						        <option value="Electricians">Electricians</option>
						        <option value="Auto Repair">Auto Repair</option>
						        <option value="Roofing">Roofing</option>
						        <option value="Attorneys">Attorneys</option>
						        <option value="Hotel">Hotel</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label className="text-uppercase">Location</Form.Label>
                  <Form.Select 
                    className="app-landing-category ps-3 mb-2" 
                    value={location} 
                    onChange={event => setLocation(event.target.value)}
                    required
                  >
                    <option value="Select"> Find my location</option>
                    <option value="UseMyLocation"> Use my location</option>
						        <option value="Health">Nationwide</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button type="submit" className="app-landing-search my-2">
                    Search
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