import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import BarSpinner from './Reusable_BarSpinner.js';
import { searchFeature } from '../../utils/Biz/UserUtils';
import '../../assets/Biz/styles/AccountInfo.css';

import UserContext from '../../UserContext.js';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default function EditProfile({ token }) {

  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [result, setResult] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');


    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
      fetchAllUsers(token);
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
        setUserId(data._id);
        setIsLoading(false);
      } 
    } catch (error) {
    }
  };

  const fetchAllUsers = async (token) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/v1/users/get/all-users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUsers(response.data.users); // Update the state with fetched users
      } 
    } catch (error) {

    }
  }

  const searchResult = async () => {
    try{
      const response = await axios.get(`${apiUrl}/api/v1/users/search-user/`, {
        inputField: searchInput,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.status === 200) {
        setResult(response.userDetails);
      }
    } catch (error) {

    }
  }

  return (
    <>
        <Container style={{ minHeight: '85vh' }}>
            <div className='py-3'>
                <h2>Edit User's Profile</h2>
            </div>
            <p className="paragraph-text">You can search by userId, first Name, email, or referral code.</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control
                type="text"
                className='me-2'
                placeholder="Search users here"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <Button variant="dark" onClick={() => searchResult()} >Search</Button>
            </div>
            
            {result && (
              <div className='pt-lg-3'>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>UserId</Accordion.Header>
                    <Accordion.Body>
                      {result._id}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>First Name</Accordion.Header>
                    <Accordion.Body>
                      {result.firstName}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            
        </Container>
    </>
  );
}
