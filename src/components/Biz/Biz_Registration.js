import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { BiLoaderCircle, BiCheckDouble, BiXCircle, BiInfoCircle } from "react-icons/bi";
import HomeTestimony from './Home_SectionC.js';
import SuccessBox from './Biz_Success.js';
import FailBox from './Biz_Failure.js';
import { submitBizRegistration } from '../../utils/Biz/BizUtils.js';
import '../../assets/Biz/styles/BizRegistration.css';


export default function BizRegistration({ businessName: initialBusinessName, aliasName: initialAliasName }) {

    const navigate = useNavigate();

    const [ businessCategories, setBusinessCategories ] = useState([
        'Restaurant', 'Library', 'Retail', 'Service', 'Healthcare', 'Technology',
        'Education', 'Finance', 'Real Estate', 'Construction', 'Manufacturing',
        'Transportation', 'Entertainment', 'Wholesale', 'Personal Care', 'Hospitality',
        'Fitness', 'Legal', 'Consulting', 'Insurance', 'Agriculture', 'Arts and Crafts',
        'Automotive', 'Energy', 'Food Services', 'Non-Profit', 'Fashion'
    ]);

    const [ businessName, setBusinessName ] = useState(initialBusinessName || '');
    const [ aliasName, setAliasName ] = useState(initialAliasName || '');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ websiteUrl, setWebsiteUrl ] = useState('');
    const [ showCategories, setShowCategories ] = useState(false);
    const [ transactionModes, setTransactionModes ] = useState({
        pickup: false,
        delivery: false,
        driveThru: false,
        dineIn: false
    });

    const [ latitude, setLatitude ] = useState('');  
    const [ latitudeStatus, setLatitudeStatus ] = useState('idle');

    const [ longitude, setLongitude ] = useState('');
    const [ longitudeStatus, setLongitudeStatus ] = useState('idle');

    const [ resultStatus, setResultStatus ] = useState('');

    const [ addressLine1, setAddressLine1 ] = useState('');
    const [ addressLine2, setAddressLine2 ] = useState('');
    const [ addressLine3, setAddressLine3 ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ displayPhoneNumber, setDisplayPhoneNumber ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const [ selectedCountry, setSelectedCountry ] = useState(null);
    const [ selectedState, setSelectedState ] = useState(null);
    const [ selectedCity, setSelectedCity ] = useState(null);

    const [ imageFile, setImageFile ] = useState(null);

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const countriesOptions = useMemo(() => {
        const countries = Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.isoCode
        }));
        const usOption = countries.find(option => option.value === 'US');
        return usOption ? [usOption, ...countries.filter(option => option.value !== 'US')] : countries;
    }, []);

    const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        label: state.name,
        value: state.isoCode
    })) : [];

    const cityOptions = selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
        label: city.name,
        value: city.isoCode
    })) : [];

    const handleGetCoordinates = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            setLongitudeStatus('checking');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setIsLoading(false);
                    setLongitudeStatus('available');
                },
                (error) => {
                    setIsLoading(false);
                    setLongitudeStatus('unavailable');
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleImageUrlChange = (event) => setImageUrl(event.target.value);

    const handleWebsiteUrlChange = (event) => setWebsiteUrl(event.target.value);
    const handleTransactionChange = (event) => {
        setTransactionModes({
            ...transactionModes,
            [event.target.value]: event.target.checked
        });
    };
    const handleChange = (setter) => (e) => setter(e.target.value);
    const handleProceedToCategories = () => {
        setShowCategories(true);
    };
    const handleBusinessNameChange = (event) => setBusinessName(event.target.value);
    const handleReturnToInitialInfo = () => {
        setShowCategories(false);
    };
    const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleChangeDisplayPhoneNumber = (e) => setDisplayPhoneNumber(e.target.value);
    const handleEmailAddress= (e) => setEmailAddress(e.target.value);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCountryChange = (option) => {
        setSelectedCountry(option);
        setSelectedState(null); 
        setSelectedCity(null);
    };

    const handleStateChange = (option) => {
        setSelectedState(option);
        setSelectedCity(null);
    };

    const handleCityChange = (option) => {
        setSelectedCity(option);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!businessName || !websiteUrl || !selectedCountry || !selectedState || !phoneNumber) {
            alert("Please fill in all required fields.");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', businessName);
        formData.append('alias', aliasName);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        formData.append('url', websiteUrl);
        formData.append('categories', JSON.stringify([{ alias: selectedCategory, title: selectedCategory }])); // Correctly format categories
        formData.append('coordinates', JSON.stringify({ latitude, longitude })); // Correctly format coordinates
        formData.append('address1', addressLine1);
        formData.append('address2', addressLine2);
        formData.append('address3', addressLine3);
        formData.append('city', selectedCity ? selectedCity.label : '');
        formData.append('state', selectedState ? selectedState.label : '');
        formData.append('zipCode', zipCode);
        formData.append('country', selectedCountry ? selectedCountry.label : '');
        formData.append('phone', phoneNumber);
        formData.append('display_phone', displayPhoneNumber);
        formData.append('email', emailAddress);
        formData.append('transactions', JSON.stringify(Object.keys(transactionModes).filter(key => transactionModes[key]))); // Correctly format transactions
        formData.append('location', JSON.stringify({ 
            address1: addressLine1, 
            address2: addressLine2, 
            address3: addressLine3, 
            city: selectedCity ? selectedCity.label : '', 
            zip_code: zipCode, 
            country: selectedCountry ? selectedCountry.label : '', 
            state: selectedState ? selectedState.label : '' 
        }));
    
        try {
            const result = await submitBizRegistration(formData);
            setResultStatus('success');
            setTimeout(() => {
                navigate('/my-biz');
            }, 5000);
        } catch (error) {
            setResultStatus('failure');
        }
    };
    
    useEffect(() => {
        if (!latitude) {
            setLatitudeStatus('idle');
            return;
        }
        setLatitudeStatus('checking');
        const timer = setTimeout(() => {
            setLatitudeStatus('available');
        }, 500);
        return () => clearTimeout(timer);
    }, [latitude]);

    useEffect(() => {
        if (!longitude) {
            setLongitudeStatus('idle');
            return;
        }
        setLongitudeStatus('checking');
        const timer = setTimeout(() => {
            setLongitudeStatus('available');
        }, 500);
        return () => clearTimeout(timer);
    }, [longitude]);

    return (
        <>
            <Container className="landing-container my-3">
                <div className="flex-row">
                    <div className="flex-col content-col mx-3">
                        <h1 className='title text-center biz-color'>Register Biz</h1>
                        <hr />
                        <p className="paragraph-text text-center">
                            Enter your information below to proceed.
                        </p>
                    </div>
                </div>
                
                <Container>
                    <div>
                        <Form>                

                            <div className='pb-2 mx-lg-5'>

                                {/* Biz Initial Information */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Inital Information</h4>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formBasicBusinessName">
                                                <Form.Label>Business Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={businessName}
                                                    readOnly
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col lg={6}>
                                            <Form.Group controlId="formBasicAliasName">
                                                <Form.Label>Alias Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={aliasName}
                                                    readOnly
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="formBasicImageUpload">
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control
                                            required
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className='mb-2'
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicWebsiteUrl">
                                        <Form.Label>Website URL</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Website URL"
                                            value={websiteUrl}
                                            onChange={handleWebsiteUrlChange}
                                            className='mb-2'
                                        />
                                    </Form.Group>

                                </div>
                                
                                {/* Biz Category */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Categories</h4>

                                    <Form.Group controlId="formBizCategory">
                                        <Form.Label>Select Biz Category</Form.Label>
                                        <Form.Select 
                                            required 
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            className='mb-2'>
                                            <option value="">Select Category</option>
                                            {businessCategories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                                {/* Biz Transaction */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Transaction</h4>

                                    <Form.Group controlId="formTransactionMode">
                                        <Form.Label>Select Possible Biz Transactions</Form.Label>
                                        <Container>
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Pickup"
                                                        name="transactionMode"
                                                        value="pickup"
                                                        checked={transactionModes.pickup}
                                                        onChange={handleTransactionChange}
                                                        id="pickup"
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Delivery"
                                                        name="transactionMode"
                                                        value="delivery"
                                                        checked={transactionModes.delivery}
                                                        onChange={handleTransactionChange}
                                                        id="delivery"
                                                    />
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Drive Thru"
                                                        name="transactionMode"
                                                        value="driveThru"
                                                        checked={transactionModes.driveThru}
                                                        onChange={handleTransactionChange}
                                                        id="driveThru"
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Dine-In"
                                                        name="transactionMode"
                                                        value="dineIn"
                                                        checked={transactionModes.dineIn}
                                                        onChange={handleTransactionChange}
                                                        id="dineIn"
                                                    />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form.Group>
                                </div>

                                {/* Biz Coordinates */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Location</h4>
                                    <p className='text-subtitle-fields'>In getting your coordinates, you can either click the 'Get My Current Coordinates' and it will automatically collect your Biz latitude and longitude. If you know your Biz latitude and longitude feel free to input it below.</p>

                                    <button
                                        type='button'
                                        className="custom-button my-3"
                                        onClick={handleGetCoordinates}
                                    >
                                        {isLoading ? <BiLoaderCircle className="loading-icon" /> : 'Get My Current Coordinates'}
                                    </button>

                                    <Row>
                                        <Col lg={6}>
                                        <Form.Group controlId="formLatitude">
                                            <Form.Label>Latitude</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    type="number"
                                                    value={latitude}
                                                    onChange={e => setLatitude(e.target.value)}
                                                    className='mb-2'
                                                    placeholder='e.g., 14.6480903'
                                                    min="-90"
                                                    max="90"
                                                />
                                                {latitudeStatus === 'checking' && (
                                                    <BiLoaderCircle
                                                        className='biz-color'
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                                {latitudeStatus === 'available' && (
                                                    <BiCheckDouble
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: 'green',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                                {latitudeStatus === 'unavailable' && (
                                                    <BiXCircle
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: 'red',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className='pb-3 ps-3'>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    Enter the latitude as a number between -90 and 90. Latitude indicates the north-south position of a location on the Earth.
                                                </p>
                                            </div>
                                        </Form.Group>
                                        </Col>
                                        
                                        <Col lg={6}>
                                        <Form.Group controlId="formLongitude">
                                            <Form.Label>Longitude</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    value={longitude}
                                                    onChange={e => setLongitude(e.target.value)}
                                                    className='mb-2'
                                                    placeholder='e.g., -74.0060'
                                                    min="-180"
                                                    max="180"
                                                />
                                                {longitudeStatus === 'checking' && (
                                                    <BiLoaderCircle
                                                        className='biz-color'
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                                {longitudeStatus === 'available' && (
                                                    <BiCheckDouble
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: 'green',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                                {longitudeStatus === 'unavailable' && (
                                                    <BiXCircle
                                                        style={{
                                                            position: 'absolute',
                                                            right: '10px',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            color: 'red',
                                                            fontSize: '24px'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className='pb-3 ps-3'>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    Enter the longitude as a number between -180 and 180. Longitude indicates the east-west position of a location on the Earth.
                                                </p>
                                            </div>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                {/* Bix Address */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Address</h4>

                                    <Form.Group controlId="formAddressLine1">
                                        <Form.Label>Address Line 1</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Address Line 1"
                                            value={addressLine1}
                                            onChange={handleChange(setAddressLine1)}
                                            className='mb-2'
                                        />
                                        <div className='pb-3 ps-3'>
                                            <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                            <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                Enter the street part of your business address. This address will be shown publicly to help customers locate your business.
                                            </p>
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formAddressLine2">
                                        <Form.Label>Address Line 2</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Address Line 2"
                                            value={addressLine2}
                                            onChange={handleChange(setAddressLine2)}
                                            className='mb-2'
                                        />
                                        <div className='pb-3 ps-3'>
                                            <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                            <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                Enter any additional details such as suite or apartment number that are crucial for locating your business. This information will be shown publicly.
                                            </p>
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formAddressLine3">
                                        <Form.Label>Address Line 3</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Address Line 3"
                                            value={addressLine3}
                                            onChange={handleChange(setAddressLine3)}
                                            className='mb-2'
                                        />
                                        <div className='pb-3 ps-3'>
                                            <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                            <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                Provide any landmarks or additional directions to help further pinpoint your business location. This information will also be shown publicly.
                                            </p>
                                        </div>
                                    </Form.Group>
                                    
                                    <Row className='pb-2'>
                                        <Col lg={6}>
                                            <Form.Group controlId="formCountry">
                                                <Form.Label>Country</Form.Label>
                                                <Select
                                                    options={countriesOptions}
                                                    value={selectedCountry}
                                                    onChange={handleCountryChange}
                                                    placeholder="Select Country"
                                                    isClearable
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group controlId="formState">
                                                <Form.Label>State</Form.Label>
                                                <Select
                                                    options={stateOptions}
                                                    value={selectedState}
                                                    onChange={handleStateChange}
                                                    placeholder="Select State"
                                                    isDisabled={!selectedCountry}
                                                    isClearable
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formCity">
                                                <Form.Label>City</Form.Label>
                                                <Select
                                                    options={cityOptions}
                                                    value={selectedCity}
                                                    onChange={handleCityChange}
                                                    placeholder="Select City"
                                                    isDisabled={!selectedState}
                                                    isClearable
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group controlId="formZipCode">
                                                <Form.Label>Zip Code</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Zip Code"
                                                    value={zipCode}
                                                    onChange={handleChange(setZipCode)}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h6>Display Address Follows:</h6>
                                        <div className="address-display ps-5">
                                            {addressLine1 && <h6>{addressLine1}</h6>}
                                            {addressLine2 && <h6>{addressLine2}</h6>}
                                            {addressLine3 && <h6>{addressLine3}</h6>}
                                            {city || state || zipCode ? (
                                                <h6>{[city, state, zipCode].filter(Boolean).join(', ')}</h6>
                                            ) : null}
                                            {country && <h6>{country}</h6>}
                                        </div>

                                </div>

                                {/* Biz Contacts */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Contact Details</h4>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formPhoneNumber">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Biz Phone Number"
                                                    value={phoneNumber}
                                                    onChange={handleChangePhoneNumber}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group controlId="formDisplayPhoneNumber">
                                                <Form.Label>Display Phone Number</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Display Phone Number"
                                                    value={displayPhoneNumber}
                                                    onChange={handleChangeDisplayPhoneNumber}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={12}>
                                            <Form.Group controlId="formPhoneNumber">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="Enter Biz Email Address"
                                                    value={emailAddress}
                                                    onChange={handleEmailAddress}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className="custom-button my-2"
                                        onClick={handleSubmit}
                                    >
                                        Create Biz
                                    </button>
                                
                                    {resultStatus === 'success' && <div data-aos="fade-down"><SuccessBox /></div>}
                                    {resultStatus === 'failure' && <div data-aos="fade-down"><FailBox /></div>} 
                                
                                </div>
                            </div>

                        </Form>
                    </div>
                </Container>
            </Container>
            <div data-aos="fade-up"><HomeTestimony /></div>
        </>
    );
};