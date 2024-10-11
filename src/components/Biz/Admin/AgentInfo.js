import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { css, Global } from '@emotion/react';
import BarSpinner from '../Shared/Spinner/BarSpinner.js';
import '../../../assets/styles/VerifyModal.css';
import UserContext from '../../../utils/Contexts/userContext.js';
import { fetchUserDetails, fetchAgentDetails } from '../../../utils/Biz/UserUtils.js';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans&family=League+Spartan:wght@700&family=Poppins:wght@500&family=Roboto&display=swap');
`;

const headingStyle = css`
font-family: 'Poppins', sans-serif;
font-weight: 700;
color: red;
font-size: 3rem;
text-transform: uppercase;
letter-spacing: 2px;
`;

export default function SeeAgents() {
  const { user, setUser } = useContext(UserContext);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [agentsDetails, setAgentsDetails] = useState([]);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserDetails(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && generatedReferralCode) {
      loadAgentDetails(token, generatedReferralCode);
    }
  }, [generatedReferralCode]);

  const loadUserDetails = async (token) => {
    try {
      const data = await fetchUserDetails(token);
      setGeneratedReferralCode(data.referralCode);
      setUser(data);
      setUserId(data._id);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsLoading(false);
    }
  };

  const loadAgentDetails = async (token, referralCode) => {
    try {
      const result = await fetchAgentDetails(token, referralCode);
      setAgentsDetails(result.users);
    } catch (error) {
      console.error('Error fetching agent details:', error);
    }
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
      <Container style={{ minHeight: '85vh' }}>
        <div className='py-3'>
        <h2 className={headingStyle}>Users</h2>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Referral Code</th>
                <th>Email</th>
                <th>Vendor Status</th>
                <th>Active</th>
                <th>Referred By</th>
              </tr>
            </thead>
            <tbody>
              {agentsDetails.map((user, index) => (
               <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.lastName}, {user.firstName}</td>
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