import React, { useState, useContext } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Form, Modal, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

export default function NewSignUp() {
    const { user } = useContext(UserContext);

    // State variables for each form field
    const userId = user;
    const [ businessName, setBusinessName ] = useState('');
    const [ businessAlias, setBusinessAlias ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ address1, setAddress1 ] = useState('');
    const [ address2, setAddress2 ] = useState('');
    const [ address3, setAddress3 ] = useState('');
    const [ selectedCountry, setSelectedCountry ] = useState(null);
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const [ acceptTerms, setAcceptTerms ] = useState(false);

    const countryOptions = countryList().getData();
    console.log(userId);


    // Other state variables
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ showSuccessModal, setShowSuccessModal ] = useState(false);

    const categories = [
        "Agriculture",
        "Apparel & Accessories",
        "Arts & Entertainment",
        "Automotive",
        "Banking",
        "Beauty & Cosmetics",
        "Biotechnology",
        "Chemicals",
        "Communications",
        "Construction",
        "Consulting",
        "Consumer Goods",
        "Education",
        "Electronics",
        "Energy",
        "Engineering",
        "Environmental",
        "Finance",
        "Food & Beverage",
        "Government",
        "Healthcare",
        "Hospitality",
        "Information Technology",
        "Insurance",
        "Legal",
        "Manufacturing",
        "Marketing",
        "Media & Broadcasting",
        "Medical Devices & Supplies",
        "Mining",
        "Non-Profit",
        "Pharmaceuticals",
        "Real Estate",
        "Recreation & Leisure",
        "Retail",
        "Security",
        "Services",
        "Technology",
        "Telecommunications",
        "Textiles",
        "Tourism",
        "Transportation",
        "Utilities",
        "Wholesale"
    ];    
    
    const navigate = useNavigate();

    const handleCountryChange = selectedOption => {
        setSelectedCountry(selectedOption);
    };

    // Function to handle registration
    const registerBiz = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/v1/business/check/biz`, {
                tag: businessName
            });

            if(!response.data.exists){
                const registerResponse = await axios.post(`${apiUrl}/api/v1/business/register`, {
                    // Assuming you have a mechanism to get the logged-in user's ID
                    userId: "65d2ea3e0501cdf268b2ded8", 
                    alias: businessAlias,
                    name: businessName,
                    // Other fields...
                    location: {
                        // ...
                        country: selectedCountry ? selectedCountry.value : "", 
                        // ...
                    }
                });

                if (registerResponse.status === 200) {
                    setShowSuccessModal(true);
                }
            } else {
                setMessage("Business already exists.");
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Failed to register business.');
        } finally {
            setIsLoading(false);
        }
    };


    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/account');
    };

    // Form validation logic
    const validateForm = () => {
        // Add your validation logic here
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationMessage = validateForm();
        setMessage(validationMessage);

        const queryParams = new URLSearchParams({
            category: category,
            // location: location
        }).toString();
        sessionStorage.removeItem('userCoordinates');
        // sessionStorage.setItem('searchedLocation', JSON.stringify(location));

        navigate(`/search?${queryParams}`);
    };

    return (
        <>
            <div className='app-landing-page'>
                <div className="login-container">
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <h1 className='pb-3'>Register Biz</h1>
                        <p>Register your business today!</p>
                        <hr />
                        <h6 className='text-danger'>{message}</h6>
                        
                        {/* Form Fields */}
                        <Form.Group controlId="formBusinessName">
                            <Form.Label>Biz Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Business Name"
                                value={businessName}
                                onChange={e => setBusinessName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBusinessAlias">
                            <Form.Label>Biz Alias</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Business Alias"
                                value={businessAlias}
                                onChange={e => setBusinessAlias(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Business Category</Form.Label>
                            <Form.Select
                                required
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <h5 className='py-3 text-center'>Biz Address</h5>

                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Address Line 1"
                                value={address1}
                                onChange={e => setAddress1(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address Line 2"
                                value={address2}
                                onChange={e => setAddress2(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address Line 3</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address Line 3"
                                value={address3}
                                onChange={e => setAddress3(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Select
                                required
                                options={countryOptions}
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                placeholder="Select a country"
                                isClearable
                                isSearchable
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </Form.Group>

                        <h6 className='py-3 text-center'>Biz Coordinates</h6>
                        <h6 className='text-center'>
                            For more information, please visit this  
                            <a href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener noreferrer" className='ps-1 biz-color'>
                                link
                            </a>.
                        </h6>

                        <Form.Group controlId="formBasicLatitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Latitude"
                                value={latitude}
                                onChange={e => setLatitude(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicLongitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Longitude"
                                value={longitude}
                                onChange={e => setLongitude(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                required
                                type="checkbox"
                                label="By clicking this, you agree to the Terms & Conditions and the Privacy Policy."
                                checked={acceptTerms}
                                className='pt-3'
                                onChange={e => setAcceptTerms(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="warning" type="submit" disabled={isLoading} className='my-3'>
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>

            <Modal show={showSuccessModal} onHide={handleCloseModal} centered size="lg" backdrop="static" keyboard={false}>
                <Modal.Body>
                    <Container>
                        <h1>Successful Registration!</h1>
                        <p>Congratulations on signing up! Welcome to BizSolutions!</p>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}