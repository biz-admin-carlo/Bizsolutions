import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { BiLoaderCircle, BiCheckDouble, BiXCircle } from "react-icons/bi";
import HomeTestimony from '../Home/SectionC.js';
import SuccessBox from './Response/SuccessMessage.js';
import FailBox from './Response/ErroMessage.js';
import { submitBizRegistration } from '../../../utils/Biz/BizUtils.js';
import '../../../assets/styles/BizRegistration.css';
import { Link } from 'react-router-dom';

export default function BizRegistration({ businessName: initialBusinessName, aliasName: initialAliasName }) {

    const navigate = useNavigate();

    const [ businessCategories, setBusinessCategories ] = useState([
        'Restaurant', 'Library', 'Retail', 'Service', 'Healthcare', 'Technology',
        'Education', 'Finance', 'Real Estate', 'Construction', 'Manufacturing',
        'Transportation', 'Entertainment', 'Wholesale', 'Personal Care', 'Hospitality',
        'Fitness', 'Legal', 'Consulting', 'Insurance', 'Agriculture', 'Arts and Crafts',
        'Automotive', 'Energy', 'Food Services', 'Non-Profit', 'Fashion',

        'Marketing & Advertising', 'Media & Publishing', 'Telecommunications',
        'Pharmaceuticals', 'Biotechnology', 'Logistics & Distribution', 'Tourism & Travel',
        'Consumer Electronics', 'Ecological Services', 'Gaming', 'Sports & Recreation',
        'Home & Garden', 'Health & Wellness', 'E-commerce', 'Data Analytics',
        'Event Planning', 'Accounting', 'Cybersecurity', 'Art Gallery', 'Café',
        'Bakery', 'Bars & Nightclubs', 'Charity', 'Government Services', 'Religious Organization',
        'Auto Repair', 'Grocery', 'Clothing Stores', 'Electronics Store', 'Beauty Salon',
        'Spas', 'Jewelry', 'Interior Design', 'Bookstore', 'Pet Services',
    ]);

    const [ businessName, setBusinessName ] = useState(initialBusinessName || '');
    const [ aliasName, setAliasName ] = useState(initialAliasName || '');
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
    const [ isChecked, setIsChecked ] = useState(false);

    const [subscriptionName, setSubscriptionName] = useState('');
    const [paymentGateway, setPaymentGateway] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [amountTransacted, setAmountTransacted] = useState('');

    const [keywords, setKeywords] = useState([]);
    const [agentId, setAgentId] = useState('');
    const [agentName, setAgentName] = useState('');

    const handleSubscriptionNameChange = (e) => setSubscriptionName(e.target.value);
    const handlePaymentGatewayChange = (e) => setPaymentGateway(e.target.value);
    const handleCustomerEmailChange = (e) => setCustomerEmail(e.target.value);
    const handleAmountTransactedChange = (e) => setAmountTransacted(e.target.value);

    const handleAgentIdChange = (e) => setAgentId(e.target.value);
    const handleAgentNameChange = (e) => setAgentName(e.target.value);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
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

    const subscriptionOptions = [
        { value: 'No Subscription', label: 'No Subscription' },
        { value: 'Starter Setup Monthly', label: 'Starter Setup Monthly' },
        { value: 'Starter Setup Annually', label: 'Starter Setup Annually' },
        { value: 'Advanced Setup Monthly', label: 'Advanced Setup Monthly' },
        { value: 'Advanced Setup Annually', label: 'Advanced Setup Annually' },
        { value: 'Professional Revamp Monthly', label: 'Professional Revamp Monthly' },
        { value: 'Professional Revamp Annually', label: 'Professional Revamp Annually' },
    ];

    const paymentGatewayOptions = [
        { value: 'Stripe', label: 'Stripe' },
        { value: 'PayPal', label: 'PayPal' },
        { value: 'Others', label: 'Others' },
    ];

    const keywordOptions = [
        { value: 'coffee', label: 'Coffee' },
        { value: 'brunch', label: 'Brunch' },
        { value: 'outdoor-seating', label: 'Outdoor Seating' },
        { value: 'dine-in', label: 'Dine-In' },
        { value: 'takeaway', label: 'Takeaway' },
        { value: 'family-friendly', label: 'Family Friendly' },
        { value: 'vegan-options', label: 'Vegan Options' },
        { value: 'fast-delivery', label: 'Fast Delivery' },
        { value: 'open-late', label: 'Open Late' },
        { value: 'live-music', label: 'Live Music' },
        { value: 'reservations', label: 'Reservations' },
        { value: 'wifi', label: 'WiFi' },
        { value: 'parking', label: 'Parking' },
        { value: 'pet-friendly', label: 'Pet Friendly' },
        { value: 'kids-menu', label: 'Kids Menu' },
        { value: 'gluten-free', label: 'Gluten-Free' },
        { value: 'organic', label: 'Organic' },
        { value: 'locally-sourced', label: 'Locally Sourced' },
        { value: 'happy-hour', label: 'Happy Hour' },
        { value: 'drive-thru', label: 'Drive-Thru' },
    ];    

    const [selectedCategories, setSelectedCategories] = useState([]);
    const categoryOptions = businessCategories.map(cat => ({ label: cat, value: cat }));

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!businessName || !websiteUrl || !selectedCountry || !selectedState || !phoneNumber) {
            alert("Please fill in all required fields.");
            return;
        }
    
        const formData = new FormData();
        formData.append('subscriptionName', subscriptionName);
        formData.append('paymentGateway', paymentGateway);
        formData.append('customerEmail', customerEmail);
        formData.append('amountTransacted', amountTransacted);
        formData.append('name', businessName);
        formData.append('alias', aliasName);
        formData.append('url', websiteUrl);

        const categoriesArray = selectedCategory ? [{ alias: selectedCategory, title: selectedCategory }] : [];
        formData.append('categories', JSON.stringify(categoriesArray));

        formData.append('coordinates', JSON.stringify({ latitude, longitude }));

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

        const transactionArray = Object.keys(transactionModes).filter(key => transactionModes[key]);
        formData.append('transactions', JSON.stringify(transactionArray));

        formData.append('location', JSON.stringify({ 
            address1: addressLine1, 
            address2: addressLine2, 
            address3: addressLine3, 
            city: selectedCity ? selectedCity.label : '', 
            zip_code: zipCode, 
            country: selectedCountry ? selectedCountry.label : '', 
            state: selectedState ? selectedState.label : '' 
        }));

        const keywordValues = keywords.length > 0 ? keywords.map(k => k.value) : [];
        formData.append('keywords', JSON.stringify(keywordValues));

        if (agentId.trim() !== '') {
            formData.append('agentId', agentId.trim());
        }
        if (agentName.trim() !== '') {
            formData.append('agentName', agentName.trim());
        }
    
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
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Initial Information</h4>
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
                                            className='mb-2'
                                        >
                                            <option value="">Select Category</option>
                                            {businessCategories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                                {/* Keywords (Multiple) */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Keywords (Optional)</h4>
                                    <p className='text-subtitle-fields'>Select keywords to enhance your SEO presence. Leave empty if none.</p>
                                    <Form.Group controlId="formBizKeywords">
                                        <Select
                                            options={keywordOptions}
                                            value={keywords}
                                            onChange={(selected) => setKeywords(selected || [])}
                                            placeholder="Select Keywords"
                                            isMulti
                                            isClearable
                                            className='mb-2'
                                        />
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
                                    <p className='text-subtitle-fields'>
                                        Use a reliable source like Google Maps to find your business coordinates.
                                    </p>

                                    <button
                                        type='button'
                                        className="custom-button my-3"
                                        onClick={handleGetCoordinates}
                                    >
                                        {isLoading ? <BiLoaderCircle className="loading-icon" /> : 'Get My Current Coordinates'}
                                    </button>

                                    <p 
                                        style={{
                                            display: 'inline',
                                            verticalAlign: 'middle',
                                            color: '#d9534f', 
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }} 
                                        className="text-subtitle-below mb-5"
                                        >
                                        ⚠️ Warning: Please refrain from using the <strong>'Get My Coordinates'</strong> feature, as it retrieves your current location instead of the business location. To ensure accurate coordinates, use reliable tools like {''} 
                                        <a 
                                            href="https://www.google.com/maps" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            style={{ color: '#0056b3', textDecoration: 'underline' }}
                                        >
                                            Google Maps
                                        </a>.
                                    </p>

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
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                {/* Biz Address */}
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
                                        {(city || state || zipCode) && (
                                            <h6>{[city, state, zipCode].filter(Boolean).join(', ')}</h6>
                                        )}
                                        {country && <h6>{country}</h6>}
                                    </div>
                                </div>

                                {/* Biz Contact Details */}
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
                                            <Form.Group controlId="formEmailAddress">
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

                                {/* Biz Payment & Additional Details */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Payment & Additional Details*</h4>
                                    <h6 style={{ fontSize: '1rem' }}><em>*Optional for accounts without payment process</em></h6>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formSubscriptionName">
                                                <Form.Label>Subscription Name</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={subscriptionName}
                                                    onChange={handleSubscriptionNameChange}
                                                    className='mb-2'
                                                >
                                                    <option value="">Select Subscription</option>
                                                    {subscriptionOptions.map((option, index) => (
                                                        <option key={index} value={option.value}>{option.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group controlId="formPaymentGateway">
                                                <Form.Label>Payment Gateway</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={paymentGateway}
                                                    onChange={handlePaymentGatewayChange}
                                                    className='mb-2'
                                                >
                                                    <option value="">Select Payment Gateway</option>
                                                    {paymentGatewayOptions.map((option, index) => (
                                                        <option key={index} value={option.value}>{option.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formCustomerEmail">
                                                <Form.Label>Customer's Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter Customer's Email Address"
                                                    value={customerEmail}
                                                    onChange={handleCustomerEmailChange}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="formAmountTransacted">
                                                <Form.Label>Amount Transacted</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Amount Transacted"
                                                    value={amountTransacted}
                                                    onChange={handleAmountTransactedChange}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* Additional Optional Fields for Agent */}
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formAgentId">
                                                <Form.Label>Agent ID (Optional)</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Agent ID"
                                                    value={agentId}
                                                    onChange={handleAgentIdChange}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group controlId="formAgentName">
                                                <Form.Label>Agent Name (Optional)</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Agent Name"
                                                    value={agentName}
                                                    onChange={handleAgentNameChange}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="relative flex flex-wrap items-center">
                                    <Form>
                                        <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id="terms-agreement"
                                            label={
                                            <>
                                                I acknowledge and agree to the{' '}
                                                <Link to="/terms" className="text-black" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                                                BizSolutions LLC Terms & Conditions
                                                </Link>
                                                , and I fully understand the legal implications of adding this business.
                                            </>
                                            }
                                            onChange={handleCheckboxChange}
                                        />
                                        </div>
                                    </Form>
                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className={`custom-button my-2 ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isChecked}                                       
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
