import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { MdMyLocation } from "react-icons/md";
import imgOne from '../assets/img-app-vertical.png';
import '../assets/styles/NewLoginInterface.css';
import BarSpinner from '../components/BarSpinner';

export default function NewLogin() {
    const [ loading, setLoading ] = useState(false);
    const [ typedPlaceholder, setTypedPlaceholder ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ userCoordinates, setUserCoordinates ] = useState(null); 
    const [ selectedLocation, setSelectedLocation ] = useState('Location')

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleLocationInput = (event) => {
        setLocation(event.target.value);
    };

    const getUserLocation = () => {
        setLoading(true);
        const cachedCoords = sessionStorage.getItem('userCoordinates');
          // console.log(cachedCoords);
        if (cachedCoords) {
          setUserCoordinates(JSON.parse(cachedCoords));
           // console.log('Using cached coordinates:', JSON.parse(cachedCoords));
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
              setSelectedLocation('Use My Current Location')
              sessionStorage.setItem('userCoordinates', JSON.stringify(coords));
              console.log('Retrieved and stored your coordinates:', coords);
              setLoading(false);
            },
            (error) => {
              console.error('Error getting location:', error);
              setLoading(false);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if location input is not empty
        if (location) {
            console.log("Using manually entered location:", location);
            // Here you can handle the location as per your logic
        } else if (userCoordinates) {
            console.log("Using geolocation coordinates:", userCoordinates);
            // Here you can handle the coordinates as per your logic
        } else {
            // Handle case where neither location nor coordinates are available
            console.error("No location information available");
        }
    };

    

    useEffect(() => {
        const typingStrings = [
            "Restaurants",
            "Hotel",
            "Laundromat",
            "Dentist",
            "Contractors"
        ];

        let currentString = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimer;

        const type = () => {
            setTypedPlaceholder(typingStrings[currentString].substring(0, charIndex));

            if (!isDeleting && charIndex === typingStrings[currentString].length) {
                typingTimer = setTimeout(() => { isDeleting = true; }, 1000);
            } else if (isDeleting && charIndex === 0) {
                currentString = (currentString + 1) % typingStrings.length;
                isDeleting = false;
            }

            charIndex += isDeleting ? -1 : 1;
            typingTimer = setTimeout(type, isDeleting ? 50 : 100);
        };

        type();

        return () => clearTimeout(typingTimer);
    }, []);

    return (
        loading ? <BarSpinner /> :
        <>
        <div className='app-landing-page'>
            <Container>
                <div className="login-container">
                    <div className="login-form">
                        <Form onSubmit={handleSubmit}>
                            <div className='pb-3'>
                            <h1 style={{ fontSize: '2.8rem' }}>Discover and Experience</h1>
                            <h4 style={{ fontSize: '2rem' }} className='text-secondary'>Local Businesses</h4>
                            </div>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        required
                                        name="category"
                                        placeholder={typedPlaceholder}
                                        type="text"
                                        className='text-secondary'
                                        value={category}
                                        onChange={handleCategoryChange}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Location</Form.Label>
                                    <div style={{ position: 'relative' }}>
                                        <Form.Control
                                            required
                                            name="location"
                                            type="text"
                                            placeholder={selectedLocation}
                                            className='text-secondary'
                                            value={location} // Bind value to the location state
                                            onChange={handleLocationInput} // Update state on change
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={getUserLocation}
                                        >
                                            <MdMyLocation />
                                        </div>
                                    </div>
                                </Form.Group>
                                
                                <button 
                                    type='submit' 
                                    className={`custom-button ${!location && !userCoordinates && !category ? 'disabled-hover' : ''}`}
                                    disabled={!location && !userCoordinates || !category}
                                >
                                    Search
                                </button>

                            </Form>
                        </div>
                        <div className="login-image d-none d-md-block">
                            <img 
                                className="img-fluid" 
                                src={imgOne} 
                                alt="Web Application"
                                style={{ height: '682px', width: '546px' }} 
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};