import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Tab, Button } from 'react-bootstrap';

import AccountDetails from './Details.js';
import Messages from './Messages.js';
import Newsfeed from './Newsfeed.js';
import Feedbacks from './Feedbacks.js';
import PasswordReset from './PasswordReset.js';
import DeleteAccount from './Delete.js';
import Subscription from './Subscription.js';
import ReferralCode from './ReferralCode.js';

import Avatar from '../Shared/Avatar.js';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import Footer from '../Shared/Footer/MainFooter.js';

import '../../../assets/styles/AccountInfo.css';

import UserContext from '../../../utils/Contexts/userContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountInfo() {

  const navigate = useNavigate();
  
  const { unsetUser } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showIcon, setShowIcon ] = useState(true);
  
  const handleAdminDashboardClick = () => {
    navigate(`/admin-dashboard/${userId}/`);
  };

  const handleLogout = () => {
    unsetUser();
    window.location.reload();
  };

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
        setUserId(data._id);
        setIsLoading(false);
      } 
    } catch (error) {
    }
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
      <Container style={{ minHeight: '85vh' }}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <h3 className='my-4'>User Account</h3>
                <div className='mb-3 py-1 d-flex align-items-center'>

                <div style={{
                  position: 'relative',
                  display: 'inline-block'
              }} onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
                  <Avatar name={`${user.firstName} ${user.lastName}`} size={50}  />
              </div>

                  <div className='ms-2'>
                    <h6 className="responsive-title">
                      Hello, {user.firstName} {user.lastName}!
                    </h6>
                    <Card.Subtitle className='text-secondary'>
                      Member since {new Date(user.createdAt).getFullYear()}
                    </Card.Subtitle>
                  </div>
                </div>

                <ListGroup.Item action href="#account-details">
                  Account Info
                </ListGroup.Item>
                <ListGroup.Item action href="#subscription">
                  Subscription
                </ListGroup.Item>
                <ListGroup.Item action href="#change-password">
                  Change Password
                </ListGroup.Item>
                <ListGroup.Item action href="#messages">
                  Messages
                </ListGroup.Item>
                <ListGroup.Item action href="#news-feed">
                  News Feed
                </ListGroup.Item>
                <ListGroup.Item action href="#feedback">
                  Feedback
                </ListGroup.Item>
                <ListGroup.Item action href="#referral-code">
                  Referral Code
                </ListGroup.Item>
                <ListGroup.Item action href="#delete-account">
                  Delete Account
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleLogout}>
                  Logout
                </ListGroup.Item>
              </ListGroup>

              {(user.isAdmin &&
                <Button variant="secondary" className='my-3' onClick={handleAdminDashboardClick}>Admin Dashboard</Button>
              )}

            </Col>
            
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#account-details">
                  <AccountDetails user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#messages">
                  <Messages user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#news-feed">
                  <Newsfeed user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#feedback">
                  <Feedbacks user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#change-password">
                  <PasswordReset user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#delete-account">
                  <DeleteAccount user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#referral-code">
                  <ReferralCode user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#subscription">
                  <Subscription user={user} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    </Container>
    <Footer />
    </>
  );
}
