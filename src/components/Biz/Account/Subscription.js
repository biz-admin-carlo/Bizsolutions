import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import BarSpinner from '../Shared/Spinner/BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountDetails({ user }) {
  const [ loading, setLoading ] = useState(false);
  const [ subscriptions, setSubscriptions ] = useState([]);
  const [ message, setMessage ] = useState('You have no subscription yet.');
  const [ showSuccessModal, setShowSuccessModal ] = useState(false);
  const [ showErrorModal, setShowErrorModal ] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users/subscriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.length > 0) {
          setSubscriptions(response.data);
          setShowSuccessModal(true);
        } else {
          setMessage('No subscriptions found for this user.');
        }
      } catch (error) {
        setMessage('No subscriptions found for this user.');
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    getSubscriptions();
  }, [user._id, token]);

  if (loading) {
    return <BarSpinner />;
  }

  return (
    <Container className="pb-5">
      <div className='my-3'>
        <h2>Subscription</h2>
      </div>
      <div>
        <hr />
        {subscriptions.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payment Mode</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.productName}</td>
                  <td>${sub.productValue.toFixed(2)}</td>
                  <td>{new Date(sub.startingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>{new Date(sub.expiringDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>Keap Payment</td>
                  <td>{sub.details._id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </Container>
  );
}
