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
  Button
} from '@chakra-ui/react';
import { getMyVendorManagerBizNess } from '../../../../utils/Biz/BizUtils.js';

export default function ProcessedAccounts() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBusinesses();
  }, []);

  async function loadBusinesses() {
    try {
      setLoading(true);
      const bizData = await getMyVendorManagerBizNess(); 
      if (bizData.httpCode === '200') {
        const businessesWithAge = bizData.httpMessage.map(business => ({
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

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

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
              <Th>Agent Name</Th>
              <Th>Created On</Th>
              <Th>Age</Th>
              <Th>Biz Status</Th>
              <Th>Payment Status</Th>
              <Th>Location</Th>
              <Th>Website</Th>
              <Th>Biz Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {businesses.map((business, index) => (
              <Tr key={business._id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>
                <Td>{`${business.agent.firstName} ${business.agent.lastName}`}</Td>
                <Td>{formatDateTime(business.createdAt || '-')}</Td>
                <Td>{`${business.bizAge} Days `|| '-'}</Td>
                <Td>{business.bizStatus || '-'}</Td>
                <Td>{business.paymentStatus || '-'}</Td>
                <Td>{`${business.location.city || '-'}, ${business.location.state || '-'}`}</Td>
                <Td>{business.url || '-'}</Td>
                <Td>{business.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className="mt-4">
        <Button colorScheme="teal" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
