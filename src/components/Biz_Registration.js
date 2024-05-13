import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { BiLoaderCircle, BiCheckDouble, BiXCircle } from "react-icons/bi";
import HomeTestimony from './Home_Testimony.js';
import '../assets/styles/NewLoginInterface.css';

export default function BizRegistration({ businessName: initialBusinessName, aliasName: initialAliasName }) {

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
    const [ longitude, setLongitude ] = useState('');
    const [ addressLine1, setAddressLine1 ] = useState('');
    const [ addressLine2, setAddressLine2 ] = useState('');
    const [ addressLine3, setAddressLine3 ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ displayPhoneNumber, setDisplayPhoneNumber ] = useState('');


    const handleGetCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, (error) => {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
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

                                    <Form.Group controlId="formBasicImageUrl">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Image URL"
                                            value={imageUrl}
                                            onChange={handleImageUrlChange}
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
                                
                                {/* Biz Categories */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Categories</h4>

                                    <Form.Group controlId="formBasicBusinessName">
                                        <Form.Label>Select Biz Alias</Form.Label>
                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Business Name"
                                                value={businessName}
                                                className='mb-2'
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicBusinessName">
                                        <Form.Label>Select Biz Title</Form.Label>
                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Business Name"
                                                value={businessName}
                                                className='mb-2'
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                
                                {/* Biz Category */}
                                <div className='pt-3'>
                                    <h4 style={{ fontSize: '1.3rem' }} className='biz-color'>Biz Categories</h4>

                                    <Form.Group controlId="formBasicBusinessName">
                                        <Form.Label>Select Biz Alias</Form.Label>
                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Business Name"
                                                value={businessName}
                                                onChange={handleBusinessNameChange}
                                                className='mb-2'
                                            />
                                        </div>
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
                                    <h6>In getting your coordinates, you can either click the 'Get My Current Coordinates' and it will automatically collects your Biz latitdue and longitude. If you know your Biz latitude and longtitdue feel free to input it below.</h6>

                                    <button
                                        type='button'
                                        className="custom-button my-lg-3"
                                        onClick={handleGetCoordinates}
                                    >
                                        Get My Current Coordinates
                                    </button>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formLatitude">
                                                <Form.Label>Latitude</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={latitude}
                                                        onChange={e => setLatitude(e.target.value)}
                                                        className='mb-2'
                                                        min="-90"
                                                        max="90"
                                                    />
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col lg={6}>
                                            <Form.Group controlId="formLongitude">
                                                <Form.Label>Longitude</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={longitude}
                                                        onChange={e => setLongitude(e.target.value)}
                                                        className='mb-2'
                                                        min="-180"
                                                        max="180"
                                                    />
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
                                    
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group controlId="formCountry">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Country"
                                                    value={country}
                                                    onChange={handleChange(setCountry)}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group controlId="formCity">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter City"
                                                    value={city}
                                                    onChange={handleChange(setCity)}
                                                    className='mb-2'
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
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

                                        <Col lg={6}>
                                            <Form.Group controlId="formState">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter State"
                                                    value={state}
                                                    onChange={handleChange(setState)}
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