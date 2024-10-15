import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { getMyCreatedBiz } from '../../../../utils/Biz/BizUtils.js';

export default function ProcessedAccounts() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBusinesses();
  }, []);

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options); 
  }

  async function loadBusinesses() {
    try {
      setLoading(true);
      const { httpCode, httpMessage } = await getMyCreatedBiz();
      if (httpCode === '200') {
        const businessesWithAge = httpMessage.map(business => ({
          ...business,
          bizAge: calculateAge(business.createdAt), 
        }));
        setBusinesses(businessesWithAge);
      } else {
        setError('Failed to load businesses');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      // console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function calculateAge(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    
    const ageInMilliseconds = now - createdDate; 
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)); 
    
    return ageInDays;
  }

  if (loading) {
    return (
      <div className="p-4">
        <Spinner size="xl" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>
      <TableContainer>
        <Table size="sm">
          <TableCaption>List of Processed Business Accounts</TableCaption>
          <Thead>
            <Tr>
              <Th>Tracking Log</Th>
              <Th>Biz Name</Th>
              <Th>Created On</Th>
              <Th>Age</Th>
              <Th>Biz Status</Th>
              <Th>Payment Status</Th>
              <Th>Location</Th>
              <Th>Category</Th>
              <Th>Website</Th>
            </Tr>
          </Thead>
          <Tbody>
            {businesses.map((business, index) => (
              <Tr key={business._id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>
                <Td>{formatDateTime(business.createdAt)}</Td>
                <Td>{`${business.bizAge} Days `|| '-'}</Td>
                <Td>{business.bizStatus || '-'}</Td>
                <Td>{business.paymentStatus || '-'}</Td>
                <Td>{`${business.location.city}, ${business.location.state}`}</Td>
                <Td>{business.categories[0]?.title || '-'}</Td>
                <Td>{business.url || '-'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Refresh button */}
      <div className="mt-4">
        <Button colorScheme="teal" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
