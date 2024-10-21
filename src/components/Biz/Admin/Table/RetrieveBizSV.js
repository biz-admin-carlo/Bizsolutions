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
  Select,
  HStack,
  Box,
  Text
} from '@chakra-ui/react';
import { getMyVendorManagerBizNess } from '../../../../utils/Biz/BizUtils.js';

export default function RetrieveBizSV() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadBusinesses();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = businesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

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

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>

      {/* Pagination controls - top */}
      <HStack spacing={4} mb={4} justify="space-between">
        <HStack spacing={4}>
          <Select
            size="sm"
            width="auto"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </Select>
          
          <Text fontSize="sm">
            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, businesses.length)} of {businesses.length} items
          </Text>
        </HStack>

        <Button colorScheme="teal" size="sm" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </HStack>

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
            {currentBusinesses.map((business, index) => (
              <Tr key={business._id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>
                <Td>{`${business.agent.firstName} ${business.agent.lastName}`}</Td>
                <Td>{formatDateTime(business.createdAt || '-')}</Td>
                <Td>{`${business.bizAge} Days ` || '-'}</Td>
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

      {/* Pagination controls - bottom */}
      <HStack spacing={2} justify="center" mt={4}>
        <Button
          size="sm"
          onClick={() => handlePageChange(1)}
          isDisabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <Box>
          <Text fontSize="sm">
            Page {currentPage} of {totalPages}
          </Text>
        </Box>
        
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          isDisabled={currentPage === totalPages}
        >
          Last
        </Button>
      </HStack>
    </div>
  );
}