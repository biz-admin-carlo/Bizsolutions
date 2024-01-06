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

  const [ category, setCategory ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ ipAddress, setIpAddress ] = useState('');

  // Fetch IP Address when 'Use My Location' is selected
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);

    if (selectedLocation === 'UseMyLocation') {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setIpAddress(data.ip))
        .catch(error => console.error('Error fetching IP:', error));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (location === 'UseMyLocation') {
      console.log("User's IP Address:", ipAddress);
      // You might want to do something with the IP Address here
      // For instance, sending it along with other form data to your server
    }
    // By this time, ipAddress is already collected

    const primaryKey = "20a9643361bc4a74a351551da209e2e7";
    console.log(primaryKey);

    const options = {method: 'GET'};

    fetch(`https://ipgeolocation.abstractapi.com/v1?api_key=${primaryKey}&ip_address=${ipAddress}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    // Include the rest of your form submission logic here...
  };


  return (
    <Card>
      <div className="app-landing-page">
        <Row className="py-5 w-100">
          <div className="pt-3 d-flex justify-content-between">
            
            <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
              <h2>Find and Discover</h2>
              <h2>Local Business</h2>

              <Form className='py-3' onSubmit={handleSubmit}>
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
                      onChange={handleLocationChange} // Updated handler
                      required
                    >
                    <option value="Select"> Find my location</option>
                    <option value="UseMyLocation"> Use my location</option>
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