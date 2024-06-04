import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, Button, Badge } from 'react-bootstrap';
import { GoCheckCircleFill } from "react-icons/go";
import { IconContext } from "react-icons";
import Axios from 'axios';

import '../../assets/Biz/styles/AppInformation.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function ProfessionalRevamp({ selected }) {

    const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
          const response = await Axios.get(`${apiUrl}/api/v1/users/details`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setUser(response.data);

          } else {
            // console.error('Failed to fetch user details');
          }
        } catch (error) {
          // console.error('Error:', error);
        }
      };

    const handleModalToggle = () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            navigate('/login/pricing');
            return; 
        }
    
        const stripePaymentLinks = {
            monthly: "https://buy.stripe.com/6oEaFUgr1fVZ86c4gI",
            annual: "https://buy.stripe.com/6oE01g3Ef7ptcmsfZr"
        };

        // const keapPaymentLinks = {
        //     monthly: "https://keap.app/checkout/dyb285/web-revamp-monthly",
        //     annual: "https://keap.app/checkout/dyb285/web-revamp-annually"
        // };
    
        const paymentUrl = stripePaymentLinks[selected];
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } else {
            // console.error('Invalid subscription type selected');
        }
    };

    const webRevamp = selected === 'annual' ? (
        <span style={{ position: 'relative' }}>
          <span style={{ textDecoration: 'line-through', color: 'red' }}> 
            $699.99  
          </span>
          <span> </span>
          <span> 
            $399.99
          </span>
        </span>
    ) : (
        '$49.99'
    );

    return (
        <Card className='card-shadow'>
            <Card.Body className='ms-3'>
                <Card.Title>Professional Revamp Package</Card.Title>
                    <h3 className='card-text-amount'>
                    {webRevamp}<p>per month {
                        selected === 'annual' ?
                        <>
                        <Badge pill bg="warning" text="dark" className='my-2'>billed annually</Badge>
                        </>
                        :
                        <Badge pill bg="light" text="warning" className='my-2'>billed monthly</Badge>
                    }</p>
                    </h3>

                    <Button variant="warning" className='my-3 full-width-button' onClick={handleModalToggle}>
                        Get Started
                    </Button>

                    <Card.Text>Enhanced Business Presence</Card.Text>
                        <div className='pb-5'>
                            <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                <div><GoCheckCircleFill />Premier Business Profile</div>
                                <div><GoCheckCircleFill />Essential Contact Details</div>
                                <div><GoCheckCircleFill />Verified Physical Location</div>
                                <div><GoCheckCircleFill />Flexible Business Hours</div>
                                <div><GoCheckCircleFill />Seamless Payment Solutions</div>
                                <div><GoCheckCircleFill />Integrated Web Links </div>
                                <div><GoCheckCircleFill />Professional Video Showcases</div>
                                <div><GoCheckCircleFill />Dynamic Photo Galleries</div>
                                <div><GoCheckCircleFill />Localized Web Experience</div>
                            </IconContext.Provider>                               
                        </div>

                    <Card.Text>Cutting-Edge Website Design</Card.Text>
                        <div className='pb-5'>
                            <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                <div><GoCheckCircleFill />Tailored Responsive Layouts</div>
                                <div><GoCheckCircleFill />Integrated Social Media</div>
                                <div><GoCheckCircleFill />Advanced SEO Tactics</div>
                                <div><GoCheckCircleFill />Complimentary Web Hosting</div>
                                <div><GoCheckCircleFill />Dedicated Support & Maintenance</div>
                                <div><GoCheckCircleFill />Strategic Directory Inclusion</div>
                                <div><GoCheckCircleFill />Robust Security Protocols</div>
                                <div><GoCheckCircleFill />Flexible Content Updates</div>
                            </IconContext.Provider>                               
                        </div>

                    <Card.Text>Comprehensive Social Media Oversight</Card.Text>
                        <div className='pb-5'>
                            <IconContext.Provider value={{ color: "green", className: "me-2" }}>
                                <div><GoCheckCircleFill />Optimized Social Profiles</div>
                                <div><GoCheckCircleFill />Managed Social Campaigns</div>
                                <div><GoCheckCircleFill />Automated Advertising Strategies</div>
                            </IconContext.Provider>                               
                        </div>
            </Card.Body>
    </Card>
    );
};