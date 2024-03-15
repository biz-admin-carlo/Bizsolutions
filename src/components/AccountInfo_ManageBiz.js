import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col } from 'react-bootstrap';
import BarSpinner from './Reusable_BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountDetails({ user }) {
  const [loading, setLoading] = useState(false);
  const initialBusinessState = {
    coordinates: { latitude: null, longitude: null },
    _id: "",
    userId: "",
    alias: "",
    name: "",
    isActive: false,
    isClosed: false,
    url: "",
    categories: [],
    transactions: [],
    location: {
      address1: "",
      address2: "",
      address3: "",
      city: "",
      country: "",
      state: "",
      display_address: []
    }
  };

  const [businessData, setBusinessData] = useState(initialBusinessState);

  const token = sessionStorage.getItem('token');
  const userId = user._id;

  useEffect(() => {
    const fetchBusinessData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/business/retrieve/biz/${userId}`);
        setBusinessData(response.data);
      } catch (error) {
        console.error('Error fetching business data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [userId, token]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/business/retrieve/biz/${userId}`);
      // console.log(response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <BarSpinner />;
  }

  return (
    <Container className="pb-5">
      <div className='my-3'>
        <h2>Manage Business</h2>
      </div>
      <div>
        <hr />
        <Col xs={12} md={6} lg={12}>
          <h1>{businessData.name}</h1>
          <h3>{businessData.alias}</h3>

          <hr />

          <h5>{businessData.url}</h5>
          <h5>Biz Location</h5>

        </Col>
      </div>
      <div>
        <Button variant="warning" className="my-2" onClick={handleUpdate}>Update profile settings</Button>
      </div>
    </Container>
  );
}
