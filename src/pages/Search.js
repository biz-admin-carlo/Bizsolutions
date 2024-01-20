import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Container, Navbar, FormControl, Breadcrumb, Card, Button, Badge } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/Search.css';

const apiUrl = process.env.REACT_APP_API_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const fetchApiData = (apiUrl, setData, setLoading) => {
  axios.get(apiUrl)
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
};

const getUserCoordinates = (setUserCoordinates) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserCoordinates(coords);
        localStorage.setItem('userCoordinates', JSON.stringify(coords));
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

export default function Search() {
  const query = useQuery();
  const [category, setCategory] = useState(query.get('category'));
  const [locationParam, setLocationParam] = useState(query.get('location'));
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);
  const [resultState, setResultState] = useState(null);

  const [locationState, setLocationState] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  console.log(locationState);
  console.log(coordinates);

  const parseLocation = (location) => {
    if (location && location.includes('Lat') && location.includes('Long')) {
      const coords = location.split(',').reduce((acc, curr) => {
        const [key, value] = curr.split(':');
        acc[key.trim()] = parseFloat(value.trim());
        return acc;
      }, {});
      setCoordinates(coords);
      setLocationState(null);
    } else {
      setLocationState(location);
      setCoordinates(null);
    }
  };

  const generatePlaceholder = () => {
    if (coordinates) {
      return `Search results for ${category} Near My location`;
    } else if (locationState) {
      return `Search results for ${category} in ${locationState}`;
    }
    return `Search results for ${category}`;
  };

  const generateBreadcrumbText = () => {
    if (coordinates) {
      return `Results for ${category} near my location`;
    } else if (locationState) {
      return `Results for ${category} in ${locationState}`;
    }
    return `Results for ${category}`;
  };

  useEffect(() => {
    setCategory(query.get('category'));
    parseLocation(query.get('location'));
  }, [query]);

  useEffect(() => {
    setCategory(query.get('category'));
    setLocationParam(query.get('location'));
  }, [query]);

  useEffect(() => {
    const storedCoords = localStorage.getItem('userCoordinates');
    if (!storedCoords) {
      getUserCoordinates(setUserCoordinates);
    } else {
      setUserCoordinates(JSON.parse(storedCoords));
    }
  }, []);

  useEffect(() => {
    if (userCoordinates && userCoordinates.latitude && userCoordinates.longitude) {
      const api = `${apiUrl}/business/search/v1?latitude=${userCoordinates.latitude}&longitude=${userCoordinates.longitude}&term=${category}`;
      fetchApiData(api, setResultState, setLoading);
    } else if (locationParam) {
      const api = `${apiUrl}/business/search/v2/?state=${locationParam}&category=${category}`;
      fetchApiData(api, setResultState, setLoading);
    }
  }, [userCoordinates, locationParam, category]);

  return (
    <div className='app-background'>
    <>
      <Navbar expand="lg" className='navbar-search'>
        <Container>
          <Form className='navbar-form'>
            <FormControl
              type="text"
              placeholder={generatePlaceholder()}
              className='navbar-form-control'
            />
          </Form>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumb className='pt-2'>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {generateBreadcrumbText()}
          </Breadcrumb.Item>
        </Breadcrumb>

      <h3>
        {coordinates ?
          `Top 10 Best ${category} Near My Location` :
          `Top 10 Best ${category} in ${locationState}`
        }
      </h3>

        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <BusinessCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <div>
            
            {resultState && resultState.businesses && resultState.businesses.slice(0, displayCount).map((business, index) => (
              <BusinessCard business={business} index={index} key={business.id || index} />
            ))}
            {resultState && resultState.businesses && resultState.businesses.length > 10 && displayCount < resultState.businesses.length && (
              <Button variant="primary" onClick={() => setDisplayCount(resultState.businesses.length)}>See More</Button>
            )}
          </div>
        )}
      </Container>
    </>
    </div>
  );
}

const BusinessCard = ({ business, index }) => (

  <Card className="my-2 p-3" data-aos="fade-up">
    <div className='business-card-div'> 
      <div style={{ marginRight: 10 }}>
        <img
          src={business.image_url}
          alt={business.name}
          className='business-card-img'
        />
      </div>
      <Card.Body className='my-3'>
        <Card.Title>{index + 1}. {business.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Average Rating:
          <Rating
            value={business.rating}
            readOnly
            size={20}
          />
        </Card.Subtitle>
        <Card.Subtitle className="mb-2">Contact Number: {business.display_phone}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"><Badge bg="warning">{business.categories[0].title}</Badge></Card.Subtitle>
        <Card.Subtitle className="mb-2">Location: {business.location.city}, {business.location.state}</Card.Subtitle>
      </Card.Body>
    </div>
  </Card>
);

const BusinessCardSkeleton = () => (
  <Card className="my-2 p-3">
    <Skeleton height={150} />
    <Card.Body>
      <Skeleton count={3} />
    </Card.Body>
  </Card>
);

