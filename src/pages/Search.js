import React, { useState, useEffect } from 'react';
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

  console.log(coordinates.latitude);
  console.log(coordinates.longitude);
  console.log(category);

  const yelpAPI = () => {
    const API_KEY = 'pdHWvLb13V6ePwANpAoN4Tgwpn3OM0t4i8IT9Iz6hqtptyoCOcjUfnjs_1OhhoCxxaUROFXVHBrZkbOjdWtT9KyKoshBujNf4Xv7eP36DcjYYdIq0lckjeLD6PKbZXYx';

    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const keyTerm = category;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };
    
    fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&${longitude}&term=${keyTerm}&radius=8046&sort_by=distance&limit=20`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  useEffect(() => {

    setCategory(query.get('category'));
    setLocationParam(query.get('location'));
    yelpAPI();

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