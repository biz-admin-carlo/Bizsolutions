import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Tab, Button, Modal } from 'react-bootstrap';
import { FaPlus, FaUpload } from 'react-icons/fa';

import AccountDetails from './AccountInfo_AccountDetails.js';
import Messages from './AccountInfo_Messages.js';
import ManageBiz from './AccountInfo_ManageBiz.js';
import NewsFeed from './AccountInfo_NewsFeed.js';
import Feedbacks from './AccountInfo_Feedbacks.js';
import ChangePassword from './AccountInfo_ChangePassword.js';
import DeleteAccount from './AccountInfo_DeleteAccount.js';
import Subscription from './AccountInfo_Subscription.js';
import ReferralCode from './AccountInfo_ReferralCode.js';

import Avatar from './Application_Avatar.js';
import BarSpinner from './Reusable_BarSpinner.js';
import AppFooter from './Application_Footer.js';

import '../../assets/Biz/styles/AccountInfo.css';
import { uploadUserAvatar } from '../../utils/Biz/UserUtils.js';



import UserContext from '../../UserContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountInfo() {

  const navigate = useNavigate();
  
  const { unsetUser } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showIcon, setShowIcon ] = useState(false);
  // const [ file, setFile ] = useState(null);
  // const [ showModal, setShowModal ] = useState(true);
  
  const handleAdminDashboardClick = () => {
    navigate(`/admin-dashboard/${userId}/`);
  };

  // const handleAvatarClick = () => {
  //   setShowModal(true); // Open modal on avatar click
  // };

  // const handleUploadClick = async () => {
  //   if (file) {
  //     const result = await uploadUserAvatar(file);
  //     if (result.success) {
  //       console.log('Image uploaded successfully:', result.imageUrl);
  //       setUser({ ...user, avatarUrl: result.imageUrl });
  //       setShowModal(false);  // Close the modal after upload
  //     } else {
  //       console.error('Failed to upload image:', result.message);
  //     }
  //   }
  // };
  


  const handleLogout = () => {
    unsetUser();
    window.location.reload();
  };

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
        setUserId(data._id);
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
                  <FaPlus style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: 'black',
                      cursor: 'pointer',
                      transform: 'scale(1.5)',
                      opacity: showIcon ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                  }}/>
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
                {/* <ListGroup.Item action href="#manage-biz">
                  Manage Business
                </ListGroup.Item> */}
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
                  <NewsFeed user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#feedback">
                  <Feedbacks user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#change-password">
                  <ChangePassword user={user} />
                </Tab.Pane>
                <Tab.Pane eventKey="#delete-account">
                  <DeleteAccount user={user} />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="#manage-biz">
                  <ManageBiz user={user} />
                </Tab.Pane> */}
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

    <AppFooter />
    </>
  );
}
