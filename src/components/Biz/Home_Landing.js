import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form } from 'react-bootstrap';
import { MdMyLocation } from "react-icons/md";
import { BiLoaderCircle, BiCheckDouble, BiXCircle, BiInfoCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import landingImage from '../../assets/Biz/images/img-app-vertical.png';
import '../../assets/Biz/styles/NewLoginInterface.css';
import { loggedVisitors } from '../../utils/Biz/ClientUtils';
import { debounce } from 'lodash';

export default function HomeLanding() {

    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);
    const [ typedPlaceholder, setTypedPlaceholder ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ userCoordinates, setUserCoordinates ] = useState(null); 
    const [ selectedLocation ] = useState('Location');
    const [ typedLocation, setTypedLocation ] = useState(false);
    const [ locationStatus, setLocationStatus ] = useState('');
 
    // Function for handling of category input
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // Function for handling of location input
    const handleLocationInput = useCallback(debounce((value) => {
        setLocation(value);
        setTypedLocation(true);
        if (value.trim() !== '') {
            setLocationStatus('checking');
            setTimeout(() => setLocationStatus('available'), 500); // Reduced delay for UI update
        } else {
            setLocationStatus('');
        }
    }, 150), []);

    // Function to retrieve user's location
    const getUserLocation = () => {
        setLoading(true);
        setLocationStatus('checking');
        const cachedCoords = sessionStorage.getItem('userCoordinates');
    
        if (cachedCoords) {
            const coords = JSON.parse(cachedCoords);
            setUserCoordinates(coords);
            setLocation('My Current Location');
            setLocationStatus('available');
            setLoading(false);
            setTypedLocation(false);
            return;
        }
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setLocation('My Current Location');  // Update the value, not placeholder
                    setUserCoordinates(coords);
                    sessionStorage.setItem('userCoordinates', JSON.stringify(coords));
                    setLocationStatus('available');
                    setLoading(false);
                    setTypedLocation(false);  // Reset this as location is now auto-detected
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLocationStatus('unavailable');
                    setLoading(false);
                    setTypedLocation(true);  // User needs to manually enter location if error occurs
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLocationStatus('unavailable');
            setLoading(false);
        }
    };

    // Function to submit/navigate to <SearchResult />
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        sessionStorage.setItem('searchedCategory', JSON.stringify(category));
        console.log(userCoordinates);

        // Use more explicit checking for location type
        if (typedLocation && location.trim() !== '') {
            console.log("Using manually entered location:", location);
            const queryParams = new URLSearchParams({
                category: category,
                location: location
            }).toString();
            sessionStorage.removeItem('userCoordinates');
            sessionStorage.setItem('searchedLocation', JSON.stringify(location));
            const result = await loggedVisitors(null, null, location, category)

    
            navigate(`/search?${queryParams}`);
        } else if (userCoordinates && userCoordinates.latitude && userCoordinates.longitude) {
            console.log("Using geolocation coordinates:", userCoordinates);
            const queryParams = new URLSearchParams({
                category: category,
                location: `Lat:${userCoordinates.latitude},Long:${userCoordinates.longitude}` 
            }).toString();
            sessionStorage.setItem('searchedLocation', JSON.stringify(`Lat:${userCoordinates.latitude},Long:${userCoordinates.longitude}`));
            const result = await loggedVisitors(userCoordinates.longitude, userCoordinates.latitude, location, category)

            navigate(`/search?${queryParams}`);
        } else {
            console.error("No location information available");
            alert("No location information available, please provide a location.");
        }
    };
    
    // Typing Effect Category field
    useEffect(() => {
        sessionStorage.removeItem('userCoordinates');
        sessionStorage.removeItem('searchedLocation');
        sessionStorage.removeItem('searchedCategory');

        const typingStrings = [
            "Restaurants",
            "Hotel",
            "Laundromat",
            "Dentist",
            "Contractors",
            "Services"
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
        <>        
            <div className='app-landing-page'>
            <Container>
                <div className="login-container">
                    <div className="login-form">
                        <Form onSubmit={handleSubmit}>
                            <div className='pb-3'>
                            <h1 style={{ fontSize: '2.8rem' }} className='biz-color'>Discover and Experience</h1>
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
                                    value={location}
                                    onChange={(event) => {
                                        event.persist();
                                        handleLocationInput(event.target.value);
                                    }}
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
                                        {locationStatus === 'checking' && <BiLoaderCircle />}
                                        {locationStatus === 'available' && <BiCheckDouble style={{ color: 'green' }} />}
                                        {locationStatus === 'unavailable' && <BiCheckDouble style={{ color: 'red' }} />}
                                        {locationStatus === '' && <MdMyLocation />}
                                    </div>

                                </div>
                            </Form.Group>
                                
                                <button 
                                    type='submit' 
                                    className={`custom-button`}
                                >
                                    Search
                                </button>

                            </Form>
                        </div>

                        <div className="login-image d-none d-md-block">
                            <img 
                                className="img-fluid" 
                                src={landingImage} 
                                alt="BizSolutions LLC Landing Image"
                                style={{ height: '682px', width: '546px' }} 
                            />
                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
};