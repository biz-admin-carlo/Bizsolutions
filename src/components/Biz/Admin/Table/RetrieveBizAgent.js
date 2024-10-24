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
  Select,
  HStack,
  VStack,
  Box,
  Input,
  Text,
  SimpleGrid
} from '@chakra-ui/react';
import { getMyCreatedBiz } from '../../../../utils/Biz/BizUtils.js';

export default function RetrieveBizAgent() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search states
  const [searchTerms, setSearchTerms] = useState({
    date: '',
    businessName: '',
    city: '',
    state: '',
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadBusinesses();
  }, []);

  // Apply filters whenever businesses or search terms change
  useEffect(() => {
    filterBusinesses();
  }, [businesses, searchTerms]);

  // Pagination calculations based on filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

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

  // Format date for comparison
  function formatDateForComparison(date) {
    return new Date(date).toISOString().split('T')[0];
  }

  // Filter businesses based on all search criteria
  function filterBusinesses() {
    let filtered = [...businesses];

    // Date filter
    if (searchTerms.date) {
      const searchDateFormatted = formatDateForComparison(searchTerms.date);
      filtered = filtered.filter(business => {
        const businessDate = formatDateForComparison(business.createdAt);
        return businessDate === searchDateFormatted;
      });
    }

    // Business name filter
    if (searchTerms.businessName) {
      const searchName = searchTerms.businessName.toLowerCase();
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchName)
      );
    }

    // City filter
    if (searchTerms.city) {
      const searchCity = searchTerms.city.toLowerCase();
      filtered = filtered.filter(business =>
        business.location.city.toLowerCase().includes(searchCity)
      );
    }

    // State filter
    if (searchTerms.state) {
      const searchState = searchTerms.state.toLowerCase();
      filtered = filtered.filter(business =>
        business.location.state.toLowerCase().includes(searchState)
      );
    }

    setFilteredBusinesses(filtered);
    setCurrentPage(1); // Reset to first page when filtering
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
        setFilteredBusinesses(businessesWithAge);
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

  // Handle search term changes
  const handleSearchChange = (field, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear all searches
  const handleClearSearch = () => {
    setSearchTerms({
      date: '',
      businessName: '',
      city: '',
      state: '',
    });
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

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
      
      {/* Search controls */}
      <VStack spacing={4} mb={4} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <Input
            placeholder='Select Date'
            size='md'
            type='date'
            value={searchTerms.date}
            onChange={(e) => handleSearchChange('date', e.target.value)}
          />
          <Input
            placeholder='Search Business Name'
            size='md'
            value={searchTerms.businessName}
            onChange={(e) => handleSearchChange('businessName', e.target.value)}
          />
          <Input
            placeholder='Search City'
            size='md'
            value={searchTerms.city}
            onChange={(e) => handleSearchChange('city', e.target.value)}
          />
          <Input
            placeholder='Search State'
            size='md'
            value={searchTerms.state}
            onChange={(e) => handleSearchChange('state', e.target.value)}
          />
        </SimpleGrid>

        <HStack justify="space-between">
          <HStack spacing={4}>
            <Select 
              width="auto"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </Select>

            <Text>
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredBusinesses.length)} of {filteredBusinesses.length} items
            </Text>
          </HStack>

          <Button
            size="sm"
            onClick={handleClearSearch}
            isDisabled={!Object.values(searchTerms).some(term => term !== '')}
          >
            Clear Filters
          </Button>
        </HStack>
      </VStack>

      {/* Show message when no results found */}
      {filteredBusinesses.length === 0 && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>No businesses found matching the search criteria.</Text>
        </Alert>
      )}

      {/* Rest of your table code remains the same */}
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
            {currentBusinesses.map((business, index) => (
              <Tr key={business._id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>
                <Td>{formatDateTime(business.createdAt)}</Td>
                <Td>{`${business.bizAge} Days ` || '-'}</Td>
                <Td>
                  {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
                    <em>Pending</em>
                  ) : (
                    <em>{business.bizStatus || '-'}</em>
                  )}
                </Td>
                <Td>
                  {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
                    <em>Pending</em>
                  ) : (
                    <em>{business.paymentStatus || '-'}</em> 
                  )}
                </Td>
                <Td>{`${business.location.city}, ${business.location.state}`}</Td>
                <Td>{business.categories[0]?.title || '-'}</Td>
                <Td>{business.url || '-'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
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
          Page {currentPage} of {totalPages}
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

      {/* Refresh button */}
      <div className="mt-4">
        <Button colorScheme="teal" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
}