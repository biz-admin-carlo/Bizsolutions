import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Container, Navbar, FormControl, Breadcrumb } from 'react-bootstrap';


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

  console.log(coordinates.latitude);
  console.log(coordinates.longitude);
  console.log(locationParam);
  console.log(category);

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
    // ... existing useEffect logic ...

    // New API call logic
    if (coordinates.latitude && coordinates.longitude) {
      // If coordinates are available
      // const url = `/api/endpoint-coordinates?lat=${coordinates.latitude}&lng=${coordinates.longitude}`;
      const api = `https://bizsolutions-api-development.onrender.com/business/search/v1?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&term=${category}`
      axios.get(api)
        .then(response => {
          // Handle successful response
          console.log('Data with coordinates:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data with coordinates:', error);
        });
    } else if (locationParam) {
      // If location parameter is available
      // const url = `/api/endpoint-location?location=${locationParam}`;
      const api = `https://bizsolutions-api-development.onrender.com/business/search/v2/?state=${locationParam}&category=${category}`
      axios.get(api)
        .then(response => {
          // Handle successful response
          console.log('Data with locationParam:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data with locationParam:', error);
        });
    }
  }, [coordinates, locationParam]);

  
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
        <Breadcrumb className='py-3'>
          <Breadcrumb.Item href="/" className="breadcrumb-item-nonlink">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Results for {category} in {locationParam}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

    </>
  );
}