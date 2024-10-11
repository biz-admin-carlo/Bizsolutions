import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Table } from 'react-bootstrap';

import BarSpinner from '../Shared/Spinner/BarSpinner.js';

import '../../../assets/styles/AccountInfo.css';

import UserContext from '../../../utils/Contexts/userContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function UsersInfo() {

  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);

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
  

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
    <Container style={{ minHeight: '85vh' }}>
      <div className='py-3'>
        <h2>User's Information</h2>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th> 
              <th>First Name</th>
              <th>Last Name</th>
              <th>Referral Code</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Active</th>
              <th>Referred By</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.referralCode}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td>{user.referredBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  </>
  );
}
