import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

import BarSpinner from './Reusable_BarSpinner.js';

import '../../assets/Biz/styles/AccountInfo.css';

import UserContext from '../../UserContext.js';

const apiUrl = process.env.REACT_APP_API_URL;

export default function SeeAgents() {

  const { user, setUser } = useContext(UserContext);
  const [ userId, setUserId ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ agentsDetails, setAgentsDetails ] = useState([]);
  const [ generatedReferralCode, setGeneratedReferralCode ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        fetchUserDetails(token);
        }
    }, []);
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && generatedReferralCode) {
        fetchAgentDetails(token, generatedReferralCode);
        }
    }, [generatedReferralCode]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/users/details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data = response.data;
        setGeneratedReferralCode(data.referralCode);
        setUser(data);
        setUserId(data._id);
        setIsLoading(false);
      } 
    } catch (error) {
    }
  };

  const fetchAgentDetails = async (token) => {
    try {
    const responseAgent = await axios.post(`${apiUrl}/api/v1/admin/vendor-manager/view-all-agents`, 
        {
            "referralCode": generatedReferralCode
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
      if (responseAgent.status === 200) {
        const result = responseAgent;
        setAgentsDetails(result.data.users);
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
              <th>Vendor Agent Account</th>
              <th>Active</th>
              <th>Referred By</th>
            </tr>
          </thead>
          <tbody>
            {agentsDetails.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.referralCode}</td>
                <td>{user.email}</td>
                <td>{user.isVendorAgent ? 'Yes' : 'No'}</td>
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
