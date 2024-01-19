import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import states from 'states-us';

import '../assets/styles/AppLanding.css';

export default function Landing() {
  const navigate = useNavigate();
  
  // State management for various components
  const [ category, setCategory ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ userCoordinates, setUserCoordinates ] = useState(null); 

  const handleLocationChange = (event) => {
    if(event.target.value === 'UseMyLocation'){
      getUserLocation();
    };

    setLocation(event.target.value);
  };

  const getUserLocation = () => {
    const cachedCoords = localStorage.getItem('userCoordinates');
    console.log(cachedCoords);
    if (cachedCoords) {
      setUserCoordinates(JSON.parse(cachedCoords));
      console.log('Using cached coordinates:', JSON.parse(cachedCoords));
      return;
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserCoordinates(coords);
          localStorage.setItem('userCoordinates', JSON.stringify(coords));
          console.log('Retrieved and stored your coordinates:', coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const queryParams = new URLSearchParams({
      category: category,
      location: location === 'UseMyLocation' && userCoordinates 
      ? `Lat:${userCoordinates.latitude},Long:${userCoordinates.longitude}` 
      : location
    }).toString();

    navigate(`/search?${queryParams}`);
  };

  // Filtering states and prioritizing California
  const modifiedStates = useMemo(() => {
    return states
      .filter(state => state.name !== 'Hawaii' && state.name !== 'American Samoa')
      .sort((a, b) => (a.name === 'California' ? -1 : b.name === 'California' ? 1 : 0));
  }, []);

  return (
    <Card>
      <div className="app-landing-page">
        <Row className="py-5 w-100">
          <Col xs={9} sm={10} md={8} lg={6} xl={4} className="landing-banner custom-card p-5 mx-auto">
          <h2>Find and Discover</h2>
          <h2>Local Business</h2>

            <Form className='py-3' onSubmit={handleSubmit}>
              <Form.Group controlId="category">
                <Form.Label className="text-uppercase">Category</Form.Label>
                <Form.Select 
                  className="app-landing-category ps-3 mb-2" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Find a business</option>
                  <option value="Restaurants">Restaurants</option>
                  <option value="Dentists">Dentists</option>
                  <option value="Plumbers">Plumbers</option>
                  <option value="Contractors">Contractors</option>
                  <option value="Electricians">Electricians</option>
                  <option value="Auto Repair">Auto Repair</option>/                   
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
                  onChange={handleLocationChange}
                  required
                >
                  <option disabled>─── Select Here ───</option>
                  <option value="Nationwide">Nationwide</option>
                  <option value="UseMyLocation">Get Current Locations</option>
                  <option disabled>─── Locations ───</option>
                  {modifiedStates.map((state) => (
                    <option key={state.abbreviation} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

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