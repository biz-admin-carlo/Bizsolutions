import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import CreateBiz from '../Biz/CreateBiz.js';
import BizRegistration from '../Biz/Registration.js';
import '../../../assets/styles/AccountInfo.css';
import UserContext from '../../../utils/Contexts/userContext.js';
const apiUrl = process.env.REACT_APP_API_URL;

export default function Addbizness() {

  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ registrationVisible, setRegistrationVisible ] = useState(false);      
  const [ aliasName, setAliasName ] = useState('');
  const [ nameStatus, setNameStatus ] = useState('idle');
  const [ businessName, setBusinessName ] = useState('');


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
        setUsers(response.data.users);
      } 
    } catch (error) {
    }
  }
  

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
    <Container style={{ minHeight: '85vh' }}>
      <div className='pt-5'>
        <p className="paragraph-text">Hi <span className='biz-color'>{user.firstName}</span>! This is an agent only feature, please add biz here:</p>
      </div>

      <div>
        <CreateBiz />
        {registrationVisible && <div data-aos="fade-up"><BizRegistration businessName={businessName} aliasName={aliasName} /></div>}

      </div>

    </Container>
  </>
  );
}
