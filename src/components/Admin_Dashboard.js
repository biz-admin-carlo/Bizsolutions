import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Container, Card } from 'react-bootstrap';

import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';

import logo from '../assets/icon-round-image.png';
import '../assets/styles/AccountInfo.css';

import UserContext from '../UserContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AdminDashboard() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);

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
        const data = response.data;
        setUser(data);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
      <Container style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className='user-info-container' style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '3rem' }}>
          <img src={logo} alt="MyBiz Solutions User's Default Image"  width={50} height={50} className='mx-3'/> 
          <div>
            <h6 className="responsive-title">
              Hello, {user.firstName} {user.lastName}!
            </h6>
            <Card.Subtitle className='text-secondary'>
              Member since {new Date(user.createdAt).getFullYear()}
            </Card.Subtitle>
          </div>
        </div>
        <hr style={{ width: '100%' }}/>
        {/* Other content goes here */}
      </Container>
      <AppFooter />
    </>
  );
}
