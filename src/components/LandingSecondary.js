import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { MdMyLocation } from "react-icons/md";
import imgOne from '../assets/img-app-vertical.png';
import '../assets/styles/NewLoginInterface.css';
import BarSpinner from '../components/BarSpinner';

export default function NewLogin() {
    const [ loading, setLoading ] = useState(false);
    const [ typedPlaceholder, setTypedPlaceholder ] = useState('');

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
                        <Form>
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
                                />
                            </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Location</Form.Label>
                                    <div style={{ position: 'relative' }}>
                                        <Form.Control
                                            required
                                            name="location"
                                            type="text"
                                            placeholder="Location"
                                            className='text-secondary'
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                        <MdMyLocation />
                                        </div>
                                    </div>
                                </Form.Group>
                                
                                <button type='submit' className="custom-button" >Search</button>

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
}
