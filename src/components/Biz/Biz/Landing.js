import React, { useState, useEffect } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { BiLoaderCircle, BiCheckDouble, BiXCircle, BiInfoCircle } from "react-icons/bi";
import landingImage from '../../../assets/images/img-web-add-biz.webp';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import BizRegistration from './Registration.js';
import { checkBusinessName, checkBusinessAlias } from '../../../utils/Biz/BizUtils.js';
import '../../../assets/styles/NewLoginInterface.css';

export default function BizLanding({ businessData, hasBusiness }) {

    const [ loading, setLoading ] = useState(false);
    const [ businessName, setBusinessName ] = useState('');
    const [ aliasName, setAliasName ] = useState('');
    const [ nameStatus, setNameStatus ] = useState('idle');
    const [ aliasStatus, setAliasStatus ] = useState('idle');
    const [ registrationVisible, setRegistrationVisible ] = useState(false);  
    const [ fieldsReadOnly, setFieldsReadOnly ] = useState(false); 
    const [ businessDetails, setBusinessDetails ] = useState([]);
    
    useEffect(() => {
        setBusinessDetails(businessData);
    }, [businessData]);
    
    useEffect(() => {
        if (!businessName) {
            setNameStatus('idle');
            return;
        }
        const timer = setTimeout(async () => {
            setNameStatus('checking');
            try {
                const isAvailable = await checkBusinessName(businessName);
                setNameStatus(isAvailable ? 'available' : 'unavailable');
            } catch (error) {
                setNameStatus('error');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [businessName]);

    useEffect(() => {
        if (!aliasName) {
            setAliasStatus('idle');
            return;
        }
        const timer = setTimeout(async () => {
            setAliasStatus('checking');
            try {
                const isAvailable = await checkBusinessAlias(aliasName);
                setAliasStatus(isAvailable ? 'available' : 'unavailable');
            } catch (error) {
                setAliasStatus('error');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [aliasName]);

    const handleBusinessNameChange = (event) => setBusinessName(event.target.value);
    const handleBusinessAliasChange = (event) => setAliasName(event.target.value);

    const handleProceedClick = () => {
        setRegistrationVisible(true);
        setFieldsReadOnly(true); 
    };

    return (
        loading ? <BarSpinner /> :
        <>        
            <div className='app-landing-page'>
                <Container>
                    <div className="login-container">

                        <div className="login-image d-none d-lg-block">
                            <img 
                                className="img-fluid" 
                                src={landingImage} 
                                alt="BizSolutions LLC Add Biz Illustration"
                            />
                        </div>

                        <div className="login-form">
                            <div className='pb-3'>
                                <h1 style={{ fontSize: '2.8rem' }} className='biz-color'>Empower Your Biz</h1>
                                <h4 style={{ fontSize: '1.3rem' }} className='text-secondary'>Grow & Succeed Locally</h4>
                            </div>
                            <div>
                                <p className="paragraph-text">
                                In today’s competitive marketplace, standing out is more crucial than ever. Joining <span className='biz-color' style={{ fontSize: '1.1rem' }} >BizSolutions</span> allows you to enhance your local visibility, ensuring that your business is not just seen, but also preferred. We specialize in positioning your services in front of the right local audience, transforming your business into a community staple.</p>
                                <p className="paragraph-text">
                                <span className='biz-color' style={{ fontSize: '1.1rem' }} >BizSolutions</span> is not just a platform; it's a community builder. By integrating your business with our application, you open the doors to collaborations and partnerships within your locality. This network effect not only enhances your business capabilities but also solidifies your standing in the local market.</p>
                            </div>

                            <div>
                                {businessDetails && businessDetails.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '1.5rem' }} className='py-2 text-secondary'>My Biz-ness!</h4>

                                        {businessDetails.slice(0, 2).map((biz, index) => (
                                            <Alert key={index} variant='secondary'>
                                                <p className='biz-color my-1'>{biz.name}</p>
                                            </Alert>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div >
                                <hr/>

                                <Form>
                                    <div className='pb-2'>
                                        <h3 className='biz-color'>Add Biz</h3>
                                        <p className="text-secondary" style={{ fontSize: '.8rem' }}>
                                            Check if the business is already added in Biz.
                                        </p>

                                    </div>

                                    <div className='pb-2'>

                                        <Form.Group controlId="formBasicBusinessName">
                                            <Form.Label>Business Name</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Business Name"
                                                    value={businessName}
                                                    onChange={handleBusinessNameChange}
                                                    className='mb-2'
                                                    readOnly={fieldsReadOnly}
                                                />
                                                {nameStatus === 'checking' && (
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
                                                {nameStatus === 'available' && (
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
                                                {nameStatus === 'unavailable' && (
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
                                                    Please use proper spelling, spacing, and capitalization.
                                                </p>
                                                <br/>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    Enter your business name exactly as it should appear.
                                                </p>
                                                <br/>
                                                <BiInfoCircle style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                <p style={{ display: 'inline', verticalAlign: 'middle' }} className='text-subtitle-below'>
                                                    This information will be shown publicly and cannot be edited later.
                                                </p>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicBusinessName">
                                            <Form.Label>Business Alias</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Business Alias"
                                                    value={aliasName}
                                                    onChange={handleBusinessAliasChange}
                                                    className='mb-2'
                                                    readOnly={fieldsReadOnly}
                                                />
                                                {aliasStatus === 'checking' && (
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
                                                {aliasStatus === 'available' && (
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
                                                {aliasStatus === 'unavailable' && (
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
                                    </div>

                                    {nameStatus === 'available' && aliasStatus === 'available' && (
                                        <button
                                            type='button'
                                            className="custom-button"
                                            onClick={handleProceedClick}
                                        >
                                            Proceed
                                        </button>
                                    )}                        
                                </Form>

                            </div>
                        </div>

                    </div>
                </Container>
            </div>
            


        </>
    );
};