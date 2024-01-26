import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import '../assets/styles/AccountInfo.css';

import AccountDetails from './AccountDetails.js'
import Messages from './Messages.js'
import logo from '../assets/round-image.png'



import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';

import BarSpinner from './BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountInfo() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
      <Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={3}>
              <ListGroup>
                <h3 className='mt-3'>User Account</h3>
                <div className='mb-3 py-1 d-flex align-items-center'>
                  <img src={logo} width={50} height={50} className='mx-3'/> 
                  <div>
                    <Card.Title>Hello, {user.firstName} {user.lastName}!</Card.Title>
                    <Card.Subtitle className='text-secondary'>Member since {new Date(user.createdAt).getFullYear()}</Card.Subtitle>
                  </div>
                </div>

                <ListGroup.Item action href="#account-details">
                  Account Info
                </ListGroup.Item>
                <ListGroup.Item action href="#messages">
                  Messages
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                  News Feed
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Your Feedback
                </ListGroup.Item>
                <ListGroup.Item action href="#link5">
                  Change Password
                </ListGroup.Item>
                <ListGroup.Item action href="#link6">
                  Delete Account
                </ListGroup.Item>
              </ListGroup>

              <div>
                <Button variant="outline-warning" className="my-2">Manage Business</Button>
              </div>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#account-details">
                  <AccountDetails user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#messages">
                  <Messages user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">Tab pane content 3</Tab.Pane>
                <Tab.Pane eventKey="#link4">Tab pane content 4</Tab.Pane>
                <Tab.Pane eventKey="#link5">Tab pane content 5</Tab.Pane>
                <Tab.Pane eventKey="#link6">Tab pane content 6</Tab.Pane>
                <Tab.Pane eventKey="#link7">Tab pane content 7</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
      </Tab.Container>
      
        
    </Container>

    </>
  );
}
