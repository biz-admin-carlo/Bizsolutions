import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Container, Navbar, FormControl, Breadcrumb, Card, Button } from 'react-bootstrap';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const [ category, setCategory ] = useState(query.get('category'));
  const [ locationParam, setLocationParam ] = useState(query.get('location'));
  const [ coordinates, setCoordinates ] = useState({});
  const [ userCoordinates, setUserCoordinates ] = useState(null); 
  const [ state, setState ] = useState(undefined);

  const [ displayCount, setDisplayCount ] = useState(10);

  const [ resultState, setResultState ] = useState(null);
  const [ resultCoords, setResultCoords ] = useState(null);

  console.log(coordinates.latitude);
  console.log(coordinates.longitude);
  console.log(locationParam);
  console.log(category);

  const handleSeeMore = () => {
    setDisplayCount(resultState.businesses.length);
  };

  useEffect(() => {

    setCategory(query.get('category'));
    // setLocationParam(query.get('location'));

    const newLocationParam = query.get('location');

    if (typeof newLocationParam === 'string') {
      setLocationParam(newLocationParam);
      setState(newLocationParam); // Set the state if newLocationParam is a string
    } else {
      setLocationParam(null);
      setState(null); // Set the state to null otherwise
    }

  }, [query]);

  useEffect(() => {
    const storedCoords = localStorage.getItem('userCoordinates');
  
    if (!storedCoords) {
      // If localStorage is empty, run the getUserLocation function
      getUserLocation();
    } else {
      setCoordinates(JSON.parse(storedCoords));
    }
  }, []);

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

  useEffect(() => {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      // Call API with coordinates
      const api = `https://bizsolutions-api-development.onrender.com/business/search/v1?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&term=${category}`;
      axios.get(api)
        .then(response => {
          console.log('Data with coordinates:', response.data);
          setResultState(response.data);
        })
        .catch(error => {
          console.error('Error fetching data with coordinates:', error);
        });
    } else if (locationParam) {
      // Call API with location parameter
      const api = `https://bizsolutions-api-development.onrender.com/business/search/v2/?state=${locationParam}&category=${category}`;
      axios.get(api)
        .then(response => {
          setResultState(response.data);
        })
        .catch(error => {
          console.error('Error fetching data with locationParam:', error);
        });
    }
  }, [coordinates, locationParam, category]);
  

  console.log(resultState);

  
  return (
    <>
      <Navbar style={{ background: '#FF851A' }} expand="lg" data-aos="fade-down">
        <Container>
          <Form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <FormControl type="text" placeholder={`Search results for ${category} in ${locationParam}`} style={{ width: '100%', border: 'none' }} readOnly />
        </Form>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumb className='py-2'>
          <Breadcrumb.Item href="/" className="breadcrumb-item-nonlink">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Results for {category} in {locationParam}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

    <Container>
        <h1>Top 10 Best {category} Near {locationParam}</h1>

        {resultState && resultState.businesses && resultState.businesses.slice(0, displayCount).map((business, index) => (
          <Card className="my-2" key={business.id || index}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: 10 }}>
                <img
                  src={business.image_url} // URL of the image
                  alt={business.name}
                  style={{ width: '150px', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{index + 1}. {business.name}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Average Rating of: {business.rating}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Contact Number: {business.display_phone}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{business.categories[0].title} | {business.location.city}, {business.location.state}</Card.Subtitle>
              </Card.Body>
            </div>
          </Card>
        ))}

        {resultState && resultState.businesses && resultState.businesses.length > 10 && displayCount < resultState.businesses.length && (
          <Button variant="primary" onClick={handleSeeMore}>See More</Button>
        )}
      </Container>
    </>
  );
}