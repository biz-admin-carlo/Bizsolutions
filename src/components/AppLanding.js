// Import necessary modules and components
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import '../assets/styles/AppLanding.css';

// Environment variable for API URL
const apiUrl = process.env.REACT_APP_API_URL;

export default function Landing() {
  // Accessing user context and navigation hook
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // State management for various components
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [longLat, setLongLat] = useState({ latitude: null, longitude: null, error: null });
  const [cityDetails, setCityDetails] = useState({ city: '', country: '', country_code: '', region: '' });

  // Function to retrieve user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongLat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLongLat({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLongLat({ latitude: null, longitude: null, error: "Geolocation is not supported by this browser." });
    }
  };

  // Handler for location dropdown change
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    // Other specific actions based on location can be added here
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    getLocation(); // Initiate getting location

    if (location === 'UseMyLocation') {
      // Replace this with the specific functionality needed for using the user's location
    }

    // Replace this with your actual API key handling strategy
    const primaryKey = "20a9643361bc4a74a351551da209e2e7";

    const options = { method: 'GET' };

    // Fetching city details using geolocation API
    fetch(`https://ipgeolocation.abstractapi.com/v1?api_key=${primaryKey}&ip_address=${ipAddress}`, options)
      .then(response => response.json())
      .then(response => setCityDetails({
        city: response.city,
        country: response.country,
        country_code: response.country_code,
        region: response.region
      }))
      .catch(err => console.error(err));
  };

  console.log( longLat );
  console.log( category );
  console.log( cityDetails );

  return (
    <Card>
      <div className="app-landing-page">
        <Row className="py-5 w-100">
          <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
            <h2>Find and Discover</h2>
            <h2>Local Business</h2>

            {/* Form for handling the search functionality */}
            <Form className='py-3' onSubmit={handleSubmit}>
              {/* Category Selector */}
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

              {/* Location Selector */}
              <Form.Group controlId="location">
                <Form.Label className="text-uppercase">Location</Form.Label>
                <Form.Select
                  className="app-landing-category ps-3 mb-2"
                  value={location}
                  onChange={handleLocationChange}
                  required
                >
                  <option value="UseMyLocation"> Get my location</option>
                </Form.Select>
              </Form.Group>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <Button type="submit" className="app-landing-search my-2">
                  Search
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Card>
  );
};